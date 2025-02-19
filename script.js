let journeyProgress = 0; // Percentage of journey completed
let timer; // Variable to hold timer reference
const progressBtn = document.getElementById('progressBtn');
const resetBtn = document.getElementById('resetBtn');
const mapImage = document.getElementById('mapImage');
const progressMarker = document.getElementById('progressMarker');

function updateJourney() {
    const imageContainer = document.getElementById('imageContainer');
    const progressText = document.getElementById('journeyView').querySelector('p');
    
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

        progressText.textContent = `Your journey progress: ${journeyProgress}%`;

        // Update map progress marker
        const mapWidth = mapImage.offsetWidth;
        const markerPosition = Math.floor((mapWidth * journeyProgress) / 100);
        progressMarker.style.left = `${markerPosition}px`;

        // Play stage sound every 10%
        if(journeyProgress % 10 === 0) {
            document.getElementById('stageSound').play();
            showMessage(`You've reached ${journeyProgress}% of your journey!`);
        }
    } else {
        const oldImg = imageContainer.querySelector('img');
        if(oldImg) {
            oldImg.classList.add('fade-out');
            setTimeout(() => {
                imageContainer.removeChild(oldImg);
            }, 500);
        }
        progressText.textContent = `Your journey progress: ${journeyProgress}%`;
        clearInterval(timer);
        progressBtn.textContent = "Journey Complete!";
        progressBtn.disabled = true;
        document.getElementById('endSound').play();
        showMessage("Congratulations! You've completed your journey!");
        resetBtn.style.display = 'block'; // Show reset button when journey is complete
        progressMarker.style.left = `${mapImage.offsetWidth}px`; // Move marker to the end of the map
    }
}

// Function to show messages to the user
function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '10px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.zIndex = '1000';

    document.body.appendChild(messageElement);

    // Remove message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000);
}

// Function to reset the journey
function resetJourney() {
    journeyProgress = 0;
    clearInterval(timer);
    updateJourney(); // Reset the visual state
    progressBtn.textContent = "Make Progress";
    progressBtn.disabled = false;
    resetBtn.style.display = 'none'; // Hide reset button
    document.getElementById('imageContainer').querySelector('img').style.opacity = '1'; // Ensure the first image is visible
    document.getElementById('startSound').play(); // Play start sound again
}

// Function to start the timer
function startTimer() {
    document.getElementById('startSound').play();
    timer = setInterval(() => {
        journeyProgress += 1; // Increment progress by 1% every second
        if(journeyProgress > 100) journeyProgress = 100; // Cap at 100%
        updateJourney();
    }, 1000); // 1000ms = 1 second
}

progressBtn.addEventListener('click', () => {
    startTimer();
    progressBtn.disabled = true;
});

resetBtn.addEventListener('click', resetJourney);

// No need for an initial call; the journey starts when the user clicks the button