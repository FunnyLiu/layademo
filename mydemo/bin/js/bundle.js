(function () {
  'use strict';

  const grid = {
    WIDTH: 64,
    HEIGHT: 64,
    BORDER_COLOR: "#000000",
    BORDER_WIDTH: 2,
    PADDING: 1, // 单元格碰撞体型修正, 如果为0, 相邻的格子也会发生碰撞
  };

  const screen = {
    WIDTH: grid.WIDTH * 16,
    HEIGHT: grid.HEIGHT * 16,
    COLOR: "#FFCC66",
  };

  // 节点
  const node = {
    WIDTH: 64,
    HEIGHT: 64,
    COLOR: "#000000",
  };
  // 方向枚举
  const dirs = {
    UP: 1,
    DOWN: -1,
    LEFT: 2,
    RIGHT: -2,
  };
  // 游戏状态机
  const gameMainFSM = {
    READY: 0,
    START: 1,
    PAUSE: 2,
    END: 3,
  };
  const Config = {
    grid,
    screen,
    node,
    dirs,
    gameMainFSM
  };

  class Background extends Laya.Sprite {
    constructor() {
      super();
      this.onStart();
    }
    onStart() {
      // 视图层
      var width = Config.screen.WIDTH;
      var height = Config.screen.HEIGHT;
      var grid_x_num = width / Config.grid.WIDTH;
      var grid_y_num = height / Config.grid.HEIGHT;
      var grid_width = Config.screen.WIDTH / grid_x_num;
      var grid_height = Config.screen.HEIGHT / grid_y_num;
      var grid_border_color = Config.grid.BORDER_COLOR;
      var grid_border_width = Config.grid.BORDER_WIDTH;
      // 绘制背景颜色
      this.graphics.drawRect(0, 0, width, height, Config.screen.COLOR);

      // 绘制方格
      for (var i = 0; i <= grid_x_num; i++) {
        this.graphics.drawLine(
          i * grid_width,
          0,
          i * grid_width,
          height,
          grid_border_color,
          grid_border_width
        );
      }
      for (var i = 0; i <= grid_y_num; i++) {
        this.graphics.drawLine(
          0,
          i * grid_height,
          width,
          i * grid_height,
          grid_border_color,
          grid_border_width
        );
      }
    }
    onEnable() {
      //点击开始游戏
      //这个变量是在编辑器里设置的，然后通过laya文件下的json来进行映射的
      console.warn('Background');
    }
  }

  class Camera {
    /**
     * @param {*关注的图层} node
     * @param {*摄像机宽度} width
     * @param {*摄像机高度} height
     */
    constructor(node, width, height) {
      this.node = node;
      this.width = width;
      this.height = height;
    }

    scrollTo(x, y) {
      this.node.x = Laya.MathUtil.lerp(this.node.x, -x + this.width / 2, 0.1);
      this.node.y = Laya.MathUtil.lerp(this.node.y, -y + this.height / 2, 0.1);
    }
  }

  class JoyStack extends Laya.Sprite {
    constructor() {
      super();
      //大圆
      this.moveMax = new Laya.Sprite();
      this.moveMax.size(320, 320);
      // this.moveMax.pivot(60, 60);
      this.moveMax.graphics.drawCircle(80, 80, 160, "white", "black", 2);
      //小圆点
      this.moveKey = new Laya.Sprite();
      this.moveKey.size(160, 160);
      // this.moveKey.pivot(20, 20);
      this.moveKey.graphics.drawCircle(80, 80, 80, "red");

      this.addChild(this.moveMax);
      this.addChild(this.moveKey);

      this.alpha = 0.5;

      //当前的舞台
      this.layer = null;
      //是否按下
      this.isDown = false;
      //是否弹起
      this.isUp = false;
      //是否移动
      this.isMove = false;
      this.init();
    }
    //初始化你预先设置的参数
    init() {
      // console.log('执行初始化');

      // console.log(this.moveKey, this, this.moveMax);
      this.moveKey.on(Laya.Event.MOUSE_DOWN, this, this.downFun);
      //记录一开始小圆点的位置，方便鼠标弹起的时候自动返回开始位置
      this.moveKey.mode = { x: this.moveKey.x, y: this.moveKey.y };
    }
    //按下事件
    downFun(e) {
      console.log("按下去了");
      this.isDown = true;
      this.starX = e.stageX;
      this.starY = e.stageY;
      //添加弹起和移动事件
      Laya.stage.on(Laya.Event.MOUSE_UP, this, this.upFun);
      Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.moveFun);
    }
    //弹起事件
    upFun () {
      console.log("弹起来了");

      this.isDown = false;
      this.isUp = false;
      this.isMove = false;
      this.isMode = "stop";
      this.angle = undefined;
      //移除弹起和移动事件
      Laya.stage.off(Laya.Event.MOUSE_UP, this, this.upFun);
      Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.moveFun);
      Laya.Tween.to(
        this.moveKey,
        { x: this.moveKey.mode.x, y: this.moveKey.mode.y },
        100
      );
    };
    //鼠标移动事件
    moveFun (e) {
      console.log("移动中");

      if (!this.isDown) return;
      this.moveX = e.stageX;
      this.moveY = e.stageY;

      this.isMode = "run";
      // 获取半径
      let r = Math.sqrt(
        Math.pow(this.starX - this.moveX, 2) +
          Math.pow(this.starY - this.moveY, 2)
      );

      //当移动半径大于大圆的半径时，半径等于大圆的0.5的宽度（也就是半径）
      if (r >= this.moveMax.width / 2) {
        r = this.moveMax.width / 2;
      }
      let angle = Math.atan2(this.moveY - this.starY, this.moveX - this.starX);
      let bottonX = Math.cos(angle) * r + this.starX + (this.moveMax.x - this.starX);
      let bottonY = Math.sin(angle) * r + this.starY + (this.moveMax.y - this.starY);
      this.moveKey.x = bottonX;
      this.moveKey.y = bottonY;
      // console.log(r, bottonX, bottonY)
      let degree = (angle * 180) / Math.PI + 180;
      //在this.con.backData(degree)方法里获取到degree的值也就是角度值，然后你可以自己判断任务方位
      //返回当前的一个方法
      this.angle = degree;
      // console.log(`startX:${this.starX},startY:${this.starY},moveX:${this.moveX},moveY:${this.moveY},半径:${r},角度${degree}`);
    };
  }

  class Player extends Laya.Sprite {
      constructor(opts){
          super();
          this.dir = opts.dir || Config.dirs.RIGHT;
          this.range = opts.range || 100;

          // 初始状态
          this.state = opts.state || Player.HeroState.PREPARE;
          
          // 到达目的地时进行dir = rdir
          this.rdir = Config.dirs.RIGHT;
          this.curX = opts.curX || 0;
          this.curY = opts.curY || 0;
          this.x = this.curX;
          this.y = this.curY;
          this.tarX = 0;
          this.tarY = 0;
          this.moveTween = undefined;

          this.init(opts);
      }
      init(opts){
          this.loadImage("Aliens/alienGreen_round.png", 0, 0, Config.node.WIDTH, Config.node.HEIGHT);

      }
      //切换方向
      changeDir(dir){
          console.log(`changeDir: ${dir}`);
          this.rdir = dir;
          this.move();
      }
      //移动
      move(){
          this.curX = this.tarX;
          this.curY = this.tarY;
          this.dir = this.rdir;
          switch(this.dir) {
              case Config.dirs.UP:
                  this.tarY = this.curY - 8;
                  break;
              case Config.dirs.DOWN:
                  this.tarY = this.curY + 8;
                  break;
              case Config.dirs.LEFT:
                  this.tarX = this.curX - 8;
                  break;
              case Config.dirs.RIGHT:
                  this.tarX = this.curX + 8;
                  break;
          }

          if(this.tarX <=0) {this.tarX = 0;};
          if(this.tarY <=0) {this.tarY = 0;};
          if(this.tarX >=(Config.screen.WIDTH-64)) {this.tarX = Config.screen.WIDTH-64;}
          if(this.tarY >=(Config.screen.HEIGHT-64)) {this.tarY = Config.screen.HEIGHT-64;}
          console.warn(`this.tarX:${this.tarX}`);
          console.warn(`this.tarY:${this.tarY}`);
          this.moveTween = Laya.Tween.to(this, {x: this.tarX, y: this.tarY}, 100, Laya.Ease.linearIn, null, 0);

      }
  }
  Player.HeroState = {
        // 准备中
        PREPARE: 0,
        // 可行动   
        ACTIONABLE: 1,
        // 晕眩
        STUN: 2
  };

  /**
   * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
   * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
   * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
   */
  class SecondUI extends Laya.Scene {
    constructor() {
      super();
      //设置单例的引用方式，方便其他类引用
      SecondUI.instance = this;
      //关闭多点触控
      Laya.MouseManager.multiTouchEnabled = false;
      //加载场景文件
      this.loadScene("secondScene.scene");
      this.bg = new Background();
      this.player = new Player({ dir: Config.dirs.RIGHT, curX: 200, curY: 200 });
      this.onStart();
    }
    onStart() {
      // 视图层
      this.view = new Laya.Sprite();
      this.addChild(this.view);

      this.view.addChild(this.bg);
      this.view.addChild(this.player);

      this.joyStick = new JoyStack();
      this.joyStick.pos(200, 300);
      //加到外层，相当于fixed
      this.addChild(this.joyStick);

      // 初始化摄像机
      //将view的场景，的x和y进行设置，就是摄像机的原理了。
      this.camera = new Camera(this.view, Laya.stage.width, Laya.stage.height);

      // 开始游戏循环
      Laya.timer.frameLoop(1, this, this.onLoop);

      this.addChild(this.getNextUIButton());
    }
    onEnable() {
      //点击开始游戏
      //这个变量是在编辑器里设置的，然后通过laya文件下的json来进行映射的
      console.warn("secondUI");
    }
    // 游戏循环
    onLoop() {
      // 查看joyStick的角度
      var angle = this.joyStick.angle;
      console.log(angle);
      if (angle) {
        if (angle >= 45 && angle < 135) {
          // 向上
          this.player.changeDir(Config.dirs.UP);
        } else if (angle >= 135 && angle < 225) {
          // 向右
          this.player.changeDir(Config.dirs.RIGHT);
        } else if (angle >= 225 && angle < 315) {
          // 向下
          this.player.changeDir(Config.dirs.DOWN);
        } else if ((angle >= 315 && angle <= 360) || (angle >= 0 && angle < 45)) {
          // 向左
          this.player.changeDir(Config.dirs.LEFT);
        }
      }

      // 摄像机锁定
      this.camera.scrollTo(this.player.x, this.player.y);

    }
    // 切换到下一个大场景
    getNextUIButton(){
      const btn = new Laya.Button("res/ui/button-1.png");
      btn.pos(800, 500);
  		return btn;
    }
  }

  /**
   * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
   * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
   * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
   */
  class FistUI extends Laya.Scene {
      constructor() {
          super();
          //设置单例的引用方式，方便其他类引用
          FistUI.instance = this;
          //关闭多点触控
          Laya.MouseManager.multiTouchEnabled = false;
          //加载场景文件
          this.loadScene("firstScene.scene");
      }

      onEnable() {
   
          //点击开始游戏
          //这个变量是在编辑器里设置的，然后通过laya文件下的json来进行映射的
          this.firstBtn.on(Laya.Event.CLICK, this, this.onBtnClick);
      }

      onBtnClick(e) {
          //场景切换
          //这种是层叠新增，不会覆盖
          // Laya.Scene.open('secondScene.scene')
          Laya.stage.replaceChild(new SecondUI(),this);
      }
  }

  /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

  class GameConfig {
      static init() {
          //注册Script或者Runtime引用
          let reg = Laya.ClassUtils.regClass;
  		reg("/pages/secondUI.js",SecondUI);
  		reg("/pages/firstUI.js",FistUI);
      }
  }
  GameConfig.width = 640;
  GameConfig.height = 1136;
  GameConfig.scaleMode ="fixedwidth";
  GameConfig.screenMode = "none";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "SecondScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;

  GameConfig.init();

  /**
   * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
   * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
   * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
   */
  class LoadUI extends Laya.Scene {
    constructor() {
      super();
      //设置单例的引用方式，方便其他类引用
      LoadUI.instance = this;
      //关闭多点触控
      Laya.MouseManager.multiTouchEnabled = false;
      Laya.loader.load(
        ["./res/ui/progressBar.png", "./res/ui/progressBar$bar.png"],
        Laya.Handler.create(this, this.onLoadBarComplete)
      );
    }
    /**
     * 进度条图片加载完成回调
     */
    onLoadBarComplete() {
      this.progressBar = new Laya.ProgressBar("./res/ui/progressBar.png");
      this.progressBar.width = 400;
      this.progressBar.x = (Laya.stage.width - this.progressBar.width) / 2;
      this.progressBar.y = Laya.stage.height / 2;
      this.progressBar.sizeGrid = "5,5,5,5";
      // progressBar.changeHandler = new Handler(this, onChange);
      Laya.stage.addChild(this.progressBar);
      // Laya.timer.loop(100, this, changeValue);
      this.startLoad();
    }

    /**
     * 开始正式加载资源
     */
    startLoad() {
      Laya.loader.load(
        ["./res/atlas/Aliens.atlas",
        "./res/ui/button-1.png",
        "./res/ui/button-2.png",
        "./res/ui/button-3.png",
        "./res/ui/button-4.png",
        "./res/ui/button-5.png",
        "./res/ui/button-6.png",
        "./res/ui/button-7.png"
      ],
        Laya.Handler.create(this, this.onAllLoaded),
        Laya.Handler.create(this, this.onPerLoaded, null, false)
      );
    }
  	/**
  	 * 资源全部加载完成后回调
  	 */
       onAllLoaded() {
  		console.log('加载完成,进入游戏');
  		Laya.stage.removeChild(this.progressBar);
  		Laya.stage.addChild(new FistUI());
  	}

  	/**
  	 * 每个资源加载完成后回调
  	 */
  	onPerLoaded(percent) {
  		this.progressBar.value = percent;
  		console.log('当前进度:' + percent);
  	}
  }

  class Main {
  	constructor() {
  		const Stage = Laya.Stage;
  		const Browser = Laya.Browser;
  		//根据IDE设置初始化引擎		
  		Laya.init(1136, 640, Laya["WebGL"]);
  		Laya["Physics"] && Laya["Physics"].enable();
  		Laya["DebugPanel"] && Laya["DebugPanel"].enable();

  		Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;

  		Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;

  	
  		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
  		Laya.stage.alignH = Stage.ALIGN_CENTER;
  		// 30帧
          Laya.stage.frameRate = "slow";
  		//背景色
  		// Laya.stage.bgColor = "#232628";

  		//兼容微信不支持加载scene后缀场景
  		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

  		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
  		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
  		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
  		if (GameConfig.stat) Laya.Stat.show();
  		Laya.alertGlobalError(true);

  		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
  		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
  	}

  	onVersionLoaded() {
  		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
  		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));

  		//加载背景音乐 ，不能自动播放，由于浏览器用户体验的限制
  		Laya.SoundManager.playMusic("res/sounds/bgm.mp3", 0, null);

  	}

  	onConfigLoaded() {
  		//加载IDE指定的场景
  		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
  		Laya.stage.addChild(new LoadUI());

  		// this.showText();
  	}
  	//展示文本
  	showText() {
  		const Text = Laya.Text;

  		let text = new Text();

  		text.text = "Orientation-Landscape";
  		text.color = "gray";
  		text.font = "Impact";
  		text.fontSize = 50;

  		text.x = Laya.stage.width - text.width >> 1;
  		text.y = Laya.stage.height - text.height >> 1;

  		Laya.stage.addChild(text);
  	}
  }
  //激活启动类
  new Main();

}());
