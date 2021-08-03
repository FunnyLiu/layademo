class TLink {
  constructor() {
    this.node = null;
    this.next = null;
    this.nF = 0;
  }
}
export class MaskInfo {
  constructor() {
    this._nFlag = null;
    this._bType = 0;
  }
}
MaskInfo.MASK_FLAG_OPEN = 1;
MaskInfo.MASK_FLAG_CLOSE = 0;
MaskInfo.MASK_TYPE_MAP = 1;
MaskInfo.MASK_TYPE_MONSTER = 2;
export class MapPath {
  constructor(nWidth = 0, nHeight = 0) {
    this.m_nWidth = nWidth; //宽度
    this.m_nHeight = nHeight; //高度
    this.m_MapData = [];
    this.m_PassPoint = [];
    for (let i = 0; i < this.m_nWidth * this.m_nHeight; i++) {
      let pMaskInfo = new MaskInfo();
      pMaskInfo._nFlag = MaskInfo.MASK_FLAG_OPEN;
      pMaskInfo._bType = 0;
      this.m_MapData.push(pMaskInfo);
      this.m_PassPoint.push(0);
    }
    this.m_Queue = new TLink();
  }
  SetPointMaskByIndex(nIndex, nTag, nType) {
    this.m_MapData[nIndex]._bType = nType;
    this.m_MapData[nIndex]._nFlag = nTag;
  }
}
