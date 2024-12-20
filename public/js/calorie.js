// CALORIE AND MACROS CALCULATOR
document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".question-step");
    let currentStep = 0;

    const showStep = (step) => {
        steps.forEach((s, index) => {
            if (index === step) {
                s.classList.add("active");
                s.style.display = "block";
            } else {
                s.classList.remove("active");
                s.style.display = "none";
            }
        });
    };

    const validateStep = (step) => {
        const inputs = steps[step].querySelectorAll("input, select");
        for (const input of inputs) {
            if (!input.value) {
                return false;
            }
        }
        return true;
    };

    document.querySelectorAll(".next-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const age = parseInt(document.getElementById("age").value);
            if (age < 14) {
                alert("You must be at least 14 years old to proceed.");
                return; // Prevent moving to the next step
            }

            if (!validateStep(currentStep)) {
                alert("Please fill all the fields ⚡");
                return;
            }
            if (index < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll(".back-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // Initialize first step
    showStep(currentStep);
});

const heightInput = document.getElementById('height');
const heightUnit = document.getElementById('heightUnit');

// Input validation for height field
heightInput.addEventListener('input', () => {
    if (heightUnit.value === 'ft') {
        // Allow numbers and common characters for feet ('`, `, ´, ., ")
        heightInput.value = heightInput.value.replace(/[^0-9'",´.`]/g, '');
    } else {
        // Allow only numbers for cm
        heightInput.value = heightInput.value.replace(/\D/g, '');
    }
});

heightUnit.addEventListener('change', () => {
    // Clear the input when switching units to avoid invalid formats
    heightInput.value = '';
    if (heightUnit.value === 'cm') {
        heightInput.placeholder = "Height (e.g., 180)";
    } else if (heightUnit.value === 'ft') {
        heightInput.placeholder = "Height (e.g., 5'11)";
    }
});

// Function to calculate calories and macros
function calculateCaloriesAndMacros() { 
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = document.getElementById("height").value; // Will be in the format "5'6"
    const weightUnit = document.getElementById("weightUnit").value;
    const heightUnit = document.getElementById("heightUnit").value;
    const activityLevel = parseFloat(document.getElementById("activityLevel").value);
    const goal = document.getElementById("goal").value;

    if (!age || !gender || !weight || !height || !activityLevel || !goal) {
        document.getElementById("result").innerHTML = "Please fill out all fields 💪";
        return;
    }

    let weightInKg = weight;
    if (weightUnit === "lbs") {
        weightInKg = weight * 0.453592; // Convert lbs to kg
    }

    let heightInCm;
    if (heightUnit === "ft") {
        // Normalize input to handle various characters ('`, `, ´, ., ")
        const normalizedHeight = height.replace(/[`,´.`]/g, "'");
        const heightParts = normalizedHeight.match(/^(\d+)'(\d+)?$/);
        if (heightParts) {
            const feet = parseInt(heightParts[1]);
            const inches = parseInt(heightParts[2] || 0);
            heightInCm = (feet * 30.48) + (inches * 2.54);
        } else {
            document.getElementById("result").innerHTML = "Please enter height in the format 5'6\" for ft.";
            return;
        }
    } else {
        heightInCm = parseFloat(height); // Assume cm directly
    }

    document.getElementById("loadingSpinner").style.display = "flex";
    document.getElementById("result").innerHTML = "";
    document.getElementById("macroResult").innerHTML = "";

    setTimeout(() => {
        let bmr = gender === "male"
            ? 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age)
            : 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);

        let dailyCalories = bmr * activityLevel;
        dailyCalories += goal === "lose" ? -500 : goal === "gain" ? 500 : 0;

        const roundedCalories = Math.round(dailyCalories);
        document.getElementById("result").innerHTML = `Your daily caloric needs are approximately ${roundedCalories} calories.`;

        let adjustedCalories = goal === "lose" ? roundedCalories * 0.85 : goal === "gain" ? roundedCalories * 1.15 : roundedCalories;

        let carbPercentage, fatPercentage, proteinGrams;
        if (goal === "maintain") {
            carbPercentage = 0.45;
            fatPercentage = 0.25;
            proteinGrams = weightInKg * 0.8;
        } else if (goal === "gain") {
            carbPercentage = 0.42;
            fatPercentage = 0.22;
            proteinGrams = weightInKg * 1.8;
        } else {
            carbPercentage = 0.40;
            fatPercentage = 0.20;
            proteinGrams = weightInKg * 1.5;
        }

        const carbGrams = (adjustedCalories * carbPercentage) / 4;
        const fatGrams = (adjustedCalories * fatPercentage) / 9;

        document.getElementById("loadingSpinner").style.display = "none";
        
        document.getElementById('macroResult').innerHTML = ` 
            <p>Based on your goal: <strong>${goal.charAt(0).toUpperCase() + goal.slice(1)}</strong></p>
            <p>Carbohydrates: ${carbGrams.toFixed(2)} grams/day</p>
            <p>Protein: ${proteinGrams.toFixed(2)} grams/day</p>
            <p>Fats: ${fatGrams.toFixed(2)} grams/day</p>
        `;
        
        // Show the results with animation
        document.getElementById("result").classList.add("show");
        document.getElementById("macroResult").classList.add("show");

        document.getElementById("exportBtn").style.display = "block";
    }, 1000); // Delay to simulate loading
}


// EXPORT PDF
function exportToPDF() {
    const userName = localStorage.getItem("userName") || "User";
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add logo
    const logoUrl = "images/MBlogo.png";
    pdf.addImage(logoUrl, 'PNG', 10, 10, 30, 30);

    // Title
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("Muscles & Balance", 60, 25);

    const title = `Calorie and Macronutrient Breakdown for ${userName}`;
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    const titleLines = pdf.splitTextToSize(title, 180);
    pdf.text(titleLines, 10, 50);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    pdf.setFontSize(12);
    pdf.text(`Date of Calculation: ${formattedDate}`, 10, 60);

    // Retrieve inputs
    const age = document.getElementById("age").value || "N/A";
    const gender = document.getElementById("gender").value || "N/A";
    const weight = document.getElementById("weight").value || "N/A";
    const height = document.getElementById("height").value || "N/A";
    const weightUnit = document.getElementById("weightUnit").value || "N/A";
    const heightUnit = document.getElementById("heightUnit").value || "N/A";
    const activityLevel = document.getElementById("activityLevel").value || "N/A";
    const goal = document.getElementById("goal").value || "N/A";

    // Add user inputs
    pdf.text("User Inputs:", 10, 70);
    pdf.text(`Age: ${age}`, 10, 80);
    pdf.text(`Gender: ${gender}`, 10, 90);
    pdf.text(`Weight: ${weight} ${weightUnit}`, 10, 100);
    pdf.text(`Height: ${height} ${heightUnit}`, 10, 110);
    pdf.text(`Activity Level: ${activityLevel}`, 10, 120);
    pdf.text(`Goal: ${goal}`, 10, 130);

    // Add results
    const calorieResult = document.getElementById("result").innerText;
    pdf.text("Caloric Intake:", 10, 140);
    pdf.text(calorieResult, 10, 150);

    const macroResult = document.getElementById("macroResult").innerText;
    pdf.text("Macronutrient Breakdown:", 10, 160);
    const macroLines = pdf.splitTextToSize(macroResult, 180);
    pdf.text(macroLines, 10, 170);

    // Footer
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Powered by Muscles & Balance", 10, pdf.internal.pageSize.height - 20);
    pdf.text("Contact us at: musclesbalance@gmail.com", 10, pdf.internal.pageSize.height - 10);

    // Save PDF
    pdf.save(`Calorie_and_Macronutrient_Report_${userName}.pdf`);
}
