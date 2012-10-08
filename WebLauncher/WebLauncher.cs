using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Microsoft.Surface;
using Microsoft.Surface.Core;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System.Diagnostics;
using Microsoft.Win32;
using System.Runtime.InteropServices;


namespace WebLauncher
{

    public class WebLauncher : Microsoft.Xna.Framework.Game
    {
        private readonly GraphicsDeviceManager graphics;
        private TouchTarget touchTarget;
        private bool applicationLoadCompleteSignalled;
        private Color backgroundColor = new Color(81, 81, 81);
        private WebSocketServer server;


        public WebLauncher()
        {
            graphics = new GraphicsDeviceManager(this);
        }


        protected override void Initialize()
        {
            SetWindowOnSurface();
            InitializeSurfaceInput();

            // Subscribe to surface application activation events
            ApplicationServices.WindowInteractive += OnWindowInteractive;
            ApplicationServices.WindowNoninteractive += OnWindowNoninteractive;
            ApplicationServices.WindowUnavailable += OnWindowUnavailable;

            base.Initialize();

            server = new WebSocketServer(this, GetIntProperty("surface.port"));
            server.Start();
        }


        private void SetWindowOnSurface()
        {
            System.Diagnostics.Debug.Assert(Window != null && Window.Handle != IntPtr.Zero,
                "Window initialization must be complete before SetWindowOnSurface is called");
            if (Window == null || Window.Handle == IntPtr.Zero)
                return;

            // Get the window sized right.
            Program.InitializeWindow(Window);
            // Make sure the window is in the right location.
            //Program.PositionWindow();
            graphics.PreferredBackBufferWidth = Program.WindowSize.Width;
            graphics.PreferredBackBufferHeight = Program.WindowSize.Height;
            graphics.ApplyChanges();
            // Make sure the window is in the right location.
            Program.RemoveBorder(Window.Handle);
            Program.PositionWindow();
        }


        protected GraphicsDeviceManager Graphics
        {
            get { return graphics; }
        }


        private void InitializeSurfaceInput()
        {
            System.Diagnostics.Debug.Assert(Window != null && Window.Handle != IntPtr.Zero,
                "Window initialization must be complete before InitializeSurfaceInput is called");
            if (Window == null || Window.Handle == IntPtr.Zero)
                return;
            System.Diagnostics.Debug.Assert(touchTarget == null,
                "Surface input already initialized");
            if (touchTarget != null)
                return;

            // Create a target for surface input.
            touchTarget = new TouchTarget(Window.Handle, EventThreadChoice.OnBackgroundThread);
            touchTarget.EnableInput();
        }


        protected override void LoadContent() { }


        protected override void UnloadContent()
        {
            Content.Unload();
        }


        protected override void Update(GameTime gameTime)
        {
            if (ApplicationServices.WindowAvailability != WindowAvailability.Unavailable)
            {
                // get the current state
                ReadOnlyTouchPointCollection touches = touchTarget.GetState();
                server.SendData(touches);
            }

            base.Update(gameTime);
        }


        protected override void Draw(GameTime gameTime)
        {
            if (!applicationLoadCompleteSignalled)
            {
                ApplicationServices.SignalApplicationLoadComplete();
                applicationLoadCompleteSignalled = true;
                LaunchApp();
            }

            graphics.GraphicsDevice.Clear(backgroundColor);
            base.Draw(gameTime);
        }


        public void LaunchApp()
        {
            string app = GetProperty("app.path");
            string args = GetProperty("app.args");
            /*
            user32.SetCursorPos(
                InteractiveSurface.DefaultInteractiveSurface.Width,
                InteractiveSurface.DefaultInteractiveSurface.Height);
            */
            Process proc = new Process();
            proc.StartInfo.WorkingDirectory = GetProperty("app.dir");
            proc.StartInfo.FileName = app;
            proc.StartInfo.Arguments = args;
            proc.Start();
        }


        private void OnWindowInteractive(object sender, EventArgs e) { }


        private void OnWindowNoninteractive(object sender, EventArgs e) { }


        private void OnWindowUnavailable(object sender, EventArgs e) { }


        private string GetProperty(string key)
        {
            string result = new string(' ', 1024);
            GetPrivateProfileString("config", key, "", result, 1024, ".\\config.properties");
            return result.Split('\0')[0];
        }


        private int GetIntProperty(string key)
        {
            return Convert.ToInt32(GetProperty(key));
        }


        [DllImport("KERNEL32.DLL",
            EntryPoint = "GetPrivateProfileStringW",
            SetLastError = true,
            CharSet = CharSet.Unicode,
            ExactSpelling = true,
            CallingConvention = CallingConvention.StdCall)]


        public static extern int GetPrivateProfileString(string app, string key, string defaultVal, string returnString, int size, string file);

    }
}
