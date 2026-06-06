/*
// Supabase Configuration
const SUPABASE_URL = 'https://agaesttykyitufpeizai.supabase.co';
const SUPABASE_KEY = 'sb_publishable_KTJzb_1nSaz4olHmtzAEbg_5lAM8E1W';
let supabase = null;

if (typeof supabasejs !== 'undefined') {
    supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_KEY);
}
*/

// Data Fetching Helpers (Local Storage Fallback)
async function fetchFutureGoals() {
    const goals = JSON.parse(localStorage.getItem('joyFutureGoals') || '[]');
    return goals;
}

async function saveNewGoal(goalText) {
    const goals = JSON.parse(localStorage.getItem('joyFutureGoals') || '[]');
    const newGoal = { id: Date.now(), text: goalText, is_checked: false };
    goals.push(newGoal);
    localStorage.setItem('joyFutureGoals', JSON.stringify(goals));
    return newGoal;
}

async function toggleGoalCheck(goalId, isChecked) {
    const goals = JSON.parse(localStorage.getItem('joyFutureGoals') || '[]');
    const updatedGoals = goals.map(g => g.id === goalId ? { ...g, is_checked: isChecked } : g);
    localStorage.setItem('joyFutureGoals', JSON.stringify(updatedGoals));
}

// ── Music System ──────────────────────────────────────────────────────────────
const MusicSystem = {
    bgAudio   : null,
    isMuted   : false,
    currentSrc: null,
    playlist: [],
    currentIndex: 0,
    forcedPause: false,
    heartbeatInterval: null,

    init(bgSrc, playlist = []) {
        console.log('🎵 MusicSystem: Init with', bgSrc);
        
        // If already initialized with the SAME source, do NOT restart.
        if (this.currentSrc === bgSrc && this.bgAudio && !this.bgAudio.paused) {
            console.log('🎵 MusicSystem: Already flowing. No-op.');
            return;
        }

        // Logic to decide if we reset time (jumping worlds) or continue (within same world)
        const isBdaySong = bgSrc.includes('music/birthday/');
        const wasBdaySong = this.currentSrc && this.currentSrc.includes('music/birthday/');
        const isFriendSong = bgSrc.includes('music/friendship/');
        const wasFriendSong = this.currentSrc && this.currentSrc.includes('music/friendship/');
        const stayingInWorld = (isBdaySong && wasBdaySong) || (isFriendSong && wasFriendSong);

        // Reset timer only if jumping worlds or track changes (unless playlist refresh)
        if (this.currentSrc && this.currentSrc !== bgSrc && !stayingInWorld) {
            console.log('🎵 MusicSystem: World jump detected. Resetting time.');
            localStorage.setItem('musicTime', '0');
        }

        if (this.bgAudio) {
            this.bgAudio.pause();
            this.bgAudio.src = '';
            this.bgAudio = null;
        }
        
        this.currentSrc = bgSrc;
        this.playlist = playlist;
        this.bgAudio = new Audio(bgSrc);
        
        this.bgAudio.loop = (this.playlist.length === 0);
        this.bgAudio.volume = 0.35;

        // Special handling for Billion Reasons
        if (bgSrc.includes('billion-reasons.mp3')) {
            this.bgAudio.loop = false;
            this.bgAudio.addEventListener('timeupdate', () => {
                const duration = this.bgAudio.duration;
                if (!isNaN(duration) && duration > 10 && this.bgAudio.currentTime > 5) {
                    if (this.bgAudio.currentTime >= duration - 6.1) {
                        this.bgAudio.currentTime = 0;
                        this.bgAudio.play().catch(() => {});
                    }
                }
            });
        }

        if (this.playlist.length > 0) {
            this.bgAudio.addEventListener('ended', () => {
                console.log('🎵 MusicSystem: Song ended. Advancing.');
                this.playNext();
            });
        }
        
        const savedMute = localStorage.getItem('musicMuted') === 'true';
        this.isMuted = savedMute;
        this.bgAudio.volume = this.isMuted ? 0 : 0.35;
        
        // HEARTBEAT SAVE: Save position every second to localStorage
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => {
            if (this.bgAudio && !this.bgAudio.paused) {
                localStorage.setItem('musicTime', this.bgAudio.currentTime);
            }
        }, 1000);

        this.updateToggleButton();
        this.play();
    },

    playNext() {
        if (this.playlist.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        const nextSrc = this.playlist[this.currentIndex];
        localStorage.setItem('musicTime', '0');
        localStorage.setItem('musicCurrentSrc', nextSrc);
        this.init(nextSrc, this.playlist);
        this.play();
    },

    play() {
        if (!this.bgAudio || this.forcedPause) return;
        const shouldPlay = localStorage.getItem('musicPlaying') === 'true';
        if (!shouldPlay) return;

        const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
        
        // Seek to saved time once metadata is ready
        if (this.bgAudio.paused) {
            const resumeAudio = () => {
                if (savedTime > 0 && this.bgAudio.duration > 0 && savedTime < this.bgAudio.duration - 1) {
                    this.bgAudio.currentTime = savedTime;
                }
                this.bgAudio.play().then(() => {
                    this.updateToggleButton();
                }).catch(e => {
                    console.warn('🎵 MusicSystem: Play deferred.', e);
                });
            };

            if (this.bgAudio.readyState >= 1) {
                resumeAudio();
            } else {
                this.bgAudio.addEventListener('loadedmetadata', resumeAudio, { once: true });
            }
        }
    },

    pause() {
        if (this.bgAudio) this.bgAudio.pause();
    },

    saveState() {
        if (this.bgAudio) {
            localStorage.setItem('musicTime', this.bgAudio.currentTime);
            localStorage.setItem('musicPlaying', !this.bgAudio.paused && !this.forcedPause);
            localStorage.setItem('musicMuted', this.isMuted);
            localStorage.setItem('musicCurrentSrc', this.currentSrc);
        }
    },

    toggle() {
        if (!this.bgAudio) return;
        if (this.bgAudio.paused) {
            this.isMuted = false;
            this.bgAudio.volume = 0.35;
            localStorage.setItem('musicPlaying', 'true');
            this.play();
        } else {
            this.bgAudio.pause();
            localStorage.setItem('musicPlaying', 'false');
            this.updateToggleButton();
        }
    },

    updateToggleButton() {
        const btn = document.getElementById('musicToggleBtn');
        if (!btn) return;
        if (this.bgAudio && !this.bgAudio.paused) {
            btn.textContent = '🎵';
            btn.classList.add('playing');
        } else {
            btn.textContent = '🔇';
            btn.classList.remove('playing');
        }
    }
};

