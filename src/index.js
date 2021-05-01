const { app, BrowserWindow,Notification } = require('electron');
const path = require('path');
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const CSV = require('csv-string');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 720,
    height: 1000,
    webPreferences:{
      nodeIntegration:true,
      enableRemoteModule: true
    }
  });
  
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
 
};
function file_horas(){
  csvData=[]
  var text = fs.readFileSync('./file_horas.csv','utf8');
  console.log(CSV.parse(text));
  return CSV.parse(text);
}
function save_file_horas(csv_horas){
  console.log(CSV.stringify(csv_horas,";"));
  fs.writeFile('file_horas.csv',CSV.stringify(csv_horas,";"), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}
// funciones de tabla
function file(){
  csvData=[]
  var text = fs.readFileSync('./data.csv','utf8');
  console.log(CSV.parse(text));
  
  new Notification({
    title:"Recordatorios Panxo APP",
    body:"aqui estamos en la versión BETA"
  }).show()   
  return CSV.parse(text);
}
function save_file(csv_data){
  console.log(CSV.stringify(csv_data,";"));
  fs.writeFile('data.csv',CSV.stringify(csv_data,";"), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

module.exports={
  createWindow,
  file,
  save_file,
  file_horas,
  save_file_horas
}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
