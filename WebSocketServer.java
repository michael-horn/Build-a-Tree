import java.net.Socket;
import java.net.ServerSocket;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.MessageDigest;

public class WebSocketServer {
   
   static String readLine(InputStream in) throws Exception {
      
      int b;
      String line = "";
      while ((b = in.read()) >= 0) {
         if (b == 10) return line.trim();
         line += (char)b;
      }
      return line.trim();
   }
   
   
   public static void main(String [] args) throws Exception {
      
      //String key1 = 
      //String key2 = "
      //String tail = "Tm[K T2u";
      
      //webhash(key1, key2, tail);
      byte [] temp = { 'T', 'm', '[', 'K', ' ', 'T', '2', 'u' };
/*
      System.out.println(
                         webhash(
         "18x 6]8vM;54 *(5:  {   U1]8  z [  8",
         "1_ tx7X d  <  nw  334J702) 7]o}` 0",
         temp));
 */      
      //"fQJ,fN/4F4!~K~MH"

      
      ServerSocket ss = new ServerSocket(4444);
      System.out.println("Waiting for connection...");
      Socket client = null;
      client = ss.accept();
      OutputStream out = client.getOutputStream();
      //PrintWriter out = new PrintWriter(client.getOutputStream(), true);
      InputStream in = client.getInputStream();
      
      String line;
      String h1 = null;
      String h2 = null;
      
      while ((line = readLine(in)) != null) {
         System.out.println(line);
         if (line.startsWith("Sec-WebSocket-Key1: ")) {
            h1 = line.substring(20);
         } else if (line.startsWith("Sec-WebSocket-Key2: ")) {
            h2 = line.substring(20);
         } else if (line.length() == 0) {
            break;
         }
      }
      
      byte [] tail = new byte[8];
      int b;
      for (int i=0; i<8; i++) {
         b = in.read();
         tail[i] = (byte)b;
      }
      
      /*
   out.write("HTTP/1.1 101 WebSocket Protocol Handshake\r\n".getBytes("UTF-8"));
   out.write("Upgrade: WebSocket\r\n".getBytes("UTF-8"));
   out.write("Connection: Upgrade\r\n".getBytes("UTF-8"));
   String line = "Sec-WebSocket-Location: " + host + ":" + port + resource + "\r\n";
    out.write(line.getBytes(UTF8));
    line = "Sec-WebSocket-Origin: " + origin + "\r\n";
    out.write(line.getBytes(UTF8));
    if (draft != null) {
      line = "Sec-WebSocket-Draft: " + draft + "\r\n";
      out.write(line.getBytes(UTF8));
    }
    out.write("\r\n".getBytes(UTF8));
    out.flush();
      */
      send("HTTP/1.1 101 WebSocket Protocol Handshake", out);
      send("Upgrade: WebSocket", out);
      send("Connection: Upgrade", out);
      send("Sec-WebSocket-Location: ws://localhost:4444/", out);
      send("Sec-WebSocket-Origin: http://localhost", out);
      send("Sec-WebSocket-Protocol: sample", out);
      send("", out);
      out.flush();
      String hash = webhash(h1, h2, tail, out);
      
      //out.write((hash + "\r\n").getBytes("UTF-8"));
      System.out.println(hash);
      System.out.println("...");
      
/*      
      out.write(0x04);
      out.write(0x05);
      out.write("Hello".getBytes("UTF-8"));
      out.flush();
      
      out.write(0x02);
      out.write(0x05);
      out.write("Hello".getBytes("UTF-8"));
      out.flush();
*/

      String data =
      ("{ " +
       "touches : [ " +
       " { pageX : 100, pageY : 50, identifier : 1 }, " +
       " { pageX : 15, pageY : 200, identifier : 2 } " +
       "], " + 
       "changedTouches : [ " +
       " { pageX : 100, pageY : 50, identifier : 1 } " +
       "] } ");
      sendText(data, out);
      
      line = readLine(in);
      
      
      /*
      out.close();
      in.close();
      client.close();
      ss.close();
      */
   }
   
   private static void sendText(String text, OutputStream out) throws Exception {
      out.write(0x00);
      out.write(text.getBytes("UTF-8"));
      out.write(0xff);
      out.flush();
   }
   
   
   private static void send(String line, OutputStream out) throws Exception {
      System.out.println(line);
      line += "\r\n";
      out.write(line.getBytes("UTF-8"));
   }
   
   public static String webhash(String key1, String key2, byte [] tail, OutputStream out) throws Exception {
      byte [] bytes = new byte[16];
      long l1 = webhash(key1);
      long l2 = webhash(key2);
      
      // l1 = 0x09 47 fa 63
      // l2 = 0x0a 55 10 d3
//      for (int i=0; i<4; i++) {
         bytes[0] = (byte) ((l1 >> 24) & 255);
         bytes[1] = (byte) ((l1 >> 16) & 255);
         bytes[2] = (byte) ((l1 >> 8) & 255);
         bytes[3] = (byte) (l1 & 255);
         bytes[4] = (byte) ((l2 >> 24) & 255);
         bytes[5] = (byte) ((l2 >> 16) & 255);
         bytes[6] = (byte) ((l2 >> 8) & 255);
         bytes[7] = (byte) (l2 & 255);
         //bytes[i] = (byte)(l1 & 0xff);
         //bytes[i+4] = (byte)(l2 & 0xff);
//         l1 >>= 8;
//         l2 >>= 8;
//      }
      for (int i=0; i<8; i++) {
         bytes[i+8] = tail[i];
      }
      
      MessageDigest md = MessageDigest.getInstance("MD5");
      byte [] digest = md.digest(bytes);
      out.write(digest);
      return new String(digest, "UTF-8");
   }
   
   
   public static long webhash(String key) {
      String num = "";
      int scount = 0;
      for (int i=0; i<key.length(); i++) {
         char c = key.charAt(i);
         if (c >= '0' && c <= '9') {
            num += c;
         } else if (c == ' ') {
            scount++;
         }
      }
      long v = Long.parseLong(num);
      return v / scount;
      
   }
}