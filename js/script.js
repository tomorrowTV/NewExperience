document.addEventListener('DOMContentLoaded', function () {
    const videoArray = [
        'wwwroot/videos/SW1.mp4',
        'wwwroot/videos/SW2.mp4',
        'wwwroot/videos/SW3.mp4',
        'wwwroot/videos/SW4.mp4',
        'wwwroot/videos/SW5.mp4',
        'wwwroot/videos/SW6.mp4'
    ];

    const videoElement = document.getElementById('videoPlayer');
    const audioPlayer = document.getElementById('audioPlayer');
    let currentVideoIndex = 0;
    let audioStarted = false;

    // Function to preload a video by index
    function preloadVideoByIndex(index) {
        const preloadVideo = document.createElement('video');
        preloadVideo.src = videoArray[index];
        preloadVideo.preload = 'auto';
        preloadVideo.load();

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
            startAudio();
            audioStarted = true;
        }

        const nextIndex = (currentVideoIndex + 1) % videoArray.length;
        playVideoByIndex(nextIndex);
    });
});
