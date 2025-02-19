let journeyProgress = 0; // Percentage of journey completed

function updateJourney() {
    const imageContainer = document.getElementById('imageContainer'); // Target the container, not journeyView
    
    if(journeyProgress < 100) {
        let imageNumber = Math.floor(journeyProgress / 10) + 1;
        
        // Create a new img element for the new image
        const newImg = document.createElement('img');
        newImg.src = `placeholders/journey_${imageNumber}.jpg`;
        newImg.alt = `Journey at ${journeyProgress}%`;
        newImg.style.opacity = '0'; // Start with opacity 0
        
        // Fade out the old image, if any
        const oldImg = imageContainer.querySelector('img');
        if(oldImg) {
            oldImg.classList.add('fade-out');
        }

        // Add the new image
        imageContainer.appendChild(newImg);
        
        // After a short delay, remove the old image and show the new one
        setTimeout(() => {
            if(oldImg) {
                imageContainer.removeChild(oldImg);
            }
            newImg.style.opacity = '1'; // Fade in the new image
        }, 500); // Match this with the transition duration in CSS

        // Update text
        document.getElementById('journeyView').querySelector('p').textContent = `Your journey progress: ${journeyProgress}%`;
    } else {
        // Remove the image at 100%, just show the progress
        const oldImg = imageContainer.querySelector('img');
        if(oldImg) {
            oldImg.classList.add('fade-out');
            setTimeout(() => {
                imageContainer.removeChild(oldImg);
            }, 500); // Remove after fade-out
        }
        document.getElementById('journeyView').querySelector('p').textContent = `Your journey progress: ${journeyProgress}%`;
    }
}

document.getElementById('progressBtn').addEventListener('click', () => {
    journeyProgress += 10; 
    if(journeyProgress > 100) journeyProgress = 100;
    updateJourney();
});

// No initial call needed; the initial state is set in HTML