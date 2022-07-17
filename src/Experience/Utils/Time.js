import EventEmitter from './EventEmitter';
export default class TIme extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0; // 过去的时间
    this.delta = 16; // 16为一般屏幕刷新一次所需的时间
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.trigger('tick'); // 触发每帧tick事件
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
