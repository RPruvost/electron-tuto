const { contextBridge, ipcRenderer } = require("electron");

const list = document.getElementById("file-list");
const li = document.createElement("li");

window.addEventListener("DOMContentLoaded", () => {
  const electronVersion = document.getElementById("version");
  if (electronVersion) electronVersion.innerText = process.versions.electron;
});

contextBridge.exposeInMainWorld("electron", {
    requestFiles: () => ipcRenderer.send( 'get-files'),
    onReceivedFiles : () => ipcRenderer.on('files-found', (event, files) => {
        console.log('bonsoir')
        console.log(files)
    files.forEach(file => {
        const  li = document.createElement("li");
        const text = document.createTextNode(file);
        li.appendChild(text);
        document.getElementById("file-list").appendChild(li);
    });
    })
});