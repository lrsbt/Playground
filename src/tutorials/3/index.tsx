import * as dat from "dat.gui";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { FullScreen } from "@app/components";

import "./styles.css";
import info from "./info.md";

const settings = {
  xamp: 0.29,
  yamp: 0.51,
  addSin: 0,
  addCos: 0,
  delay: 300,
  curve: 20
};

const gui = new dat.GUI();

const Playground = () => {
  gui.add(settings, "xamp").min(-2).max(2).step(0.01);
  gui.add(settings, "yamp").min(-2).max(2).step(0.01);
  gui.add(settings, "addSin").min(0).max(10).step(0.01);
  gui.add(settings, "addCos").min(0).max(10).step(0.01);
  gui.add(settings, "delay").min(0).max(3000).step(1);
  gui.add(settings, "curve").min(0.5).max(20).step(0.001);

  const sine_cos_wave_plane = () => {
    const canvas = document.querySelector(".webgl");

    if (!canvas) return;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa8def0);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.y = 5;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.shadowMap.enabled = true;

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -40);
    controls.update();

    // AMBIENT LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // DIRECTIONAL LIGHT
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.x += 20;
    dirLight.position.y += 20;
    dirLight.position.z += 20;
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    const d = 25;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.position.z = -30;

    const target = new THREE.Object3D();
    target.position.z = -20;
    dirLight.target = target;
    dirLight.target.updateMatrixWorld();

    dirLight.shadow.camera.lookAt(0, 0, -30);
    scene.add(dirLight);
    scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

    const geometry = new THREE.PlaneGeometry(30, 30, 100, 100);
    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0xf2a23a,
        emissive: "red",
        specular: "white",
        shininess: 100,
        wireframe: false,
        side: THREE.DoubleSide
      })
    );
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = -Math.PI / 2;
    plane.position.z = -30;
    scene.add(plane);

    const count = geometry.attributes.position.count;

    // ANIMATE
    function animate() {
      const now = Date.now() / settings.delay;
      // const center = [
      //   geometry.attributes.position.getX(Math.floor(count / 2)),
      //   geometry.attributes.position.getY(Math.floor(count / 2))
      // ];
      // console.log(center);

      for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        let xSin = Math.sin(x + now) * settings.xamp;
        let yCos = Math.cos(y + now) * settings.yamp;

        if (settings.addSin) {
          xSin *= Math.sin(now * settings.addSin);
        }
        if (settings.addCos) {
          yCos *= Math.cos(now * settings.addCos);
        }

        const distanceToCenter = new THREE.Vector2(x, y).distanceTo(
          new THREE.Vector2(0, 0)
        );

        geometry.attributes.position.setZ(
          i,
          xSin * yCos + -distanceToCenter / settings.curve
        );
      }
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // Playground
    const playground = document.getElementsByClassName(
      "fullScreen--stretch"
    )?.[0];
    playground.appendChild(renderer.domElement);

    // RUN
    animate();

    // RESIZE HANDLER
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);
  };

  useEffect(() => {
    sine_cos_wave_plane();
  }, []);

  return (
    <FullScreen centerContent stretch info={info}>
      <canvas
        className="webgl"
        style={{ width: 300, height: 300 }}
        width={300}
        height={300}
      ></canvas>
    </FullScreen>
  );
};

export default Playground;
