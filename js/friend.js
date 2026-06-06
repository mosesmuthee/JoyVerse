const photos = [
    'images/us/IMG20260108183729.webp', 'images/us/IMG20260108183730.webp', 'images/us/IMG20260108183731.webp', 'images/us/IMG20260108183744.webp', 'images/us/IMG20260108183746.webp', 'images/us/IMG20260108183749.webp', 'images/us/IMG20260108183751.webp', 'images/us/IMG20260108183752.webp', 'images/us/IMG20260109210630.webp', 'images/us/IMG20260109210632.webp', 'images/us/IMG20260109210633.webp', 'images/us/IMG20260109210636.webp', 'images/us/IMG20260109210637.webp', 'images/us/IMG20260118124411.webp', 'images/us/IMG20260118124412.webp', 'images/us/IMG20260121211217.webp', 'images/us/IMG20260121211232.webp', 'images/us/IMG20260121211235.webp', 'images/us/IMG20260124134812.webp', 'images/us/IMG20260124134824.webp', 'images/us/IMG20260124134826.webp', 'images/us/IMG20260124134829.webp', 'images/us/IMG20260124134831.webp', 'images/us/IMG20260124134847.webp', 'images/us/IMG20260124134849.webp', 'images/us/IMG20260124134852.webp', 'images/us/IMG20260125185714.webp', 'images/us/IMG20260125185716.webp', 'images/us/IMG20260125185750.webp', 'images/us/IMG20260125185753.webp', 'images/us/IMG20260125185754.webp', 'images/us/IMG20260208133536.webp', 'images/us/IMG20260208133538.webp', 'images/us/IMG20260208133541.webp', 'images/us/IMG20260208133815.webp', 'images/us/IMG20260208133818.webp', 'images/us/IMG20260208133820.webp', 'images/us/IMG20260208133822.webp', 'images/us/IMG20260208133825.webp', 'images/us/IMG20260208133829.webp', 'images/us/IMG20260208133830.webp', 'images/us/IMG20260308161732.webp', 'images/us/IMG20260308161744.webp', 'images/us/IMG20260308161747.webp', 'images/us/IMG20260308161751.webp', 'images/us/IMG20260308161807.webp', 'images/us/IMG20260308161811.webp', 'images/us/IMG20260308161817.webp', 'images/us/IMG20260308161818.webp', 'images/us/IMG20260308161820.webp', 'images/us/IMG20260315072717.webp', 'images/us/IMG20260315072720.webp', 'images/us/IMG20260330171115.webp', 'images/us/IMG20260330171117.webp', 'images/us/IMG20260330171121.webp', 'images/us/IMG20260330171124.webp', 'images/us/IMG20260330171125.webp', 'images/us/IMG20260330171127.webp', 'images/us/IMG20260330171128.webp', 'images/us/IMG20260404110805.webp', 'images/us/IMG20260404110807.webp', 'images/us/IMG20260404110810.webp', 'images/us/IMG20260404110948.webp', 'images/us/IMG20260404110950.webp', 'images/us/IMG20260404110955.webp', 'images/us/IMG20260404110957.webp', 'images/us/IMG20260404110959.webp', 'images/us/IMG20260404111001.webp', 'images/us/IMG20260404111005.webp', 'images/us/IMG20260404111007.webp', 'images/us/IMG20260404112817.webp', 'images/us/IMG20260404112821.webp', 'images/us/IMG20260404112822.webp', 'images/us/IMG20260412153151.webp', 'images/us/IMG20260412153155.webp', 'images/us/IMG20260419151631.webp', 'images/us/IMG20260419151633.webp', 'images/us/IMG20260419151634.webp', 'images/us/IMG20260419151706.webp', 'images/us/IMG20260419151708.webp', 'images/us/IMG20260419151712.webp', 'images/us/IMG20260419151726.webp', 'images/us/IMG20260419151727.webp', 'images/us/IMG20260419151728.webp', 'images/us/IMG20260419151730.webp', 'images/us/IMG20260419151731.webp', 'images/us/IMG20260419154926.webp', 'images/us/IMG20260419154928.webp', 'images/us/IMG20260419154943.webp', 'images/us/IMG20260419154946.webp', 'images/us/IMG20260426174451.webp', 'images/us/IMG20260426174455.webp', 'images/us/IMG20260426174549.webp', 'images/us/IMG20260426174557.webp', 'images/us/IMG20260426174558.webp', 'images/us/IMG20260426174601.webp', 'images/us/IMG20260426174602.webp', 'images/us/IMG20260426174621.webp', 'images/us/IMG20260426174624.webp', 'images/us/IMG20260426174627.webp', 'images/us/IMG20260426174640.webp', 'images/us/IMG20260426174651.webp', 'images/us/IMG20260426174654.webp', 'images/us/IMG20260426174656.webp', 'images/us/IMG20260426174659.webp', 'images/us/IMG20260426174701.webp', 'images/us/IMG20260426174826.webp', 'images/us/IMG20260426174829.webp', 'images/us/IMG20260426174830.webp', 'images/us/IMG20260426175200.webp', 'images/us/IMG20260426175202.webp', 'images/us/IMG20260504124941.webp', 'images/us/IMG20260504124951.webp', 'images/us/IMG20260504124954.webp', 'images/us/IMG20260504124957.webp', 'images/us/IMG20260504124959.webp', 'images/us/IMG20260504125004.webp', 'images/us/IMG20260504125005.webp', 'images/us/IMG20260524084457.webp', 'images/us/IMG20260605180543.webp', 'images/us/IMG20260605180549.webp'
];

function createPhoto() {
    const container = document.getElementById('rainContainer');
    const img = document.createElement('img');
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.className = 'falling-photo';
    
    const startX = Math.random() * window.innerWidth;
    const duration = 10 + Math.random() * 5;
    
    gsap.set(img, { x: startX, y: -200, opacity: 0 });
    container.appendChild(img);
    
    gsap.to(img, {
        y: window.innerHeight + 200,
        opacity: 0.5,
        duration: duration,
        ease: "none",
        onComplete: () => img.remove()
    });
    }

window.addEventListener('load', () => {
    setInterval(createPhoto, 1500);
    AOS.init({ duration: 1000, once: true });
    gsap.timeline()
        .from('#friendTitle',    { opacity:0, y:50, duration:1.2, delay:0.4 })
        .from('#friendSubtitle', { opacity:0, y:30, duration:0.9 }, '-=0.3')
        .from('#friendStats',    { opacity:0, scale:0.9, duration:0.8 }, '-=0.2');
});

