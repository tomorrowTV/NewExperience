self.addEventListener('message', event => {
    const videoPaths = event.data;

    if (Array.isArray(videoPaths)) {
        const preloadedVideos = [];

        // Function to preload a single video
        function preloadVideo(videoPath, index) {
            fetch(videoPath)
                .then(response => response.blob())
                .then(videoBlob => {
                    preloadedVideos[index] = URL.createObjectURL(videoBlob);

                    if (preloadedVideos.length === videoPaths.length) {
                        self.postMessage(preloadedVideos);
                    }
                });
        }

        videoPaths.forEach((videoPath, index) => {
            preloadVideo(videoPath, index);
        });
    } else {
        console.error('Invalid videoPaths data:', videoPaths);
    }
});
