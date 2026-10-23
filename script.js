
function validateFeedback() {
    let valid = true;

    document.querySelectorAll(".error").forEach(el => {
        el.textContent = "";
    });

    ["student", "course", "faculty"].forEach(id => {
        const field = document.getElementById(id);

        if (!field.value.trim()) {
            showError(id, "This field is required.");
            valid = false;
        }
    });

    ["teaching", "practical", "content"].forEach(id => {
        const field = document.getElementById(id);
        const value = field.value.trim();
        const rating = Number(value);

        if (
            value === "" ||
            !Number.isFinite(rating) ||
            rating < 1 ||
            rating > 5
        ) {
            showError(id, "Enter a rating between 1 and 5.");
            valid = false;
        }
    });

    if (!valid) {
        alert("Please correct the errors before submitting.");
    }

    return valid;
}

function showError(id, message) {
    const field = document.getElementById(id);
    let error = document.getElementById(id + "Error");

    if (!error) {
        error = document.createElement("div");
        error.id = id + "Error";
        error.className = "error";
        field.insertAdjacentElement("afterend", error);
    }

    error.textContent = message;
}

function calculateAverage(teaching, practical, content) {
    return (teaching + practical + content) / 3;
}

function calculatePercentage(average) {
    return (average / 5) * 100;
}

function getClassification(average) {
    if (average >= 4.5) return "Excellent";
    if (average >= 3.5) return "Very Good";
    if (average >= 2.5) return "Good";
    if (average >= 1.5) return "Needs Improvement";
    return "Poor";
}

function getRecommendation(classification) {
    const recommendations = {
        "Excellent": "Maintain current teaching approach.",
        "Very Good": "Minor improvement may be considered.",
        "Good": "Improvement required in selected areas.",
        "Needs Improvement": "Review teaching/content delivery.",
        "Poor": "Immediate improvement plan required."
    };

    return recommendations[classification];
}

function submitFeedback() {
    if (!validateFeedback()) return;

    if (!confirm("Are you sure you want to submit your feedback?")) {
        return;
    }

    const teaching = Number(
        document.getElementById("teaching").value
    );

    const practical = Number(
        document.getElementById("practical").value
    );

    const content = Number(
        document.getElementById("content").value
    );

    const average = calculateAverage(
        teaching, practical, content
    );

    const percentage = calculatePercentage(average);
    const classification = getClassification(average);
    const recommendation = getRecommendation(classification);

    const ratings = {
        "Teaching": teaching,
        "Practical/Lab": practical,
        "Content": content
    };

    const lowestRating = Math.min(
        teaching, practical, content
    );

    const lowestCategories = Object.keys(ratings).filter(
        category => ratings[category] === lowestRating
    );

    const suggestion = prompt(
        "Optional: Suggest one improvement."
    );

    const summary = document.getElementById("summary");
    const recommendationBox =
        document.getElementById("recommendation");

    summary.replaceChildren();

    function addLine(text) {
        const p = document.createElement("p");
        p.textContent = text;
        summary.appendChild(p);
    }

    addLine("Average Rating: " + average.toFixed(2) + " / 5");
    addLine("Percentage: " + percentage.toFixed(2) + "%");
    addLine("Classification: " + classification);
    addLine("Recommendation: " + recommendation);

    addLine(
        "Teaching: " + teaching +
        " | Practical/Lab: " + practical +
        " | Content: " + content
    );

    addLine(
        "Category requiring greatest improvement: " +
        lowestCategories.join(", ") +
        " (rating: " + lowestRating + ")"
    );

    addLine(
        "Ratings of 1: " +
        Object.values(ratings).filter(r => r === 1).length
    );

    addLine(
        "Ratings of 2: " +
        Object.values(ratings).filter(r => r === 2).length
    );

    addLine(
        "Ratings of 3: " +
        Object.values(ratings).filter(r => r === 3).length
    );

    addLine(
        "Ratings of 4: " +
        Object.values(ratings).filter(r => r === 4).length
    );

    addLine(
        "Ratings of 5: " +
        Object.values(ratings).filter(r => r === 5).length
    );

    addLine(
        "Improvement suggestion: " +
        (suggestion && suggestion.trim()
            ? suggestion.trim()
            : "No suggestion provided")
    );

    if (teaching >= 4.5 && practical >= 4.5 && content >= 4.5) {
        addLine(
            "Outstanding performance! All three categories scored at least 4.5."
        );
    }

    recommendationBox.style.display = "block";

    alert("Feedback submitted successfully!");
}

function resetFeedback() {
    if (!confirm("Are you sure you want to reset all feedback?")) {
        return;
    }

    document.querySelectorAll(
        "input, select, textarea"
    ).forEach(field => {
        field.value = "";
    });

    document.querySelectorAll(".error").forEach(el => {
        el.textContent = "";
    });

    document.getElementById("summary").replaceChildren();

    document.getElementById("recommendation").style.display = "none";

    document.querySelectorAll(".lowest-category").forEach(el => {
        el.classList.remove("lowest-category");
    });

    alert("Feedback form has been reset.");
}



̥