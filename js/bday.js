// bday.js — Birthday Path Specific Logic

// Countdown Timer logic
const JOY_BIRTHDAY = new Date('2026-06-03T00:00:00'); // [MOSES FILLS: YYYY-MM-DD]

function updateCounter() {
  const now  = new Date();
  const diff = now - JOY_BIRTHDAY;
  if (isNaN(diff)) return;

  const yrs  = Math.floor(diff / (365.25 * 24 * 3600 * 1000));
  const days = Math.floor((diff % (365.25*24*3600*1000)) / (24*3600*1000));
  const hrs  = Math.floor((diff % (24*3600*1000)) / (3600*1000));
  const mins = Math.floor((diff % (3600*1000)) / (60*1000));
  const secs = Math.floor((diff % (60*1000)) / 1000);

  const yrsEl = document.getElementById('cnt-yrs');
  if (yrsEl) yrsEl.textContent = yrs;
  const daysEl = document.getElementById('cnt-days');
  if (daysEl) daysEl.textContent = days;
  const hrsEl = document.getElementById('cnt-hrs');
  if (hrsEl) hrsEl.textContent = hrs;
  const minsEl = document.getElementById('cnt-mins');
  if (minsEl) minsEl.textContent = mins;
  const secsEl = document.getElementById('cnt-secs');
  if (secsEl) secsEl.textContent = secs;
}

if (document.getElementById('cnt-yrs')) {
    setInterval(updateCounter, 1000);
    updateCounter();
}

// Memory Wall Data
const bdayMemories = {
  m1: {
    title: "[MOSES FILLS: Memory Title]",
    text : "[MOSES FILLS: Full memory, 2-4 sentences]",
    img  : "images/joy/joy-2.webp"
  },
  // Add more memories here
};

function openMemory(id) {
  const m = bdayMemories[id];
  if (!m) return;
  Swal.fire({
    title: m.title,
    html : `<img src="${m.img}" style="width:100%;border-radius:12px;
            margin-bottom:12px;"><p style="text-align:left">${m.text}</p>`,
    confirmButtonText: '💛 Close',
    confirmButtonColor: '#D4A017'
  });
}

// Secret Messages
const bdaySecrets = {
    1: { title: "[MOSES FILLS]", text: "[MOSES FILLS — inside joke/message]" },
    2: { title: "[MOSES FILLS]", text: "[MOSES FILLS]" },
    3: { title: "[MOSES FILLS]", text: "[MOSES FILLS]" }
};

function openSecret(n) {
    if (!bdaySecrets[n]) return;
    Swal.fire({
      icon: 'heart', title: bdaySecrets[n].title, text: bdaySecrets[n].text,
      confirmButtonText: '💕 Aww', confirmButtonColor: '#F4A7B9'
    });
}

// Gift Box Logic
function openGift() {
    const giftBox = document.getElementById('giftBox');
    if (!giftBox) return;
    giftBox.classList.add('open');
    
    setTimeout(() => {
        confetti({ 
            particleCount: 350, 
            spread: 200,
            origin: { y: 0.5 },
            colors: ['#D4A017','#F4A7B9','#8B1A2F','#fff','#FFD700'] 
        });
        
        const quizSection = document.getElementById('quizSection');
        if (quizSection) quizSection.classList.remove('hidden');
        const closingSection = document.getElementById('closingSection');
        if (closingSection) closingSection.classList.remove('hidden');

        Swal.fire({
            title: 'Happy Birthday, Joy! 🎂',
            html: '[MOSES WRITES: Gift message — 2-3 warm sentences]',
            imageUrl: 'images/joy/joy-1.webp',
            imageWidth: 220, imageAltText: 'Joy',
            confirmButtonText: '💛 Thank you',
            confirmButtonColor: '#D4A017'
        });
    }, 400);
}

