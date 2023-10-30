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
    audioPlayer.src = 'wwwroot/assets/Song.m4a';
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    document.body.appendChild(audioPlayer);

    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    let currentVideoIndex = 0;
    let preloadedVideos = new Set();
    const timerInterval = 100; // 100 ms
    let audioStarted = false;

    function preloadNextVideo() {
        const preloadIndex = (currentVideoIndex + 1) % videoArray.length;
        const preloadVideo = new Video();
        preloadVideo.src = videoArray[preloadIndex];
        preloadVideo.preload = 'auto';
        preloadVideo.load();
        preloadVideo.addEventListener('canplaythrough', () => {
            preloadedVideos.add(preloadIndex);
        });
    }

    function playVideoByIndex(index) {
        if (!preloadedVideos.has(index)) {
            // Video not preloaded yet, wait for it to be preloaded.
            setTimeout(() => playVideoByIndex(index), 100);
            return;
        }

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
        preloadNextVideo();
    }

    function startAudio() {
        audioPlayer.load();
        audioPlayer.play().catch(error => {
            console.error('Audio playback error:', error.message);
        });
    }

    document.addEventListener('click', () => {
        if (!audioStarted) {
            startAudio();
            audioStarted = true;
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);
    });
});
