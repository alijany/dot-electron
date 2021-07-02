import { Container } from 'typescript-ioc';
import App from './contract/App';
import './ioc';

Container.get(App)

// if (require('electron-squirrel-startup')) {
//   app.quit()
// }

// const createWindow = () => {
//   const mainWindow = new BrowserWindow({
//     icon: path.resolve(__dirname, icon),
//     width: 800,
//     height: 600
//   })
//   mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
//   mainWindow.webContents.openDevTools()
// }

// app.on('ready', createWindow)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow()
//   }
// })
