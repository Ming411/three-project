// fox模型相关操作
import * as THREE from 'three';
import Experience from '../Experience';

export default class Fox {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // 调试相关
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('fox');
    }

    this.resource = this.resources.items.foxModel;

    this.setModle();
    this.setAnimation();
  }
  setModle() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);

    // 因为是模型内部是由很多物体所组成，所以要全部制造阴影
    // traverse 会更新所有子集
    this.model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.animation.actions = {};
    // 通过GUI来控制动作
    this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
    this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1]);
    this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2]);

    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    // 动画交替时的处理
    this.animation.play = name => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, 1); // 1s 为过度时间
      this.animation.actions.current = newAction;
    };

    // debug
    if (this.debug.active) {
      const debugObject = {
        playIdle: () => {
          this.animation.play('idle');
        },
        playWalking: () => {
          this.animation.play('walking');
        },
        playRunning: () => {
          this.animation.play('running');
        }
      };
      this.debugFolder.add(debugObject, 'playIdle');
      this.debugFolder.add(debugObject, 'playWalking');
      this.debugFolder.add(debugObject, 'playRunning');
    }
  }
  update() {
    // 动画需要在自执行函数中更新
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
