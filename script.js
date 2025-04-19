
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents page reload
    
const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value.trim();
    
if (username && password) {
    // Hide login page and show the dashboard
    document.getElementById("loginPage").style.display = "none"; // Hide login
    document.getElementById("dashboardPage").style.display = "flex"; // Show dashboard
} else {
    alert("Please enter valid credentials.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Medicine Intake Form Submission
    const medicineForm = document.querySelector("#medicine-form");
    if (medicineForm) {
        medicineForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const medicineName = document.querySelector("#medicine-name").value.trim();
            const medicineTime = document.querySelector("#medicine-time").value.trim();

            if (medicineName && medicineTime) {
                alert(`Medicine Reminder Set: ${medicineName} at ${medicineTime}`);
                medicineForm.reset();
            } else {
                alert("Please fill in all fields.");
            }
        });
    }
    
    // Appointment Form Submission
    const appointmentForm = document.querySelector("#appointment-form");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const doctorName = document.querySelector("#doctor-name").value.trim();
            const appointmentDate = document.querySelector("#appointment-date").value.trim();
            const appointmentTime = document.querySelector("#appointment-time").value.trim();

            if (doctorName && appointmentDate && appointmentTime) {
                alert(`Appointment Set: Dr. ${doctorName} on ${appointmentDate} at ${appointmentTime}`);
                appointmentForm.reset();
            } else {
                alert("Please fill in all fields.");
            }
        });
    }
    // Styling input fields ONLY in medicine and appointment forms
    document.querySelectorAll("#medicine-form input, #appointment-form input").forEach(input => {
        Object.assign(input.style, {
            display: "block",
            width: "100%",
            maxWidth: "400px",
            margin: "5px 0",
            padding: "8px",
            textAlign: "left"
        });
    });

    // Adjust button styles ONLY in medicine and appointment forms
    document.querySelectorAll("#medicine-form button, #appointment-form button").forEach(button => {
        Object.assign(button.style, {
            display: "block",
            margin: "10px auto",
            width: "180px",
            padding: "10px 15px",
            textAlign: "center"
        });
    });
    
    // Feedback Modal Handling
    const feedbackModal = document.getElementById("feedback-modal");
    const openFeedbackBtn = document.getElementById("open-feedback-btn");
    const closeFeedbackBtn = document.querySelector(".close-btn");
    const sendFeedbackBtn = document.querySelector(".send-btn");
    const cancelFeedbackBtn = document.querySelector(".cancel-btn");

    function showModal() {
        feedbackModal.style.display = "flex"; // Use flex to center modal
        feedbackModal.style.opacity = "1";
    }

    function closeModal() {
        feedbackModal.style.opacity = "0";
        setTimeout(() => {
            feedbackModal.style.display = "none";
        }, 200); // Add fade-out effect
    }

    if (openFeedbackBtn) openFeedbackBtn.addEventListener("click", showModal);
    if (closeFeedbackBtn) closeFeedbackBtn.addEventListener("click", closeModal);
    if (cancelFeedbackBtn) cancelFeedbackBtn.addEventListener("click", closeModal);
    
    // Emoji Rating Selection
   document.querySelectorAll(".emoji").forEach(emoji => {
        emoji.addEventListener("click", function () {
            document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
    
    // Send Feedback with Validation
    if (sendFeedbackBtn) {
        sendFeedbackBtn.addEventListener("click", function () {
            const feedbackText = document.querySelector("#feedback-text").value.trim();

            if (feedbackText === "") {
                document.getElementById("warningMessage").innerText = "Please write some feedback before submitting.";
            } else {
                alert("Thanks for your feedback!");
                closeModal();
                document.getElementById("warningMessage").innerText = "";
                document.getElementById("feedback-text").value = "";
            }
        });
    }
});
