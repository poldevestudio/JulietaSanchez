/* ==========================================================================
   ESCUELA JULIETA SÁNCHEZ — EDICIÓN SOFT BALLET (MAIN INTERACTIVE ENGINE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. NAVBAR SCROLL & MOBILE MENU
       ---------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active')
                    ? 'fas fa-times'
                    : 'fas fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. LOS 4 GLOBITOS INTERACTIVOS DEL INICIO (ESPACIOS & DISCIPLINAS)
       ---------------------------------------------------------------------- */
    const localSlidesData = [
        {
            num: '01',
            badge: 'Danza & Salón de Espejos',
            title: '<i class="fas fa-wand-magic-sparkles"></i> Danza, Expresión Corporal & Espejos',
            desc: 'Un espacio de contención y sensibilidad artística en Escobar, donde niñas, niños y jóvenes desarrollan técnica, postura y musicalidad.',
            img: 'images/local/local-1.jpg'
        },
        {
            num: '02',
            badge: 'Acrobacia en Tela & Expresión',
            title: '<i class="fas fa-wind"></i> Acrobacia en Tela, Danza Aérea & Teatro',
            desc: 'Fuerza, plasticidad y libertad en altura. Clases cuidadas con colchonetas de seguridad fusionando acrobacia con expresión escénica.',
            img: 'images/local/local-2.jpg'
        },
        {
            num: '03',
            badge: 'Gimnasia Artística',
            title: '<i class="fas fa-ribbon"></i> Gimnasia Artística en Suelo, Viga y Salto',
            desc: 'Referentes con trayectoria en Belén de Escobar. Coordinación, flexibilidad, equilibrio y superación personal para grupos desde los 3 años.',
            img: 'images/local/local-3.jpg'
        },
        {
            num: '04',
            badge: 'Galas, Torneos & Valores',
            title: '<i class="fas fa-heart"></i> Galas Anuales, Torneos & Educación en Valores',
            desc: 'Una gran familia donde cada logro se celebra en equipo. Desarrollamos compañerismo, confianza y contención en cada encuentro y torneo.',
            img: 'images/local/local-4.jpg'
        }
    ];

    const globitoBtns = document.querySelectorAll('.globito-btn');
    const showcasePhotos = document.querySelectorAll('.showcase-photo');
    const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
    const badgeNumEl = document.getElementById('showcaseBadgeNum');
    const badgeTextEl = document.getElementById('showcaseBadgeText');
    const captionTitleEl = document.getElementById('heroDynamicTitle');
    const captionDescEl = document.getElementById('heroDynamicDesc');

    let currentSlideIndex = 0;
    let slideInterval = null;

    function activateGlobitoSlide(index) {
        if (!localSlidesData[index]) return;
        currentSlideIndex = index;
        const data = localSlidesData[index];

        globitoBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === index);
        });

        showcasePhotos.forEach((img, idx) => {
            img.classList.toggle('active', idx === index);
        });

        heroBgSlides.forEach((bg, idx) => {
            bg.classList.toggle('active', idx === index);
        });

        if (badgeNumEl) badgeNumEl.textContent = data.num;
        if (badgeTextEl) badgeTextEl.textContent = data.badge;

        if (captionTitleEl && captionDescEl) {
            captionTitleEl.style.opacity = '0';
            captionDescEl.style.opacity = '0';
            setTimeout(() => {
                captionTitleEl.innerHTML = data.title;
                captionDescEl.textContent = data.desc;
                captionTitleEl.style.opacity = '1';
                captionDescEl.style.opacity = '1';
            }, 160);
        }
    }

    function startGlobitosAutoPlay() {
        if (globitoBtns.length === 0) return;
        stopGlobitosAutoPlay();
        slideInterval = setInterval(() => {
            const nextIdx = (currentSlideIndex + 1) % localSlidesData.length;
            activateGlobitoSlide(nextIdx);
        }, 5500);
    }

    function stopGlobitosAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    if (globitoBtns.length > 0) {
        globitoBtns.forEach((btn, idx) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                activateGlobitoSlide(idx);
                startGlobitosAutoPlay();
                btn.blur();
            });
            btn.addEventListener('mouseenter', stopGlobitosAutoPlay);
            btn.addEventListener('mouseleave', startGlobitosAutoPlay);
        });
        startGlobitosAutoPlay();
    }

    /* ----------------------------------------------------------------------
       3. SCROLL REVEAL & CASCADING PARALLAX SUAVE
       ---------------------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.14 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    /* Parallax suave en imágenes en cascada al hacer scroll */
    const cascadingWrap = document.querySelector('.cascading-visual-wrap');
    if (cascadingWrap) {
        const bgLayer = cascadingWrap.querySelector('.cascading-layer-bg');
        const mainLayer = cascadingWrap.querySelector('.cascading-layer-main');
        const floatCard = cascadingWrap.querySelector('.cascading-layer-floating-card');

        window.addEventListener('scroll', () => {
            const rect = cascadingWrap.getBoundingClientRect();
            const winH = window.innerHeight;
            if (rect.top < winH && rect.bottom > 0) {
                const progress = (winH - rect.top) / (winH + rect.height) - 0.5;
                if (bgLayer) bgLayer.style.transform = `translate3d(${progress * -20}px, ${progress * 30}px, 0)`;
                if (mainLayer) mainLayer.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
                if (floatCard) floatCard.style.transform = `translate3d(${progress * 14}px, ${progress * -30}px, 0)`;
            }
        }, { passive: true });
    }

    /* Efecto 3D Tilt suave en las tarjetas de Disciplinas */
    const comboCards = document.querySelectorAll('.combo-kinetic-card');
    comboCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 900) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 6;
            const rotateX = ((y / rect.height) - 0.5) * -6;
            card.style.transform = `perspective(950px) translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ----------------------------------------------------------------------
       4. CARRUSEL DRAG & FLECHAS (PILARES DE ENSEÑANZA)
       ---------------------------------------------------------------------- */
    const strips = document.querySelectorAll('.brands-scroll-strip');
    strips.forEach(strip => {
        let isDown = false;
        let startX;
        let scrollLeft;

        strip.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - strip.offsetLeft;
            scrollLeft = strip.scrollLeft;
        });
        strip.addEventListener('mouseleave', () => { isDown = false; });
        strip.addEventListener('mouseup', () => { isDown = false; });
        strip.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - strip.offsetLeft;
            const walk = (x - startX) * 1.8;
            strip.scrollLeft = scrollLeft - walk;
        });
    });

    document.querySelectorAll('.strip-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const targetId = arrow.getAttribute('data-target');
            const container = document.getElementById(targetId);
            if (!container) return;
            const amount = container.clientWidth * 0.7;
            container.scrollBy({
                left: arrow.classList.contains('prev') ? -amount : amount,
                behavior: 'smooth'
            });
        });
    });

    /* ----------------------------------------------------------------------
       4.1 CARRUSEL CONTINUO INFINITO DE RESEÑAS (AUTO-SCROLL SUAVE & TOUCH DRAG)
       ---------------------------------------------------------------------- */
    const reviewsStrip = document.getElementById('reviewsCarousel');
    if (reviewsStrip) {
        // Clonamos las tarjetas 2 veces para tener 3 sets continuos e ininterrumpibles
        const originalCards = Array.from(reviewsStrip.children);
        originalCards.forEach(card => reviewsStrip.appendChild(card.cloneNode(true)));
        originalCards.forEach(card => reviewsStrip.appendChild(card.cloneNode(true)));

        let setWidth = 0;
        function updateSetWidth() {
            setWidth = reviewsStrip.scrollWidth / 3;
        }

        updateSetWidth();
        // Inicializar en el set central
        if (reviewsStrip.scrollLeft === 0 && setWidth > 0) {
            reviewsStrip.scrollLeft = setWidth;
        }

        window.addEventListener('resize', updateSetWidth);
        window.addEventListener('load', () => {
            updateSetWidth();
            if (reviewsStrip.scrollLeft === 0 && setWidth > 0) {
                reviewsStrip.scrollLeft = setWidth;
            }
        });

        function checkLoopBounds() {
            if (setWidth <= 0) return;
            if (reviewsStrip.scrollLeft >= setWidth * 2) {
                reviewsStrip.scrollLeft -= setWidth;
            } else if (reviewsStrip.scrollLeft <= 0) {
                reviewsStrip.scrollLeft += setWidth;
            }
        }

        let isPaused = false;
        let isTouching = false;
        let isMouseDown = false;
        let resumeTimer = null;
        let touchStartX = 0;
        let touchStartY = 0;
        let scrollStartX = 0;
        let isHorizontalSwipe = null;
        let mouseStartX = 0;
        let mouseScrollStart = 0;

        function scheduleResume(delay = 1400) {
            if (resumeTimer) clearTimeout(resumeTimer);
            resumeTimer = setTimeout(() => {
                if (!isTouching && !isMouseDown) {
                    isPaused = false;
                }
            }, delay);
        }

        // Auto-scroll continuo suave de derecha a izquierda (~30px por segundo)
        let lastTimestamp = null;
        const scrollSpeedPxPerSec = 30;

        function autoScrollLoop(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const deltaSec = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
            lastTimestamp = timestamp;

            if (!isPaused && !isTouching && !isMouseDown) {
                reviewsStrip.scrollLeft += (scrollSpeedPxPerSec * deltaSec);
                checkLoopBounds();
            }

            requestAnimationFrame(autoScrollLoop);
        }
        requestAnimationFrame(autoScrollLoop);

        // Pausa al pasar el cursor por encima (Desktop)
        reviewsStrip.addEventListener('mouseenter', () => {
            isPaused = true;
            if (resumeTimer) clearTimeout(resumeTimer);
        });

        reviewsStrip.addEventListener('mouseleave', () => {
            if (!isMouseDown) {
                scheduleResume(400);
            }
        });

        // Soporte táctil fluido en celulares ("con el dedo se pueda parar/mover")
        reviewsStrip.addEventListener('touchstart', (e) => {
            isTouching = true;
            isPaused = true;
            if (resumeTimer) clearTimeout(resumeTimer);
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            scrollStartX = reviewsStrip.scrollLeft;
            isHorizontalSwipe = null;
        }, { passive: true });

        reviewsStrip.addEventListener('touchmove', (e) => {
            if (!isTouching) return;
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(currentX - touchStartX);
            const diffY = Math.abs(currentY - touchStartY);

            if (isHorizontalSwipe === null && (diffX > 6 || diffY > 6)) {
                isHorizontalSwipe = diffX > diffY;
            }

            if (isHorizontalSwipe) {
                if (e.cancelable) e.preventDefault();
                const delta = currentX - touchStartX;
                reviewsStrip.scrollLeft = scrollStartX - delta;
                checkLoopBounds();
            }
        }, { passive: false });

        reviewsStrip.addEventListener('touchend', () => {
            isTouching = false;
            isHorizontalSwipe = null;
            scheduleResume(1400);
        }, { passive: true });

        reviewsStrip.addEventListener('touchcancel', () => {
            isTouching = false;
            isHorizontalSwipe = null;
            scheduleResume(1400);
        }, { passive: true });

        // Arrastre con mouse en desktop
        reviewsStrip.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            isPaused = true;
            if (resumeTimer) clearTimeout(resumeTimer);
            mouseStartX = e.pageX - reviewsStrip.offsetLeft;
            mouseScrollStart = reviewsStrip.scrollLeft;
            reviewsStrip.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsStrip.offsetLeft;
            const walk = (x - mouseStartX) * 1.3;
            reviewsStrip.scrollLeft = mouseScrollStart - walk;
            checkLoopBounds();
        });

        window.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                reviewsStrip.style.cursor = 'grab';
                scheduleResume(1200);
            }
        });
    }

    /* ----------------------------------------------------------------------
       5. DETECTOR DEL DÍA ACTUAL EN LA TABLA DE HORARIOS
       ---------------------------------------------------------------------- */
    const now = new Date();
    const day = now.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab

    const scheduleRows = document.querySelectorAll('.schedule-row');
    scheduleRows.forEach(row => {
        const daysAttr = row.getAttribute('data-days') || '';
        const daysList = daysAttr.split(',').map(Number);
        if (daysList.includes(day)) {
            row.classList.add('today');
        }
    });

    /* ----------------------------------------------------------------------
       6. WIDGET FLOTANTE DE WHATSAPP CON MENÚ RÁPIDO
       ---------------------------------------------------------------------- */
    const waLauncher = document.getElementById('waLauncherBtn');
    const waPopup = document.getElementById('waPopupMenu');
    const waClose = document.getElementById('waPopupClose');
    const waNotif = document.getElementById('waNotifBadge');

    if (waLauncher && waPopup) {
        waLauncher.addEventListener('click', (e) => {
            e.stopPropagation();
            waPopup.classList.toggle('open');
            if (waNotif) waNotif.style.display = 'none';
        });

        if (waClose) {
            waClose.addEventListener('click', (e) => {
                e.stopPropagation();
                waPopup.classList.remove('open');
            });
        }

        document.addEventListener('click', (e) => {
            if (!waPopup.contains(e.target) && !waLauncher.contains(e.target)) {
                waPopup.classList.remove('open');
            }
        });
    }
});
