// 主入口文件
import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
let instance = null;
export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance; // 导出给外界使用
    }
    instance = this;

    window.experience = this; // 将其挂载到全局
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    // 创建场景
    this.scene = new THREE.Scene();
    // 创建相机
    this.camera = new Camera();
    // 创建渲染器
    this.renderer = new Renderer();
    this.world = new World();
    this.sizes.on('resize', () => {
      // 当屏幕大小改变需要做的事
      this.resize();
    });
    this.time.on('tick', () => {
      // 需要进行刷新操作的
      this.update();
    });
  }
  resize() {
    // 更新相机
    this.camera.resize();
    // 更新渲染器
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.renderer.update();
  }
}
