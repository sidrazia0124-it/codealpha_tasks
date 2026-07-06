// Sample Copyright-free Audio tracks online URLs for testing execution
const trackList = [
    {
        title: "Cyberbeats Retro",
        artist: "Tech Wave",
        art: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Neon Horizon",
        artist: "Synth Runner",
        art: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
];

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Create audio html5 element logic
const currTrack = document.createElement('audio');

const trackArt = document.getElementById('track-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const totalDuration = document.getElementById('total-duration');
const volumeSlider = document.getElementById('volume-slider');

// Track load logic mechanism
function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();

    currTrack.src = trackList[index].url;
    currTrack.load();

    trackArt.src = trackList[index].art;
    trackTitle.textContent = trackList[index].title;
    trackArtist.textContent = trackList[index].artist;

    // Checks background metadata track intervals
    updateTimer = setInterval(setUpdate, 1000);
    currTrack.addEventListener('ended', nextTrack);
}

function resetValues() {
    currentTime.textContent = "0:00";
    totalDuration.textContent = "0:00";
    progressBar.value = 0;
}

// Initial track load setup invocation
loadTrack(trackIndex);

function togglePlay() {
    if (!isPlaying) playMusic();
    else pauseMusic();
}

function playMusic() {
    currTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    trackArt.classList.add('rotate');
}

function pauseMusic() {
    currTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    trackArt.classList.remove('rotate');
}

function nextTrack() {
    if (trackIndex < trackList.length - 1) trackIndex += 1;
    else trackIndex = 0;
    loadTrack(trackIndex);
    playMusic();
}

function prevTrack() {
    if (trackIndex > 0) trackIndex -= 1;
    else trackIndex = trackList.length - 1;
    loadTrack(trackIndex);
    playMusic();
}

function changeDuration() {
    let sliderPosition = currTrack.duration * (progressBar.value / 100);
    currTrack.currentTime = sliderPosition;
}

function setVolume() {
    currTrack.volume = volumeSlider.value / 100;
}

// Progress bar synchronization logic update timers
function setUpdate() {
    let position = 0;
    if (!isNaN(currTrack.duration)) {
        position = currTrack.currentTime * (100 / currTrack.duration);
        progressBar.value = position;

        let currentMins = Math.floor(currTrack.currentTime / 60);
        let currentSecs = Math.floor(currTrack.currentTime - currentMins * 60);
        let durationMins = Math.floor(currTrack.duration / 60);
        let durationSecs = Math.floor(currTrack.duration - durationMins * 60);

        if (currentSecs < 10) { currentSecs = "0" + currentSecs; }
        if (durationSecs < 10) { durationSecs = "0" + durationSecs; }

        currentTime.textContent = currentMins + ":" + currentSecs;
        totalDuration.textContent = durationMins + ":" + durationSecs;
    }
}