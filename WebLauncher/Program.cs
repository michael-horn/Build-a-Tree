using System;
using System.Drawing;
using System.Windows.Forms;
using Microsoft.Surface;
using Microsoft.Surface.Core;
using Microsoft.Xna.Framework;


namespace WebLauncher
{
    static class Program
    {
        // Hold on to the game window.
        static GameWindow Window;

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        public static extern void SetWindowPos(uint Hwnd, uint Level, int X, int Y, int W, int H, uint Flags);


        [STAThread]
        static void Main(string[] args)
        {
            Application.SetUnhandledExceptionMode(UnhandledExceptionMode.ThrowException);

            using (WebLauncher app = new WebLauncher())
            {
                app.Run();
            }
        }


        internal static void RemoveBorder(IntPtr hWnd)
        {
            Form form = (Form)Form.FromHandle(hWnd);
            form.FormBorderStyle = FormBorderStyle.None;
            form.TopMost = true;
            form.Opacity = 0.01;
        }


        internal static Size WindowSize
        {
            get
            {
                return ((Form)Form.FromHandle(Window.Handle)).DesktopBounds.Size;
            }
        }


        internal static void InitializeWindow(GameWindow window)
        {
            if (window == null)
            {
                throw new ArgumentNullException("window");
            }
            Window = window;
            Form form = (Form)Form.FromHandle(Window.Handle);
            form.LocationChanged += OnFormLocationChanged;
            SetWindowStyle();
            SetWindowSize();
        }


        private static void OnFormLocationChanged(object sender, EventArgs e)
        {
            if (SurfaceEnvironment.IsSurfaceEnvironmentAvailable)
            {
                Form form = (Form)Form.FromHandle(Window.Handle);
                form.LocationChanged -= OnFormLocationChanged;
                PositionWindow();
                form.LocationChanged += OnFormLocationChanged;
            }
        }


        internal static void PositionWindow()
        {
            int left = (InteractiveSurface.PrimarySurfaceDevice != null)
                             ? InteractiveSurface.PrimarySurfaceDevice.WorkingAreaLeft
                             : Screen.PrimaryScreen.WorkingArea.Left;
            int top = (InteractiveSurface.PrimarySurfaceDevice != null)
                            ? InteractiveSurface.PrimarySurfaceDevice.WorkingAreaTop
                            : Screen.PrimaryScreen.WorkingArea.Top;

            Form form = (Form)Form.FromHandle(Window.Handle);
            FormWindowState windowState = form.WindowState;
            form.WindowState = FormWindowState.Normal;
            form.Location = new System.Drawing.Point(left, top);
            form.WindowState = windowState;

        }
        private static void SetWindowStyle()
        {
            Window.AllowUserResizing = true;
            Form form = (Form)Form.FromHandle(Window.Handle);
            form.FormBorderStyle = (SurfaceEnvironment.IsSurfaceEnvironmentAvailable)
                                    ? FormBorderStyle.None
                                    : FormBorderStyle.Sizable;
        }

        /// <summary>
        /// Size the window to the primary device.
        /// </summary>
        private static void SetWindowSize()
        {
            int width = (InteractiveSurface.PrimarySurfaceDevice != null)
                            ? InteractiveSurface.PrimarySurfaceDevice.WorkingAreaWidth
                            : Screen.PrimaryScreen.WorkingArea.Width;
            int height = (InteractiveSurface.PrimarySurfaceDevice != null)
                            ? InteractiveSurface.PrimarySurfaceDevice.WorkingAreaHeight
                            : Screen.PrimaryScreen.WorkingArea.Height;

            Form form = (Form)Form.FromHandle(Window.Handle);
            form.ClientSize = new Size(width, height);
            form.WindowState = (SurfaceEnvironment.IsSurfaceEnvironmentAvailable)
                            ? FormWindowState.Normal
                            : FormWindowState.Maximized;
        }
    }
}

