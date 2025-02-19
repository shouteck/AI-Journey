let journeyProgress = 0; // Percentage of journey completed
let timer; // Variable to hold timer reference

function updateJourney() {
    const imageContainer = document.getElementById('imageContainer');
    const progressText = document.getElementById('journeyView').querySelector('p');
    const progressBtn = document.getElementById('progressBtn');
    
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

// Function to start the timer
function startTimer() {
    document.getElementById('startSound').play();
    timer = setInterval(() => {
        journeyProgress += 1; // Increment progress by 1% every second
        if(journeyProgress > 100) journeyProgress = 100; // Cap at 100%
        updateJourney();
    }, 1000); // 1000ms = 1 second
}

document.getElementById('progressBtn').addEventListener('click', () => {
    startTimer();
    document.getElementById('progressBtn').disabled = true;
});

// No need for an initial call; the journey starts when the user clicks the button