// On page load, restore the selected color
document.addEventListener("DOMContentLoaded", function() {
    let userColor = localStorage.getItem("userColor");
    if (userColor) {
        document.body.style.background = userColor;  // Directly set the color instead of gradient
    }
});

// Event listener for selecting color
document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', function() {
        let selectedColor = circle.getAttribute('data-color');
        // Store the color in localStorage
        localStorage.setItem("userColor", selectedColor);
        // Set the background color
        document.body.style.background = selectedColor;
        // Highlight the selected circle
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
        circle.classList.add('selected');
    });
});

