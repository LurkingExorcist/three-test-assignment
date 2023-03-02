import "./assets/style/main.scss";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";

import { mainCamera, renderer } from "./lib";
import { MainScene } from "./scenes";

const composer = new EffectComposer(renderer);

const controls = new OrbitControls(mainCamera, renderer.domElement);
const mainScene = new MainScene();

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  composer.render();
}

mainScene.init().then((scene) => {
  const ssrPass = new SSRPass({
    renderer,
    scene,
    camera: mainCamera,
    width: innerWidth,
    height: innerHeight,
    groundReflector: null,
    selects: scene.ssrSelects,
  });

  composer.addPass(ssrPass);
  composer.addPass(new ShaderPass(GammaCorrectionShader));

  animate();
});

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function onWindowResize() {
  mainCamera.aspect = window.innerWidth / window.innerHeight;
  mainCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
