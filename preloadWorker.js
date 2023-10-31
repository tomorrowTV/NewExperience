self.addEventListener('message', event => {
    const videoPaths = event.data;

    if (Array.isArray(videoPaths) && videoPaths.every(path => typeof path === 'string')) {
        // Array to hold preloaded video elements
        const preloadedVideos = [];

        // Function to preload a single video
        function preloadVideo(videoPath, index) {
            const preloadVideo = document.createElement('video');
            preloadVideo.src = 'wwwroot/videos/' + videoPath; // Adjust the path as needed
            preloadVideo.preload = 'auto';

            preloadVideo.addEventListener('loadeddata', () => {
                // Add the preloaded video element to the array
                preloadedVideos[index] = preloadVideo;

                // Check if all videos are preloaded
                if (preloadedVideos.length === videoPaths.length) {
                    // Post all preloaded video elements back to the main thread
                    self.postMessage(preloadedVideos);
                }
            });
        }

        // Preload all videos in parallel
        videoPaths.forEach((videoPath, index) => {
            preloadVideo(videoPath, index);
        });
    } else {
        console.error('Invalid videoPaths data:', videoPaths);
    }
});
