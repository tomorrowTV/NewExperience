self.addEventListener('message', event => {
    const videoFileNames = event.data;

    // Array to hold preloaded video elements
    const preloadedVideos = [];
    let preloadIndex = 0;

    // Function to preload a single video sequentially
    function preloadVideo(videoFileName) {
        const videoPath = 'wwwroot/videos/' + videoFileName;
        const preloadVideo = document.createElement('video');
        preloadVideo.src = videoPath;
        preloadVideo.preload = 'auto';

        preloadVideo.addEventListener('loadeddata', () => {
            // Add the preloaded video element to the array
            preloadedVideos.push(preloadVideo);

            // Check if all videos are preloaded
            if (preloadedVideos.length === videoFileNames.length) {
                // Post all preloaded video elements back to the main thread
                self.postMessage(preloadedVideos);
            } else {
                // Preload the next video
                preloadIndex++;
                if (preloadIndex < videoFileNames.length) {
                    preloadVideo(videoFileNames[preloadIndex]);
                }
            }
        });
    }

    // Start preloading the first video
    if (preloadIndex < videoFileNames.length) {
        preloadVideo(videoFileNames[preloadIndex]);
    }
});
