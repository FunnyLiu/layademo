import { Config } from "../const/config";
import Background from "../logic/Background";
import { Camera } from "../logic/Camera";
import { JoyStack } from "../logic/JoyStack";
import { Player } from "../logic/Player";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class SecondUI extends Laya.Scene {
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
