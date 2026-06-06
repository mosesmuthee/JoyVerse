const photos = [
    'images/us/IMG20260108183729.jpg', 'images/us/IMG20260108183730.jpg', 'images/us/IMG20260108183731.jpg', 'images/us/IMG20260108183744.jpg', 'images/us/IMG20260108183746.jpg', 'images/us/IMG20260108183749.jpg', 'images/us/IMG20260108183751.jpg', 'images/us/IMG20260108183752.jpg', 'images/us/IMG20260109210630.jpg', 'images/us/IMG20260109210632.jpg', 'images/us/IMG20260109210633.jpg', 'images/us/IMG20260109210636.jpg', 'images/us/IMG20260109210637.jpg', 'images/us/IMG20260118124411.jpg', 'images/us/IMG20260118124412.jpg', 'images/us/IMG20260121211217.jpg', 'images/us/IMG20260121211232.jpg', 'images/us/IMG20260121211235.jpg', 'images/us/IMG20260124134812.jpg', 'images/us/IMG20260124134824.jpg', 'images/us/IMG20260124134826.jpg', 'images/us/IMG20260124134829.jpg', 'images/us/IMG20260124134831.jpg', 'images/us/IMG20260124134847.jpg', 'images/us/IMG20260124134849.jpg', 'images/us/IMG20260124134852.jpg', 'images/us/IMG20260125185714.jpg', 'images/us/IMG20260125185716.jpg', 'images/us/IMG20260125185750.jpg', 'images/us/IMG20260125185753.jpg', 'images/us/IMG20260125185754.jpg', 'images/us/IMG20260208133536.jpg', 'images/us/IMG20260208133538.jpg', 'images/us/IMG20260208133541.jpg', 'images/us/IMG20260208133815.jpg', 'images/us/IMG20260208133818.jpg', 'images/us/IMG20260208133820.jpg', 'images/us/IMG20260208133822.jpg', 'images/us/IMG20260208133825.jpg', 'images/us/IMG20260208133829.jpg', 'images/us/IMG20260208133830.jpg', 'images/us/IMG20260308161732.jpg', 'images/us/IMG20260308161744.jpg', 'images/us/IMG20260308161747.jpg', 'images/us/IMG20260308161751.jpg', 'images/us/IMG20260308161807.jpg', 'images/us/IMG20260308161811.jpg', 'images/us/IMG20260308161817.jpg', 'images/us/IMG20260308161818.jpg', 'images/us/IMG20260308161820.jpg', 'images/us/IMG20260315072717.jpg', 'images/us/IMG20260315072720.jpg', 'images/us/IMG20260330171115.jpg', 'images/us/IMG20260330171117.jpg', 'images/us/IMG20260330171121.jpg', 'images/us/IMG20260330171124.jpg', 'images/us/IMG20260330171125.jpg', 'images/us/IMG20260330171127.jpg', 'images/us/IMG20260330171128.jpg', 'images/us/IMG20260404110805.jpg', 'images/us/IMG20260404110807.jpg', 'images/us/IMG20260404110810.jpg', 'images/us/IMG20260404110948.jpg', 'images/us/IMG20260404110950.jpg', 'images/us/IMG20260404110955.jpg', 'images/us/IMG20260404110957.jpg', 'images/us/IMG20260404110959.jpg', 'images/us/IMG20260404111001.jpg', 'images/us/IMG20260404111005.jpg', 'images/us/IMG20260404111007.jpg', 'images/us/IMG20260404112817.jpg', 'images/us/IMG20260404112821.jpg', 'images/us/IMG20260404112822.jpg', 'images/us/IMG20260412153151.jpg', 'images/us/IMG20260412153155.jpg', 'images/us/IMG20260419151631.jpg', 'images/us/IMG20260419151633.jpg', 'images/us/IMG20260419151634.jpg', 'images/us/IMG20260419151706.jpg', 'images/us/IMG20260419151708.jpg', 'images/us/IMG20260419151712.jpg', 'images/us/IMG20260419151726.jpg', 'images/us/IMG20260419151727.jpg', 'images/us/IMG20260419151728.jpg', 'images/us/IMG20260419151730.jpg', 'images/us/IMG20260419151731.jpg', 'images/us/IMG20260419154926.jpg', 'images/us/IMG20260419154928.jpg', 'images/us/IMG20260419154943.jpg', 'images/us/IMG20260419154946.jpg', 'images/us/IMG20260426174451.jpg', 'images/us/IMG20260426174455.jpg', 'images/us/IMG20260426174549.jpg', 'images/us/IMG20260426174557.jpg', 'images/us/IMG20260426174558.jpg', 'images/us/IMG20260426174601.jpg', 'images/us/IMG20260426174602.jpg', 'images/us/IMG20260426174621.jpg', 'images/us/IMG20260426174624.jpg', 'images/us/IMG20260426174627.jpg', 'images/us/IMG20260426174640.jpg', 'images/us/IMG20260426174651.jpg', 'images/us/IMG20260426174654.jpg', 'images/us/IMG20260426174656.jpg', 'images/us/IMG20260426174659.jpg', 'images/us/IMG20260426174701.jpg', 'images/us/IMG20260426174826.jpg', 'images/us/IMG20260426174829.jpg', 'images/us/IMG20260426174830.jpg', 'images/us/IMG20260426175200.jpg', 'images/us/IMG20260426175202.jpg', 'images/us/IMG20260504124941.jpg', 'images/us/IMG20260504124951.jpg', 'images/us/IMG20260504124954.jpg', 'images/us/IMG20260504124957.jpg', 'images/us/IMG20260504124959.jpg', 'images/us/IMG20260504125004.jpg', 'images/us/IMG20260504125005.jpg', 'images/us/IMG20260524084457.jpg', 'images/us/IMG20260605180543.jpg', 'images/us/IMG20260605180549.jpg'
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
