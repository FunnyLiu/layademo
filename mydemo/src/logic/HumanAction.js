import { ActionAnimation } from "./ActionAnimation";

export class HumanAction {
//   static HAIdle = null;
//   static HAMove = null; //
//   static HARUN = null; //跑步
//   static HAHit = null; //普通攻击动作
//   static HAReadyAttack = null; //攻击停顿
//   static HASpell = null; //施法

  static Init() {
    HumanAction.HAIdle = new ActionAnimation(0, 8, 2400);
    HumanAction.HAMove = new ActionAnimation(64, 8, 560);
    HumanAction.HARUN = new ActionAnimation(128, 12, 660);
    HumanAction.HAHit = new ActionAnimation(232, 7, 600);
    HumanAction.HAReadyAttack = new ActionAnimation(224, 1, 600);
    HumanAction.HASpell = new ActionAnimation(288, 6, 600);
  }
  /**
   * 根据类型和方向获取对应的动作
   * @param type
   * @return
   *
   */

  static GetDirActionByType(type) {
    switch (type) {
      case StandardActions.SA_IDLE: {
        return HumanAction.HAIdle;
      }
      case StandardActions.SA_WALK: {
        return HumanAction.HAMove;
      }
      case StandardActions.SA_RUN: {
        return HumanAction.HARUN;
      }
      case StandardActions.SA_NORMHIT:
      case StandardActions.SA_HIT1: {
        return HumanAction.HAHit;
      }
      case StandardActions.SA_READY_ATTACK: {
        return HumanAction.HAReadyAttack;
      }
      case StandardActions.SA_SPELL: {
        return HumanAction.HASpell;
      }
    }
    return null;
  }
}
