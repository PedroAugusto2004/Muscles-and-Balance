//----------SUPPLEMENT QUIZ----------//

// eslint-disable-next-line no-unused-vars
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
                <a href="https://www.optimumnutrition.com/en-us/Products/Shakes-%26-Powders/GOLD-STANDARD-100%25-WHEY%E2%84%A2/p/gold-standard-100-whey-protein" target="_blank">whey protein</a>, 
                <a href="https://www.optimumnutrition.com/en-us/Products/Endurance-Support/BCAA-1000/p/bcaa-1000 target="_blank">BCAAs</a>, and 
                <a href="https://www.optimumnutrition.com/en-us/Products/Muscle-Building/Micronized-Creatine-Powder/p/creatine-micronized" target="_blank">creatine</a>.
            `;
            if (activityLevel === 'high') {
                recommendation += `
                    Since your activity level is high, adding 
                    <a href="https://www.dripdrop.com/products/dripdrop/juicy-variety-pack-8-32" target="_blank">electrolytes</a> and a 
                    <a href="https://www.transparentlabs.com/products/coreseries-post-workout?_pos=1&_sid=eb03683dd&_ss=r" target="_blank">post-workout recovery formula</a> 
                    can help with muscle repair.
                `;
            }
        } else if (goal === 'weightLoss') {
            recommendation = `
                To support weight loss, consider 
                <a href="https://www.hunterevolve.com/en-us/hunter-burn" target="_blank">thermogenic fat burners</a>, 
                <a href="https://www.amazon.com/Metamucil-Multi-Health-Psyllium-Supplement-Sugar-Free/dp/B003CT2YQY?language=en_US" target="_blank">fiber supplements</a> like glucomannan, and 
                <a href="https://naturesbounty.com/products/green-tea-extract-315-mg-100-capsules" target="_blank">green tea extract</a>.
            `;
            if (activityLevel === 'moderate' || activityLevel === 'high') {
                recommendation += `
                    A high-activity level benefits from 
                    <a href="https://www.optimumnutrition.com/en-us/Products/Endurance-Support/BCAA-1000/p/bcaa-1000 target="_blank" target="_blank">BCAAs</a> and a 
                    <a href="https://www.optimumnutrition.com/en-us/Products/Shakes-%26-Powders/GOLD-STANDARD-100%25-WHEY%E2%84%A2/p/gold-standard-100-whey-protein" target="_blank">low-calorie protein powder</a> 
                    to preserve lean muscle.
                `;
            }
        } else if (goal === 'energyBoost') {
            recommendation = `
                For an energy boost, try 
                <a href="https://www.amazon.com/Nutricost-Caffeine-Pills-Serving-Capsules/dp/B01MY5CW7S" target="_blank">caffeine</a>, 
                <a href="https://www.naturemade.com/collections/b-vitamins" target="_blank">B vitamins</a>, and 
                <a href="https://www.kaged.com/products/pre-workout-elite?variant=40462859599937&_pos=1&_sid=886d311cf&_ss=r" target="_blank">pre-workout supplements</a> with adaptogens.
            `;
            if (activityLevel === 'low') {
                recommendation += `
                    Since you have a low activity level, consider starting with lighter doses to assess tolerance.
                `;
            }
        } else if (goal === 'generalHealth') {
            recommendation = `
                For general health, consider a 
                <a href="https://www.amazon.com/Amazon-Brand-Solimo-Multivitamin-Gummies/dp/B07JGW2JKF/ref=sr_1_1_ffob_sspa?c=ts&dib=eyJ2IjoiMSJ9.w-YMpTff7nqvBVLebQKCWH1kOnMdEXirZK7CF_-9LAvdSBKRSBcBUlG7qPN7oOBN6q10wW12s_wq-ULnnPA0SHG2QC9i5CFoPMycDM4Qpiy8lr7AvLMoikYQj2vVFRaHgExYctyP89Z9dFw5YgsGs6SzG-LMFTR0TUjX-LCDlRYSE39pfOoYE7klM3pUQMXkcpzYbpYHZfAJMrOPC2X2q3c95yDAe1IsEXa5VWK3ff1XTAuLcd7NejYUAjRSpFhm--qHXd3G6xt5OJIkNa7ADEG7yoqOONpC6adxGOCSqOo.6niTcskBYmE9BsS-cjLopGScoxZFelhW47RR4msjSw8&dib_tag=se&keywords=Multivitamins&qid=1734568656&s=hpc&sr=1-1-spons&ts_id=3774861&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" target="_blank">multivitamin</a>, 
                <a href="https://www.amazon.com/Omega-3-Supplement-Ultimate-Burpless-Capsules/dp/B07V5Q651G/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.LIPqGbRkAZng6xC3lP7ItZ9yFp98S0nnEdF9yfKk2nsahl4-cFSbih1MEGeeg_5pSgMbYHAFxYOBZrtFf9H3PZVO3IcFdff6kzyrMxOD1vgFN15mBhJsXN7nB8N9bUq46QvJ4F5alAfWdvHHP5BqbU9lus_fT6iA17S3-WtZIQKglcymdIo7257NxX7km6RjMKUGrLZS0Z_SNuBWziBNGGz5CN-RKypUefwQapIOaGBSdY0kaccICWZEF_RurkHO-0pNqFaJVu_M9Cd9nVecFsMlXMBxJBJGddSL01fo1_k.Il2lafG0_D6r_WIHlHv_d9dYoUtI8RYgF_vo74YsyKg&dib_tag=se&keywords=omega+3&qid=1734568730&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" target="_blank">omega-3 fatty acids</a>, and 
                <a href="https://www.amazon.com/Plexus%C2%AE-Bio-Cleanse%C2%AE-120-ct/dp/B00RXONJEU/ref=sr_1_1_sspa?crid=2IMDX67VKZQ96&dib=eyJ2IjoiMSJ9.ARvZu-INnIWASNucFbGwMVl8NQYzSQXn1BKIZbwv3qEeL411tcQVDOTYmlXO_QllEZAQZIqSliRSqOcuKTg-P1jPNnnwDoojuN-SaMoFbENTUpq55OCThLd1Kllk4xibuttcBIaSiRCqLkojWdkShVd-ayts7_oXfESp3PTRmUrjD3TXY-KhOB0ncF25z5mKbbQIZkOpqQfg_dmy68n6T_-gERj73nlMv4wC41bOTfqPmuV-CXd6MSkwmPc08_NN3XsLVFjcKpux7sRE6xP-lu8xROFi5O7J9MsiZx25V9U.beOUuaRihXpp_SAWDHVNvvvL3R-w8qO_-6ca1gvPTVE&dib_tag=se&keywords=probiotics&qid=1734568776&sprefix=probiotic%2Caps%2C316&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" target="_blank">probiotics</a> for digestive health.
            `;
            if (activityLevel === 'high') {
                recommendation += `
                    With a high activity level, adding 
                    <a href="https://www.amazon.com/Bronson-Glucosamine-Chondroitin-Turmeric-Cartilage/dp/B0BVGKX6QK/ref=sr_1_2?crid=2BPEKEOMMYHMW&dib=eyJ2IjoiMSJ9.2ZCvXbDmHMFcCNmLQvZotEtoylN8qi7Q14q__lJKxVWhKZMTHVfPQISPnnxoLkAaZkf5_tqjZlgBc6R9okhDSkRtTq990-WYXOMChmv-H83LxAFc726IHiZieha4tvX-IdrBpF529iUP4WcvkuUMGxuNixNbjge3bzykmZj2MICr1X7vmwgTPG0cYUP8wtR5PnLrxFgZQootnJ9CseYKn3myS2A7qBNgDtssDmrgtMGm8e3aw8DiR9V4JJSDhfpx_ddLrqWIsrjfIZMpNdTdUokI2rLrWD9gAm3hzvZEin8WeX89J4KelyCBM5br2BKCNazTe6qeWmvuTGy-OWrK2BxssJcgrgzZg35hZi9dpfdp_ExX1yieiyTZBx2eWXzl3Hb3hynWc6HKdK7MzfYpGTq7QpPIpofIYEWDv8wzQhFQmJPO7ZkPL0PEKLMwl6sm.TU1DRSGdrMgIkp59yo_baIB7BQAA2UkSsWRjdm1BL4s&dib_tag=se&keywords=glucosamine+chondroitin&qid=1734568830&sprefix=glu%2Caps%2C306&sr=8-2" target="_blank">joint-support supplements</a> like glucosamine 
                    could be beneficial.
                `;
            }
        }

        // Add diet-specific recommendations
        if (dietType === 'vegetarian' || dietType === 'vegan') {
            recommendation += `
                As a ${dietType}, 
                <a href="https://www.optimumnutrition.com/en-us/Products/Shakes-%26-Powders/GOLD-STANDARD%C2%AE-100%25-Plant/p/C100027" target="_blank">plant-based protein powder</a>, 
                <a href="https://www.amazon.com/Production-Metabolism-Raspberry-Previously-Solimo/dp/B07BBFK9QZ/ref=sr_1_1_ffob_sspa?crid=20G5DIN1T9EK9&dib=eyJ2IjoiMSJ9.ALUuu7sfRhxrYBscHj1QTIzR87q8ykzERE6mN3j0-nW_D5QvLsmjupU1VN_RDI3h4Egd0CRpre0OXm2BwlEkFYAECgHaFSZ-W44R7aX39xu1-HhOlEgafmphmzk9NrGuB2EQv-q--dR4_G2FmQhWxYQNbYKPhHqCggKe9wDtCTw9uDF6s9xIK7y9Y9ypDay9aghJhuKjrMipW3_Af0RWSHn830zAD9wRwZrt50cXStXXsLIqJotY4X9e5_9lDCe7tlh776L7WWJfkuyTcbHqYlmMgwzIUYtrx50OtFmR3MU.w4Vh4-boKnOTH_rMTWRjZ_Dolv7GyYOLKnYtxLNQKXM&dib_tag=se&keywords=B12&qid=1734568921&sprefix=b1%2Caps%2C308&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" target="_blank">B12</a>, and 
                <a href="https://www.amazon.com/Amazon-Elements-Organic-Iron-Tablets/dp/B08TNPMSH9/ref=sr_1_1_ffob_sspa?crid=1WPPO9C9EAJ0S&dib=eyJ2IjoiMSJ9.Wh3GLiCaLkWHWDFVxdhzsvEXFduPrdmtJ-1rtUV48i14S2o4BlkbuvM4ywdVyb0zsoUKm-_ZZ5XseZqoQb-sEHd2aEdBRmZtvcVLQZjJM7ltp2KY6pTwhLXHXWov4BqzS0yhIBatIs5FyWjsvSHCV_YfdYnWIxyJOrgvLtPqf5-zdTq6p8ThAdPtoh5R9MUm0JROZ3HBXuwY7x_kGf_STbcPL6I8lkcIThaydO1y05Uny5bc2iRooUNs7ACZMCZk9olu5OUFUvJM3imybnj7I1eefbWivNhsd7C9MLCAD4k.rB_DkOC90mN57CYZ5e08IKo2w15q50qipDrVFJVRLtc&dib_tag=se&keywords=iron+supplement&qid=1734568965&sprefix=iron%2Caps%2C295&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1" target="_blank">iron</a> are beneficial.
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
