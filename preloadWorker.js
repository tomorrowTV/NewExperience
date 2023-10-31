self.addEventListener('message', async event => {
    const videoPaths = event.data;

    if (Array.isArray(videoPaths)) {
        const preloadedVideos = [];

        async function preloadVideo(videoPath) {
            try {
                const response = await fetch(videoPath);
                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);

                    const video = document.createElement('video');
                    video.src = objectURL;
                    video.preload = 'auto';

                    await video.ready;

                    preloadedVideos.push(video);

                    if (preloadedVideos.length === videoPaths.length) {
                        self.postMessage(preloadedVideos);
                    }
                } else {
                    console.error(`Failed to fetch video: ${videoPath}`);
                }
            } catch (error) {
                console.error(`Error while preloading video: ${error.message}`);
            }
        }

        for (const videoPath of videoPaths) {
            preloadVideo(videoPath);
        }
    } else {
        console.error('Invalid videoPaths data:', videoPaths);
    }
});
