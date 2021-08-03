import { Config } from "../const/config";

export class Player2 extends Laya.Animation {
  constructor(opts) {
    super();

    this.curX = opts.curX || 0;
    this.curY = opts.curY || 0;
    this.x = this.curX;
    this.y = this.curY;
    this.tarX = 0;
    this.tarY = 0;
    this.moveTween = undefined;
    this.girlAni = undefined;
    this.status = Config.playerStatus.IDLE;
    this.init(opts);
  }
  init(opts) {
    this.loadAtlas(
      "res/atlas/girl.atlas",
      Laya.Handler.create(this, this.girlOnLoad),
      "girlRight"
    );
    this.loadAtlas(
      "res/atlas/girlRight.atlas",
      Laya.Handler.create(this, this.girlOnLoad),
      "girlLeft"
    );
    //加载普通角色
    // this.loadImage(
    //   "Aliens/alienGreen_round.png",
    //   0,
    //   0,
    //   Config.node.WIDTH,
    //   Config.node.HEIGHT
    // );
  }
  //
  girlOnLoad() {
    this.interval = 80;
    this.play();
    this.stop();
  }
  playAnimate() {
      if(this.status === Config.playerStatus.RIGHT){
          this.loadAtlas("res/atlas/girl.atlas").play();
      }else{
        this.loadAtlas("res/atlas/girlRight.atlas").play();
      }
  }
  //移动
  move(x, y) {
    //清除上一次的移动轨迹
    if (this.moveTween) {
      this.moveTween.clear();
      this.moveTween = undefined;
    }

    const moveX = 1136 / 2 - (1136 - x);
    const moveY = 640 / 2 - (640 - y);

    //设置移动方向
    if(moveX>0){
        this.status = Config.playerStatus.RIGHT;
    }else{
        this.status = Config.playerStatus.LEFT;
    }
    this.playAnimate();
    //用x是为了中断上一次动画时，x是准确的。
    this.tarX = this.x + moveX;
    this.tarY = this.y + moveY;
    console.log(
      `tarX:${this.tarX},tarY:${this.tarY},curX:${this.curX},curY:${
        this.curY
      },x:${x},y:${y},moveX:${moveX},moveY:${moveY}`
    );
    //计算位移
    const displacement = Math.sqrt(moveX * moveX + moveY * moveY);
    const animateTime = 5 * displacement;
    this.moveTween = Laya.Tween.to(
      this,
      { x: this.tarX, y: this.tarY },
      animateTime,
      Laya.Ease.linearIn,
      Laya.Handler.create(this, this.stop),
      0,
      true
    );
  }
}
