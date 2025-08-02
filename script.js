// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'background': '#010409',
                'text-bright': '#e6edf3',
                'text-dim': '#7d8590',
                'primary': '#58A6FF', // GitHub Blue
                'accent': '#238636', // GitHub Green
            }
        }
    }
}

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // --- DATA ---
    const teamData = [
        { "name": "Marudhu B", "github": "marudhu30", "linkedin": "https://linkedin.com/in/MarudhuB", "role": "Founder & Coordinator" },
        { "name": "Archana S", "github": "ArchanaSenthilkumar06", "linkedin": "https://www.linkedin.com/in/archana-s-b45847291/", "role": "Core Team" },
        { "name": "Monika Aruldoss", "github": "monikaaruldoss", "linkedin": "https://www.linkedin.com/in/monika-a-b54869291/", "role": "Core Team" },
        { "name": "Lavanya R", "github": "lavanyarajalingam", "linkedin": "https://www.linkedin.com/in/lavanya-r-070868291/", "role": "Core Team" },
        { "name": "Jayanitha S", "github": "JayanithaSivakumar", "linkedin": "https://www.linkedin.com/in/jayanitha-s-023a43291/", "role": "Core Team" }
    ];

    // --- DYNAMIC TEAM HEXAGON INJECTION ---
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid) {
        teamData.forEach(member => {
            const hexagon = document.createElement('div');
            hexagon.className = 'hexagon';
            
            hexagon.innerHTML = `
                <div class="hexagon-content">
                    <div class="team-card-content">
                        <!-- TEAM IMAGE PLACEHOLDER: Replace the src with the member's image URL -->
                        <img src="https://placehold.co/100x100/58A6FF/010409?text=${member.name.charAt(0)}" alt="${member.name}'s Avatar" class="w-24 h-24 rounded-full mb-4 border-2 border-primary">
                        <h3 class="text-xl font-bold text-text-bright">${member.name}</h3>
                        <p class="text-primary font-semibold">${member.role || 'Core Team'}</p>
                    </div>
                    <div class="team-card-socials">
                        <p class="text-lg font-bold text-text-bright mb-4">Connect</p>
                        <div class="flex justify-center space-x-5">
                            <a href="https://github.com/${member.github}" target="_blank" class="text-text-dim hover:text-text-bright transition-transform hover:scale-110">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" /></svg>
                            </a>
                            <a href="${member.linkedin}" target="_blank" class="text-text-dim hover:text-text-bright transition-transform hover:scale-110">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            teamGrid.appendChild(hexagon);
        });
    }
    
    // --- NAVBAR SCROLL & MENU LOGIC ---
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }

    // --- 3D INITIALIZATION (INNOVATIVE BACKGROUND) ---
    let scene, camera, renderer, composer;
    const mouse = new THREE.Vector2();
    const clock = new THREE.Clock();
    const floatingObjects = new THREE.Group();

    function init3D() {
        const canvas = document.getElementById('threed-background');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 100;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000);

        // Post-processing for Bloom effect
        const renderScene = new THREE.RenderPass(scene, camera);
        const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0;
        bloomPass.strength = 1.2; // Increased bloom intensity
        bloomPass.radius = 0;
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0x58A6FF, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Pulsating Point Lights
        const pointLight1 = new THREE.PointLight(0x58A6FF, 3, 1200);
        pointLight1.position.set(200, 100, -300);
        scene.add(pointLight1);
        const pointLight2 = new THREE.PointLight(0x2ea043, 3, 1200);
        pointLight2.position.set(-200, -100, -300);
        scene.add(pointLight2);
        
        // --- NEBULA BACKGROUND ---
        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 40000; i++) { // Increased star count
            starVertices.push(THREE.MathUtils.randFloatSpread(3000), THREE.MathUtils.randFloatSpread(3000), THREE.MathUtils.randFloatSpread(3000));
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0x777777, size: 0.9, transparent: true });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // --- FLOATING ELEMENTS ---
        scene.add(floatingObjects);

        // Geometric shapes
        const geoMaterial = new THREE.MeshStandardMaterial({ color: 0x58A6FF, emissive: 0x58A6FF, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.4, wireframe: true });
        for (let i = 0; i < 50; i++) { // Increased count
            const geometry = new THREE.IcosahedronGeometry(Math.random() * 12 + 4, 0);
            const mesh = new THREE.Mesh(geometry, geoMaterial);
            mesh.position.set(THREE.MathUtils.randFloatSpread(1200), THREE.MathUtils.randFloatSpread(1200), THREE.MathUtils.randFloatSpread(1200));
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            floatingObjects.add(mesh);
        }

        // Code Glyphs
        const fontLoader = new THREE.FontLoader();
        fontLoader.load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x2ea043, emissive: 0x2ea043, emissiveIntensity: 0.5 });
            const glyphs = ['</>', '{}', '=>', '()', '[]', 'npm', 'git', '&&', '||', 'AI', 'DSA']; // Added more glyphs
            glyphs.forEach(glyph => {
                const textGeo = new THREE.TextGeometry(glyph, { font: font, size: 14, height: 2.5 });
                textGeo.center();
                const textMesh = new THREE.Mesh(textGeo, textMaterial);
                textMesh.position.set(THREE.MathUtils.randFloatSpread(1200), THREE.MathUtils.randFloatSpread(1200), THREE.MathUtils.randFloatSpread(1200));
                floatingObjects.add(textMesh);
            });
        });


        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
        
        animate();
    }

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Rotate the entire scene slowly
        floatingObjects.rotation.y += delta * 0.05;
        floatingObjects.rotation.x += delta * 0.02;

        // Animate individual objects
        floatingObjects.children.forEach(child => {
            child.rotation.x += delta * 0.1;
            child.rotation.y += delta * 0.1;
        });

        // Pulsate lights
        scene.children.forEach(child => {
            if (child.isPointLight) {
                child.intensity = 3 + Math.sin(elapsedTime * 0.5 + child.position.x) * 1.0;
            }
        });

        // Smooth camera movement towards mouse
        camera.position.x += (mouse.x * 20 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 20 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        composer.render();
    }

    init3D();

    // --- LEARNING TRACKS 3D ICONS ---
    function setupTrackScene(canvasId, createObject) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const object = createObject();
        scene.add(object);
        
        const light = new THREE.PointLight(0x58A6FF, 2, 100);
        light.position.set(0, 5, 5);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        let speed = 0.01;
        canvas.parentElement.parentElement.addEventListener('mouseenter', () => speed = 0.05);
        canvas.parentElement.parentElement.addEventListener('mouseleave', () => speed = 0.01);

        function animate() {
            requestAnimationFrame(animate);
            object.rotation.x += speed;
            object.rotation.y += speed;
            renderer.render(scene, camera);
        }
        animate();
    }

    // Frontend Icon
    setupTrackScene('frontend-canvas', () => {
        const group = new THREE.Group();
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0x58A6FF, emissive: 0x58A6FF, emissiveIntensity: 0.3, flatShading: true }));
        group.add(core);
        for (let i = 0; i < 3; i++) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.1, 16, 100), new THREE.MeshStandardMaterial({ color: 0x7d8590, emissive: 0x7d8590, emissiveIntensity: 0.2 }));
            ring.rotation.x = Math.PI / 2;
            ring.rotation.y = (i / 3) * Math.PI;
            group.add(ring);
        }
        return group;
    });

    // Backend Icon
    setupTrackScene('backend-canvas', () => {
        const group = new THREE.Group();
        for (let i = 0; i < 4; i++) {
            const plane = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.2, 1.5), new THREE.MeshStandardMaterial({ color: 0x2ea043, emissive: 0x2ea043, emissiveIntensity: 0.3 }));
            plane.position.y = (i - 1.5) * 0.4;
            group.add(plane);
        }
        return group;
    });
    
    // AI Icon
    setupTrackScene('ai-canvas', () => {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xdb61a2, emissive: 0xdb61a2, emissiveIntensity: 0.5, wireframe: true });
        return new THREE.Mesh(geometry, material);
    });

    // DSA Icon
    setupTrackScene('dsa-canvas', () => {
        const group = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({ color: 0xffa500, emissive: 0xffa500, emissiveIntensity: 0.4 });
        for (let i = 0; i < 5; i++) {
            const cube = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), material);
            cube.position.set((i - 2) * 1.2, Math.sin(i) * 0.5, 0);
            group.add(cube);
        }
        return group;
    });

});
