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

    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    videoElement.controls = true; // Add controls for user interaction
    videoElement.setAttribute('playsinline', ''); // Add playsinline attribute
    videoPlayerContainer.appendChild(videoElement);

    // Create an audio element and set its source
    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a'; // Replace with the actual audio file path
    audioPlayer.preload = 'auto';

    // Create the canvas element with specified dimensions
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    // Variables to track the currently playing video index and the timer interval
    let currentVideoIndex = 0;
    const timerInterval = 100; // 100 ms
    let audioStarted = false; // Track whether audio has been started
    let videosLoadedCount = 0; // Track the number of videos that have loaded

    // Function to preload a video by index
    function preloadVideoByIndex(index) {
        const preloadVideo = document.createElement('video');
        preloadVideo.src = videoArray[index];
        preloadVideo.preload = 'auto';

        // Use the "canplaythrough" event to track when the video is ready to play
        preloadVideo.addEventListener('canplaythrough', () => {
            preloadVideo.style.display = 'none';
            document.body.appendChild(preloadVideo);
            
            // Increment the loaded count and check if all videos are loaded
            videosLoadedCount++;
            if (videosLoadedCount === videoArray.length) {
                startAudio(); // Start audio when all videos are preloaded
            }
        });

        preloadVideo.load();
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

        // Add an event listener to start audio playback when the video is playing
        videoElement.addEventListener('play', () => {
            if (!audioStarted) {
                audioPlayer.load(); // Load the audio
                audioPlayer.play()
                    .catch(error => {
                        // Handle any audio playback errors here
                        console.error('Audio playback error:', error.message);
                    });
                audioStarted = true; // Set the flag to true to indicate audio has started
            }
        });

        videoElement.play()
            .catch(error => {
                // Handle any video playback errors here
                console.error('Video playback error:', error.message);
            });

        currentVideoIndex = index;
    }

    // Add a click event listener to start video on the first click
    document.addEventListener('click', () => {
        if (!audioStarted) {
            startAudio(); // Start audio on the first click
            audioStarted = true; // Set the flag to true to indicate audio has started
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);
    });
});
