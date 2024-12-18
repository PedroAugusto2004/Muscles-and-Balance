//----------SUPPLEMENT QUIZ----------//

function calculateRecommendation() {
    const goal = document.getElementById('goal').value;
    const activityLevel = document.getElementById('activityLevel').value;
    const dietType = document.getElementById('dietType').value;
    let recommendation = '';

    // Validate form fields
    if (!goal || !activityLevel || !dietType) {
        alert("Please fill in all the fields 💪");
        return;
    }

    // Show loader and hide result text initially
    document.getElementById('loader').style.display = 'flex';
    document.getElementById('result').style.display = 'none';

    // Simulate loading time
    setTimeout(() => {
        // Generate recommendations based on user inputs
        if (goal === 'muscleGain') {
            recommendation = `
                For muscle gain, consider 
                <a href="https://example.com/whey-protein" target="_blank">whey protein</a>, 
                <a href="https://example.com/bcaas" target="_blank">BCAAs</a>, and 
                <a href="https://example.com/creatine" target="_blank">creatine</a>.
            `;
            if (activityLevel === 'high') {
                recommendation += `
                    Since your activity level is high, adding 
                    <a href="https://example.com/electrolytes" target="_blank">electrolytes</a> and a 
                    <a href="https://example.com/post-workout" target="_blank">post-workout recovery formula</a> 
                    can help with muscle repair.
                `;
            }
        } else if (goal === 'weightLoss') {
            recommendation = `
                To support weight loss, consider 
                <a href="https://example.com/fat-burners" target="_blank">thermogenic fat burners</a>, 
                <a href="https://example.com/fiber-supplements" target="_blank">fiber supplements</a> like glucomannan, and 
                <a href="https://example.com/green-tea" target="_blank">green tea extract</a>.
            `;
            if (activityLevel === 'moderate' || activityLevel === 'high') {
                recommendation += `
                    A high-activity level benefits from 
                    <a href="https://example.com/bcaas" target="_blank">BCAAs</a> and a 
                    <a href="https://example.com/low-cal-protein" target="_blank">low-calorie protein powder</a> 
                    to preserve lean muscle.
                `;
            }
        } else if (goal === 'energyBoost') {
            recommendation = `
                For an energy boost, try 
                <a href="https://example.com/caffeine" target="_blank">caffeine</a>, 
                <a href="https://example.com/b-vitamins" target="_blank">B vitamins</a>, and 
                <a href="https://example.com/pre-workout" target="_blank">pre-workout supplements</a> with adaptogens.
            `;
            if (activityLevel === 'low') {
                recommendation += `
                    Since you have a low activity level, consider starting with lighter doses to assess tolerance.
                `;
            }
        } else if (goal === 'generalHealth') {
            recommendation = `
                For general health, consider a 
                <a href="https://example.com/multivitamin" target="_blank">multivitamin</a>, 
                <a href="https://example.com/omega-3" target="_blank">omega-3 fatty acids</a>, and 
                <a href="https://example.com/probiotics" target="_blank">probiotics</a> for digestive health.
            `;
            if (activityLevel === 'high') {
                recommendation += `
                    With a high activity level, adding 
                    <a href="https://example.com/joint-support" target="_blank">joint-support supplements</a> like glucosamine 
                    could be beneficial.
                `;
            }
        }

        // Add diet-specific recommendations
        if (dietType === 'vegetarian' || dietType === 'vegan') {
            recommendation += `
                As a ${dietType}, 
                <a href="https://example.com/plant-protein" target="_blank">plant-based protein powder</a>, 
                <a href="https://example.com/b12" target="_blank">B12</a>, and 
                <a href="https://example.com/iron" target="_blank">iron</a> are beneficial.
            `;
        }

        // Display the recommendation
        document.getElementById('recommendationText').innerHTML = recommendation.trim();
        document.getElementById('result').style.display = 'block';

        // Hide the loader
        document.getElementById('loader').style.display = 'none';
    }, 2000); // Simulate 2-second loading time
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
