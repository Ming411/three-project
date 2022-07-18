// 主入口文件
import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import sources from './sources';
import Debug from './Utils/Debug';
let instance = null;
export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance; // 导出给外界使用
    }
    instance = this;

    window.experience = this; // 将其挂载到全局
    this.canvas = canvas;

    // 初始化
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    // 创建场景
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
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
    this.world.update();
    this.renderer.update();
  }
  destroy() {
    // 当页面销毁时，取消监听
    this.sizes.off('resize');
    this.time.off('tick');

    // 循环销毁mesh
    this.scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });
    // 销毁相机
    this.camera.controls.dispose();
    this.renderer.instance.dispose();
    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
