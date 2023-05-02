var audio = document.getElementById("music-player");
var playButton = document.getElementById("play-button");
var seekBar = document.getElementById("seek-bar");
var seekPoint = document.getElementById("seek-point");
var nextButton = document.getElementById("next-button");
var previousButton = document.getElementById("previous-button");
var timeDisplay = document.getElementById("timeDisplay");
var mutee = document.getElementById("audio-element");
var songName = document.getElementById("song-name");

function playPause() {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<i class="fa-solid fa-pause" style="color: #000000;"></i>'; 
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fa-solid fa-play" style="color: #000000;"></i>';
    }
}

var musicUrls = ["music/Hans Zimmer - Time.mp3", "music/Interstellar - Hans Zimmer.mp3",  "music/JoJo's theme.mp3", "music/Naruto theme.mp3"];

var currentTrackIndex = 0;

playTrack();
audio.pause();

function playTrack() {
    audio.src = musicUrls[currentTrackIndex];
    audio.play();
    songName.innerHTML = getSongName(musicUrls[currentTrackIndex]);
}

function playNextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= musicUrls.length) {
        currentTrackIndex = 0;
    }
    playTrack();
}

audio.addEventListener('ended', function() {
    playNextTrack();
});

function next() {
    currentTrackIndex++;
    playButton.innerHTML = '<i class="fa-solid fa-pause" style="color: #000000;"></i>';
    if (currentTrackIndex >= musicUrls.length) {
        currentTrackIndex = 0;
    }
    playTrack();
}

function previous() {
    currentTrackIndex--;
    playButton.innerHTML = '<i class="fa-solid fa-pause" style="color: #000000;"></i>';
    if (currentTrackIndex < 0) {
        currentTrackIndex = musicUrls.length - 1;
    }
    playTrack();
}

function mute() {
    audio.muted = !audio.muted;
    if (audio.muted) {
        mutee.innerHTML = '<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>'; 
    } else {
        mutee.innerHTML = '<i class="fa-solid fa-volume-high" style="color: #000000;"></i>';
    }
}

function speedUp() {
    audio.playbackRate += 0.5;
}

function slowDown() {
    audio.playbackRate -= 0.5;
}

seekBar.addEventListener('input', function() {
    var seekTime = audio.duration * (seekBar.value / 100);
    audio.currentTime = seekTime;
});

function getSongName(url) {
    var startIndex = url.lastIndexOf("/") + 1;
    var endIndex = url.lastIndexOf(".");
    return url.substring(startIndex, endIndex);
}
  
audio.addEventListener('timeupdate', function() {
    var seekBarValue = (audio.currentTime / audio.duration) * 100;
    seekBar.value = seekBarValue;
    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    var totalMinutes = Math.floor(audio.duration / 60);
    var totalSeconds = Math.floor(audio.duration % 60);
    if (isNaN(minutes) || isNaN(seconds) || isNaN(totalMinutes) || isNaN(totalSeconds)) {
        return "00:00";
      }
    timeDisplay.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds) + " / " + totalMinutes + ":" + (totalSeconds < 10 ? "0" + totalSeconds : totalSeconds);
  });
  
audio.addEventListener("timeupdate", function() {
    seekBar.value = Math.floor(audio.currentTime);
  });
  
