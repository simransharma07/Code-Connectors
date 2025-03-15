document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reload
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username.trim() !== "" && password.trim() !== "") {
        document.getElementById("loginPage").style.display = "none"; // Hide login
        document.getElementById("dashboardPage").style.display = "block"; // Show dashboard
    } else {
        alert("Please enter valid credentials.");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const feedbackModal = document.getElementById('feedback-modal');
    const openFeedbackBtn = document.getElementById('open-feedback-btn');
    const closeButton = document.querySelector(".close-btn");
    const cancelButton = document.querySelector(".cancel-btn");

    // Open feedback modal
    openFeedbackBtn.addEventListener("click", function () {
        feedbackModal.style.display = "flex";
    });

    // Close feedback modal
    function closePopup() {
        feedbackModal.style.display = "none";
    }

    closeButton.addEventListener("click", closePopup);
    cancelButton.addEventListener("click", closePopup);

    // Emoji Selection
    const emojis = document.querySelectorAll(".emoji");
    emojis.forEach(emoji => {
        emoji.addEventListener("click", function () {
            emojis.forEach(e => e.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});

