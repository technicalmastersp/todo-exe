const { contextBridge, ipcRenderer } = require('electron');

// Expose safe methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
    loadTasks: () => ipcRenderer.invoke('load-tasks'),
    saveTasks: (tasks) => ipcRenderer.invoke('save-tasks', tasks)
});