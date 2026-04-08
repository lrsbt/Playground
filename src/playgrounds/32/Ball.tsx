import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Trail } from "@react-three/drei";

import type { Mesh, MeshBasicMaterial } from "three";
import { COURT, PHYSICS } from "./const";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const Ball = () => {
  const ballRef = useRef<Mesh | null>(null);
  const shadowRef = useRef<Mesh | null>(null);
  const velocity = useRef([2, 3, 8]);
  const playbackspeed = useRef(1).current;

  const r = 0.06;

  useFrame((_, delta) => {
    const ball = ballRef.current;
    const shadow = shadowRef.current;
    if (!ball || !shadow) return;

    const d = delta / playbackspeed;

    // Gravity
    velocity.current[1] += PHYSICS.gravity * d;

    // Move
    ball.position.x += velocity.current[0] * d;
    ball.position.y += velocity.current[1] * d;
    ball.position.z += velocity.current[2] * d;

    // Move Shadow
    shadow.position.x = ball.position.x;
    shadow.position.z = ball.position.z;
    shadow.scale.x = 0.4 + ball.position.y / 4;
    shadow.scale.y = 0.4 + ball.position.y / 4;
    shadow.scale.z = 0.4 + ball.position.y / 4;

    const mat = shadow.material as MeshBasicMaterial;
    mat.opacity = clamp(1 - ball.position.y / 3, 0, 0.1);

    // Floor
    if (ball.position.y < r) {
      ball.position.y = clamp(ball.position.y, r, COURT.height - r);
      velocity.current[1] *= -PHYSICS.restitution.floor;
      // floor friction
      velocity.current[0] *= 0.86;
      velocity.current[2] *= 0.86;
    }

    // Ceiling
    if (ball.position.y > COURT.height - r) {
      ball.position.y = clamp(ball.position.y, r, COURT.height - r);
      velocity.current[1] *= -PHYSICS.restitution.ceiling;
    }

    // Left / Right walls
    if (
      ball.position.x > COURT.width / 2 - r ||
      ball.position.x < -COURT.width / 2 + r
    ) {
      ball.position.x = clamp(
        ball.position.x,
        -COURT.width / 2 + r,
        COURT.width / 2 - r,
      );

      velocity.current[0] *= -PHYSICS.restitution.wall;
    }

    // Front / Back walls
    if (
      ball.position.z > COURT.length / 2 - r ||
      ball.position.z < -COURT.length / 2 + r
    ) {
      ball.position.z = clamp(
        ball.position.z,
        -COURT.length / 2 + r,
        COURT.length / 2 - r,
      );

      velocity.current[2] *= -PHYSICS.restitution.wall;
    }

    // Air drag
    velocity.current[0] *= PHYSICS.drag;
    velocity.current[1] *= PHYSICS.drag;
    velocity.current[2] *= PHYSICS.drag;

    // Sleep check
    const [vx, vy, vz] = velocity.current;

    if (
      ball.position.y <= r + 0.001 && // only when on floor
      Math.abs(vx) < PHYSICS.sleepThreshold &&
      Math.abs(vy) < PHYSICS.sleepThreshold &&
      Math.abs(vz) < PHYSICS.sleepThreshold
    ) {
      velocity.current[0] = 0;
      velocity.current[1] = 0;
      velocity.current[2] = 0;

      ball.position.y = r; // snap cleanly to floor
    }
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;

      if (ballRef.current) {
        ballRef.current.position.x = Math.random() + 1;
        ballRef.current.position.y = 2;
        ballRef.current.position.z = 3;
      }

      velocity.current[0] = -(Math.random() + 2);
      velocity.current[1] = 8;
      velocity.current[2] = -(Math.random() * 6 + 11);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Trail width={0.2} length={3} color="cyan">
        <mesh ref={ballRef} position={[0, 1, 0]} castShadow>
          <sphereGeometry args={[r, 32, 32]} />
          <meshStandardMaterial color="black" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh
          ref={shadowRef}
          position={[0, 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.12, 32]} />
          <meshBasicMaterial color="black" transparent opacity={0.3} />
        </mesh>
      </Trail>
    </>
  );
};

export { Ball };
