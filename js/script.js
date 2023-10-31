// script.js
const preloadWorker = new Worker('preloadWorker.js'); // Create a new Web Worker for preloading tasks

document.addEventListener('DOMContentLoaded', function () {
    const videoArray = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more video filenames as needed
    ];

    // Notify the preloadWorker to preload the videoArray
    preloadWorker.postMessage(videoArray);

    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    videoElement.controls = true; // Add controls for user interaction
    videoElement.setAttribute('playsinline', ''); // Add playsinline attribute
    videoElement.preload = 'auto'; // Set preload attribute to 'auto' for video
    videoPlayerContainer.appendChild(videoElement);

    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a'; // Update this to the relative path of your audio file
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    document.body.appendChild(audioPlayer);

    let currentVideoIndex = 0;
    const timerInterval = 100; // 100 ms
    let audioStarted = false;

    let preloadedVideoIndex = 1; // Start with the second video

    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = videoArray[index];
        videoElement.currentTime = audioPlayer.currentTime;

        videoElement.addEventListener('timeupdate', () => {
            // Update audio playback time to match video time
            audioPlayer.currentTime = videoElement.currentTime;
        });

        videoElement.addEventListener('ended', () => {
            videoElement.currentTime = 0;
            videoElement.play();
        });

        videoElement.play().catch(error => {
            console.error('Video playback error:', error.message);
        });

        currentVideoIndex = index;
    }

    function startAudio() {
        audioPlayer.load();
        audioPlayer.play().catch(error => {
            console.error('Audio playback error:', error.message);
        });
    }

    // Message event handler for the preloadWorker
    preloadWorker.onmessage = (event) => {
        // Handle the preloaded video elements (if needed)
        const preloadedVideoElements = event.data;

        // You can use these preloadedVideoElements in your application as needed
    };

    document.addEventListener('click', () => {
        if (!audioStarted) {
            startAudio();
            audioStarted = true;
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);

        // Notify the preloadWorker to preload the next video (if needed)
        preloadWorker.postMessage(videoArray[nextIndex]);
    });
});
