// friend.js — Friendship Path Specific Logic

// Timeline Data
const timelineData = {
  month1: {
    label   : "Month 1",
    title   : "[MOSES FILLS — e.g. The Beginning 🌱]",
    teaser  : "[MOSES FILLS — 1 sentence]",
    story   : "[MOSES FILLS — full story, 3-5 sentences]",
    img     : "images/us/us-1.jpg"
  },
  // Add more months here
};

function openTimelineEntry(month) {
  const d = timelineData[month];
  if (!d) return;
  Swal.fire({
    title: d.title,
    html : `<img src="${d.img}" style="width:100%;border-radius:12px;
            margin-bottom:14px;"><p style="text-align:left">${d.story}</p>`,
    confirmButtonText: 'Next ❤️',
    confirmButtonColor: '#7B5EA7'
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
