export class JoyStack extends Laya.Sprite {
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
