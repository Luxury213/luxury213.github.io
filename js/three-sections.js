// ========== THREE.JS MULTI-SECCIONES - VERSIÓN PULIDA ==========
console.log("🎮 Three.js Multi-Secciones iniciando...");

// ========== CONFIGURACIÓN GLOBAL ==========
let currentSection = 'home';
let scenes = {};
let cameras = {};
let renderers = {};
let meshes = {};

// Crear contenedores para cada sección
function initScenes() {
    const sections = ['home', 'about', 'projects', 'contact'];
    
    sections.forEach(section => {
        const sectionElement = document.getElementById(section);
        if (sectionElement) {
            // Verificar si ya existe un canvas
            let container = document.getElementById(`canvas-${section}`);
            if (!container) {
                container = document.createElement('div');
                container.id = `canvas-${section}`;
                container.style.position = 'absolute';
                container.style.top = '0';
                container.style.left = '0';
                container.style.width = '100%';
                container.style.height = '100%';
                container.style.zIndex = '0';
                container.style.pointerEvents = 'none';
                sectionElement.style.position = 'relative';
                sectionElement.style.overflow = 'hidden';
                sectionElement.appendChild(container);
            }
        }
    });
}

// ========== ESCENA 1: HOME - PARTÍCULAS EN ESPIRAL ==========
function createHomeScene() {
    const container = document.getElementById('canvas-home');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // PARTÍCULAS EN ESPIRAL
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount; i++) {
        const t = i / particlesCount * Math.PI * 10;
        const radius = 5 + (i / particlesCount) * 10;
        
        const x = Math.cos(t) * radius;
        const y = Math.sin(t * 2) * 3;
        const z = Math.sin(t) * radius;
        
        posArray[i*3] = x;
        posArray[i*3+1] = y;
        posArray[i*3+2] = z;
        
        const r = 0.2 + (i / particlesCount) * 0.8;
        const g = 0.3 + (i / particlesCount) * 0.5;
        const b = 1.0;
        
        colorArray[i*3] = r;
        colorArray[i*3+1] = g;
        colorArray[i*3+2] = b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    scenes.home = scene;
    cameras.home = camera;
    renderers.home = renderer;
    meshes.home = { particles: particlesMesh };
}

// ========== ESCENA 2: SOBRE MÍ - CUBOS FLOTANTES ==========
function createAboutScene() {
    const container = document.getElementById('canvas-about');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    const cubes = [];
    const colors = [0x3b82f6, 0x8b5cf6, 0x60a5fa, 0xa78bfa];
    
    for(let i = 0; i < 40; i++) {
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const material = new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            emissive: 0x111111,
            roughness: 0.3,
            metalness: 0.1
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.x = (Math.random() - 0.5) * 30;
        cube.position.y = (Math.random() - 0.5) * 20;
        cube.position.z = (Math.random() - 0.5) * 20;
        
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        scene.add(cube);
        cubes.push(cube);
    }
    
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    const light1 = new THREE.PointLight(0x3b82f6, 1, 50);
    light1.position.set(10, 10, 10);
    scene.add(light1);
    
    const light2 = new THREE.PointLight(0x8b5cf6, 1, 50);
    light2.position.set(-10, -10, 10);
    scene.add(light2);
    
    scenes.about = scene;
    cameras.about = camera;
    renderers.about = renderer;
    meshes.about = { cubes };
}

// ========== ESCENA 3: PROYECTOS - ANILLOS ==========
function createProjectsScene() {
    const container = document.getElementById('canvas-projects');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    const rings = [];
    const ringCount = 5;
    
    for(let i = 0; i < ringCount; i++) {
        const radius = 3 + i * 1.8;
        const geometry = new THREE.TorusGeometry(radius, 0.05, 16, 64);
        const material = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0x3b82f6 : 0x8b5cf6,
            emissive: 0x111111,
            transparent: true,
            opacity: 0.2 + (i / ringCount) * 0.2
        });
        
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        ring.rotation.y = (i / ringCount) * Math.PI;
        ring.rotation.z = i * 0.2;
        
        scene.add(ring);
        rings.push(ring);
    }
    
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    
    scenes.projects = scene;
    cameras.projects = camera;
    renderers.projects = renderer;
    meshes.projects = { rings };
}

// ========== ESCENA 4: CONTACTO - ESFERA DE PARTÍCULAS ==========
function createContactScene() {
    const container = document.getElementById('canvas-contact');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 18;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 6 + Math.sin(i * 0.5) * 1;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        posArray[i*3] = x;
        posArray[i*3+1] = y;
        posArray[i*3+2] = z;
        
        colorArray[i*3] = 0.3;
        colorArray[i*3+1] = 0.5;
        colorArray[i*3+2] = 1.0;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    scenes.contact = scene;
    cameras.contact = camera;
    renderers.contact = renderer;
    meshes.contact = { particles };
}

// ========== DETECTAR SECCIÓN ACTIVA ==========
function detectActiveSection() {
    const sections = ['home', 'about', 'projects', 'contact'];
    const headerHeight = 80;
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                if (currentSection !== section) {
                    currentSection = section;
                }
                break;
            }
        }
    }
}

// ========== ANIMACIÓN ==========
let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Home animation
    if (meshes.home && scenes.home && renderers.home && cameras.home) {
        if (meshes.home.particles) {
            meshes.home.particles.rotation.y = elapsedTime * 0.05;
            meshes.home.particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;
        }
        renderers.home.render(scenes.home, cameras.home);
    }
    
    // About animation
    if (meshes.about && scenes.about && renderers.about && cameras.about) {
        if (meshes.about.cubes) {
            meshes.about.cubes.forEach((cube, index) => {
                cube.rotation.x += 0.002;
                cube.rotation.y += 0.003;
                cube.position.y += Math.sin(elapsedTime + index) * 0.001;
            });
        }
        renderers.about.render(scenes.about, cameras.about);
    }
    
    // Projects animation
    if (meshes.projects && scenes.projects && renderers.projects && cameras.projects) {
        if (meshes.projects.rings) {
            meshes.projects.rings.forEach((ring, index) => {
                ring.rotation.z += 0.001 * (index + 1);
                ring.rotation.x += 0.0005;
            });
        }
        renderers.projects.render(scenes.projects, cameras.projects);
    }
    
    // Contact animation
    if (meshes.contact && scenes.contact && renderers.contact && cameras.contact) {
        if (meshes.contact.particles) {
            meshes.contact.particles.rotation.y += 0.001;
            meshes.contact.particles.rotation.x += 0.0005;
        }
        renderers.contact.render(scenes.contact, cameras.contact);
    }
}

// ========== INICIALIZAR ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        initScenes();
        createHomeScene();
        createAboutScene();
        createProjectsScene();
        createContactScene();
        animate();
        
        window.addEventListener('scroll', detectActiveSection);
        detectActiveSection();
        
        console.log("✅ Todas las escenas 3D creadas");
    }, 100);
});

// ========== RESPONSIVE ==========
window.addEventListener('resize', () => {
    const sections = ['home', 'about', 'projects', 'contact'];
    
    sections.forEach(section => {
        if (cameras[section] && renderers[section]) {
            cameras[section].aspect = window.innerWidth / window.innerHeight;
            cameras[section].updateProjectionMatrix();
            renderers[section].setSize(window.innerWidth, window.innerHeight);
        }
    });
});