document.addEventListener("DOMContentLoaded", function () {
    let signupForm = document.getElementById("signupForm");

    if (signupForm) {
        let selectedColor = "";
        
        // Handle color selection
        document.querySelectorAll('.color-circle').forEach(circle => {
            circle.addEventListener('click', function () {
                selectedColor = this.getAttribute('data-color');
                document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        // Handle form submission
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const firstName = document.getElementById("firstName").value;
            const email = document.getElementById("emailAdd").value;

            if (!selectedColor) {
                alert("Please choose a colour!");
                return;
            }

            // Store data in cookies
            setCookie("usersName", firstName, 7);
            setCookie("userEmail", email, 7);
            setCookie("userColor", selectedColor, 7);

            // Redirect to the next page
            window.location.href = "quiz_avatar.html";
        });
    }
});