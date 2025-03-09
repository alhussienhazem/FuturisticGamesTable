// Initialize Three.js background
const canvas = document.getElementById('background-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// Create a grid of particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
});

// Create the particle system
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add some ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add animation
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    // Move particles based on mouse
    window.addEventListener('mousemove', (e) => {
        particlesMesh.rotation.x = e.clientY * 0.00005;
        particlesMesh.rotation.y = e.clientX * 0.00005;
    });
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations for table rows
document.querySelectorAll('.game-row').forEach((row, index) => {
    // Initial state - rows are off-screen
    gsap.set(row, {
        opacity: 0,
        x: -50
    });
    
    // Animate rows in one by one
    gsap.to(row, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2 * index + 0.5,
        ease: "power2.out"
    });
});

// Add mousemove tilt effect to the table container
const tableContainer = document.querySelector('.table-container');

document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
    
    tableContainer.style.transform = `perspective(1000px) rotateX(${yAxis / 5}deg) rotateY(${-xAxis / 5}deg) translateZ(10px)`;
});

// Reset on mouse leave
document.addEventListener('mouseleave', () => {
    tableContainer.style.transform = `perspective(1000px) rotateX(3deg) rotateY(0deg) translateZ(0px)`;
});