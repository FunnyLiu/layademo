import { Config } from "../const/config";

export default class Background extends Laya.Sprite {
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
