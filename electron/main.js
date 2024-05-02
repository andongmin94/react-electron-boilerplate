// 일렉트론 모듈
const path = require('node:path')
const electronLocalshortcut = require("electron-localshortcut");
const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, globalShortcut } = require("electron");

// 웹 모듈
const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");

// 일렉트론 생성 함수
let mainWindow;
const createWindow = () => {
  // 브라우저 창을 생성합니다.
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    frame: false,
    icon: path.join(__dirname, "../public/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // 웹 연결 URL
  dotenv.config();
  const BASE_URL = 'http://localhost:3000';
  mainWindow.loadURL(BASE_URL);
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
app.whenReady().then(createWindow).then(() => {
  // 기본 생성 세팅
  app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit() });
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() });

  // 타이틀 바 옵션
  ipcMain.on("hidden", () => mainWindow.hide());
  ipcMain.on("minimize", () => mainWindow.minimize());
  ipcMain.on("maximize", () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });

  // 트레이 세팅
  const tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "../public/icon.png")));
  tray.setToolTip("next-app-boilerplate");
  tray.on("double-click", () => mainWindow.show());
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: "켜기", type: "normal", click: () => mainWindow.show() },
    { label: "끄기", type: "normal", click: () => app.quit() }
  ]));

  // F5 새로고침, F12 개발자 도구 열기
  electronLocalshortcut.register("F5", () => { console.log('F5 is pressed'); mainWindow.reload() });
  electronLocalshortcut.register("F12", () => { console.log("F12 is pressed"); mainWindow.webContents.toggleDevTools() });
});

module.exports = { mainWindow };

// 여기서부터 코드 작성
