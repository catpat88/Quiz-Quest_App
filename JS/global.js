document.addEventListener("DOMContentLoaded", function () {
    // Display welcome message
    let usersName = getCookie("usersName");
    if (usersName) {
        let welcomeElement = document.querySelector(".welcome");
        if (welcomeElement) {
            welcomeElement.innerText = `Welcome, ${usersName}!`;
        }
    }

    // Display date & time
    function updateDateTime() {
        let now = new Date();
        let dateTimeString = now.toLocaleDateString() + "  " + now.toLocaleTimeString();
        let dateTimeElement = document.querySelector(".date-time");
        if (dateTimeElement) {
            dateTimeElement.innerText = dateTimeString;
        }
    }
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Call once immediately

    // Reset button functionality
    function resetQuizzes() {
        // List of quiz names
        const quizzes = ['health', 'literacy', 'numeracy', 'scotland', 'social', 'solar'];

        // Loop through quizzes and delete relevant cookies
        quizzes.forEach(quiz => {
            document.cookie = `${quiz}_score=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            document.cookie = `${quiz}_completed=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });

        // Optionally, reset the score and progress UI
        updateTotalScoreDisplay();
        highlightCompletedQuizzes();
        updateStarryIfAllCompleted();

        // Optionally, show a message that quizzes have been reset
        alert("Quizzes have been reset!");
    }

    // Add event listener to the reset button
    const resetBtn = document.getElementById('resetQuizzesBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuizzes);
    }

});

//Display current no of questions completed
function updateProgress(index) {
    const blocks = document.querySelectorAll('.progress-block');
    blocks.forEach((block, i) => {
      if (i < index) {
        block.classList.add('filled');
      } else {
        block.classList.remove('filled');
      }
    });
  }

  function getCookieValue(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? parseInt(match[2]) : 0;
}
 // Total score of all quizzes and display in nav
function getTotalScore() {
    const quizzes = [
        'health',
        'literacy',
        'numeracy',
        'scotland',
        'social',
        'solar'
    ];
    return quizzes.reduce((total, quiz) => total + getCookieValue(`${quiz}_score`), 0);
}

function updateTotalScoreDisplay() {
    const scoreDisplay = document.querySelector('.points-no');
    if (scoreDisplay) {
        const total = getTotalScore();
        scoreDisplay.textContent = `Score: ${total} / 30`;
    }
}

document.addEventListener('DOMContentLoaded', updateTotalScoreDisplay);

// quizzes complete - add a border to show each quiz is complete //
function isQuizCompleted(quizName) {
    return document.cookie.includes(`${quizName}_completed=true`);
}

function highlightCompletedQuizzes() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        const quiz = box.getAttribute('data-quiz');
        if (isQuizCompleted(quiz)) {
            box.classList.add('completed');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightCompletedQuizzes);

//change starry character from sleeping to awake once all quizzes are complete
function areAllQuizzesCompleted() {
    const quizzes = ["health", "literacy", "numeracy", "scotland", "social", "solar"];
    return quizzes.every(quiz => document.cookie.includes(`${quiz}_completed=true`));
}

function updateStarryIfAllCompleted() {
    if (!areAllQuizzesCompleted()) return;

    const messageElement = document.querySelector('.starry-par h1');
    const imageElement = document.querySelector('.starry-image img');

    if (messageElement) {
        messageElement.textContent = "🎉 Well done! All quizzes are now complete!";
    }

    if (imageElement) {
        imageElement.src = "CSS/images/awake_starry.png"; // adjust path if needed
        imageElement.alt = "Starry is now awake and celebrating!";
    }
}

document.addEventListener('DOMContentLoaded', updateStarryIfAllCompleted);

//All quizzes completed animation
function areAllQuizzesCompleted() {
    const quizzes = ["health", "literacy", "numeracy", "scotland", "social", "solar"];
    return quizzes.every(quiz => document.cookie.includes(`${quiz}_completed=true`));
}

function updateStarryIfAllCompleted() {
    if (!areAllQuizzesCompleted()) return;

    const messageElement = document.querySelector('.starry-par h1');
    const imageElement = document.querySelector('.starry-image img');

    if (messageElement) {
        messageElement.textContent = "🎉 Well done! All quizzes are now complete!";
        messageElement.classList.add('starry-fade-in');
    }

    if (imageElement) {
        imageElement.src = "CSS/images/awake_starry.png"; // Make sure the image exists
        imageElement.alt = "Starry is now awake and celebrating!";
        imageElement.classList.add('starry-fade-in');
    }

    // Launch some fun confetti 🎊
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}



document.addEventListener('DOMContentLoaded', updateStarryIfAllCompleted);
