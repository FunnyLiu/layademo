import FirstUI from "./firstUI";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class LoadUI extends Laya.Scene {
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
		Laya.stage.addChild(new FirstUI());
	}

	/**
	 * 每个资源加载完成后回调
	 */
	onPerLoaded(percent) {
		this.progressBar.value = percent;
		console.log('当前进度:' + percent);
	}
}
