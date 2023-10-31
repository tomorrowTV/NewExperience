self.addEventListener('message', event => {
    const videoPaths = event.data;

    if (Array.isArray(videoPaths)) {
        const preloadedVideos = [];

        function preloadVideo(videoPath, index) {
            fetch(videoPath)
                .then(response => response.blob())
                .then(videoBlob => {
                    const objectURL = URL.createObjectURL(videoBlob);
                    preloadedVideos[index] = objectURL;

                    if (preloadedVideos.length === videoPaths.length) {
                        self.postMessage(preloadedVideos);
                    }
                })
                .catch(error => {
                    console.error('Video preload error:', error);
                });
        }

        videoPaths.forEach((videoPath, index) => {
            preloadVideo(videoPath, index);
        });
    } else {
        console.error('Invalid videoPaths data:', videoPaths);
    }
});
