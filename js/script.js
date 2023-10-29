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
    videoElement.controls = true;
    videoElement.setAttribute('playsinline', '');
    videoPlayerContainer.appendChild(videoElement);

    const audioPlayer = document.createElement('audio');
    audioPlayer.src = 'wwwroot/assets/Song.m4a';
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    audioPlayer.currentTime = 0; // Ensure audio starts from the beginning
    document.body.appendChild(audioPlayer);

    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    document.body.appendChild(canvas);

    let currentVideoIndex = 0;
    let audioStarted = false;

    function preloadVideo(index) {
        const preloadVideo = new Audio();
        preloadVideo.src = videoArray[index];
        preloadVideo.preload = 'auto';
        preloadVideo.load();
    }

    function playVideoByIndex(index) {
        videoElement.pause();
        videoElement.src = videoArray[index];

        videoElement.addEventListener('canplay', () => {
            // When the video is ready, play both the video and audio
            videoElement.play().catch(error => {
                console.error('Video playback error:', error.message);
            });

            if (!audioStarted) {
                audioPlayer.play().catch(error => {
                    console.error('Audio playback error:', error.message);
                });
                audioStarted = true;
            }

            audioPlayer.currentTime = videoElement.currentTime;
        });

        videoElement.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videoArray.length;
            preloadVideo(currentVideoIndex);
            playVideoByIndex(currentVideoIndex);
        });
    }

    // Initial video preload
    preloadVideo(currentVideoIndex);
    playVideoByIndex(currentVideoIndex);
});
