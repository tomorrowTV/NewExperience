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

    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoElement = document.createElement('video');
    videoElement.id = 'videoPlayer';
    videoElement.controls = true; // Add controls for user interaction
    videoElement.setAttribute('playsinline', ''); // Add playsinline attribute
    videoPlayerContainer.appendChild(videoElement);

    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a'; // Replace with the actual audio file path
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    document.body.appendChild(audioPlayer);

    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    let currentVideoIndex = 0;
    let audioStarted = false;
    let videosLoadedCount = 0;
    let startDelay = 2000; // Set the delay in milliseconds (2 seconds)

    function preloadVideoByIndex(index) {
        const preloadVideo = document.createElement('video');
        preloadVideo.src = videoArray[index];
        preloadVideo.preload = 'auto';
        preloadVideo.load();

        preloadVideo.addEventListener('loadeddata', () => {
            // Remove or hide the preload video
            document.body.removeChild(preloadVideo);

            videosLoadedCount++;

            if (videosLoadedCount === 1) {
                setTimeout(() => {
                    startAudio();
                }, startDelay);
            }
        });
    }

    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = videoArray[index];
        videoElement.currentTime = audioPlayer.currentTime;

        videoElement.addEventListener('ended', () => {
            videoElement.currentTime = 0;
            videoElement.play();
        });

        videoElement.play()
            .catch(error => {
                console.error('Video playback error:', error.message);
            });

        currentVideoIndex = index;
    }

    function startAudio() {
        audioPlayer.load();
        audioPlayer.play()
            .catch(error => {
                console.error('Audio playback error:', error.message);
            });
    }

    document.addEventListener('click', () => {
        if (!audioStarted) {
            audioStarted = true;
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);
        preloadVideoByIndex(nextIndex);
    });
});
