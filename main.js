const {app, BrowserWindow} = require('electron')
const internalServer = require('./staticServer')
const internalWss = require('./wsServer')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        "width": 800,
        "height": 600
    });

    mainWindow.setMenu(null)
    mainWindow.loadFile('index.html')

    mainWindow.on('close', ()=>{
        mainWindow = null
    })
}

function initialize() {
    createWindow()
    mainWindow.openDevTools()
 
    internalWss.start().then((result)=>{
        console.log("WSS: " + result.port)
        internalServer.start({"wssPort": result.port}).then((result)=>{
            console.log("HTTP: " + result.port)
        })
    })
}

app.on('ready', initialize)

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', ()=>{
    if(mainWindow == null) {
        createWindow()
    }
})