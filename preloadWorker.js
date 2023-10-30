self.addEventListener('message', event => {
    const videoFileNames = event.data;

    if (Array.isArray(videoFileNames)) {
        // Array to hold preloaded video elements
        const preloadedVideos = [];

        // Function to preload a single video
        function preloadVideo(videoFileName, index) {
            const videoPath = 'wwwroot/videos/' + videoFileName;
            const preloadVideo = document.createElement('video');
            preloadVideo.src = videoPath;
            preloadVideo.preload = 'auto';

            preloadVideo.addEventListener('loadeddata', () => {
                // Add the preloaded video element to the array
                preloadedVideos[index] = preloadVideo;

                // Check if all videos are preloaded
                if (preloadedVideos.length === videoFileNames.length) {
                    // Post all preloaded video elements back to the main thread
                    self.postMessage(preloadedVideos);
                }
            });
        }

        // Preload all videos in parallel
        videoFileNames.forEach((videoFileName, index) => {
            preloadVideo(videoFileName, index);
        });
    } else {
        console.error('Invalid videoFileNames data:', videoFileNames);
    }
});
