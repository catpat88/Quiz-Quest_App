document.addEventListener("DOMContentLoaded", function () {
    // Load saved avatar from cookie (if it exists)
    const storedAvatar = getCookie('selectedAvatar');
    if (storedAvatar) {
        const avatarImg = document.querySelector('.avatar'); // Make sure .avatar is an <img>!
        if (avatarImg) {
            avatarImg.setAttribute('src', storedAvatar);
            avatarImg.style.display = 'block'; // ✅ Move this here
        } else {
            console.warn("Avatar image container not found!");
        }
    }

    // Add click event to all avatar choices
    const avatarImages = document.querySelectorAll('.avatar-row1 img, .avatar-row2 img');
    avatarImages.forEach(img => {
        img.addEventListener('click', function () {
            const selectedSrc = img.getAttribute('src');
            setCookie('selectedAvatar', selectedSrc, 7); // Save avatar for 7 days

            // Also update the avatar in the nav bar
            const avatarImg = document.querySelector('.avatar'); // Make sure this is an <img>!
            if (avatarImg) {
                avatarImg.setAttribute('src', selectedSrc);
                avatarImg.style.display = 'block';
            }
        });
    });
});

// Cookie helpers
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}



