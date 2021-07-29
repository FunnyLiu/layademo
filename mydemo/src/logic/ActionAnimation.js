export class ActionAnimation {
    constructor(nFrameStart = 0, nFrameCount = 0, nActionTime = 0) {
        this._nFrameStart = nFrameStart; //帧起始
        this._nFrameCount = nFrameCount; //帧数量
        this._nActionTime = nActionTime; //动作的周期时间，完成此动作所需要的时间
    }
}