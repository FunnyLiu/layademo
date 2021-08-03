import { ActionMessage } from "./ActionMessage";

export class Entity {
    constructor(){
        this.m_ActionMsgList = []//角色动作消息队列
        this.m_Type = null; //角色实体类型
        this.m_sEntityName = ''; //实体名称
        this.m_TextName = new Laya.TextInput(); //名字标签
        this.m_TextName.mouseEnabled = false;

        //名称标签
        this.m_TextName.font = 'SimSun';
        this.m_TextName.fontSize = 16;
        this.m_TextName.width =  Entity.DefaultHeight * 2;
        this.m_TextName.align = "center";
        this.m_TextName.color = "#ffffff";
        this.m_TextName.pos(-Entity.DefaultHeight / 2);

    }
    //投递动作消息
    PostActionMessage(nAction,Data)
    {
        let msg = new ActionMessage(nAction,Data);
        this.m_ActionMsgList.push(msg);
    }
    //设置实体名称
    SetEntityName(sName)
    {
        this.m_sEntityName = sName;
        this.m_TextName.text = this.m_sEntityName;
    }
}

Entity.DefaultHeight = 120;//默认身体宽度
Entity.DefaultWidth = 58;//默认身体高度