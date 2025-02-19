let journeyProgress = 0; // Percentage of journey completed
let timer; // Variable to hold timer reference

function updateJourney() {
    const imageContainer = document.getElementById('imageContainer');
    
    if(journeyProgress < 100) {
        let imageNumber = Math.floor(journeyProgress / 10) + 1;
        
        const newImg = document.createElement('img');
        newImg.src = `placeholders/journey_${imageNumber}.jpg`;
        newImg.alt = `Journey at ${journeyProgress}%`;
        newImg.style.opacity = '0';
        
        const oldImg = imageContainer.querySelector('img');
        if(oldImg) {
            oldImg.classList.add('fade-out');
        }

        imageContainer.appendChild(newImg);
        
        setTimeout(() => {
            if(oldImg) {
                imageContainer.removeChild(oldImg);
            }
            newImg.style.opacity = '1';
        }, 500);

        document.getElementById('journeyView').querySelector('p').textContent = `Your journey progress: ${journeyProgress}%`;
    } else {
        const oldImg = imageContainer.querySelector('img');
        if(oldImg) {
            oldImg.classList.add('fade-out');
            setTimeout(() => {
                imageContainer.removeChild(oldImg);
            }, 500);
        }
        document.getElementById('journeyView').querySelector('p').textContent = `Your journey progress: ${journeyProgress}%`;
        clearInterval(timer); // Stop the timer when journey is complete
        document.getElementById('progressBtn').textContent = "Journey Complete!";
        document.getElementById('progressBtn').disabled = true;
    }
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        journeyProgress += 1; // Increment progress by 1% every second
        if(journeyProgress > 100) journeyProgress = 100; // Cap at 100%
        updateJourney();
    }, 1000); // 1000ms = 1 second
}

document.getElementById('progressBtn').addEventListener('click', () => {
    startTimer();
    document.getElementById('progressBtn').disabled = true; // Disable button after starting timer
});

// No need for an initial call; the journey starts when the user clicks the button