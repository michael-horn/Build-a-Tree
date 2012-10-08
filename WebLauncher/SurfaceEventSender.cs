using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Sockets;
using System.Net;
using System.Windows.Forms;
using Microsoft.Surface.Core;
using System.Security.Permissions;
using System.Collections;

namespace WebLauncher
{
    [PermissionSet(SecurityAction.Demand, Name = "FullTrust")]
    [System.Runtime.InteropServices.ComVisibleAttribute(true)]

    class SurfaceEventSender
    {
        public AsyncCallback workerCallback;
        private Socket mainSocket;
        private Socket clientSocket;
        private ASCIIEncoding ascii = new ASCIIEncoding();

        private string contactData = "";

        public SurfaceEventSender()
        {
        }

        //public delegate void CloseEventHandler(object sender);
        //public event CloseEventHandler CloseEvent;

        #region Socket Communication

        public void InitializeSocketCommunication(int port)
        {
            try
            {
                
                // Create the listening socket...
                mainSocket = new Socket(AddressFamily.InterNetwork,
                                          SocketType.Stream,
                                          ProtocolType.Tcp);
                mainSocket.SetSocketOption(SocketOptionLevel.Tcp, SocketOptionName.NoDelay, true);

                IPEndPoint ipLocal = new IPEndPoint(IPAddress.Any, port);

                // Bind to local IP Address...
                mainSocket.Bind(ipLocal);

                // Start listening...
                mainSocket.Listen(4);

                // Create the call back for any client connections...
                mainSocket.BeginAccept(new AsyncCallback(OnClientConnect), null);
            }
            catch (SocketException se)
            {
                MessageBox.Show(se.Message);
            }

        }

        private void OnClientConnect(IAsyncResult asyn)
        {
            try
            {
                clientSocket = mainSocket.EndAccept(asyn);
                WaitForData(clientSocket);
                contactData = "<session>";
            }
            catch (ObjectDisposedException)
            {
                System.Diagnostics.Debugger.Log(0, "1", "\n Socket has been closed\n");
            }
            catch (SocketException se)
            {
                MessageBox.Show(se.Message);
            }

        }

        public class SocketPacket
        {
            public System.Net.Sockets.Socket currentSocket;
            //define size of buffer
            public byte[] dataBuffer = new byte[1024];
        }

        // Start waiting for data from the client
        private void WaitForData(System.Net.Sockets.Socket soc)
        {
            try
            {
                if (workerCallback == null)
                {
                    //Callback for data received from the client 
                    workerCallback = new AsyncCallback(OnDataReceived);
                }

                SocketPacket theSocPkt = new SocketPacket();
                theSocPkt.currentSocket = soc;
                // Start receiving any data written by the connected client
                // asynchronously
                soc.BeginReceive(theSocPkt.dataBuffer, 0,
                                   theSocPkt.dataBuffer.Length,
                                   SocketFlags.None,
                                   workerCallback,
                                   theSocPkt);
            }
            catch (SocketException se)
            {
                MessageBox.Show(se.Message);
            }
        }

        // Callback for when the socket detects any client writing data on the stream
        public void OnDataReceived(IAsyncResult asyn)
        {
            //TODO Act on data received from clients
        }

        private void BroadcastData(string data)
        {
            byte[] ba = new byte[data.Length];
            ba = ascii.GetBytes(data);

            //Multicast to any clients
            try
            {
                if (clientSocket != null && clientSocket.Connected)
                {
                    clientSocket.Send(ba);
                }
            }
            catch (SocketException)
            {
                Shutdown();
            }
        }

        //Helper function to get Local IP address
        String GetLocalIP()
        {
            String strHostName = Dns.GetHostName();

            // Find host by name
            IPHostEntry iphostentry = Dns.GetHostByName(strHostName);

            // Grab the first IP addresses
            String IPStr = "";
            foreach (IPAddress ipaddress in iphostentry.AddressList)
            {
                IPStr = ipaddress.ToString();
                return IPStr;
            }
            return IPStr;
        }

        #endregion

        #region ConvertSurfaceEventToXml

        public void EndSession()
        {
            BroadcastData("</session>");
        }


        public void SendData(ReadOnlyTouchPointCollection contacts)
        {
            contactData += "<frame>";
          
            foreach (TouchPoint touch in contacts)
            {
                ConvertContactDataToString(touch);
            }
            contactData += "</frame>";
            BroadcastData(contactData);
            contactData = "";
        }


        protected void Shutdown()
        {
            try
            {
                mainSocket.Shutdown(SocketShutdown.Both);
                mainSocket.Close();
            }
            catch (Exception)
            {
                ;
            }
            Application.Exit();
        }


        public void ConvertContactDataToString(TouchPoint contact)
        {

            contactData += "<contact ";

            contactData += " id=\"";
            contactData += contact.Id.ToString();
            contactData += "\"";

            contactData += " x=\"";
            contactData += contact.CenterX.ToString();
            contactData += "\"";

            contactData += " y=\"";
            contactData += contact.CenterY.ToString();
            contactData += "\"";

            contactData += " orientation=\"";
            contactData += contact.Orientation.ToString();
            contactData += "\"";

            contactData += " boundsX=\"";
            contactData += contact.Bounds.Left.ToString();
            contactData += "\"";

            contactData += " boundsY=\"";
            contactData += contact.Bounds.Top.ToString();
            contactData += "\"";

            contactData += " boundsWidth=\"";
            contactData += contact.Bounds.Width.ToString();
            contactData += "\"";

            contactData += " boundsHeight=\"";
            contactData += contact.Bounds.Height.ToString();
            contactData += "\"";

            //Get Type
            contactData += " type=\"";

            if (contact.IsFingerRecognized)
            {
                contactData += "finger";
            }
            else if (contact.IsTagRecognized)
            {
                contactData += "tag";
            }
            else
            {
                contactData += "blob";
            }

            contactData += "\"";
            /*
            if (contact.Tag.GetType == System.Type.)
            {
                contactData += " tagID=\"";
                contactData += contact.Tag.Value;
                contactData += "\"";
            }
            else
            {
             */ 
                contactData += " tagID=\"-1\"";
            //}

            contactData += " />";

        }
        #endregion

    }
}
