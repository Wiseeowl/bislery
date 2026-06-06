document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation for Bottle
    const bottle = document.getElementById('hero-bottle');
    const targetContainer = document.getElementById('alkaline-container');
    const alkalineSection = document.getElementById('alkaline-section');
    
    let initialBottleTop = 0;
    let initialTargetTop = 0;
    let initialScale = 1;
    let targetScale = 0.8; // Scale down to fit the container

    function calculateDistances() {
        if (!bottle || !targetContainer) return;
        
        // Remove transform briefly to calculate true natural positions in the document
        const currentTransform = bottle.style.transform;
        bottle.style.transform = 'none';
        
        const bRect = bottle.getBoundingClientRect();
        const tRect = targetContainer.getBoundingClientRect();
        
        initialBottleTop = bRect.top + window.scrollY;
        // Calculate the top position needed to vertically center the bottle in the target container
        initialTargetTop = tRect.top + window.scrollY + (tRect.height / 2) - (bRect.height / 2);
        
        bottle.style.transform = currentTransform;
    }

    // Calculate once images are likely loaded
    setTimeout(calculateDistances, 100);
    window.addEventListener('load', calculateDistances);
    window.addEventListener('resize', calculateDistances);
    
    window.addEventListener('scroll', () => {
        if (initialTargetTop === 0) calculateDistances();
        
        const scrollY = window.scrollY;
        
        // Target scroll point: when the alkaline container is roughly in the middle of the screen
        const targetScroll = initialTargetTop - (window.innerHeight / 2) + (targetContainer.offsetHeight / 2);
        
        let progress = 0;
        if (targetScroll > 0) {
            progress = scrollY / targetScroll;
        }
        
        // Cap progress at 1. 
        // Once progress is 1, translateY stops increasing, meaning the bottle now scrolls naturally with the document!
        progress = Math.max(0, Math.min(1, progress));
        
        const totalDistanceY = initialTargetTop - initialBottleTop;
        const translateY = totalDistanceY * progress;
        
        const currentScale = initialScale - ((initialScale - targetScale) * progress);
        
        bottle.style.zIndex = '100';
        bottle.style.transform = `translateY(${translateY}px) scale(${currentScale})`;

        // Text split animation
        const textFoot = document.getElementById('text-foot');
        const textHills = document.getElementById('text-hills');
        
        if (textFoot && textHills) {
            // Text joins within the first 400px of scroll
            const textTargetScroll = Math.min(400, window.innerHeight * 0.5);
            let textProgress = scrollY / textTargetScroll;
            textProgress = Math.max(0, Math.min(1, textProgress));
            
            // Max split distance (pixels) when at top
            const maxSplit = 110; // 110px on each side makes a half gap
            const currentSplit = maxSplit * (1 - textProgress);
            
            textFoot.style.transform = `translateX(-${currentSplit}px)`;
            textHills.style.transform = `translateX(${currentSplit}px)`;
        }
    });

    // Trigger initial calculation and text position
    window.dispatchEvent(new Event('scroll'));

    // Button Modals
    const buttons = document.querySelectorAll('.btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = btn.innerText.trim().toUpperCase();
            
            if (text.includes('SHOP NOW') || text.includes('ORDER NOW')) {
                // Redirect to Choose Your Supply
                const pricingSection = document.getElementById('pricing-section');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (text.includes('LAB REPORTS')) {
                modalTitle.innerText = 'Lab Reports';
                modalDesc.innerText = 'Downloading the latest 100% transparent lab reports for this batch...';
                if (modalBackdrop) modalBackdrop.style.display = 'flex';
            } else {
                modalTitle.innerText = 'Learn More';
                modalDesc.innerText = 'Explore more details about our natural mineral water.';
                if (modalBackdrop) modalBackdrop.style.display = 'flex';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modalBackdrop.style.display = 'none';
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.style.display = 'none';
            }
        });
    }

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
