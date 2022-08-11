/**
 * main.js
 * Sets up everything necessary on the electron end
 * of the application
 *
 * @date 8/10/2022
 * @author Ashton Statz
 */

const { BrowserWindow, app } = require('electron');

const isDev = require('electron-is-dev');
const path = require('path');

require('@electron/remote/main').initialize();

function createWindow() {
    const win = new BrowserWindow({
        width: 1020,
        height: 720,
        minWidth: 600,
        minHeight: 400,
        icon: __dirname + '/grocer_icon.ico',
        webPreferences: {
            enableRemoteModule: true,
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
