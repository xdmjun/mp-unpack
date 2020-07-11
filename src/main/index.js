import { app, BrowserWindow, ipcMain, dialog } from 'electron'
const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const compressing = require('compressing')
let toolRoot = '../../../tool/'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
  const fixPath = require('fix-path')
  fixPath()
}

if (process.env.NODE_ENV === 'development') {
  toolRoot = '../../tool/'
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('file-upload', (event, param) => {
  try {
    let wxFile = fs.readFileSync(param.path)
    let tmpFile = path.join(__dirname, toolRoot + param.name)
    fs.writeFileSync(tmpFile, wxFile, function(err) {
      if (err) {
        console.log(err)
      }
    })
  } catch (e) {
    console.log(e.toString())
  }
})

ipcMain.on('do-unpack', (event, fname) => {
  // 默认使用开源中国的小程序包
  if (fname == '') {
    fname = 'osc.wxapkg'
  }
  let cmdStr = 'node wuWxapkg.js ' + fname
  // 执行cmd命令的目录
  let cmdPath = path.join(__dirname, toolRoot)
  // 子进程名称
  let workerProcess
  // 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
  workerProcess = exec(cmdStr, { cwd: cmdPath })
  // 打印正常的后台可执行程序输出
  workerProcess.stdout.on('data', function(data) {
    event.sender.send('asynchronous-reply', data)
  })
  // 打印错误的后台可执行程序输出
  workerProcess.stderr.on('data', function(data) {
    event.sender.send('asynchronous-reply', data)
  })
  // 退出之后的输出
  workerProcess.on('close', function(code) {
    event.sender.send('asynchronous-reply', code)
  })
})

// 导出操作
ipcMain.on('do-export', (event, fname) => {
  if (fname == '') {
    fname = 'osc.wxapkg'
  }
  let folderName = fname.substr(0, fname.indexOf('.'))
  let zipPath = path.join(__dirname, toolRoot + folderName)
  // 压缩反编译后的文件
  compressing.zip
    .compressDir(zipPath, zipPath + '.zip')
    .then(() => {
      delDir(zipPath)
      event.sender.send('asynchronous-export', zipPath + '.zip')
    })
    .catch((err) => {
      console.error(err)
    })
})

function delDir(p) {
  // 读取文件夹中所有文件及文件夹
  let list = fs.readdirSync(p)
  list.forEach((v, i) => {
    // 拼接路径
    let url = p + '/' + v
    // 读取文件信息
    let stats = fs.statSync(url)
    // 判断是文件还是文件夹
    if (stats.isFile()) {
      // 当前为文件，则删除文件
      fs.unlinkSync(url)
    } else {
      // 当前为文件夹，则递归调用自身
      delDir(url)
    }
  })
  // 删除空文件夹
  fs.rmdirSync(p)
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
