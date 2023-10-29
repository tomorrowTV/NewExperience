self.addEventListener('message', event => {
    const videoFileName = event.data;

    // Construct the full path to the video asset within your project
    const videoPath = 'wwwroot/videos/' + videoFileName;

    // Preload the video by creating an HTMLVideoElement
    const preloadVideo = document.createElement('video');
    preloadVideo.src = videoPath;
    preloadVideo.preload = 'auto';

    // Listen for the 'loadeddata' event to know when the video is preloaded
    preloadVideo.addEventListener('loadeddata', () => {
        // Post the preloaded video element back to the main thread
        self.postMessage(preloadVideo);
    });
});
