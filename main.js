const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 400,

    webPreferences: {
      nodeIntegration: true,
    },
    alwaysOnTop: true,
    focusable: true,
    //     transparent: true, // Make the window transparent
    //     frame: false, // Optional: Remove the window frame to make it fully transparent
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});