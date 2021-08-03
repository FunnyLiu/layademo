export class MapCell {
    constructor(){
        this._nBkImgIdx = 0;   //背景层图片编号
        this._nFtImgIdx = 0;   //物体层图片编号
        this._nFtObjIdx = 0;   //物体层图片分类编号
        this._nFlags = 0;      //标识
        this._bkImg = null;   //地砖背景
    }
}