import { makeLong } from "../utils/numberUtil";
import { MapCell } from "./MapCell";
import { MapPath, MaskInfo } from "./MapPath";
import { Player } from "./Player";

export class Map {
  constructor() {
    //地图所有层的显示容器
    this.m_MapLayerRoot = new Laya.Sprite();
    //作为背景层图像的容器
    this.m_Ground = new Laya.Sprite();
    this.m_MapLayerRoot.addChild(this.m_Ground);
    //作为地图显示对象（物品、人物、NPC）等的容器
    this.m_Object = new Laya.Sprite();
    this.m_MapLayerRoot.addChild(this.m_Object);

    this.m_sMapName = ""; //地图名称
    this.m_nMapID = ""; //地图ID
    this.m_szMapFile = ""; //地图路径

    this.m_nWidth = 0; //地图宽度
    this.m_nHeight = 0; //地图高度

    this.m_nWidthPixel = 0; //地图宽度(像素)
    this.m_nHeightPixel = 0; //地图高度(像素)

    this.m_Cells = []; //地图坐标据表，内存布局方式为ROW - COL

    this.m_MapPath; //A星寻路

    this.m_MoveTargetPos = null; //移动的目的地坐标，为null表示当前不在移动中

    this.m_nCurrentX = 0; //当前X坐标
    this.m_nCurrentY = 0; //当前Y坐标

    this.m_nShowContentX = 0; //当前地图显示内容的中心的X坐标
    this.m_nShowContentY = 0; //当前地图显示内容的中心的Y坐标

    this.m_nDisplayCenterX = 0; //显示区域中心的X像素位置
    this.m_nDisplayCenterY = 0; //显示区域中心的Y像素位置

    this.m_nLayersOffsetX = 0; //除背景外的各个层的微偏移量X（可做场景震动效果）
    this.m_nLayersOffsetY = 0; //除背景外的各个层的微偏移量Y（可做场景震动效果）

    this.m_nDisplayWidth = 0; //地图显示区域的像素宽度
    this.m_nDisplayHeight = 0; //地图显示区域的像素高度

    this.m_nDisplayCenterX = 0; //显示区域中心的X像素位置
    this.m_nDisplayCenterY = 0; //显示区域中心的Y像素位置
  }
  Init() {}
  //加载地图
  LoadMap(szMapFile, szMapName, nMapId) {
    this.m_sMapName = szMapName;
    this.m_nMapID = nMapId;
    this.m_szMapFile = szMapFile;
    let assat = [];
    assat.push({
      url: "data/" + szMapFile,
      type: Laya.Loader.BUFFER,
    });
    Laya.loader.load(assat, Laya.Handler.create(this, this.OnLoadMap));
  }

