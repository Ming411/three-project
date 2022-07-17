import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from './Experience';
export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    // 创建相机示例
    this.setInstance();
    this.setOrbitControls(); // 设置可以自由移动视角的相机
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true; // 添加移动时的阻尼感
  }
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    // 更新相机投影矩阵
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
  }
}
