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
        const preloadVideo = document.createElement('video');
        preloadVideo.src = videoArray[index];
        preloadVideo.preload = 'auto';
        preloadVideo.load();

        // Once the video is loaded, add it to the body and hide it
        preloadVideo.addEventListener('loadeddata', () => {
            preloadVideo.style.display = 'none';
            document.body.appendChild(preloadVideo);
        });
    }

    // Preload all videos in the array
    for (let i = 0; i < videoArray.length; i++) {
        preloadVideoByIndex(i);
    }

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

    // Add a click event listener to start audio and video on the first click
    document.addEventListener('click', () => {
        if (!audioStarted) {
            startAudio(); // Start audio on the first click
            audioStarted = true; // Set the flag to true to indicate audio has started
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);
    });
});
