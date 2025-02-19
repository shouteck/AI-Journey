let journeyProgress = 0; // Percentage of journey completed

function updateJourney() {
    if(journeyProgress < 100) {
        // Show image for progress less than 100%
        let imageNumber = Math.floor(journeyProgress / 10) + 1;
        document.getElementById('journeyView').innerHTML = `
            <img src="placeholders/journey_${imageNumber}.jpg" alt="Journey at ${journeyProgress}%">
            <p>Your journey progress: ${journeyProgress}%</p>
        `;
    } else {
        // No image at 100%, just show the progress
        document.getElementById('journeyView').innerHTML = `
            <p>Your journey progress: ${journeyProgress}%</p>
        `;
    }
}

document.getElementById('progressBtn').addEventListener('click', () => {
    journeyProgress += 10; 
    if(journeyProgress > 100) journeyProgress = 100;
    updateJourney();
});

// Initial call to set the state when the page loads
updateJourney();