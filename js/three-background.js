// ========== THREE.JS SIMPLE QUE SÍ FUNCIONA ==========
console.log("🎮 Three.js está cargando...");

// Crear escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a); // Color oscuro

// Crear cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Crear renderizador
const renderer = new THREE.WebGLRenderer({ alpha: false }); // alpha: false para fondo sólido
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Añadir al DOM de forma visible
const canvas = renderer.domElement;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

console.log("✅ Canvas creado y añadido al DOM");

// ========== CREAR PARTÍCULAS ==========
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;

// Arrays para posiciones y colores
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i += 3) {
    // Posiciones aleatorias en una esfera
    const radius = 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = radius * Math.cos(phi);
    
    // Colores aleatorios entre azul y morado
    const r = Math.random() * 0.5 + 0.5; // 0.5 a 1.0
    const g = Math.random() * 0.3; // 0 a 0.3
    const b = Math.random() * 0.8 + 0.2; // 0.2 a 1.0
    
    colorArray[i] = 0.2; // Algo de rojo
    colorArray[i + 1] = 0.5; // Más verde
    colorArray[i + 2] = 1.0; // Azul completo
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Malla de partículas
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

console.log("✅ Partículas creadas");

// ========== ANIMACIÓN ==========
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Rotar suavemente
    particlesMesh.rotation.y = elapsedTime * 0.1;
    particlesMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
    
    renderer.render(scene, camera);
}

animate();

console.log("🎮 Animación iniciada");

// ========== RESPONSIVE ==========
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});