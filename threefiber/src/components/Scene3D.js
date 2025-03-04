import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Scene3D() {
  return (
    <div className="w-screen h-screen">
      <Canvas style={{ width: "1920px", height: "1080px" }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Cube />
      </Canvas>
    </div>
  );
}

// Cube simple
function Cube() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// Contrôle caméra FPS (WASD + souris)
function CameraController() {
  const { camera } = useThree();
  const speed = 0.1;
  const rotationSpeed = 0.002;
  const keys = useRef({});
  const euler = useRef(new THREE.Euler(0, 0, 0, "YXZ"));

  // Détection des touches clavier
  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.code] = true);
    const handleKeyUp = (e) => (keys.current[e.code] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Détection de la souris pour rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (document.pointerLockElement) {
        euler.current.y -= e.movementX * rotationSpeed;
        euler.current.x -= e.movementY * rotationSpeed;
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x)); // Limite verticale
        camera.quaternion.setFromEuler(euler.current);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  // Gérer les mouvements WASD
  useFrame(() => {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0));

    if (keys.current["KeyW"]) camera.position.addScaledVector(direction, speed);
    if (keys.current["KeyS"]) camera.position.addScaledVector(direction, -speed);
    if (keys.current["KeyD"]) camera.position.addScaledVector(right, speed);
    if (keys.current["KeyA"]) camera.position.addScaledVector(right, -speed);
  });

  // Activer le mode FPS avec click
  useEffect(() => {
    const enablePointerLock = () => document.body.requestPointerLock();
    document.body.addEventListener("click", enablePointerLock);
    return () => document.body.removeEventListener("click", enablePointerLock);
  }, []);

  return null;
}
