import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./styles/mainCanvas.scss";

class MainCanvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = undefined;

    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.controls = undefined;
  }

  componentDidMount() {
    // init three
    this.initThree();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // this.controls.update();
    this.renderer.render(this.scene, this.camera);
    // this.deltaTime = this.clock.getDelta();
    // this.time = this.clock.getElapsedTime();
    // this.physics.step(this.deltaTime);
  };

  initThree = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#d8d8d8");

    this.addCamera();
    
    // this.addControls();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.enableGridHelper();
    this.addLight();

    this.animate();
  };

  enableGridHelper = () => {
    const grid = new THREE.GridHelper(5, 10, "#000", "#9b9b9b");
    grid.material.opacity = 0.4;
    grid.material.transparent = true;
    this.scene.add(grid);
  };

  addControls = () => {
    this.controls = new OrbitControls(this.camera);
    this.controls.center.set(0, 1, 0);
  }

  addLight = () => {
    const dLight = new THREE.DirectionalLight(0xffffff, 3);
    dLight.position.set(1, 1, 1);
    const hemiLight = new THREE.HemisphereLight("#72a6f9", null, 1);
    this.scene.add(hemiLight);
    this.scene.add(dLight);
  };

  addCamera = () => {
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Change camera position
    this.camera.position.z = 3.6;
    this.camera.position.y = 0.5;
  };

  render() {
    return (
      <div className="canvas-wrapper">
        <canvas ref={(ref) => (this.canvas = ref)} />
      </div>
    );
  }
}

export default MainCanvas;
