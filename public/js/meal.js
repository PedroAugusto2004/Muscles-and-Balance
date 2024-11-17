// NUTRITION CALCULATOR

document.getElementById('addFoodItem').addEventListener('click', function () {
    const foodItemCount = document.querySelectorAll('.food-item').length + 1;

    const newFoodItem = document.createElement('div');
    newFoodItem.classList.add('food-item');
    newFoodItem.innerHTML = `
        <label for="foodItem${foodItemCount}">Food Item ${foodItemCount}:</label>
        <input type="text" id="foodItem${foodItemCount}" name="foodItem${foodItemCount}" class="foodInput" placeholder="Enter food name">
        <input type="number" id="portion${foodItemCount}" name="portion${foodItemCount}" class="portionInput" placeholder="Portion size (grams)">
<button class="deleteFoodItem" type="button">
  <span class="deleteFoodItem__text">Delete</span>
  <span class="deleteFoodItem__icon">
    <svg class="svg" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg">
 <title></title>
      <path
        d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
        style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      ></path>
      <line
        style="stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px"
        x1="80"
        x2="432"
        y1="112"
        y2="112"
      ></line>
      <path
        d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
        style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
      ></path>
      <line
        style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        x1="256"
        x2="256"
        y1="176"
        y2="400"
      ></line>
      <line
        style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        x1="184"
        x2="192"
        y1="176"
        y2="400"
      ></line>
      <line
        style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        x1="328"
        x2="320"
        y1="176"
        y2="400"
      ></line>
      </svg>
  </span>
</button>
    `;

    document.getElementById('additionalFoodItems').appendChild(newFoodItem);

    // Add event listener to the delete button
    newFoodItem.querySelector('.deleteFoodItem').addEventListener('click', function () {
        newFoodItem.remove();
    });
});

document.getElementById('mealForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodItems = [];
    let isFormValid = true; // Track if all inputs are filled

    const foodItemElements = document.querySelectorAll('.food-item');
    foodItemElements.forEach((item) => {
        const foodName = item.querySelector('input[type="text"]').value.trim();
        const portionSize = parseFloat(item.querySelector('input[type="number"]').value);

        // Check if any field is empty or invalid
        if (!foodName || isNaN(portionSize) || portionSize <= 0) {
            isFormValid = false;
        } else {
            foodItems.push({ name: foodName, portion: portionSize });
        }
    });

    // Show alert if form is not valid
    if (!isFormValid) {
        alert("Enter your food first🍔");
        return; // Stop further execution
    }

    console.log('Food items:', foodItems);

    getNutritionData(foodItems);
});

async function getNutritionData(foodItems) {
    const apiKey = 'dc176e1bce2d7f71f403b8716d4edd5c';
    const appId = '92b2b0f1';
    let totalCalories = 0;
    let totalProteins = 0;
    let totalFats = 0;
    let totalCarbs = 0;
    let totalFiber = 0;
    let totalSugars = 0;
    let totalSodium = 0;
    let totalCholesterol = 0;

    showLoadingSpinner();

    for (let item of foodItems) {
        if (item.name && item.portion > 0) {
            try {
                const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-app-id': appId,
                        'x-app-key': apiKey
                    },
                    body: JSON.stringify({
                        query: `${item.portion} grams of ${item.name}`,
                        num_servings: 1
                    })
                });

                if (!response.ok) {
                    console.error('API request failed with status:', response.status);
                    continue;
                }

                const data = await response.json();
                const food = data.foods ? data.foods[0] : null;
                if (!food) continue;

                totalCalories += food.nf_calories;
                totalProteins += food.nf_protein;
                totalFats += food.nf_total_fat;
                totalCarbs += food.nf_total_carbohydrate;
                totalFiber += food.nf_dietary_fiber || 0;
                totalSugars += food.nf_sugars || 0;
                totalSodium += food.nf_sodium || 0;
                totalCholesterol += food.nf_cholesterol || 0;
            } catch (error) {
                console.error('Error fetching nutrition data:', error);
            }
        }
    }

    document.getElementById('caloriesValue').textContent = totalCalories.toFixed(2);
    document.getElementById('proteinsValue').textContent = `${totalProteins.toFixed(2)} g`;
    document.getElementById('fatsValue').textContent = `${totalFats.toFixed(2)} g`;
    document.getElementById('carbsValue').textContent = `${totalCarbs.toFixed(2)} g`;
    document.getElementById('fiberValue').textContent = `${totalFiber.toFixed(2)} g`;
    document.getElementById('sugarsValue').textContent = `${totalSugars.toFixed(2)} g`;
    document.getElementById('sodiumValue').textContent = `${totalSodium.toFixed(2)} mg`;
    document.getElementById('cholesterolValue').textContent = `${totalCholesterol.toFixed(2)} mg`;

    hideLoadingSpinner();
}

function showLoadingSpinner() {
    document.getElementById('nutritionLabel').style.display = 'none';
    document.getElementById('loadingSpinnerNew').style.display = 'flex';
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinnerNew').style.display = 'none';
    document.getElementById('nutritionLabel').style.display = 'block';
}


// RECIPES

function filterRecipes() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const recipes = document.getElementsByClassName('recipe-card');

    for (let i = 0; i < recipes.length; i++) {
        const recipeTitle = recipes[i].getElementsByTagName('h2')[0].innerText.toLowerCase();

        if (recipeTitle.includes(searchTerm)) {
            recipes[i].style.display = '';
        } else {
            recipes[i].style.display = 'none';
        }
    }
}
