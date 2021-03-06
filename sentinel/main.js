const {app} = require('electron');

const {createAuthWindow, authenticateUsingAuthWindow} = require('./main/auth-process');
const {createAppWindow} = require('./main/app-process');
const authService = require('./services/auth-service');
const humtum = require("./services/humtum")
const envVariables = require('./env-variables');


async function showWindow() {
  try {
    await authService.refreshTokens();
    return createAppWindow();
  } catch (err) {
    createAuthWindow();
    authenticateUsingAuthWindow()
  }
}

try {
  require('electron-reloader')(module);
} catch (_) {}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', showWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});