  //清除地图格子数据
  ClearMapData() {
    this.m_Cells = [];
  }
  Load(bytes) {
    bytes.endian = "littleEndian";
    //读取文件标识
    let uval = bytes.getUint32();
    if (uval != 0x00504d57) {
      console.error("非有效地图文件头");
    }
    //读取文件版本
    uval = bytes.getUint32();
    if (uval != 0x000a0302) {
      console.error("地图文件有效，但不是可使用的地图版本");
    }

    //读取宽度和高度
    let nWidth = bytes.getInt32();
    let nHeight = bytes.getInt32();
    bytes.pos += 48; //跳过48个保留字节

    //解压地图数据段的字节流
    let data = new Laya.Byte();
    data.endian = bytes.endian;
    data.writeArrayBuffer(bytes.__getBuffer(), bytes.pos);
    bytes = null;
    data.pos = 0;
    let zip = new Zlib.Inflate(new Uint8Array(data.__getBuffer()));
    let buff = zip.decompress();
    bytes = new Laya.Byte(buff);

    this.m_nWidth = nWidth;
    this.m_nHeight = nHeight;
    this.m_nWidthPixel = this.m_nWidth * Map.MAPCELLUNITWIDTH;
    this.m_nHeightPixel = this.m_nHeight * Map.MAPCELLUNITHEIGHT;
    this.ClearMapData();
    if (this.m_MapPath != null) {
      this.m_MapPath.Destory();
      this.m_MapPath = null;
    }
    this.m_MapPath = new MapPath(this.m_nWidth, this.m_nHeight);
    for (let i = 0; i < this.m_nWidth * this.m_nHeight; i++) {
      let cell = new MapCell();
      let tempBk = bytes.getUint16();
      cell._nFtImgIdx = bytes.getUint16();
      cell._nFlags = bytes.getUint16();
      cell._nFtObjIdx = bytes.getByte();
      let temp = bytes.getByte();
      cell._nBkImgIdx = makeLong(tempBk, temp);
      this.m_Cells.push(cell);
      if ((cell._nFlags & Map.CELLFLG_UNMOVEABLE) != 0) {
        this.m_MapPath.SetPointMaskByIndex(
          i,
          MaskInfo.MASK_FLAG_CLOSE,
          MaskInfo.MASK_TYPE_MAP
        );
      }
    }
  }
  //完成地图加载
  OnLoadMap() {
    let data = Laya.loader.getRes("data/" + this.m_szMapFile);
    let bytes = new Laya.Byte(data);
    this.Load(bytes);
    let pPlayer = new Player();
    this.SetCurrentPosition(100, 100);
    // this.SetCurrentPosition(pPlayer.GetCurentX(), pPlayer.GetCurrentY());
  }
  /**
   *设置当前中心位置的X和Y坐标
   * @param x
   * @param y
   *
   */
  SetCurrentPosition(x, y) {
    if (x < 0 || y < 0 || x >= this.m_nWidth || y >= this.m_nHeight) {
      return;
    }
    if (this.m_nCurrentX == x && this.m_nCurrentY == y) return;
    this.m_nCurrentX = x;
    this.m_nCurrentY = y;

    //更新地图显示内容
    this.ShowMapContent(x, y);
  }
  /**
   * 以x,y为中心坐标刷新地图显示内容
   * @param x
   * @param y
   *
   */
  ShowMapContent(x, y) {
    //检查小地图的显示区域是否需要更新
    // this.CheckCopyMinimap( x, y );
    //重新计算和分布地图显示区域
    this.RebuildDisplayArea(x, y);
    //更新地图各个层在displayContainer中的位置
    //注意由于坐标是自左向右和自上向下为轴向，所以此处应当采用x和y坐标的负值
    this.SetLayersPosition(
      -x * Map.MAPCELLUNITWIDTH,
      -y * Map.MAPCELLUNITHEIGHT
    );
    //保存显示更新坐标
    this.m_nShowContentX = x;
    this.m_nShowContentY = y;
  }
  /**
   *	重新构建地图当前的显示区域
   *	包括背景层和建筑层
   *
   */
  RebuildDisplayArea(x, y) {
    //删除超出显示区域的地砖图片和物体图片
    this.RemoveOutOfDisplaySizeImages(x, y);
    //重新铺设显示区域内的地转和物体
    this.ReDistributeMapLayers(x, y);
  }
  /**
   * 计算以x,y为中心的地图内容显示区域范围
   * @param x
   * @param y
   * @return
   *
   */
  CalcMapContentRange(x, y) {
    let result = new Common.Rectangle();

    result._nX = x - this.m_nHCellCount - this.MAPTILEHBLOCK;
    result._nY =
      y -
      this.m_nVCellCount -
      this.MAPTILEVBLOCK -
      CustomRenderMap.MAP_VERTICAL_OFFSET_COORD;
    result._nRight = x + this.m_nHCellCount + this.MAPTILEHBLOCK;
    result._nBottom =
      y +
      this.m_nVCellCount +
      this.MAPTILEVBLOCK -
      CustomRenderMap.MAP_VERTICAL_OFFSET_COORD;

    if (result._nX < 0) result._nX = 0;
    if (result._nY < 0) result._nY = 0;
    //由于地表层的铺设在地图编辑器中规定为必须铺设在X为MAPTILEHBLOCK的倍数，Y为MAPTILEVBLOCK倍数的位置上
    //所以为了避免显示区域的起始位置不在MAPTILEHBLOCK或MAPTILEVBLOCK的整倍数上而造成边沿区域没有图像的情况，
    //固应当将left和top都对分别对齐到MAPTILEHBLOCK和MAPTILEVBLOCK的整倍数上
    result._nX -= result._nX % this.MAPTILEHBLOCK;
    result._nY -= result._nY % this.MAPTILEVBLOCK;
    if (result._nRight >= this.m_nWidth) result._nRight = this.m_nWidth - 1;
    if (result._nBottom >= this.m_nHeight) result._nBottom = this.m_nHeight - 1;

    return result;
  }
  /**
   *从某个DisplayObjectContainer中移除超出显示范围的Image
   *
   */
  RemoveOutOfDisplaySizeImages(x, y) {
    //计算出当前显示区域的显示的坐标范围
    var range = this.CalcMapContentRange(x, y);
    let left = range._nX;
    let top = range._nY;
    let right = range._nRight;
    let bottom = range._nBottom;
    //将坐标转化为像素
    left *= Map.MAPCELLUNITWIDTH;
    top *= Map.MAPCELLUNITHEIGHT;
    right *= Map.MAPCELLUNITWIDTH;
    bottom *= Map.MAPCELLUNITHEIGHT;
    //删除地表层中x或y超出显示范围的显示对象
    //注意必须是降序循环，因为有删除操作
    for (let i = this.m_Ground.numChildren - 1; i > -1; --i) {
      let img = this.m_Ground.getChildAt(i);
      if (
        img &&
        (img.x < left || img.y < top || img.x > right || img.y > bottom)
      ) {
        this.m_Ground.removeChildAt(i);
        let cell = this.m_Cells[
          (img.y / Map.MAPCELLUNITHEIGHT) * this.m_nWidth +
            img.x / CustomMap.MAPCELLUNITWIDTH
        ];
        if (cell._bkImg == img) {
          cell._bkImg = null;
        } else {
          throw new Error("removeOutOfDisplaySizeImages::cell.bkImg != img");
        }
      }
    }
  }
  /**
   * 移动地图所有层
   * @param x	水平方向的像素坐标
   * @param y	竖直方向的像素坐标
   *
   */
  SetLayersPosition(x, y) {
    this.m_MapLayerRoot.x = x + this.m_nDisplayCenterX + this.m_nLayersOffsetX;
    if (Map.CANMOVETOEDGE) {
      if (this.m_MapLayerRoot.x > 0) this.m_MapLayerRoot.x = 0;
      else if (
        this.m_MapLayerRoot.x <
        this.m_nDisplayWidth - this.m_nWidthPixel
      )
        this.m_MapLayerRoot.x = this.m_nDisplayWidth - this.m_nWidthPixel;
    }

    this.m_MapLayerRoot.y = y + this.m_nDisplayCenterY + this.m_nLayersOffsetY;
    if (CustomRenderMap.CANMOVETOEDGE) {
      if (this.m_MapLayerRoot.y > 0) this.m_MapLayerRoot.y = 0;
      else if (
        this.m_MapLayerRoot.y <
        this.m_nDisplayHeight - this.m_nHeightPixel
      )
        this.m_MapLayerRoot.y = this.m_nDisplayHeight - this.m_nHeightPixel;
    }
  }
}

Map.MAPCELLUNITWIDTH = 48; //地图每个坐标所占横向像素大小
Map.MAPCELLUNITHEIGHT = 32; //地图每个坐标所占纵向像素大小
Map.CELLFLG_UNMOVEABLE = 0x8000;
Map.CANMOVETOEDGE = true; //主角是否支持边缘移动
