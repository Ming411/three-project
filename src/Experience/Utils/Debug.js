// 调试相关
import * as dat from 'dat.gui';

export default class Debug {
  constructor() {
    // 通过判断url中的hash值来控制调试组件的显示
    this.active = window.location.hash === '#debug';
    if (this.active) {
      this.ui = new dat.GUI();
    }
  }
}
