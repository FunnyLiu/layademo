import { Config } from "../const/config";

export class Player extends Laya.Sprite {
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

        this.init(opts)
    }
    init(opts){
        this.loadImage("Aliens/alienGreen_round.png", 0, 0, Config.node.WIDTH, Config.node.HEIGHT);

    }
    //切换方向
    changeDir(dir){
        console.log(`changeDir: ${dir}`)
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

        if(this.tarX <=0) {this.tarX = 0};
        if(this.tarY <=0) {this.tarY = 0};
        if(this.tarX >=(Config.screen.WIDTH-64)) {this.tarX = Config.screen.WIDTH-64}
        if(this.tarY >=(Config.screen.HEIGHT-64)) {this.tarY = Config.screen.HEIGHT-64}
        console.warn(`this.tarX:${this.tarX}`)
        console.warn(`this.tarY:${this.tarY}`)
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
}