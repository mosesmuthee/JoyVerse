// friend.js — Friendship Path Specific Logic

// Timeline Data - 6 Months from Dec 2025 to May 2026
const timelineData = {
  month1: {
    label   : "December 2025",
    title   : "The Beginning 🌱",
    teaser  : "When our worlds first collided on the 7th.",
    story   : "December 7th, 2025, was the day the magic started. Meeting you changed everything, and from that very first moment, I knew there was something incredibly special about you. It was the best start to our story.",
    img     : "images/us/december.jpg"
  },
  month2: {
    label   : "January 2026",
    title   : "Finding Our Rhythm 🎵",
    teaser  : "Starting the new year with a new connection.",
    story   : "As we entered 2026, we started finding our own beautiful rhythm. We learned more about each other every day, and our connection grew from a spark into a steady, warm flame.",
    img     : "images/us/january.jpg"
  },
  month3: {
    label   : "February 2026",
    title   : "Deepening Bonds 💜",
    teaser  : "A month of warmth and growing trust.",
    story   : "February was about building a foundation. We shared our hearts, our dreams, and our vulnerabilities, and I realized just how much I can trust and rely on you. You became my favorite person.",
    img     : "images/us/february.jpg"
  },
  month4: {
    label   : "March 2026",
    title   : "Springing Forward 🌸",
    teaser  : "Like flowers in spring, our friendship blossomed.",
    story   : "March brought a new energy. Our relationship blossomed into something truly beautiful, and I couldn't imagine a single day without our chats, our laughs, and your presence in my life.",
    img     : "images/us/march.jpg"
  },
  month5: {
    label   : "April 2026",
    title   : "Unbreakable Connection 💎",
    teaser  : "Through the ups and downs, we stayed solid.",
    story   : "April proved just how strong we are together. We faced life's challenges hand-in-hand, and every hurdle only served to make our bond more unbreakable. You are my rock.",
    img     : "images/us/april.jpg"
  },
  month6: {
    label   : "May 2026",
    title   : "The Half-Year Mark 🥂",
    teaser  : "Celebrating 6 months of being us.",
    story   : "Six months of Joy and Moses. It’s been half a year of absolute happiness, and I’m so proud of the story we’ve written so far. This is still just the beginning of our forever.",
    img     : "images/us/may.jpg"
  }
};

function openTimelineEntry(month) {
  const d = timelineData[month];
  if (!d) return;
  Swal.fire({
    title: `<span style="color:#7B5EA7">${d.label}</span><br>${d.title}`,
    html : `<div class="p-2">
              <img src="${d.img}" onerror="this.src='https://via.placeholder.com/400x250?text=${d.label}'" 
                   style="width:100%; border-radius:15px; margin-bottom:15px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
              <p style="text-align:left; font-size:1.1rem; line-height:1.6; color:#f0e0d0;">${d.story}</p>
            </div>`,
    confirmButtonText: 'Beautiful ❤️',
    confirmButtonColor: '#7B5EA7',
    background: '#1a0d14',
    color: '#f0e0d0',
    showClass: { popup: 'animate__animated animate__zoomIn' },
    hideClass: { popup: 'animate__animated animate__fadeOut' }
  });
}

// Goal Checklist
function checkGoal(el) {
  el.classList.toggle('checked');
  const checkEl = el.querySelector('.goal-check');
  if (checkEl) {
      checkEl.textContent = el.classList.contains('checked') ? '☑' : '☐';
  }
  if (el.classList.contains('checked')) {
    confetti({ 
        particleCount: 30, 
        spread: 60, 
        origin: { y: 0.5 },
        colors: ['#7B5EA7', '#E8A0BF'] 
    });
  }
}

function addGoal() {
  const input = document.getElementById('goalInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  
  const goalList = document.getElementById('goalList');
  if (!goalList) return;

  const div = document.createElement('div');
  div.className = 'goal-item p-3 mb-2 glass-card cursor-pointer d-flex align-items-center';
  div.onclick = () => checkGoal(div);
  div.innerHTML = `<span class="goal-check me-3 fs-4">☐</span>
                   <span class="goal-text fs-5">${text} (Joy added this ❤️)</span>`;
  goalList.appendChild(div);
  input.value = '';
}

// Flip Card mobile support
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
});
