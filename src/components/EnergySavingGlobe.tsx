
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EnergySavingGlobe() {
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

    // Create globe geometry with eco-friendly green color
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x4CAF50,
      shininess: 20,
      transparent: true,
      opacity: 0.9,
      map: createGlobeTexture(),
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x8BC34A,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.3,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add floating energy efficiency indicators
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 200;
    const posArray = new Float32Array(particlesCnt * 3);
    
    for(let i = 0; i < particlesCnt * 3; i++) {
      // Create a distribution that favors points near the globe's surface
      const radius = 2.5 + (Math.random() * 2);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // x
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      posArray[i * 3 + 2] = radius * Math.cos(phi);                  // z
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create particles material with different colors
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.07,
      color: 0x2196F3,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add data flow lines
    const flowLinesGroup = new THREE.Group();
    scene.add(flowLinesGroup);

    for (let i = 0; i < 15; i++) {
      const startPoint = getRandomPointOnSphere(2.05);
      const endPoint = getRandomPointOnSphere(2.05);
      const points = [];
      
      // Create a curve between points
      const curvePoints = 20;
      for (let j = 0; j <= curvePoints; j++) {
        const t = j / curvePoints;
        
        // Create a slight arc between points
        const midPoint = new THREE.Vector3().lerpVectors(startPoint, endPoint, 0.5);
        const elevationFactor = 0.5;
        midPoint.normalize().multiplyScalar(2.05 + elevationFactor);
        
        // Interpolate along the arc
        const pt = new THREE.Vector3();
        if (j < curvePoints / 2) {
          pt.lerpVectors(startPoint, midPoint, t * 2);
        } else {
          pt.lerpVectors(midPoint, endPoint, (t - 0.5) * 2);
        }
        
        points.push(pt);
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const lineGeometry = new THREE.TubeGeometry(curve, 20, 0.01, 8, false);
      
      const lineMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x4CAF50 : 0x2196F3,
        transparent: true,
        opacity: 0.6
      });
      
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      flowLinesGroup.add(line);
    }

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
      globe.rotation.y += 0.003;
      ring.rotation.z += 0.002;
      ring2.rotation.z -= 0.001;
      particlesMesh.rotation.y += 0.0005;
      
      // Pulse atmosphere
      const time = Date.now() * 0.001;
      const pulseFactor = Math.sin(time) * 0.05 + 1;
      atmosphere.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Helper functions
  function getRandomPointOnSphere(radius: number) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    return new THREE.Vector3(x, y, z);
  }
  
  function createGlobeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Fill with a green base
      context.fillStyle = '#2E7D32';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw some continents-like shapes
      context.fillStyle = '#4CAF50';
      
      // Add random patterns for continents
      for (let i = 0; i < 7; i++) {
        drawRandomContinent(context, 
          Math.random() * canvas.width, 
          Math.random() * canvas.height,
          100 + Math.random() * 200);
      }
      
      // Add some highlight patterns
      context.fillStyle = '#81C784';
      for (let i = 0; i < 15; i++) {
        drawRandomContinent(context, 
          Math.random() * canvas.width, 
          Math.random() * canvas.height,
          20 + Math.random() * 60);
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }
  
  function drawRandomContinent(
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number
  ) {
    ctx.beginPath();
    
    // Create a random shape
    const points = 6 + Math.floor(Math.random() * 6);
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radius = size * (0.5 + Math.random() * 0.5);
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    
    ctx.closePath();
    ctx.fill();
  }

  return <div ref={mountRef} className="w-full h-full" />;
}
