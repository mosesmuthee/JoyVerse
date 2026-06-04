// Supabase Configuration (Moses: Replace these with your actual keys from Supabase project settings)
const SUPABASE_URL = 'https://agaesttykyitufpeizai.supabase.co';
const SUPABASE_KEY = 'sb_publishable_KTJzb_1nSaz4olHmtzAEbg_5lAM8E1W';
let supabase = null;

if (typeof supabasejs !== 'undefined') {
    supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Data Fetching Helpers
async function fetchFutureGoals() {
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('future_goals')
        .select('*')
        .order('created_at', { ascending: true });
    
    if (error) {
        console.error('Error fetching goals:', error);
        return [];
    }
    return data;
}

async function saveNewGoal(goalText) {
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('future_goals')
        .insert([{ text: goalText, is_checked: false }])
        .select();
    
    if (error) {
        console.error('Error saving goal:', error);
        return null;
    }
    return data[0];
}

async function toggleGoalCheck(goalId, isChecked) {
    if (!supabase) return;
    const { error } = await supabase
        .from('future_goals')
        .update({ is_checked: isChecked })
        .eq('id', goalId);
    
    if (error) console.error('Error updating goal:', error);
}

// global.js — Music System & Shared Logic

const MusicSystem = {
  bgAudio   : null,
  outroAudio: null,

  init(bgSrc, outroSrc) {
    if (this.bgAudio) {
        this.bgAudio.pause();
    }
    this.bgAudio    = new Audio(bgSrc);
    this.outroAudio = new Audio(outroSrc);
    this.bgAudio.loop   = true;
    this.bgAudio.volume = 0.35;
  },

  play() {
    if (!this.bgAudio) return;
    const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
    this.bgAudio.currentTime = savedTime;
    this.bgAudio.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
    });
  },

  saveTime() {
    if (this.bgAudio) localStorage.setItem('musicTime', this.bgAudio.currentTime);
  },

  toggle() {
    if (!this.bgAudio) return;
    if (this.bgAudio.paused) {
        this.bgAudio.play();
        document.getElementById('musicToggleBtn').textContent = '🎵';
    } else {
        this.bgAudio.pause();
        document.getElementById('musicToggleBtn').textContent = '🔇';
    }
  },

  fadeToOutro() {
    const fade = setInterval(() => {
      if (this.bgAudio.volume > 0.05) {
        this.bgAudio.volume -= 0.03;
      } else {
        this.bgAudio.pause();
        this.outroAudio.volume = 0;
        this.outroAudio.play();
        const fadeIn = setInterval(() => {
          if (this.outroAudio.volume < 0.9) this.outroAudio.volume += 0.04;
          else clearInterval(fadeIn);
        }, 120);
        clearInterval(fade);
      }
    }, 120);
  }
};

// Save music position before navigating away
window.addEventListener('beforeunload', () => MusicSystem.saveTime());

// Resume music on page load (if a path has been chosen)
window.addEventListener('load', () => {
  const path = localStorage.getItem('joyPath'); // 'birthday' or 'friendship'
  if (!path) return;
  const bgSrc    = path === 'birthday'
                   ? 'music/birthday/bday-intro.mp3'
                   : 'music/friendship/friend-intro.mp3';
  const outroSrc = path === 'birthday'
                   ? 'music/birthday/bday-outro.mp3'
                   : 'music/friendship/friend-outro.mp3';
  MusicSystem.init(bgSrc, outroSrc);
  MusicSystem.play();
});

// Smooth fade-out transition before navigating to next page
function navigateTo(url, delay = 600) {
  document.body.classList.add('animate__animated', 'animate__fadeOut');
  setTimeout(() => {
    MusicSystem.saveTime();
    window.location.href = url;
  }, delay);
}

// Particles Configs
function createFloralRain() {
    const container = document.createElement('div');
    container.className = 'flower-container';
    document.body.appendChild(container);

    const flowerTypes = [
        'flower-red-rose', 
        'flower-white-rose', 
        'flower-purple-rose', 
        'flower-black-gold', 
        'flower-tulip'
    ];

    setInterval(() => {
        const flower = document.createElement('div');
        const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        const size = Math.random() * 20 + 20; // 20px to 40px
        const left = Math.random() * 100; // 0 to 100vw
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 2;

        flower.className = `flower ${type}`;
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.left = `${left}vw`;
        flower.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(flower);

        // Cleanup
        setTimeout(() => {
            flower.remove();
        }, (duration + delay) * 1000);
    }, 400);
}

// Fade-in on every page load
window.addEventListener('load', () => {
    document.body.classList.add('animate__animated', 'animate__fadeIn');
    createFloralRain();
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: true, offset: 80 });
    }
});

// Particles Configs
function launchHearts(containerId) {
  if (typeof particlesJS !== 'undefined') {
    particlesJS(containerId, {
      particles: {
        number: { value: 60 },
        color: { value: ["#F4A7B9", "#D4A017", "#E8A0BF"] },
        shape: { type: "heart" },
        opacity: { value: 0.6, random: true },
        size: { value: 8, random: true },
        move: { enable: true, speed: 2, direction: "top", out_mode: "out" }
      },
      interactivity: { events: { onhover: { enable: false } } }
    });
  }
}

function launchStars(containerId) {
    if (typeof particlesJS !== 'undefined') {
      particlesJS(containerId, {
        particles: {
          number: { value: 80 },
          color: { value: "#D4A017" },
          shape: { type: "star" },
          opacity: { value: 0.5, random: true },
          size: { value: 4, random: true },
          move: { enable: true, speed: 1.5, direction: "none" }
        }
      });
    }
}

function launchPetals(containerId) {
    if (typeof particlesJS !== 'undefined') {
      particlesJS(containerId, {
        particles: {
          number: { value: 50 },
          color: { value: ["#E8A0BF", "#7B5EA7", "#B5D5C5"] },
          shape: { type: "circle" },
          opacity: { value: 0.4, random: true },
          size: { value: 6, random: true },
          move: { enable: true, speed: 1.5, direction: "bottom", out_mode: "out" }
        }
      });
    }
}
