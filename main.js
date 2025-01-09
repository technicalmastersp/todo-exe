const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;
function createWindow() {
  win = new BrowserWindow({
    minWidth: 260,
    width: 280,
    height: 320,
    maxWidth: 350,
    maxHeight: 450,
    webPreferences: {
      nodeIntegration: true,
    },
    alwaysOnTop: true,
    focusable: true,
    resizable: true,
    maximizable: false,
    icon: path.join(__dirname, "icon.png"),
  });

  win.loadFile("index.html");

  win.on("focus", () => {
    win.setOpacity(1); //When the app is focused, make it fully visible (100%)
    win.setSize(win.getSize()[0], 300);
  });
  win.on("blur", () => {
    win.setOpacity(0.3); //When the app is not focused, make it semi-transparent (65%)
    win.setSize(win.getSize()[0], 0);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