// ── Shared Initialization ───────────────────────────────────────────────────
function initPageMusic() {
    const fileName = window.location.pathname.split('/').pop() || 'index.html';
    let bgSrc, playlist = [];

    const savedSrc = localStorage.getItem('musicCurrentSrc');
    const friendPlaylist = [
        'music/friendship/SAFE SPACE - Official Audio - Kinoti Kinyua (youtube).mp3',
        'music/friendship/CHAI YA SAA KUMI (LYRIC VIDEO)  - YWAYA TAJIRI - Ywaya Tajiri (youtube).mp3',
        'music/friendship/Mutoriah - βeta (Official Video).mp3'
    ];

    const bdayPlaylist = [
        'music/birthday/HAPPY Birthday Song, Happy Birthday to You.mp3',
        'music/birthday/Nakupenda Ulivyo ❤️  Just The Way You Are (Swahili Acoustic Love Song) - JustBasweti (youtube).mp3',
        'music/birthday/Busy Signal - Happy Birthday [Gorilla Music Source] (January 2024) - AndredFyah (New Releases) (youtube).mp3',
        'music/birthday/Plain White T\'s - Hey There Delilah (Lyrics) - Taj Tracks (youtube).mp3'
    ];

    if (fileName === 'friend-letter.html' || fileName === 'friend-finale.html') {
        bgSrc = 'music/friendship/pray - Kinoti (youtube).mp3';
    } else if (fileName === 'bday-prayer.html') {
        bgSrc = 'music/birthday/Birthday Prayer for JUNE Children by PastorEAAdeboye - Soundfloss Production (youtube).mp3';
    } else if (fileName === 'bday-photo-rain.html') {
        bgSrc = 'music/birthday/OCHIKO - LIKE YOU FT KINOTI (OFFICIAL AUDIO) - OCHIKO (youtube).mp3';
    } else if (fileName === 'bday-finale.html' || fileName === 'bday-wishes.html') {
        bgSrc = 'music/birthday/pray - Kinoti (youtube).mp3';
    } else if (fileName.startsWith('friend-')) {
        bgSrc = (savedSrc && friendPlaylist.includes(savedSrc)) ? savedSrc : friendPlaylist[0];
        playlist = friendPlaylist;
        MusicSystem.currentIndex = Math.max(0, friendPlaylist.indexOf(bgSrc));
    } else if (fileName.startsWith('bday-')) {
        bgSrc = (savedSrc && bdayPlaylist.includes(savedSrc)) ? savedSrc : bdayPlaylist[0];
        playlist = bdayPlaylist;
        MusicSystem.currentIndex = Math.max(0, bdayPlaylist.indexOf(bgSrc));
    } else {
        bgSrc = 'music/shared/billion-reasons.mp3';
    }

    MusicSystem.init(bgSrc, playlist);
    if (localStorage.getItem('musicPlaying') === 'true') {
        MusicSystem.play();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageMusic);
} else {
    initPageMusic();
}

