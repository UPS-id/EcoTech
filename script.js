
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });

        // Skills Data
        const skillsData = [
            { name: "Solar Energy", icon: "fa-sun", level: 95, category: "renewable" },
            { name: "Wind Power", icon: "fa-wind", level: 90, category: "renewable" },
            { name: "IoT Sensors", icon: "fa-wifi", level: 88, category: "iot" },
            { name: "Water Systems", icon: "fa-tint", level: 92, category: "iot" },
            { name: "AI Models", icon: "fa-brain", level: 85, category: "ai" },
            { name: "Data Analytics", icon: "fa-chart-line", level: 82, category: "ai" },
            { name: "Energy Storage", icon: "fa-battery-full", level: 87, category: "renewable" },
            { name: "Smart Grid", icon: "fa-bolt", level: 93, category: "renewable" },
        ];

        // Initialize Swiper
        const swiper = new Swiper('.projectSwiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = 15 + Math.random() * 10 + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Render skills
        function renderSkills(category = 'all') {
            const skillsGrid = document.getElementById('skillsGrid');
            const filteredSkills = category === 'all' 
                ? skillsData 
                : skillsData.filter(skill => skill.category === category);
            
            skillsGrid.innerHTML = filteredSkills.map((skill, index) => `
                <div class="skill-hex" data-aos="zoom-in" data-aos-delay="${index * 100}">
                    <div class="skill-hex-inner">
                        <i class="fas ${skill.icon} text-3xl text-green-400 mb-2"></i>
                        <div class="text-sm font-bold text-center">${skill.name}</div>
                        <div class="text-xs text-green-400 mt-1">${skill.level}%</div>
                    </div>
                </div>
            `).join('');
        }

        // Skill tabs
        document.querySelectorAll('.skill-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.skill-tab').forEach(t => {
                    t.classList.remove('bg-green-500', 'text-white');
                    t.classList.add('bg-gray-700', 'text-gray-300');
                });
                this.classList.remove('bg-gray-700', 'text-gray-300');
                this.classList.add('bg-green-500', 'text-white');
                renderSkills(this.dataset.category);
            });
        });

        // Counter animation
        function animateCounter(element) {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }

        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        if (!counter.classList.contains('animated')) {
                            counter.classList.add('animated');
                            animateCounter(counter);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        // Observe dashboard section
        const dashboard = document.querySelector('#dashboard');
        if (dashboard) {
            counterObserver.observe(dashboard);
        }

        // Initialize Charts
        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'Environmental Impact',
                    data: [120, 180, 90, 140, 200, 130, 150, 170],
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: 'Sustainability Growth',
                    data: [30, 45, 40, 60, 55, 70, 65, 85],
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking links
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });

        // Active navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle mr-2"></i>
                Thank you ${data.name}! Your message has been sent successfully.
            `;
            document.body.appendChild(successMsg);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
            
            // Reset form
            e.target.reset();
        });

        // Initialize
        createParticles();
        renderSkills();

        // Loading screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                document.body.classList.remove('preload');
            }, 1500);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    
