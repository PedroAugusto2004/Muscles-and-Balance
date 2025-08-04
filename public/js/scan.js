document.getElementById('start-scan').addEventListener('click', () => {
  showLoadingMessage(true); // Show loading message
  clearMessages(); // Clear any previous messages

  Quagga.init(
    {
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: window.innerWidth, // Dynamic width
          height: window.innerHeight - 200, // Dynamic height with space for UI
          facingMode: 'environment', // Use the rear camera
          aspectRatio: { ideal: 4 / 3 }, // Common aspect ratio for mobile
        },
        area: {
          // Define scanning area for better focus
          top: '20%', // 20% from the top
          right: '10%', // 10% from the right
          left: '10%', // 10% from the left
          bottom: '20%', // 20% from the bottom
        },
        target: document.querySelector('#scanner'), // Output stream to the scanner div
      },
      decoder: {
        readers: ['ean_reader'], // Supports EAN-13 barcodes
      },
    },
    (err) => {
      if (err) {
        Logger.error('Barcode scanner initialization failed', err);
        showErrorMessage('Error initializing the scanner.');
        return;
      }
      Quagga.start();
    }
  );

  Quagga.onDetected((data) => {
    const barcode = data.codeResult.code;
    fetchNutritionData(barcode);
    Quagga.stop(); // Stop scanning after a barcode is detected
  });
});

// Fetch nutrition data and display
function fetchNutritionData(barcode) {
  fetch(
    'https://python-backend-679194909576.us-central1.run.app/api/nutrition',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ barcode }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.foods && data.foods.length > 0) {
        displayNutritionFacts(data.foods[0]);
      } else {
        showErrorMessage('Product not found. Try another barcode.');
      }
    })
    .catch((err) => {
      Logger.error('Failed to fetch barcode data', err);
      showErrorMessage('There was an issue fetching the product data.');
    });
}

function displayNutritionFacts(product) {
  const { description, foodNutrients } = product;

  // Extract key nutrients
  const calories =
    foodNutrients.find((n) => n.nutrientName === 'Energy')?.value || 'N/A';
  const protein =
    foodNutrients.find((n) => n.nutrientName === 'Protein')?.value || 'N/A';
  const fat =
    foodNutrients.find((n) => n.nutrientName === 'Total lipid (fat)')?.value ||
    'N/A';
  const carbs =
    foodNutrients.find((n) => n.nutrientName === 'Carbohydrate, by difference')
      ?.value || 'N/A';
  const fiber =
    foodNutrients.find((n) => n.nutrientName === 'Fiber, total dietary')
      ?.value || 'N/A';
  const sodium =
    foodNutrients.find((n) => n.nutrientName === 'Sodium, Na')?.value || 'N/A';

  const nutritionHtml = `
        <h2>${description}</h2>
        <p>Calories: ${calories} kcal</p>
        <p>Total Fat: ${fat} g</p>
        <p>Carbohydrates: ${carbs} g</p>
        <p>Fiber: ${fiber} g</p>
        <p>Protein: ${protein} g</p>
        <p>Sodium: ${sodium} mg</p>
    `;
  document.getElementById('nutrition-info').innerHTML = nutritionHtml;
  document.getElementById('nutrition-info').style.display = 'block';
  showSuccessMessage('Nutrition data fetched successfully!');
}

// Helper functions for messages
function showLoadingMessage(show) {
  document.getElementById('loading-message').style.display = show
    ? 'block'
    : 'none';
}

function showErrorMessage(message) {
  const popup = document.getElementById('error-popup-unique');
  const popupMessage = document.getElementById('popup-message-unique');

  // Set the message in the popup
  popupMessage.innerText = message;

  // Show the popup
  popup.style.display = 'block';

  // Close the popup when the close button is clicked
  document.querySelector('.close-btn-unique').addEventListener('click', () => {
    popup.style.display = 'none';
  });

  // Close the popup when clicking outside the popup content
  window.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.style.display = 'none';
    }
  });
}

function showSuccessMessage(message) {
  document.getElementById('success-message').style.display = 'block';
  document.getElementById('success-message').innerText = message;
  showLoadingMessage(false);
}

function clearMessages() {
  document.getElementById('error-message').style.display = 'none';
  document.getElementById('success-message').style.display = 'none';
  document.getElementById('nutrition-info').style.display = 'none';
}
