// 单独渲染你想创建的世界
// import * as THREE from 'three';
import Experience from '../Experience';
import Environment from './Environment';
import Floor from './Floor';
import Fox from './Fox';
export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    /*  const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      // new THREE.MeshBasicMaterial({wireframe: true})
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh); */

    // 监听资源加载完毕的事件
    this.resources.on('ready', () => {
      this.floor = new Floor(); // 加载地板
      this.environment = new Environment(); // 初始化场景环境
      this.fox = new Fox();
    });
  }
  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
