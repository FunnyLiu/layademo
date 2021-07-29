import { HumanAction } from "./logic/HumanAction";

export class LogicManager {
  constructor() {
    if (typeof LogicManager.instance === "object") {
        return LogicManager.instance;
      }
      LogicManager.instance = this;
      return this;
  }
  Init() {
    HumanAction.Init();  //初始化角色动作帧信息
  }
}