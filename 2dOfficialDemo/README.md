
# 文件目录分层

``` bash
├── bin - 存放的是当前项目的输出文件,该目录用于存放项目中输出的js 、HTML、游戏资源等项目运行文件，以及小游戏项目文件（如果创建项目时勾选了小游戏快速调试选项时）。
默认layaAir调试或者chrome调试的时候，就是运行的该目录下的文件。
|  ├── fileconfig.json
|  ├── index.html
|  ├── index.js
|  ├── libs
|  |  ├── bytebuffer.js
|  |  ├── domparserinone.js
|  |  ├── laya.Alipaymini.js
|  |  ├── laya.ani.js
|  |  ├── laya.bdmini.js
|  |  ├── laya.bilimini.js
|  |  ├── laya.cannonPhysics.js
|  |  ├── laya.core.js
|  |  ├── laya.d3.js
|  |  ├── laya.debugtool.js
|  |  ├── laya.device.js
|  |  ├── laya.gltf.js
|  |  ├── laya.html.js
|  |  ├── laya.hwmini.js
|  |  ├── laya.particle.js
|  |  ├── laya.performancetool.js
|  |  ├── laya.physics.js
|  |  ├── laya.physics3D.js
|  |  ├── laya.physics3D.runtime.js
|  |  ├── laya.physics3D.wasm-wx.js
|  |  ├── laya.physics3D.wasm.js
|  |  ├── laya.physics3D.wasm.wasm
|  |  ├── laya.qqmini.js
|  |  ├── laya.quickgamemini.js
|  |  ├── laya.spine.js
|  |  ├── laya.tbmini.js
|  |  ├── laya.tbpluginmini.js
|  |  ├── laya.tiledmap.js
|  |  ├── laya.ttmini.js
|  |  ├── laya.ui.js
|  |  ├── laya.vvmini.js
|  |  ├── laya.wxmini.js
|  |  ├── laya.xmmini.js
|  |  ├── min
|  |  |  ├── bytebuffer.min.js
|  |  |  ├── domparserinone.min.js
|  |  |  ├── laya.Alipaymini.min.js
|  |  |  ├── laya.ani.min.js
|  |  |  ├── laya.bdmini.min.js
|  |  |  ├── laya.bilimini.min.js
|  |  |  ├── laya.cannonPhysics.min.js
|  |  |  ├── laya.core.min.js
|  |  |  ├── laya.d3.min.js
|  |  |  ├── laya.debugtool.min.js
|  |  |  ├── laya.device.min.js
|  |  |  ├── laya.gltf.min.js
|  |  |  ├── laya.html.min.js
|  |  |  ├── laya.hwmini.min.js
|  |  |  ├── laya.particle.min.js
|  |  |  ├── laya.performancetool.min.js
|  |  |  ├── laya.physics.min.js
|  |  |  ├── laya.physics3D.min.js
|  |  |  ├── laya.physics3D.runtime.min.js
|  |  |  ├── laya.physics3D.wasm-wx.min.js
|  |  |  ├── laya.physics3D.wasm.min.js
|  |  |  ├── laya.physics3D.wasm.wasm
|  |  |  ├── laya.qqmini.min.js
|  |  |  ├── laya.quickgamemini.min.js
|  |  |  ├── laya.spine.min.js
|  |  |  ├── laya.tbmini.min.js
|  |  |  ├── laya.tbpluginmini.min.js
|  |  |  ├── laya.tiledmap.min.js
|  |  |  ├── laya.ttmini.min.js
|  |  |  ├── laya.ui.min.js
|  |  |  ├── laya.vvmini.min.js
|  |  |  ├── laya.wxmini.min.js
|  |  |  ├── laya.xmmini.min.js
|  |  |  ├── spine-core-3.7.min.js
|  |  |  ├── spine-core-3.8.min.js
|  |  |  ├── worker.min.js
|  |  |  └── workerloader.min.js
|  |  ├── spine-core-3.7.js
|  |  ├── spine-core-3.8.js
|  |  ├── worker.js
|  |  └── workerloader.js
|  ├── prefab
|  |  ├── Bullet.json
|  |  └── DropBox.json
|  ├── res
|  |  └── atlas
|  |     ├── comp.atlas
|  |     ├── comp.png
|  |     ├── test.atlas
|  |     └── test.png
|  ├── sound
|  |  ├── destroy.wav
|  |  └── hit.wav
|  └── version.json
├── jsconfig.json
├── laya - 用于存放LayaAirIDE当前的UI项目。
|  ├── assets - 用来存放UI场景中所需的组件图片、音频文件等资源。
|  |  ├── comp
|  |  |  ├── btn_close.png
|  |  |  ├── button.png
|  |  |  ├── check_circle.png
|  |  |  ├── checkbox.png
|  |  |  ├── clip_num.png
|  |  |  ├── clip_tree_arrow.png
|  |  |  ├── clip_tree_folder.png
|  |  |  ├── colorPicker.png
|  |  |  ├── combobox.png
|  |  |  ├── fontClip.png
|  |  |  ├── fontClip_num.png
|  |  |  ├── hscroll$bar.png
|  |  |  ├── hscroll$down.png
|  |  |  ├── hscroll$up.png
|  |  |  ├── hscroll.png
|  |  |  ├── hslider$bar.png
|  |  |  ├── hslider.png
|  |  |  ├── html.png
|  |  |  ├── image.png
|  |  |  ├── img_bg.png
|  |  |  ├── img_bg2.png
|  |  |  ├── img_bg3.png
|  |  |  ├── img_bg4.png
|  |  |  ├── img_bg5.png
|  |  |  ├── img_blank.png
|  |  |  ├── label.png
|  |  |  ├── progress$bar.png
|  |  |  ├── progress.png
|  |  |  ├── radio.png
|  |  |  ├── radiogroup.png
|  |  |  ├── tab.png
|  |  |  ├── textarea.png
|  |  |  ├── textinput.png
|  |  |  ├── vscroll$bar.png
|  |  |  ├── vscroll$down.png
|  |  |  ├── vscroll$up.png
|  |  |  ├── vscroll.png
|  |  |  ├── vslider$bar.png
|  |  |  └── vslider.png
|  |  └── sound
|  |  |  ├── destroy.wav
|  |  |  └── hit.wav
|  ├── ignore.cfg
|  └── pages - 用来存放IDE中的场景、动画、预设等配置文件。
|     └── prefab
|     |  ├── Bullet.prefab
|     |  └── DropBox.prefab
├── libs - 目录下是layaAir引擎LayaAir.d.ts文件和wx.d.ts。用来代码提示，开发者假如有三方的类库使用，相关的.d.ts文件请放到这个目录下。 
|  ├── LayaAir.d.ts
|  ├── box2d.d.ts
|  ├── cannon.d.ts
|  ├── glsl.d.ts
|  ├── hbs.d.ts
|  ├── layaAir.minigame.d.ts
|  ├── spine-core-3.8.d.ts
|  ├── union.d.ts
|  └── wx.d.ts
└── src - 项目中的用到的源代码文件（TS语言项目是.ts文件），默认都存放在 src 目录下
   ├── GameConfig.js
   ├── Main.js
   ├── script
   |  ├── Bullet.js
   |  ├── DropBox.js
   |  ├── GameControl.js
   |  └── GameUI.js
   └── ui - 这里属于IDE自动生成的，开发者不要改动这里，改了也会被下次导出替换。所以该目录中不要存放自己的代码，也不要修改已有代码。
      └── layaMaxUI.js
```