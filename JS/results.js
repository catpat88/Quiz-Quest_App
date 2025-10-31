// Utility: Read cookie value by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Step 1: Detect the quiz name from the URL
function getQuizNameFromURL() {
    const url = window.location.href;
    if (url.includes("health")) return "health";
    if (url.includes("literacy")) return "literacy";
    if (url.includes("numeracy")) return "numeracy";
    if (url.includes("scotland")) return "scotland";
    if (url.includes("social")) return "social";
    if (url.includes("solar")) return "solar";
    return "quiz1"; // fallback
}

// Step 2: Load quiz results and show feedback
document.addEventListener('DOMContentLoaded', () => {
    const quizName = getQuizNameFromURL();
    const score = parseInt(getCookie(`${quizName}_score`)) || 0;

    const scoreElement = document.getElementById("quiz-score");
    const feedbackElement = document.getElementById("quiz-feedback");
    const resultContainer = document.getElementById("quiz-result");

    if (scoreElement) {
        scoreElement.textContent = `You scored ${score} out of 5`;
    }

    if (feedbackElement) {
        if (score === 5) {
            feedbackElement.textContent = "🌟 Perfect score! Excellent work!";
        } else if (score >= 3) {
            feedbackElement.textContent = "👍 Good job! Why not try again to beat your score?";
        } else {
            feedbackElement.textContent = "💡 Keep practicing — you’re getting there!";
        }
    }

    // Visual pass/fail feedback
    if (resultContainer) {
        if (score >= 3) {
            resultContainer.textContent = `You passed with ${score}/5! 🎉`;
            resultContainer.style.color = "green";
        } else {
            resultContainer.textContent = `You failed with ${score}/5. Try again! 😢`;
            resultContainer.style.color = "red";
        }
        resultContainer.style.fontSize = "1.5em";
        resultContainer.style.fontWeight = "bold";
    }

    // Mark quiz as completed
    document.cookie = `${quizName}_completed=true; path=/`;
});

// Step 3: Return to main menu
function goBackToMenu() {
    window.location.href = "quiz_main_menu.html";
}
