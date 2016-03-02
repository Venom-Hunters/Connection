'use babel';

var app = require("app")
  , BrowserWindow = require("browser-window");

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on("ready", function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL("http://localhost:8888");

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.openDevTools();

});
