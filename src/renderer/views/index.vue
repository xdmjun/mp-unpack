<template>
  <div class="app">
    <div class="title">微信小程序自助解包工具</div>
    <div class="tip">
      <div class="title">使用指南:</div>
      <el-card class="box-card" shadow="never">
        <div class="text item">
          1、首先准备好微信小程序的代码包，参见
          <el-link
            class="get-apk"
            @click="open('http://xuedingmiao.com/blog/xcx_unpack.html')"
            target="_blank"
            type="primary"
          >获取方法</el-link>
        </div>
        <div class="text item">2、上传想要解包的文件，暂未支持多选，仅支持微信小程序包(wxapkg文件)</div>
        <div class="text item">3、点击解包、在下方日志区查看解包执行过程，等待解包完成</div>
        <div class="text item">4、解包成功之后点击日志下方的下载按钮即可下载解包后文件的压缩包</div>
        <div class="text item">5、注意:并不是所有小程序包都可以反编译成功的</div>
      </el-card>
    </div>
    <el-upload
      class="upload-box"
      :limit="1"
      accept=".wxapkg"
      drag
      action="fakeaction"
      :file-list="files"
      :auto-upload="false"
      :on-change="upload"
      :disabled="useDefault"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将wxapkg文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        <el-checkbox v-model="useDefault">使用预置的测试用小程序包</el-checkbox>
      </div>
    </el-upload>
    <div class="btns">
      <el-button
        type="primary"
        :disabled="disabled"
        :loading="loading"
        round
        @click="unpack"
      >解包{{loading?'中...':''}}</el-button>
    </div>
    <div v-if="logs!=''" class="exec-logs">
      <div class="title">↓↓执行日志↓↓</div>
      <div class="logs" v-html="logs"></div>
    </div>
    <div v-if="end" class="btns">
      <el-button class="download" type="primary" plain @click="doExport">导出压缩包</el-button>
    </div>
  </div>
</template>

<script>
const fs = require('fs')
import { ipcRenderer, shell, clipboard } from 'electron'
const { dialog } = require('electron').remote
const { remote } = require('electron')
let configDir = remote.app.getPath('userData')
export default {
  data() {
    return {
      useDefault: false,
      loading: false,
      files: [],
      disabled: true,
      logs: '',
      name: '',
      end: 0
    }
  },
  watch: {
    useDefault(val) {
      this.disabled = !val
    }
  },
  mounted() {
    let that = this
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      if (arg === 0 || arg === 1) {
        that.end = 1
        that.disabled = false
        that.loading = false
        return
      }
      that.logs += arg + '<br>'
    })
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    upload(file, fileList) {
      if (file) {
        let type = file.name.substring(file.name.lastIndexOf('.') + 1)
        if (type !== 'wxapkg') {
          this.$message.error('请上传wxapkg文件')
          fileList.splice(fileList.findIndex(f => (f.name = file.name)), 1)
          return false
        }
        this.disabled = false
        this.name = file.name
        this.uploadFiles([
          {
            name: file.name,
            path: file.raw.path,
            type: file.raw.type
          }
        ])
        this.$message('已选择一个文件')
      }
    },
    uploadFiles(files) {
      ipcRenderer.send('file-upload', files[0])
    },
    unpack() {
      this.logs = ''
      this.disabled = true
      this.loading = true
      ipcRenderer.send('do-unpack', this.useDefault ? '' : this.name)
    },
    doExport() {
      ipcRenderer.send('do-export', this.useDefault ? '' : this.name)
      ipcRenderer.on('asynchronous-export', (event, arg) => {
        let folderName = configDir + arg.substr(0, arg.lastIndexOf('.'))
        dialog.showSaveDialog(
          {
            defaultPath: folderName + '.zip',
            title: '保存文件',
            buttonLabel: '导出',
            filters: [{ name: 'Custom File Type', extensions: ['zip'] }]
          },
          result => {
            if (result) {
              let zipFile = fs.readFileSync(arg)
              fs.writeFileSync(result, zipFile)
              this.$message('导出成功')
            }
            fs.unlink(arg, err => {
              if (err) throw err
              console.log('文件已被删除')
            })
            this.logs = ''
            this.end = 0
            this.useDefault = false
          }
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  padding: 0 20px;
  .title {
    text-align: center;
    font-weight: bold;
  }
  .tip {
    margin-top: 10px;
    font-size: 12px;
    padding: 15px 10px 5px 10px;
    background: #eee;
    border-radius: 4px;
    .title {
      text-align: left;
      color: #b9b9b9;
      font-weight: bold;
    }
    .box-card {
      background-color: transparent;
      /deep/ .el-card__body {
        padding: 10px 0;
      }
      .text {
        color: #b9b9b9;
      }
      .get-apk {
        font-size: 12px;
        margin-top: -3px;
      }
    }
  }
  .upload-box {
    margin-top: 15px;
    text-align: center;
  }
  .btns {
    margin-top: 15px;
    text-align: center;
  }
  .exec-logs {
    margin-top: 20px;
    font-size: 12px;
    .title {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .logs {
      height: 160px;
      overflow: auto;
    }
    .download {
      margin: 0 auto;
    }
  }
}
</style>
