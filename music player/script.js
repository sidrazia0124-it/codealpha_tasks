// Complete Unified Track List Array (Online links ke sath)
const trackList = [
    {
        title: "Cyberbeats Retro",
        artist: "Tech Wave",
        art: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Future Producer",
        artist: "Cyber Beats",
        art: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        art: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        art: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        art: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
];

// Selecting DOM Elements
const mainAudio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const playPauseDiv = document.querySelector('.play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const currentTimeSpan = document.getElementById('current-time');
const durationTimeSpan = document.getElementById('duration-time');
const trackArt = document.getElementById('track-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');

const volumeSlider = document.getElementById('volume-slider');
const volumePercentage = document.getElementById('volume-percentage');
const volumeIcon = document.getElementById('volume-icon');

let trackIndex = 0;
let isPlaying = false;

// Load a track function
function loadTrack(index) {
    const currentTrack = trackList[index];
    mainAudio.src = currentTrack.url;
    trackTitle.textContent = currentTrack.title;
    trackArtist.textContent = currentTrack.artist;
    trackArt.src = currentTrack.art;
}

// Play / Pause Functions
function playTrack() {
    isPlaying = true;
    mainAudio.play().catch(error => console.log("Playback error:", error));
    playBtn.className = "fas fa-pause";
}

function pauseTrack() {
    isPlaying = false;
    mainAudio.pause();
    playBtn.className = "fas fa-play";
}

playPauseDiv.addEventListener('click', () => {
    isPlaying ? pauseTrack() : playTrack();
});

// Next & Previous Handlers
function nextTrack() {
    trackIndex = (trackIndex + 1) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Direct click from playlist layout (Sahi se connect karne ke liye)
window.playTrackDirect = function(index) {
    trackIndex = index;
    loadTrack(trackIndex);
    playTrack();
}

// Update Timeline Progress bar
mainAudio.addEventListener('timeupdate', () => {
    if (mainAudio.duration) {
        const progressPercentage = (mainAudio.currentTime / mainAudio.duration) * 100;
        progressBar.value = progressPercentage;

        let currentMins = Math.floor(mainAudio.currentTime / 60);
        let currentSecs = Math.floor(mainAudio.currentTime % 60);
        if (currentSecs < 10) currentSecs = `0${currentSecs}`;
        currentTimeSpan.textContent = `${currentMins}:${currentSecs}`;
    }
});

// Seek Track when slider drags
progressBar.addEventListener('input', () => {
    if (mainAudio.duration) {
        mainAudio.currentTime = (progressBar.value / 100) * mainAudio.duration;
    }
});

// Update Duration Meta Info once loaded
mainAudio.addEventListener('loadedmetadata', () => {
    let durationMins = Math.floor(mainAudio.duration / 60);
    let durationSecs = Math.floor(mainAudio.duration % 60);
    if (durationSecs < 10) durationSecs = `0${durationSecs}`;
    durationTimeSpan.textContent = `${durationMins}:${durationSecs}`;
});

// Auto-play next track when current one ends
mainAudio.addEventListener('ended', nextTrack);

// Integrated Volume Core Control Event
if(volumeSlider) {
    mainAudio.volume = volumeSlider.value / 100;
    volumeSlider.addEventListener('input', (e) => {
        let volumeValue = e.target.value;
        volumePercentage.textContent = `${volumeValue}%`;
        mainAudio.volume = volumeValue / 100;
        
        if (volumeValue == 0) {
            volumeIcon.className = "fas fa-volume-mute";
            volumeIcon.style.color = "#ef4444";
        } else if (volumeValue < 50) {
            volumeIcon.className = "fas fa-volume-down";
            volumeIcon.style.color = "#9ca3af";
        } else {
            volumeIcon.className = "fas fa-volume-up";
            volumeIcon.style.color = "#a855f7";
        }
    });
}

// Startup Initialization
loadTrack(trackIndex);