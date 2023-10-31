const preloadWorker = new Worker('preloadWorker.js');

document.addEventListener('DOMContentLoaded', function () {
    const videoArray = [
        'SW1.mp4',
        'SW2.mp4',
        'SW3.mp4',
        'SW4.mp4',
        'SW5.mp4',
        'SW6.mp4',
        // Add more video filenames as needed
    ];

    preloadWorker.postMessage(videoArray);

    preloadWorker.onmessage = (event) => {
        const preloadedVideoUrls = event.data;

        // Loop through preloaded URLs and create video elements
        preloadedVideoUrls.forEach(url => {
            const videoElement = document.createElement('video');
            videoElement.src = url;
            videoElement.preload = 'auto';

            // Add the video element to the DOM
            // You can customize the placement in the DOM as needed
            const videoPlayerContainer = document.getElementById('videoPlayerContainer');
            videoPlayerContainer.appendChild(videoElement);
        });
    };
});
