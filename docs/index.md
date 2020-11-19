![image](https://raw.githubusercontent.com/xuedingmiaojun/mp-unpack/master/build/icons/256x256.png)  
基于electron-vue开发的微信小程序自助解包客户端  

#### 前置准备：利用模拟器获取小程序包

参考博主的原创文章  
> [以中银E路通小程序为例10分钟带你学会微信小程序的反编译](http://xuedingmiao.com/blog/xcx_unpack.html)

#### 逆向教程小程序
<img src="http://cdn.xuedingmiao.com/nxjc.jpg" alt="逆向教程" height="185" />  

#### 运行截图  

Mac  
<img src="https://raw.githubusercontent.com/xuedingmiaojun/mp-unpack/master/mp-unpack.png" alt="mac解包截图" width="420" />  

Windows  

<img src="https://raw.githubusercontent.com/xuedingmiaojun/mp-unpack/master/mp-unpack-win.png" alt="windows解包截图" width="420" />

#### 如何使用

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

``` bash
# Clone this repository
git clone https://github.com/xuedingmiaojun/mp-unpack.git
# Go into the repository
cd mp-unpack
# Install dependencies and run the app
npm install && cd tool/ && npm install 
```

To pack into an app, simply type one of these:

``` shell
npm run build
npm run build:mac
npm run build:linux
npm run build:win32
npm run build:win64
```

解包时源文件请使用wxapkg文件  

#### 公众号
<img src="https://raw.githubusercontent.com/xuedingmiaojun/mp-unpack/master/gzh.jpg" alt="公众号" height="110" />

#### [Download Released App](https://github.com/xuedingmiaojun/mp-unpack/releases)

#### License
[GNU General Public License v3.0](LICENSE)
