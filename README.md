# mp-unpack

基于electron-vue开发的微信小程序自助解包客户端  
> 方便没有技术基础的同学轻松进行小程序的反编译

#### 使用模拟器获取小程序包

参考博主的原创文章  
> [以中银E路通小程序为例10分钟带你学会微信小程序的反编译](http://xuedingmiao.com/blog/xcx_unpack.html)

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
npm run build:mac
npm run build:linux
npm run build:win32
npm run build:win64
```

#### [Download Released App](https://github.com/xuedingmiaojun/mp-unpack/releases)

#### License [MIT](LICENSE.md)