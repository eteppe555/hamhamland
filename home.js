// Track the coordinates of the last spawned star
let lastX = 0;
let lastY = 0;

// Set the minimum distance (in pixels) the mouse must travel before a new star appears
const spacingThreshold = 20; 

document.addEventListener("mousemove", (event) => {
  // Calculate the horizontal and vertical distance moved
  const deltaX = event.pageX - lastX;
  const deltaY = event.pageY - lastY;
  
  // Use the Pythagorean theorem to find the total straight-line distance moved
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // Only spawn a star if the cursor has moved further than our threshold
  if (distance >= spacingThreshold) {
    const star = document.createElement("div");
    star.className = "trail-star";
    star.innerText = "⭐"; // Remove this line if using the CSS clip-path star

    star.style.left = `${event.pageX}px`;
    star.style.top = `${event.pageY}px`;

    document.body.appendChild(star);

    // Update the last known position to the current coordinates
    lastX = event.pageX;
    lastY = event.pageY;

    // Instantly remove the star from the DOM after 400ms
    setTimeout(() => {
      star.remove();
    }, 400);
  }
});

// Paste this JavaScript block anywhere into your website's script tags
window.addEventListener('DOMContentLoaded', () => {
  // Create the audio element dynamically
  const bgAudio = new Audio('https://cdn.pixabay.com/download/audio/2026/04/20/audio_a12a05c11d.mp3');
  
  // Force the track to loop continuously
  bgAudio.loop = true;
  
  // Set default playback volume (0.0 to 1.0)
  bgAudio.volume = 0.5;

  // Modern browsers require user interaction before playing audio
  const startAudio = () => {
    bgAudio.play()
      .then(() => {
        // Audio started successfully, clean up the temporary event listeners
        document.removeEventListener('click', startAudio);
        document.removeEventListener('keydown', startAudio);
      })
      .catch(error => console.log("Autoplay waiting for interaction...", error));
  };

  // Trigger audio immediately on the first click or keypress anywhere on the page
  document.addEventListener('click', startAudio);
  document.addEventListener('keydown', startAudio);
});

