// Import des modules d'électron
const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");

const path = require('path')
const fs = require('fs')
// Création d'une fenêtre de navigateur
const createWindow = () => {
  const win = new BrowserWindow({ 
    width: 800,
     height: 600 ,
     show: false,
     backgroundColor: '#d1d1d1',
     webPreferences: {
        preload: path.join(__dirname, 'preload.js')
        },
    });

win.loadFile("index.html");
win.show()

ipcMain.on('get-files' , (event, arg) => {
  //joining path of directory 
  const directoryPath = path.join(__dirname, 'Files');
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
     win.webContents.send('files-found', files)
  });
  })
}


// Les fenêtres ne peuvent être créés qu'au déclenchement
// de l'événement ready
app.whenReady().then(() => {
  createWindow();

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("msg", (event,data) => {
  console.log(data) // "Hello from render process"
  event.reply("reply","thank you")
  })






