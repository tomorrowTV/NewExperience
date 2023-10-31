self.addEventListener('message', event => {
    const videoPaths = event.data;

    if (Array.isArray(videoPaths)) {
        // Log the received video paths to the console for debugging
        console.log('Received video paths:', videoPaths);

        // Array to hold preloaded video elements
        const preloadedVideos = [];

        // Function to preload a single video
        function preloadVideo(videoPath, index) {
            const preloadVideo = document.createElement('video');
            preloadVideo.src = videoPath;
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
