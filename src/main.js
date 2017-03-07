const {
	app,
	globalShortcut,
	BrowserWindow,
} = require('electron');

const path = require('path');
const url = require('url');

// app.commandLine.appendSwitch('ignore-gpu-blacklist');

let mainWindow;
let kiosk = true;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 600,
		kiosk: true,
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true,
	}));
	mainWindow.setKiosk(kiosk);
	// mainWindow.webContents.openDevTools();
	globalShortcut.register('Control+F', () => {
		kiosk = !kiosk;
		mainWindow.setFullScreen(kiosk);
	});
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
