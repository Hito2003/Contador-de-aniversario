window.addEventListener('load', () => {

    // --- ELEMENTOS PRINCIPALES ---
    const typedMessageElement = document.getElementById('typed-message');
    const countdownElement = document.getElementById('countdown');
    const heartsBackground = document.getElementById('hearts-background');
    const treeImage = document.querySelector('.heart-tree');
    const countdownElement2 = document.getElementById('countdown2');

    // --- 1. Mensaje que se escribe gradualmente ---
    const message = "Mi lugar favorito siempre será a tu lado. Con el tiempo no solo te amo más, sino mejor. Siempre juntos";
    let charIndex = 0;
    function typeMessage() {
        if (charIndex < message.length) {
            typedMessageElement.textContent += message.charAt(charIndex);
            charIndex++;
            setTimeout(typeMessage, 70);
        }
    }

    // --- 2. Contador de tiempo (Principal) ---
    const startDate = new Date("March 06, 2024 00:00:00").getTime();
    function updateCountdown() {
        const now = new Date();
        const start = new Date(startDate);
        const distance = now.getTime() - start.getTime();
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();
        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement.innerHTML = `${years} Años, ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
    }

    // --- 3. Lluvia de corazones de fondo ---
    const heartFallColors = ['#ADD8E6', '#87CEEB', '#6495ED', '#4682B4'];
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.backgroundColor = heartFallColors[Math.floor(Math.random() * heartFallColors.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.style.animationDelay = `-${Math.random() * 5}s`;
        heartsBackground.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    // --- 4. Hojas del Árbol y Animación de Caída (CÓDIGO RESTAURADO) ---
    const treeHeartColors = ['#ADD8E6', '#87CEEB', '#6495ED', '#4682B4'];
    function populateTreeWithLeaves() {
        const numberOfLeaves = 200;
        const treeRect = treeImage.getBoundingClientRect();
        if (treeRect.width === 0) return;
        for (let i = 0; i < numberOfLeaves; i++) {
            const heart = document.createElement('div');
            heart.classList.add('tree-heart');
            heart.style.animationDelay = `${i * 0.01}s`;
            heart.style.backgroundColor = treeHeartColors[Math.floor(Math.random() * treeHeartColors.length)];
            heart.style.opacity = (Math.random() * 0.5) + 0.5;
            let x, y;
            do {
                const u = (Math.random() - 0.5) * 2;
                const v = (Math.random() - 0.5) * 2;
                const heartEquation = Math.pow(u*u + v*v - 1, 3) - u*u * v*v*v;
                if (heartEquation < 0) {
                    const scale = treeRect.width / 2.2; 
                    const widthFactor = 1.4;
                    x = u * scale * widthFactor;
                    y = -v * scale;
                }
            } while (x === undefined);
            const topOffset = treeRect.top + window.scrollY + (treeRect.height * 0.10);
            heart.style.left = `calc(${treeRect.left + (treeRect.width / 2)}px + ${x}px)`;
            heart.style.top = `calc(${topOffset}px + ${y}px)`;
            heart.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;
            document.body.appendChild(heart);
        }
    
    }
    function createTreeHeartFall() {
        const treeRect = treeImage.getBoundingClientRect();
        if (treeRect.width === 0) return;
        const heart = document.createElement('div');
        heart.classList.add('tree-heart', 'falling-leaf');
        heart.style.backgroundColor = treeHeartColors[Math.floor(Math.random() * treeHeartColors.length)];
        const xPos = treeRect.left + window.scrollX + treeRect.width * (0.2 + Math.random() * 0.6);
        const yPos = treeRect.top + window.scrollY + treeRect.height * (0.1 + Math.random() * 0.4);
        heart.style.left = `${xPos}px`;
        heart.style.top = `${yPos}px`;
        heart.style.setProperty('--rand-x', `${Math.random() * 100 - 50}px`);
        heart.style.setProperty('--rand-y', `${Math.random() * 150 + 50}px`);
        heart.style.setProperty('--rand-rot', `${Math.random() * 90 - 45}deg`);
        heart.style.animationDuration = `${Math.random() * 2 + 2}s`;
        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }
    function startTreeLeafDrop() {
        createTreeHeartFall();
        const randomDelay = Math.random() * 1500 + 1500;
        setTimeout(startTreeLeafDrop, randomDelay);
    }

    // --- 5. Explosión de corazones al hacer clic ---
    const explodedHeartColors = ['#FFD700', '#DAA520', '#B8860B', '#F0E68C'];
    document.body.addEventListener('click', (e) => {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('exploded-heart');
            heart.style.left = `${e.clientX}px`;
            heart.style.top = `${e.clientY}px`;
            heart.style.backgroundColor = explodedHeartColors[Math.floor(Math.random() * explodedHeartColors.length)];
            heart.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
            heart.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
            heart.style.animationDelay = `${Math.random() * 0.1}s`;
            document.body.appendChild(heart);
            heart.addEventListener('animationend', () => heart.remove());
        }
    });

    // --- 6. SEGUNDO CONTADOR ---
    const startDate2 = new Date("September 17, 2025 00:00:00").getTime();
    function updateCountdown2() {
        const now = new Date();
        const start = new Date(startDate2);
        const distance = now.getTime() - start.getTime();
        if (distance < 0) {
            countdownElement2.innerHTML = "Aún no hemos llegado a esta fecha especial.";
            return;
        }
        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();
        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement2.innerHTML = `Siempre juntos: ${years} Años, ${months} meses, ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
    }// --- 7. EFECTO DE ESTRELLAS AL MOVER EL RATÓN ---
document.body.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    const size = Math.random() * 8 + 2; // Tamaño entre 2px y 10px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Posición con un pequeño desfase para que no esté justo debajo del cursor
    sparkle.style.left = `${e.clientX + window.scrollX + (Math.random() * 20 - 10)}px`;
    sparkle.style.top = `${e.clientY + window.scrollY + (Math.random() * 20 - 10)}px`;

    document.body.appendChild(sparkle);

    // Quitamos la partícula del DOM después de la animación para no sobrecargar
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Crear estrellas de fondo
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const starCount = 200;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                star.style.animationDuration = `${Math.random() * 5 + 3}s`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                
                starsContainer.appendChild(star);
            }
        }

    // --- INICIO DE TODAS LAS ANIMACIONES ---
    populateTreeWithLeaves();
    typeMessage();
    updateCountdown();
    updateCountdown2();
    setInterval(updateCountdown, 1000);
    setInterval(updateCountdown2, 1000);
    setInterval(createFallingHeart, 1500); // Lluvia de fondo más ligera
    startTreeLeafDrop();
    createStars();
});