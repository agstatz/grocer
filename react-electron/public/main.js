const { BrowserWindow, app } = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {
    process.env.GOOGLE_API_KEY = '../secrets.json';
    process.env.SHEET_ID = '1tOyRUbwJunCioOJVNMZ01Q4iC4Y7VrYg8Jfx54KQSsA';

    const win = new BrowserWindow({
        width: 800,
        height: 600,
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