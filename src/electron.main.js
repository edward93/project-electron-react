const {app, BrowserWindow} = require('electron')

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const appUrl = "http://localhost:3000";
  // and load the index.html of the app.
  win.loadURL(appUrl);
};

app.whenReady().then(createWindow);
