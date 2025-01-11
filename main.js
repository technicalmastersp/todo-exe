const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

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
      preload: path.join(__dirname, 'preload.js')
    },
    alwaysOnTop: true,
    focusable: true,
    resizable: true,
    maximizable: false,
    icon: path.join(__dirname, "icon.png"),
  });
  
  win.setMenu(null); // Disable the default menu bar
  win.loadURL("file://" + path.join(__dirname, "index.html"));

  win.on("focus", () => {
    win.setOpacity(1); //When the app is focused, make it fully visible (100%)
    win.setSize(win.getSize()[0], 300);
  });
  win.on("blur", () => {
    win.setOpacity(0.3); //When the app is not focused, make it semi-transparent (65%)
    win.setSize(win.getSize()[0], 0);
  });
}

app.whenReady().then(() => {
    createWindow();

    // Quit when all windows are closed (except macOS)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Read tasks from JSON file
ipcMain.handle('load-tasks', () => {
    const filePath = path.join(__dirname, 'todoList.json');
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error reading tasks:", error);
        return [];
    }
});

// Save tasks to JSON file
ipcMain.handle('save-tasks', (event, tasks) => {
    const filePath = path.join(__dirname, 'todoList.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2)); // Pretty print JSON with indentation
    } catch (error) {
        console.error("Error saving tasks:", error);
    }
});