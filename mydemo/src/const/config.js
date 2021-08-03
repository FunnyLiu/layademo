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
export {
    Config
}