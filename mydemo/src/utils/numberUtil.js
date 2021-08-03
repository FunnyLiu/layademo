/**
 * 将两个16位数据组合为一个32位数据
 * @param lo 低位
 * @param hi 高位
 * @return
 *
 */
function makeLong(lo, hi) {
  return (lo & 0xffff) | ((hi << 16) & 0xffff0000);
}

export { makeLong };
