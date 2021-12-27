/**
 * main.js
 * Sets up everything necessary on the electron end
 * of the application
 * 
 * @date 12/27/2021
 * @author Ashton Statz
 */

const { BrowserWindow, app } = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {

    const win = new BrowserWindow({
        width: 1020,
        height: 720,
        webPreferences: {
            enableRemoteModule: true
        }
    })

    win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})