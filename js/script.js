const preloadWorker = new Worker('preloadWorker.js'); // Create a new Web Worker for preloading tasks

// Define the videoArray outside the DOMContentLoaded event
const videoArray = [
    'SW1.mp4',
    'SW2.mp4',
    'SW3.mp4',
    'SW4.mp4',
    'SW5.mp4',
    'SW6.mp4',
    // Add more video filenames as needed
];

// The rest of your code within the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
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

    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    let currentVideoIndex = 0;
    const timerInterval = 100; // 100 ms
    let audioStarted = false;

    let preloadedVideoIndex = 1; // Start with the second video

    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = 'wwwroot/videos/' + videoArray[index];
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
        // Handle the preloaded video element
        const preloadedVideoElement = event.data;

        // You can use this preloadedVideoElement in your application as needed
    };

    document.addEventListener('click', () => {
        if (!audioStarted) {
            startAudio();
            audioStarted = true;
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);

        // Notify the preloadWorker to preload the next video
        preloadWorker.postMessage(videoArray[nextIndex]);
    });
});
