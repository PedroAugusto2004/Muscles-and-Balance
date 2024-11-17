//CALORIE AND MACROS CALCULATOR

function calculateCaloriesAndMacros() {
    // Get form values
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activityLevel = parseFloat(document.getElementById("activityLevel").value);
    const goal = document.getElementById("goal").value;

    // Check if any field is empty
    if (!age || !gender || !weight || !height || !activityLevel || !goal) {
        document.getElementById("result").innerHTML = "Please fill out all fields 💪";
        return;
    }

    // Show loading spinner
    document.getElementById("loadingSpinner").style.display = "flex";
    document.getElementById("result").innerHTML = ""; 
    document.getElementById("macroResult").innerHTML = ""; 

    setTimeout(() => {
        // CALORIE CALCULATION
        let bmr = gender === "male"
            ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
            : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

        let dailyCalories = bmr * activityLevel;
        dailyCalories += goal === "lose" ? -500 : goal === "gain" ? 500 : 0;

        const roundedCalories = Math.round(dailyCalories);
        document.getElementById("result").innerHTML = `Your daily caloric needs are approximately ${roundedCalories} calories.`;

        // MACRO CALCULATION
        let adjustedCalories = goal === "lose" ? roundedCalories * 0.85 : goal === "gain" ? roundedCalories * 1.15 : roundedCalories;

        let carbPercentage, fatPercentage, proteinGrams;
        if (goal === "maintain") {
            carbPercentage = 0.45;
            fatPercentage = 0.25;
            proteinGrams = weight * 0.8;
        } else if (goal === "gain") {
            carbPercentage = 0.42;
            fatPercentage = 0.22;
            proteinGrams = weight * 1.8;
        } else {
            carbPercentage = 0.40;
            fatPercentage = 0.20;
            proteinGrams = weight * 1.5;
        }

        const carbGrams = (adjustedCalories * carbPercentage) / 4;
        const fatGrams = (adjustedCalories * fatPercentage) / 9;

        // Hide loading spinner and display the macro result
        document.getElementById("loadingSpinner").style.display = "none";
        document.getElementById('macroResult').innerHTML = ` 
            <p>Based on your goal: <strong>${goal.charAt(0).toUpperCase() + goal.slice(1)}</strong></p>
            <p>Carbohydrates: ${carbGrams.toFixed(2)} grams/day</p>
            <p>Protein: ${proteinGrams.toFixed(2)} grams/day</p>
            <p>Fats: ${fatGrams.toFixed(2)} grams/day</p>
        `;

        // Show the Export to PDF button
        document.getElementById("exportBtn").style.display = "block";
    }, 1000); // Delay to simulate loading
}

// EXPORT PDF
function exportToPDF() {
    // Retrieve the user's name from localStorage or set it to "User" if not found
    const userName = localStorage.getItem("userName") || "User";

    // Load jsPDF from the global window object
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add company logo (adjust the path if needed)
    const logoUrl = "images/MBlogo.png"; // Replace with your actual logo URL or base64 string
    pdf.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjusted size and position (top-left corner)

    // Add "Muscles & Balance" title with a strong, bold font style
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold"); // Set font to bold for a strong look
    pdf.text("Muscles & Balance", 60, 25); // Position it to the right of the logo

    // Set PDF title with the user's name and handle long text wrapping
    const title = `Calorie and Macronutrient Breakdown for ${userName}`;
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    const titleLines = pdf.splitTextToSize(title, 180); // Wrap text within width
    pdf.text(titleLines, 10, 50); // Position below the logo and main title

    // Add the current date and time to the PDF
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Format date and time as a localized string
    pdf.setFontSize(12);
    pdf.text(`Date of Calculation: ${formattedDate}`, 10, 60);

    // Retrieve and add Calorie Calculator Results
    const calorieResult = document.getElementById("result").innerText;
    pdf.setFontSize(12);
    pdf.text("Caloric Intake:", 10, 80);
    pdf.text(calorieResult, 10, 90);

    // Retrieve and add Macronutrient Calculator Results with text wrapping
    const macroResult = document.getElementById("macroResult").innerText;
    pdf.text("Macronutrient Breakdown:", 10, 110);
    const macroLines = pdf.splitTextToSize(macroResult, 180);
    pdf.text(macroLines, 10, 120);

    // Add footer with company name and contact information
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold"); // Use bold font in the footer for consistency
    pdf.text("Powered by Muscles & Balance", 10, pdf.internal.pageSize.height - 20);
    pdf.text("Contact us at: musclesbalance@gmail.com", 10, pdf.internal.pageSize.height - 10);

    // Save the PDF with the user's name in the filename
    pdf.save(`Calorie_and_Macronutrient_Report_${userName}.pdf`);
}
