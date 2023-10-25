document.addEventListener('DOMContentLoaded', function () {
    // Define an array of video filenames (without the path)
    const videoArray = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4',
        // Add more video filenames as needed
    ];

    // Create a reference to the loading screen and "Start" button
    const loadingScreen = document.getElementById('loadingScreen');
    const startButton = document.getElementById('startButton');

    // Create a single video element
    const videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    document.body.appendChild(videoElement);

    // Create an audio element and set its source
    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a'; // Replace with the actual audio file path
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    document.body.appendChild(audioPlayer);

    // Create the canvas element with specified dimensions
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    // Variables to track the currently playing video index and the timer interval
    let currentVideoIndex = 0;
    const timerInterval = 100; // 100 ms
    let audioStarted = false; // Track whether audio has been started

    // Function to preload a video by index
    function preloadVideoByIndex(index) {
        return new Promise((resolve) => {
            const preloadVideo = document.createElement('video');
            preloadVideo.src = videoArray[index];
            preloadVideo.preload = 'auto';
            preloadVideo.addEventListener('loadeddata', () => {
                preloadVideo.style.display = 'none';
                document.body.appendChild(preloadVideo);
                resolve();
            });
            preloadVideo.load();
        });
    }

    // Preload all videos and show the "Start" button when done
    Promise.all(videoArray.map((video, index) => preloadVideoByIndex(index)))
        .then(() => {
            loadingScreen.style.display = 'none';
            startButton.style.display = 'block';
            startButton.addEventListener('click', () => {
                startAudio();
                audioStarted = true;
                playVideoByIndex(0);
            });
        });

    // Function to play video by index and synchronize with the audio
    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = videoArray[index];
        videoElement.currentTime = audioPlayer.currentTime; // Synchronize with audio time

        // Add an event listener to restart video playback when it ends
        videoElement.addEventListener('ended', () => {
            videoElement.currentTime = 0; // Reset video to the beginning
            videoElement.play(); // Start video playback again
        });

        videoElement.play()
            .catch(error => {
                // Handle any video playback errors here
                console.error('Video playback error:', error.message);
            });
        currentVideoIndex = index;
    }

    // Function to start audio playback
    function startAudio() {
        audioPlayer.load(); // Load the audio
        audioPlayer.play()
            .catch(error => {
                // Handle any audio playback errors here
                console.error('Audio playback error:', error.message);
            });
    }
});
