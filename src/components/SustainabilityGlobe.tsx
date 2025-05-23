
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SustainabilityGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create globe geometry
    const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x4CAF50,
      shininess: 20,
      transparent: true,
      opacity: 0.9,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x8BC34A,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.3,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add floating rings
    const ringGeometry = new THREE.RingGeometry(2.8, 3, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x2196F3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const ring2Geometry = new THREE.RingGeometry(3.2, 3.4, 32);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0xFFC107,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 4;
    scene.add(ring2);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 6;

    // Animation
    let animationFrameId: number;
    const animate = () => {
      globe.rotation.y += 0.005;
      ring.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
