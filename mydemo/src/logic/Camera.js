export class Camera {
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
