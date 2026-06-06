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

    init(bgSrc, playlist = []) {
        console.log('🎵 MusicSystem: Init with', bgSrc);
        
        // If already playing the correct song, just resume if paused
        if (this.currentSrc === bgSrc && this.bgAudio) {
            this.play();
            return;
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

        // Playlist progression
        if (this.playlist.length > 0) {
            this.bgAudio.addEventListener('ended', () => {
                this.playNext();
            });
        }
        
        const savedMute = localStorage.getItem('musicMuted') === 'true';
        this.isMuted = savedMute;
        this.bgAudio.volume = this.isMuted ? 0 : 0.35;
        
        const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
        if (savedTime > 0) this.bgAudio.currentTime = savedTime;

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
    },

    play() {
        if (!this.bgAudio || this.forcedPause) return;
        
        // Attempt play, if it fails due to autoplay policy, wait for user click
        this.bgAudio.play().then(() => {
            console.log('🎵 MusicSystem: Playing');
            this.updateToggleButton();
        }).catch(e => {
            console.warn('🎵 MusicSystem: Play deferred (autoplay policy).', e);
        });
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
            this.bgAudio.play();
        } else {
            this.bgAudio.pause();
            localStorage.setItem('musicPlaying', 'false');
        }
        this.updateToggleButton();
    },

    updateToggleButton() {
        const btn = document.getElementById('musicToggleBtn');
        if (!btn) return;
        btn.textContent = (this.bgAudio && !this.bgAudio.paused) ? '🎵' : '🔇';
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
}

// Ensure init runs after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageMusic);
} else {
    initPageMusic();
}

// Resume music on click/tab interaction
document.addEventListener('click', () => {
    localStorage.setItem('musicPlaying', 'true');
    MusicSystem.play();
}, { once: true });

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && localStorage.getItem('musicPlaying') === 'true') {
        MusicSystem.play();
    }
});

window.addEventListener('beforeunload', () => MusicSystem.saveState());

function navigateTo(url, delay = 600) {
    MusicSystem.saveState();
    document.body.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

