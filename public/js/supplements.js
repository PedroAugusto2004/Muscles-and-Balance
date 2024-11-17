function calculateRecommendation() {
    const goal = document.getElementById('goal').value;
    const activityLevel = document.getElementById('activityLevel').value;
    const dietType = document.getElementById('dietType').value;
    let recommendation = '';

    // Check if all fields are filled
    if (!goal || !activityLevel || !dietType) {
        alert("Please fill in all the fields💪");
        return;
    }

    // Show loader and hide result text initially
    document.getElementById('loader').style.display = 'flex';
    document.getElementById('result').style.display = 'none';

    // Simulate loading time with a timeout
    setTimeout(() => {
        // Generate recommendation based on goal and activity level
        if (goal === 'muscleGain') {
            recommendation = 'For muscle gain, consider whey protein, BCAAs, and creatine.';
            if (activityLevel === 'high') {
                recommendation += ' Since your activity level is high, adding electrolytes and a post-workout recovery formula can help with muscle repair.';
            }
        } else if (goal === 'weightLoss') {
            recommendation = 'To support weight loss, consider thermogenic fat burners, fiber supplements like glucomannan, and green tea extract.';
            if (activityLevel === 'moderate' || activityLevel === 'high') {
                recommendation += ' A high-activity level benefits from BCAAs and a low-calorie protein powder to preserve lean muscle.';
            }
        } else if (goal === 'energyBoost') {
            recommendation = 'For an energy boost, try caffeine, B vitamins, and pre-workout supplements with adaptogens.';
            if (activityLevel === 'low') {
                recommendation += ' Since you have a low activity level, consider starting with lighter doses to assess tolerance.';
            }
        } else if (goal === 'generalHealth') {
            recommendation = 'For general health, consider a multivitamin, omega-3 fatty acids, and probiotics for digestive health.';
            if (activityLevel === 'high') {
                recommendation += ' With a high activity level, adding joint-support supplements like glucosamine could be beneficial.';
            }
        }

        // Additional recommendations based on diet type
        if (dietType === 'vegetarian' || dietType === 'vegan') {
            recommendation += ' As a ' + dietType + ', plant-based protein powder, B12, and iron are beneficial.';
        }

        // Display the recommendation
        document.getElementById('recommendationText').innerText = recommendation;
        document.getElementById('result').style.display = 'block';

        // Hide the loader after recommendation is displayed
        document.getElementById('loader').style.display = 'none';
    }, 2000); // Simulate a 2-second loading time
}

//----------SUPPLEMENT TRACKER----------//

const supplementForm = document.getElementById('supplement-form');
const historyList = document.getElementById('history-list');
const logSupplement = document.getElementById('log-supplement');
const loadingAnimation = document.querySelector('.loading-animation');  // Make sure this matches your SVG's class

logSupplement.addEventListener('click', function (event) {
    event.preventDefault();

    // Show the loading animation
    loadingAnimation.style.display = 'block';

    // Get form input values
    const supplementName = document.getElementById('supplement-name').value;
    const dosage = document.getElementById('dosage').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    // Check if all required fields are filled
    if (!supplementName || !dosage || !category || !date || !time) {
        alert("Please fill in all the required fields.");
        loadingAnimation.style.display = 'none';  // Hide animation if validation fails
        return;
    }

    // Simulate a delay (e.g., a fetch request or database save)
    setTimeout(function () {
        // Hide loading animation after 3 seconds
        loadingAnimation.style.display = 'none';

        // Create a new history item
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <div>
                <strong>${supplementName}</strong> (${dosage} mg, ${category}) <br>
                <small>${date} at ${time}</small> <br>
                <em>${notes}</em>
            </div>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        // Append the item to the history list
        historyList.appendChild(historyItem);

        // Event listener for the edit button
        historyItem.querySelector('.edit-btn').addEventListener('click', function () {
            document.getElementById('supplement-name').value = supplementName;
            document.getElementById('dosage').value = dosage;
            document.getElementById('category').value = category;
            document.getElementById('date').value = date;
            document.getElementById('time').value = time;
            document.getElementById('notes').value = notes;
            historyList.removeChild(historyItem);
        });

        // Event listener for the delete button
        historyItem.querySelector('.delete-btn').addEventListener('click', function () {
            historyList.removeChild(historyItem);
        });

        // Clear the form after logging the supplement
        supplementForm.reset();
    }, 3000); // Simulate a 3-second delay
});
