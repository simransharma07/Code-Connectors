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
    const sendButton = document.querySelector(".send-btn");
    const feedbackInput = document.querySelector("textarea");

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
    sendButton.addEventListener("click", function () {
        if (feedbackInput.value.trim() === "") {
            alert("Please write some feedback before submitting.");
        } else {
            alert("Thank you for your feedback!");
            closePopup();
        }
    });

    // Emoji Selection
    const emojis = document.querySelectorAll(".emoji");
    emojis.forEach(emoji => {
        emoji.addEventListener("click", function () {
            emojis.forEach(e => e.classList.remove("selected"));
            this.classList.add("selected");
        });
    });
});
// Set Reminders
document.getElementById("set-medicine-btn").addEventListener("click", function () {
    let medicineName = document.getElementById("medicine-name").value;
    let medicineTime = document.getElementById("medicine-time").value;
    
    if (medicineName.trim() !== "") {
        let reminderMessage = `Reminder set for ${medicineName}`;
        if (medicineTime) {
            reminderMessage += ` at ${medicineTime}`;
        }
        alert(reminderMessage);
    } else {
        alert("Please enter medicine name.");
    }
});

document.getElementById("set-appointment-btn").addEventListener("click", function () {
    let appointmentDate = document.getElementById("appointment-date").value;
    let appointmentTime = document.getElementById("appointment-time").value;
    if (appointmentDate.trim() !== "" && appointmentTime.trim() !== "") {
        alert(`Appointment set for ${appointmentDate} at ${appointmentTime}`);
    } else {
        alert("Please select appointment date and time.");
    }
});

// Clock-style Time Selection
document.addEventListener("DOMContentLoaded", function () {
    const medicineTimeContainer = document.getElementById("medicine-time-container");
    
    let timePicker = document.createElement("select");
    timePicker.id = "medicine-time";
    timePicker.classList.add("time-picker");
    
    for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 5) {
            let formattedHour = hour.toString().padStart(2, '0');
            let formattedMin = min.toString().padStart(2, '0');
            let option = document.createElement("option");
            option.value = `${formattedHour}:${formattedMin}`;
            option.textContent = `${formattedHour}:${formattedMin}`;
            timePicker.appendChild(option);
        }
    }
    
    medicineTimeContainer.appendChild(timePicker);
});



