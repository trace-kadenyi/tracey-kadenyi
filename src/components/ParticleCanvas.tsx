"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene setup ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particles ────────────────────────────────────────────
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = 0;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0x00a8ff,
      size: 0.015,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Connection lines ─────────────────────────────────────
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(count * count * 6);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00a8ff,
      transparent: true,
      opacity: 0.04,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // ── Mouse tracking ───────────────────────────────────────
    const mouse = new THREE.Vector2(9999, 9999);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ── Resize handler ───────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Animation loop ───────────────────────────────────────
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array as Float32Array;
      const connectionPositions: number[] = [];
      const threshold = 1.2;

      // Move particles + mouse repulsion
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i3];
        pos[i3 + 1] += velocities[i3 + 1];

        // Wrap edges
        if (pos[i3] > 5) pos[i3] = -5;
        if (pos[i3] < -5) pos[i3] = 5;
        if (pos[i3 + 1] > 5) pos[i3 + 1] = -5;
        if (pos[i3 + 1] < -5) pos[i3 + 1] = 5;

        // Mouse influence
        const mx = mouse.x * 3;
        const my = mouse.y * 3;
        const dx = pos[i3] - mx;
        const dy = pos[i3 + 1] - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.5) {
          const force = (1.5 - dist) / 1.5;
          pos[i3] += dx * force * 0.015;
          pos[i3 + 1] += dy * force * 0.015;
        }
      }

      // Draw connection lines between nearby particles
      // Only check a subset each frame for performance
      for (let i = 0; i < count; i += 2) {
        const i3 = i * 3;
        for (let j = i + 1; j < count; j += 2) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < threshold) {
            connectionPositions.push(
              pos[i3],
              pos[i3 + 1],
              pos[i3 + 2],
              pos[j3],
              pos[j3 + 1],
              pos[j3 + 2],
            );
          }
        }
      }

      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(connectionPositions, 3),
      );

      geometry.attributes.position.needsUpdate = true;

      // Slow rotation
      particles.rotation.z += 0.0003;
      lines.rotation.z += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
