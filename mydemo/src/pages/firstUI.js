import SecondUI from "./secondUI";

/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class FistUI extends Laya.Scene {
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
        Laya.stage.replaceChild(new SecondUI(),this)
    }
}