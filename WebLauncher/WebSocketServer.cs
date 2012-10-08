using System;
using System.Net;
using System.Net.Sockets;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading;
using System.Text;
using System.IO;
using System.Security.Permissions;
//using System.Windows.Forms;
using Microsoft.Surface.Core;
using System.Security.Cryptography;

namespace WebLauncher
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [System.Runtime.InteropServices.ComVisibleAttribute(true)]

    class WebSocketServer
    {

        private WebLauncher launcher;
        private Socket server;
        private List<Socket> clients;
        private int port;
        private UTF8Encoding encoding;
        private Dictionary<int, TouchPoint> prevFrame;
        private SHA1 sha1 = SHA1.Create();


        public WebSocketServer(WebLauncher launcher, int port)
        {
            this.launcher = launcher;
            this.port = port;
            this.server = null;
            this.clients = new List<Socket>();
            this.encoding = new UTF8Encoding();
            this.prevFrame = new Dictionary<int, TouchPoint>();
        }


        public void Start()
        {
            try
            {
                // Create the listening socket...
                server = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                server.SetSocketOption(SocketOptionLevel.Tcp, SocketOptionName.NoDelay, true);

                // Bind to local IP Address...
                server.Bind(new IPEndPoint(IPAddress.Any, port));

                // Start listening...
                server.Listen(4);

                // Create the call back for any client connections...
                server.BeginAccept(new AsyncCallback(OnClientConnect), null);
            }
            catch (SocketException)
            {
                //MessageBox.Show(se.Message);
            }
        }


        public void SendData(ReadOnlyTouchPointCollection contacts)
        {
            List<string> touches = new List<string>();
            Dictionary<int, TouchPoint> frame = new Dictionary<int, TouchPoint>();

            foreach (TouchPoint contact in contacts)
            {
                bool down, drag, up;
                if (prevFrame.ContainsKey(contact.Id)) {
                    TouchPoint c = prevFrame[contact.Id];
                    down = false;
                    up = false;
                    drag = (c.X != contact.X || c.Y != contact.Y);
                    prevFrame.Remove(contact.Id);
                    frame.Add(contact.Id, contact);
                    touches.Add(ToJSON(contact, down, drag, up));
                }
                else
                {
                    down = true;
                    drag = true;
                    up = false;
                    if (contact.IsFingerRecognized)
                    {
                        frame.Add(contact.Id, contact);
                        touches.Add(ToJSON(contact, down, drag, up));
                    }
                }                
            }

            foreach (TouchPoint contact in prevFrame.Values)
            {
                // add touch up contacts
                touches.Add(ToJSON(contact, false, false, true));
            }

            string json = "{ touches : [ ";
            bool first = true;
            foreach (string t in touches)
            {
                if (first)
                {
                    first = false;
                }
                else
                {
                    json += ", ";
                }
                json += t;
            }
           
            json += "] }";
            BroadcastData(json);
            this.prevFrame = frame;
        }


        private string ToJSON(TouchPoint contact, bool down, bool drag, bool up)
        {
            return ("{ " +
                    "pageX : " + contact.CenterX + ", " +
                    "pageY : " + contact.CenterY + ", " +
                    "identifier : " + contact.Id + ", " +
                    "down : " + down.ToString().ToLower() + ", " +
                    "drag : " + drag.ToString().ToLower() + ", " + 
                    "up : " + up.ToString().ToLower() + " }");
        }


        private void OnClientConnect(IAsyncResult asyn)
        {
            Console.WriteLine("client connect");
            Socket client = server.EndAccept(asyn);
            server.BeginAccept(new AsyncCallback(OnClientConnect), null);

            try
            {
                byte[] buffer = new byte[496];
                int count = client.Receive(buffer);
                string line = "";
                string h1 = "";
                string protocol = null;
                string origin = "";
                int i = 0;
                while ((line = ReadLine(buffer, ref i)) != null)
                {
                    Console.WriteLine(line);
                    if (line.Length == 0)
                    {
                        break;
                    }
                    else if (line.StartsWith("Sec-WebSocket-Key: "))
                    {
                        h1 = line.Substring(19);
                    }
                    else if (line.StartsWith("Sec-WebSocket-Protocol: "))
                    {
                        protocol = line.Substring(24);
                    }
                    else if (line.StartsWith("Origin: "))
                    {
                        origin = line.Substring(8);
                    }
                }

                h1 += "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";  // magic string
                byte[] hash = sha1.ComputeHash(encoding.GetBytes(h1));
                h1 = System.Convert.ToBase64String(hash);

                string response =
                    "HTTP/1.1 101 Switching Protocols\r\n" +
                    "Upgrade: websocket\r\n" +
                    "Connection: Upgrade\r\n" +
                    "Sec-WebSocket-Accept: " + h1 + "\r\n";

                if (protocol != null)
                {
                    response += "Sec-WebSocket-Protocol: null\r\n";
                }
                response += "\r\n";

                Console.WriteLine(response);
                client.Send(encoding.GetBytes(response));
                lock (clients)
                {
                    clients.Add(client);
                }

                while ((count = client.Receive(buffer)) > 0)
                {
                    ;
                }
            }
            catch (Exception) { ; }
            lock (clients)
            {
                clients.Remove(client);
                try { client.Close(); }
                catch (Exception) { ; }
            }
        }


        private void BroadcastData(string data)
        {
            lock (clients)
            {
                if (clients.Count > 0)
                {
                    Socket client = clients[clients.Count - 1];

                    byte[] payload = encoding.GetBytes(data);
                    byte[] header = new byte[4];
                    header[0] = 0x81;  // Final fragment, text frame, no masking
                    bool small = payload.Length <= 125;


                    if (small)
                    {
                        header[1] = (byte)payload.Length;
                    }
                    else 
                    {
                        header[1] = 126;
                        header[2] = (byte)(0xFF & (payload.Length >> 8));
                        header[3] = (byte)(0xFF & payload.Length);
                    }
 
                    try
                    {
                        if (client != null && client.Connected)
                        {
                            client.Send(header, small ? 2 : 4, SocketFlags.None);
                            client.Send(payload);
                        }
                    }
                    catch (SocketException)
                    {
                        // Shutdown();
                    }
                }
            }
        }


        private string ReadLine(byte[] buffer, ref int index)
        {
            string line = "";
            while (index < buffer.Length)
            {
                byte b = buffer[index++];
                if (b == 10 || b == 0)
                {
                    return line.Trim();
                }
                else if (b != 13)
                {
                    line += (char)b;
                }
            }
            return line;
        }

        protected void Shutdown()
        {
            try
            {
                server.Shutdown(SocketShutdown.Both);
                server.Close();
            }
            catch (Exception)
            {
                ;
            }
            //Application.Exit();
        }
    }

}