window.addEventListener('load', () => {
    const musicBtn = document.getElementById('musicToggleBtn');
    if (musicBtn) musicBtn.onclick = () => MusicSystem.toggle();
    
    document.body.classList.add('animate__animated', 'animate__fadeIn');
    createFloralRain();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 900, once: true, offset: 80 });
});

document.addEventListener('click', () => {
    if (localStorage.getItem('musicPlaying') === 'true' && MusicSystem.bgAudio && MusicSystem.bgAudio.paused && !MusicSystem.forcedPause) {
        MusicSystem.play();
    }
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('Combined/');
    if (isIndex && MusicSystem.bgAudio && MusicSystem.bgAudio.paused) {
        localStorage.setItem('musicPlaying', 'true');
        MusicSystem.play();
    }
}, { once: false });

window.addEventListener('beforeunload', () => MusicSystem.saveState());
window.addEventListener('pagehide', () => MusicSystem.saveState());

function navigateTo(url, delay = 600) {
    document.body.classList.add('animate__animated', 'animate__fadeOut');
    MusicSystem.saveState();
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

// ── Visual Effects ────────────────────────────────────────────────────────────
function createFloralRain() {
    const container = document.createElement('div');
    container.className = 'flower-container';
    document.body.appendChild(container);
    const flowerTypes = ['flower-red-rose','flower-white-rose','flower-purple-rose','flower-black-gold','flower-tulip'];
    setInterval(() => {
        if (document.hidden) return;
        const flower   = document.createElement('div');
        const type     = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        const size     = Math.random() * 20 + 20;
        const left     = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const delay    = Math.random() * 2;
        flower.className       = `flower ${type}`;
        flower.style.width     = `${size}px`;
        flower.style.height    = `${size}px`;
        flower.style.left      = `${left}vw`;
        flower.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        if (container.children.length < 30) {
            container.appendChild(flower);
            setTimeout(() => flower.remove(), (duration + delay) * 1000);
        }
    }, 600);
}

function launchHearts(containerId) {
    if (typeof particlesJS !== 'undefined') {
        particlesJS(containerId, {
            particles: {
                number: { value: 40 },
                color:  { value: ['#F4A7B9','#D4A017','#E8A0BF'] },
                shape:  { type: 'heart' },
                opacity: { value: 0.6, random: true },
                size:    { value: 6, random: true },
                move:    { enable: true, speed: 2, direction: 'top', out_mode: 'out' }
            },
            interactivity: { events: { onhover: { enable: false } } }
        });
    }
}

function launchStars(containerId) {
    if (typeof particlesJS !== 'undefined') {
        particlesJS(containerId, {
            particles: {
                number: { value: 60 },
                color:  { value: '#D4A017' },
                shape:  { type: 'star' },
                opacity: { value: 0.5, random: true },
                size:    { value: 3, random: true },
                move:    { enable: true, speed: 1.5, direction: 'none' }
            }
        });
    }
}
