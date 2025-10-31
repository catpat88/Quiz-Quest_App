// Get the quiz name from the container's data attribute
const container = document.getElementById('quiz-container');
const quizName = container ? container.getAttribute('data-quiz-name') : 'default';

// Function to set a quiz-specific score cookie
function setScoreCookie(score) {
    document.cookie = `${quizName}_score=${score}; path=/; max-age=31536000`;  // 1 year
}

// Function to get the quiz-specific score from cookie
function getScoreFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(`${quizName}_score=`)) {
            return parseInt(cookie.split('=')[1]);
        }
    }
    return 0;
}

// Function to initialize the score display
function initializeScoreDisplay() {
    const scoreDisplay = document.querySelector('.points-no');
    const score = getScoreFromCookie();  // Get score from cookie
    if (scoreDisplay) {
        updateTotalScoreDisplay(); //So the score shown in the nav is always the overall total
    }
}

function updateProgressBar() {
    const container = document.getElementById('quiz-container');
    const currentPage = parseInt(container.getAttribute('data-question-id'));

    // Update the progress bar based on the current question
    const progressBlock = document.getElementById(`progress-${currentPage}`);
    if (progressBlock) {
        progressBlock.classList.add('filled');
    }
}

function selectAnswer(button, selectedLetter) {
    const container = document.getElementById('quiz-container');
    const currentPage = parseInt(container.getAttribute('data-question-id')); 

    const correctAnswers = {
        1: 'B',
        2: 'C',
        3: 'C',
        4: 'B',
        5: 'C'
    };

    const isCorrect = selectedLetter === correctAnswers[currentPage];

    const buttons = button.parentElement.querySelectorAll('.answer-btn');

    if (isCorrect) {
        button.classList.add('correct-answer');

        let score = getScoreFromCookie() || 0;
        score++;
        setScoreCookie(score);
    } else {
        button.classList.add('wrong-answer');

        // Outline the correct answer in green
        buttons.forEach(btn => {
            if (btn.dataset.letter === correctAnswers[currentPage]) {
                btn.classList.add('correct-outline');
            }
            
        });
    }

    // Disable all answer buttons
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled-answer');
    });

    // Show the next button
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.style.display = 'inline-block';
    }

  
}


// Initialize the score display as soon as the page loads
initializeScoreDisplay();

// Update progress bar when page loads or on navigating to a new question
function updateProgressBar() {
    // Get the current question from the data attribute of the quiz container
    const container = document.getElementById('quiz-container');
    const currentPage = parseInt(container.getAttribute('data-question-id')); 

    // Loop through all progress blocks and fill the ones corresponding to answered questions
    for (let i = 1; i <= currentPage; i++) {
        const progressBlock = document.getElementById(`progress-${i}`);
        if (progressBlock) {
            progressBlock.classList.add('filled');
        }
    }
}


// Call this when the page loads or when navigating between questions
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();  // Ensure progress bar is updated on page load
});






  