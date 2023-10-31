self.addEventListener('message', event => {
    const videoPaths = event.data;

    if (Array.isArray(videoPaths)) {
        const preloadedVideos = [];

        // Function to preload a single video
        function preloadVideo(videoPath, index) {
            fetch('wwwroot/videos/' + videoPath)
                .then(response => response.blob())
                .then(videoBlob => {
                    const objectURL = URL.createObjectURL(videoBlob);
                    const preloadVideo = document.createElement('video');
                    preloadVideo.src = objectURL;
                    preloadVideo.preload = 'auto';

                    preloadVideo.addEventListener('loadeddata', () => {
                        // Update preloadedVideos with the video element, not the URL
                        preloadedVideos[index] = preloadVideo;

                        if (preloadedVideos.length === videoPaths.length) {
                            self.postMessage(preloadedVideos);
                        }
                    });
                });
        }

        videoPaths.forEach((videoPath, index) => {
            preloadVideo(videoPath, index);
        });
    } else {
        console.error('Invalid videoPaths data:', videoPaths);
    }
});
