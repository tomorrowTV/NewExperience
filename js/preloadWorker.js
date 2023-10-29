// Define an array of video filenames (without the path)
const videoArray = [
    'videos/SW1.mp4',
    'videos/SW2.mp4',
    'videos/SW3.mp4',
    'videos/SW4.mp4',
    'videos/SW5.mp4',
    'videos/SW6.mp4',
    'videos/SW7.mp4',
    'videos/SW8.mp4',
    'videos/SW9.mp4',
    'videos/SW10.mp4',
    'videos/SW11.mp4',
    'videos/SW12.mp4',
    'videos/SW13.mp4',
    'videos/SW14.mp4',
    // Add more video filenames as needed
];

// Function to play a video by index
function playVideoByIndex(index) {
    // Pause and remove any currently playing video
    if (currentVideoElement) {
        currentVideoElement.pause();
        currentVideoElement.remove();
    }

    // Create a new video element
    const videoElement = document.createElement('video');
    videoElement.src = videoArray[index];
    videoElement.controls = true;

    // Append the video element to the body
    document.body.appendChild(videoElement);

    // Play the video
    videoElement.play();

    // Update the currently playing video reference
    currentVideoElement = videoElement;

    // Add an event listener to play the next video when the current one ends
    videoElement.addEventListener('ended', () => {
        // Calculate the index of the next video
        const nextIndex = (index + 1) % videoArray.length;

        // Play the next video
        playVideoByIndex(nextIndex);
    });
}

// Initialize the currently playing video element reference
let currentVideoElement = null;

// Start by playing the first video automatically
playVideoByIndex(0);

// Add a click event listener to the document to allow the user to randomly choose the next video
document.addEventListener('click', () => {
    // Choose a random video index from the array
    const randomIndex = Math.floor(Math.random() * videoArray.length);

    // Play the video by index
    playVideoByIndex(randomIndex);
});
