/* ============================================================
   PRAVEEN KUMAR U — PORTFOLIO INTERACTIVITY
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. CINEMATIC INTRO ANIMATION - Fixed Timing
       ============================================================ */
    const introOverlay = document.getElementById('intro-overlay');
    const introProfile = document.getElementById('intro-profile');
    const introImg = document.getElementById('intro-img');
    const introFallback = document.getElementById('intro-fallback');
    const introPK = document.getElementById('intro-pk');
    const introFullName = document.getElementById('intro-full-name');
    const introParticlesCanvas = document.getElementById('intro-particles');

    document.body.style.overflow = 'hidden';

    // Handle image load failure
    if (introImg) {
        introImg.onerror = function() {
            this.style.display = 'none';
            if (introFallback) introFallback.classList.add('show');
        };
        
        if (introImg.complete && introImg.naturalWidth === 0) {
            introImg.style.display = 'none';
            if (introFallback) introFallback.classList.add('show');
        }
    }

    // Intro Particles
    let introParticles = [];
    let introCtx = null;

    function initIntroParticles() {
        if (!introParticlesCanvas) return;
        introCtx = introParticlesCanvas.getContext('2d');
        introParticlesCanvas.width = window.innerWidth;
        introParticlesCanvas.height = window.innerHeight;
        
        const count = window.innerWidth < 768 ? 30 : 60;
        for (let i = 0; i < count; i++) {
            introParticles.push({
                x: Math.random() * introParticlesCanvas.width,
                y: Math.random() * introParticlesCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 0.5,
                color: Math.random() > 0.5 ? '112, 0, 255' : '0, 240, 255'
            });
        }
    }

    function animateIntroParticles() {
        if (!introCtx || !introOverlay || introOverlay.classList.contains('fade-out')) return;
        introCtx.clearRect(0, 0, introParticlesCanvas.width, introParticlesCanvas.height);
        
        introParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > introParticlesCanvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > introParticlesCanvas.height) p.vy *= -1;
            
            introCtx.beginPath();
            introCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            introCtx.fillStyle = `rgba(${p.color}, 0.6)`;
            introCtx.fill();
        });
        
        requestAnimationFrame(animateIntroParticles);
    }

    initIntroParticles();
    animateIntroParticles();

    // FIXED ANIMATION TIMELINE:
    setTimeout(() => {
        if (introFullName) introFullName.classList.add('show');
    }, 3400);

    setTimeout(() => {
        if (introPK) introPK.classList.add('hide');
    }, 3200);

    setTimeout(() => {
        if (introOverlay) introOverlay.classList.add('fade-out');
        document.body.style.overflow = '';
    }, 5500);

    setTimeout(() => {
        if (introOverlay) introOverlay.style.display = 'none';
    }, 6700);

    /* ============================================================
       2. MOUSE FOLLOW LIGHT EFFECT
       ============================================================ */
    const mouseLight = document.getElementById('mouse-light');
    
    if (mouseLight && window.matchMedia('(min-width: 769px)').matches) {
        document.addEventListener('mousemove', (e) => {
            mouseLight.style.left = e.clientX + 'px';
            mouseLight.style.top = e.clientY + 'px';
        });
    }

    /* ============================================================
       3. CUSTOM CURSOR
       ============================================================ */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    
    if (isDesktop && cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-chip, .orbit-chip span, .quick-question');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
        });
    }

    /* ============================================================
       4. MAIN PARTICLES
       ============================================================ */
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.5 + 0.5;
            this.color = Math.random() > 0.5 ? '112, 0, 255' : '0, 240, 255';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, 0.6)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function connectParticles() {
        const maxDist = window.innerWidth < 768 ? 100 : 140;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(112, 0, 255, ${0.15 * (1 - dist / maxDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ============================================================
       5. NAVIGATION
       ============================================================ */
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(section => sectionObserver.observe(section));

    /* ============================================================
       6. TYPEWRITER EFFECT
       ============================================================ */
    const typewriter = document.getElementById('typewriter');
    const phrases = [
        'Software Engineer',
        'AI & Machine Learning Enthusiast',
        'Problem Solver',
        'Technology Builder',
        'Building Intelligent Solutions'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 80;

    function typeWriter() {
        if (!typewriter) return;
        const current = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriter.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriter.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();

    /* ============================================================
       7. SCROLL REVEAL
       ============================================================ */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    /* ============================================================
       8. ANIMATED COUNTERS
       ============================================================ */
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const isDecimal = el.dataset.decimal === 'true';
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;

                    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
                    }
                }
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    /* ============================================================
       9. 3D TILT EFFECT ON PROJECT CARDS + GLARE
       ============================================================ */
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        const glow = card.querySelector('.project-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Set CSS variables for dynamic glare
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
            
            if (glow) {
                glow.style.left = x + 'px';
                glow.style.top = y + 'px';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });

    /* ============================================================
       10. MAGNETIC BUTTONS
       ============================================================ */
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    /* ============================================================
       11. BACK TO TOP
       ============================================================ */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============================================================
       12. COPY EMAIL FUNCTION
       ============================================================ */
    const copyEmailBtn = document.getElementById('copy-email');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = document.getElementById('email-text').textContent;
            try {
                await navigator.clipboard.writeText(email);
                showToast('Email copied to clipboard!');
            } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Email copied to clipboard!');
            }
        });
    }

    function showToast(message) {
        if (!toast) return;
        if (toastMessage) toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    /* ============================================================
       13. CONTACT FORM
       ============================================================ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Message Sent ✓</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            showToast('Message sent successfully!');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    /* ============================================================
       14. PARALLAX ON SCROLL
       ============================================================ */
    const heroOrbs = document.querySelectorAll('.hero-glow-orb');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        heroOrbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.1;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    /* ============================================================
       15. SMOOTH ANCHOR SCROLLING
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ============================================================
       16. AI CHATBOT - Ask Praveen AI
       ============================================================ */
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const quickQuestions = document.querySelectorAll('.quick-question');

    // Predefined AI Responses
    const aiResponses = {
        'who is praveen': `Hey! 👋 <strong>Praveen Kumar U</strong> is a passionate <strong>Software Engineer</strong> and <strong>AI & Machine Learning Enthusiast</strong> based in Bangalore, Karnataka, India. He's a BCA Graduate (2023-2026) with a CGPA of 8.9, focused on building intelligent solutions through software and AI.`,
        
        'what are his skills': `<strong>Praveen's Technical Skills:</strong><br><br>
        <strong>💻 Programming:</strong> Python, Java, C, JavaScript, SQL<br>
        <strong>🌐 Web Development:</strong> HTML5, CSS3, JavaScript, Flask, REST APIs<br>
        <strong>🧠 AI & ML:</strong> PyTorch, TensorFlow, OpenCV, NumPy, Scikit-Learn, Deep Learning, Computer Vision<br>
        <strong>🗄️ Databases:</strong> MySQL, SQLite<br>
        <strong>🛠️ Tools:</strong> Git, GitHub, VS Code, Postman, XAMPP<br>
        <strong>📚 CS Fundamentals:</strong> DSA, Algorithms, OOP, DBMS, OS, CN, Software Engineering`,
        
        'what projects has he built': `<strong>Praveen has built 5 major projects:</strong><br><br>
        <strong>1. HireSense AI Ultra</strong> — AI-powered career development platform with resume analysis, mock interview coach, roadmap generator, and recruiter evaluation.<br><br>
        <strong>2. Pixel Truth</strong> — AI-generated image detection system using deep learning and computer vision.<br><br>
        <strong>3. Aurora Meetings AI</strong> — AI-powered meeting management platform with summaries and analytics.<br><br>
        <strong>4. CortexOps</strong> — AI-powered incident response and root cause analysis platform.<br><br>
        <strong>5. StormIQ</strong> — Intelligent weather monitoring platform with live forecasting and AI risk prediction.<br><br>
        <strong>6. NexTrip AI</strong> — AI-powered travel planning platform with personalized itineraries, weather, budget, route optimization, and hidden gem recommendations.`,
        
        'what certifications has he completed': `<strong>Praveen's Certifications:</strong><br><br>
        ✓ <strong>Introduction to Responsible AI</strong> — Google Cloud<br>
        ✓ <strong>AI for Beginners</strong> — Microsoft<br>
        ✓ <strong>Critical Thinking in the AI Era</strong> — Online Learning<br>
        ✓ <strong>Introduction to Artificial Intelligence</strong> — IBM / Online Platform<br><br>
        All certifications are verified! 🎓`,
        
        'what is his education': `<strong>Education:</strong><br><br>
        🎓 <strong>Bachelor of Computer Applications (BCA)</strong><br>
        📅 Duration: 2023 – 2026<br>
        🏆 CGPA: <strong>8.9</strong><br><br>
        He built strong fundamentals in programming, database management, web development, computer networks, operating systems, software engineering, and AI.`,
        
        'how can i contact him': `<strong>You can reach Praveen through:</strong><br><br>
        📧 <strong>Email:</strong> <a href="mailto:praveen20211202@gmail.com">praveen20211202@gmail.com</a><br>
        💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/praveen-kumar-0a731a417" target="_blank">linkedin.com/in/praveen-kumar-0a731a417</a><br>
        💻 <strong>GitHub:</strong> <a href="https://github.com/praveenjoe115" target="_blank">github.com/praveenjoe115</a><br>
        📍 <strong>Location:</strong> Bangalore, Karnataka, India<br><br>
        He's actively seeking Software Engineer roles at top product-based companies! 🚀`,
        
        'show github': `<strong>Praveen's GitHub Profile:</strong><br><br>
        💻 <a href="https://github.com/praveenjoe115" target="_blank">github.com/praveenjoe115</a><br><br>
        <strong>Highlights:</strong><br>
        • 6+ Public Projects<br>
        • 4+ AI Projects<br>
        • 10+ Technologies Used<br><br>
        Check out his repositories for detailed project documentation!`,
        
        'show linkedin': `<strong>Connect with Praveen on LinkedIn:</strong><br><br>
        💼 <a href="https://www.linkedin.com/in/praveen-kumar-0a731a417" target="_blank">linkedin.com/in/praveen-kumar-0a731a417</a><br><br>
        He's open to Software Engineer opportunities at top product-based companies like Google, Microsoft, Amazon, Adobe, and Atlassian! 🎯`
    };

    // Open/Close Chatbot
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.add('active');
            chatbotInput.focus();
        });
    }

    if (chatbotClose && chatbotWindow) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    // Send Message Function
    function sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI thinking delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 1000 + Math.random() * 500);
    }

    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}-message`;
        
        const avatar = type === 'ai' ? '🤖' : '👤';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-bubble">
                <p>${content}</p>
            </div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai-message typing-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-bubble typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    function getAIResponse(question) {
        const lowerQuestion = question.toLowerCase().trim();
        
        // Check for exact or partial matches
        for (const key in aiResponses) {
            if (lowerQuestion.includes(key) || key.includes(lowerQuestion)) {
                return aiResponses[key];
            }
        }
        
        // Default response for unknown questions
        return `I'm not sure about that specific question, but I can help you learn about:<br><br>
        • Who Praveen is<br>
        • His skills and expertise<br>
        • Projects he's built<br>
        • His certifications<br>
        • His education<br>
        • How to contact him<br>
        • His GitHub or LinkedIn<br><br>
        Try asking one of these! 😊`;
    }

    // Send button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', () => {
            sendMessage(chatbotInput.value);
        });
    }

    // Enter key to send
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage(chatbotInput.value);
            }
        });
    }

    // Quick question buttons
    quickQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            sendMessage(question);
        });
    });

    /* ============================================================
       17. CONSOLE EASTER EGG
       ============================================================ */
    console.log('%c👋 Hey there, curious recruiter!', 'font-size: 20px; font-weight: bold; color: #7000FF;');
    console.log('%cInterested in my work? Let\'s connect!', 'font-size: 14px; color: #00F0FF;');
    console.log('%c📧 praveen20211202@gmail.com', 'font-size: 12px; color: #a1a1aa;');
    console.log('%c🔗 https://www.linkedin.com/in/praveen-kumar-0a731a417', 'font-size: 12px; color: #a1a1aa;');

    /* ============================================================
       18. SCROLL PROGRESS BAR
       ============================================================ */
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    /* ============================================================
       19. CURSOR TRAIL EFFECT
       ============================================================ */
    if (isDesktop) {
        const trailCanvas = document.createElement('canvas');
        trailCanvas.id = 'cursor-trail';
        trailCanvas.style.cssText = 'position:fixed;inset:0;z-index:9997;pointer-events:none;';
        document.body.appendChild(trailCanvas);
        const tCtx = trailCanvas.getContext('2d');
        let trails = [];

        function resizeTrailCanvas() {
            trailCanvas.width = window.innerWidth;
            trailCanvas.height = window.innerHeight;
        }
        resizeTrailCanvas();
        window.addEventListener('resize', resizeTrailCanvas);

        document.addEventListener('mousemove', (e) => {
            for(let i=0; i<2; i++) {
                trails.push({
                    x: e.clientX + (Math.random()-0.5)*8,
                    y: e.clientY + (Math.random()-0.5)*8,
                    life: 1,
                    color: Math.random() > 0.5 ? '0, 240, 255' : '112, 0, 255'
                });
            }
        });

        function animateTrails() {
            tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
            trails.forEach((t, i) => {
                t.life -= 0.02;
                if(t.life <= 0) { trails.splice(i, 1); return; }
                tCtx.beginPath();
                tCtx.arc(t.x, t.y, t.life * 4, 0, Math.PI * 2);
                tCtx.fillStyle = `rgba(${t.color}, ${t.life})`;
                tCtx.fill();
            });
            requestAnimationFrame(animateTrails);
        }
        animateTrails();
    }

    /* ============================================================
       20. BUTTON RIPPLE EFFECT
       ============================================================ */
    document.querySelectorAll('.btn, .nav-cta, .project-link, .chatbot-send').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

});