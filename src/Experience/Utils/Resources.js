// 该模块主要是用于加载资源  例如 纹理之类
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from './EventEmitter';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources; // 外界传入具体的资源路径

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }
  startLoading() {
    // 根据外界传递过来不同类型的文件进行不同的loader加载
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, file => {
          // file为加载成功的文件
          this.sourceLoaded(source, file);
        });
      }
    }
  }
  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      // 进入则表示所有资源加载完毕
      this.trigger('ready');
    }
  }
}
