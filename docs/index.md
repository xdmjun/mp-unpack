![image](https://raw.githubusercontent.com/xuedingmiaojun/mp-unpack/master/build/icons/256x256.png)  
基于electron-vue开发的微信小程序自助解包客户端  

#### 前置准备：利用模拟器获取小程序包

参考博主的原创文章  
> [以中银E路通小程序为例10分钟带你学会微信小程序的反编译](http://xuedingmiao.com/blog/xcx_unpack.html)

#### 逆向教程小程序
<img src="http://cdn.xuedingmiao.com/nxjc.jpg" alt="逆向教程" height="185" />  

#### [小程序逆向视频专栏](https://m.lizhiweike.com/channel2/1037814)
- 还是不知道怎么逆向？
- 遇到问题不会处理？  

快来试试作者匠心录制的视频系列课程吧~。  
- [人人都能学会的微信小程序逆向技能](https://m.lizhiweike.com/channel2/1037814)    

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

#### 项目推荐
[微信小程序多端实时运行工具](https://github.com/wetools/wept)
> WEPT项目从最近到后续即将升级WEPT2.0版本，支持运行微信小程序 小游戏基础库2.9后版本功能，同时支持实现ios Android三端统一运行环境，欢迎大家持续关注

- WEPT 是一个微信小程序实时开发环境，它的目标是为小程序开发提供高效、稳定、友好、无限制的运行环境。
- 项目后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service 层和控制层之间的相关通讯逻辑。
- 支持iOS Android Mac, Window 以及 Linux

#### 实现微信小程序最新运行环境

- [实现小程序编译和运行环境系列(一)](https://mp.weixin.qq.com/s/OjW7GYrNSq-5ojGC3Qa83g)
- [实现小程序编译和运行环境系列(二)](https://mp.weixin.qq.com/s/f6onZC8AWyqg7GL-e0pFXw)
- [实现小程序编译和运行环境系列(三)](https://mp.weixin.qq.com/s/p9xhv1wxhERAn3LlsFVxHA)
- [实现小程序编译和运行环境系列(四)](https://mp.weixin.qq.com/s/StENBEoEIl2_9PrQYl5xkg)
- [实现小程序编译和运行环境系列(五)](https://mp.weixin.qq.com/s/FMrmmAZoayld19WKW75hyQ)
- [实现小程序编译和运行环境系列(终)](https://mp.weixin.qq.com/s/go4imhKuAXv808c52UyiNg)
- [如何深入分析小程序运行原理？](https://mp.weixin.qq.com/s/ZbUFogydJ1d1wGKIjzc21Q)

#### License
[GNU General Public License v3.0](LICENSE)
