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
    let medicineHour = document.getElementById("medicine-hour").value;
    let medicineMinute = document.getElementById("medicine-minute").value;
    let medicineAmPm = document.getElementById("medicine-ampm").value;
    
    
    if (medicineName.trim() !== "") {
        alert(`Reminder set for ${medicineName} at ${medicineHour}:${medicineMinute} ${medicineAmPm}`);
    } else {
        alert("Please enter medicine name.");
    }
});

document.getElementById("set-appointment-btn").addEventListener("click", function () {
    let appointmentDate = document.getElementById("appointment-date").value;
    let appointmentHour = document.getElementById("appointment-hour").value;
    let appointmentMinute = document.getElementById("appointment-minute").value;
    let appointmentAmPm = document.getElementById("appointment-ampm").value;
    if (appointmentDate.trim() !== "") {
        alert(`Appointment set for ${appointmentDate} at ${appointmentHour}:${appointmentMinute} ${appointmentAmPm}`);
    } else {
        alert("Please select an appointment date.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    function populateTimeDropdowns(hourId, minuteId, ampmId) {
        let hourSelect = document.getElementById(hourId);
        let minuteSelect = document.getElementById(minuteId);
        let ampmSelect = document.getElementById(ampmId);
        // Clear previous options to avoid duplicates
        hourSelect.innerHTML = "";
        minuteSelect.innerHTML = "";
        ampmSelect.innerHTML = "";
        for (let i = 1; i <= 12; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            hourSelect.appendChild(option);
        }

        for (let i = 0; i < 60; i++) {
            let option = document.createElement("option");
            option.value = i.toString().padStart(2, '0');
            option.textContent = i.toString().padStart(2, '0');
            minuteSelect.appendChild(option);
        }

        ["AM", "PM"].forEach(ampm => {
            let option = document.createElement("option");
            option.value = ampm;
            option.textContent = ampm;
            ampmSelect.appendChild(option);
        });
    }

    populateTimeDropdowns("medicine-hour", "medicine-minute", "medicine-ampm");
    populateTimeDropdowns("appointment-hour", "appointment-minute", "appointment-ampm");
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