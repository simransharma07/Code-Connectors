// ---------------- Login Handling ----------------
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
        document.getElementById("loginPage").classList.add("hidden");
        document.querySelector(".gender-body").classList.remove("hidden");
    } else {
        alert("Please enter valid credentials.");
    }
});

// ---------------- Gender Page Handling ----------------
let selectedGender = "";

function selectGender(gender) {
    selectedGender = gender;
    document.querySelectorAll(".gender").forEach(el => el.classList.remove("selected"));
    const selected = document.querySelector(`.gender[data-gender="${gender}"]`);
    if (selected) selected.classList.add("selected");
}

function submitForm() {
    const birthday = document.getElementById("birthday").value;

    if (!selectedGender) {
        alert("Please select your gender.");
        return;
    }

    if (!birthday) {
        alert("Please enter your birthday.");
        return;
    }

    console.log("Gender:", selectedGender);
    console.log("Birthday:", birthday);

    document.querySelector(".gender-body").classList.add("hidden");
    document.getElementById("dashboardPage").style.display = "block";
}

function skip() {
    document.querySelector(".gender-body").classList.add("hidden");
    document.getElementById("dashboardPage").style.display = "block";
}

// ---------------- Header Animation on Load ----------------
window.addEventListener("load", () => {
    document.querySelector(".dashboard-content header h1").style.animationDelay = "0.3s";
});

// ---------------- Mobile Sidebar Toggle ----------------
function toggleSidebar() {
    document.getElementById("mobileSidebar").classList.toggle("active");
}

// ---------------- Section Navigation ----------------
function showSection(event, sectionId) {
    event.preventDefault();

    document.querySelectorAll(
        ".stats-section, .appointment-section, .settings-section, .activity-section"
    ).forEach(section => {
        section.style.display = "none";
    });

    const sectionMap = {
        home: ".activity-section",
        stats: ".stats-section",
        appointments: ".appointment-section",
        settings: ".settings-section"
    };

    const target = sectionMap[sectionId];
    if (target) {
        document.querySelector(target).style.display = "block";
    }
}

// ---------------- Stats Update Function ----------------
function updateStats() {
    const training = document.getElementById("trainingInput").value;
    const steps = document.getElementById("stepsInput").value;
    const calories = document.getElementById("caloriesInput").value;

    if (training) document.getElementById("trainingDisplay").textContent = `${training} hours/week`;
    if (steps) document.getElementById("stepsDisplay").textContent = `${steps} km/week`;
    if (calories) document.getElementById("caloriesDisplay").textContent = `${calories} kcal/week`;
}

// ---------------- DOM Content Loaded ----------------
document.addEventListener("DOMContentLoaded", function () {
    // -------- Medicine Form --------
    const medicineForm = document.querySelector("#medicine-form");
    if (medicineForm) {
        medicineForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.querySelector("#medicine-name").value.trim();
            const time = document.querySelector("#medicine-time").value.trim();

            if (name && time) {
                alert(`Medicine Reminder Set: ${name} at ${time}`);
                medicineForm.reset();
            } else {
                alert("Please fill in all fields.");
            }
        });
    }

    // -------- Appointment Form --------
    const appointmentForm = document.querySelector("#appointment-form");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const doctor = document.querySelector("#doctor-name").value.trim();
            const date = document.querySelector("#appointment-date").value.trim();
            const time = document.querySelector("#appointment-time").value.trim();

            if (doctor && date && time) {
                alert(`Appointment Set: Dr. ${doctor} on ${date} at ${time}`);
                appointmentForm.reset();
            } else {
                alert("Please fill in all fields.");
            }
        });
    }

    // -------- Inline Styling (Input/Button) --------
    const styleInputsAndButtons = () => {
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

        document.querySelectorAll("#medicine-form button, #appointment-form button").forEach(button => {
            Object.assign(button.style, {
                display: "block",
                margin: "10px auto",
                width: "180px",
                padding: "10px 15px",
                textAlign: "center"
            });
        });
    };
    styleInputsAndButtons();

    // -------- Feedback Modal --------
    const feedbackModal = document.getElementById("feedback-modal");
    const openBtn = document.getElementById("open-feedback-btn");
    const closeBtn = document.querySelector(".close-btn");
    const sendBtn = document.querySelector(".send-btn");
    const cancelBtn = document.querySelector(".cancel-btn");

    function showModal() {
        feedbackModal.style.display = "flex";
        feedbackModal.style.opacity = "1";
    }

    function closeModal() {
        feedbackModal.style.opacity = "0";
        setTimeout(() => {
            feedbackModal.style.display = "none";
        }, 200);
    }

    if (openBtn) openBtn.addEventListener("click", showModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    // -------- Emoji Rating --------
    document.querySelectorAll(".emoji").forEach(emoji => {
        emoji.addEventListener("click", function () {
            document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // -------- Feedback Submission --------
    if (sendBtn) {
        sendBtn.addEventListener("click", function () {
            const feedback = document.querySelector("#feedback-text").value.trim();
            const warning = document.getElementById("warningMessage");

            if (feedback === "") {
                warning.innerText = "Please write some feedback before submitting.";
            } else {
                alert("Thanks for your feedback!");
                closeModal();
                warning.innerText = "";
                document.getElementById("feedback-text").value = "";
            }
        });
    }

    // -------- Contributors Button --------
    const contributorsBtn = document.getElementById("contributors-btn");
    if (contributorsBtn) {
        contributorsBtn.addEventListener("click", function () {
            alert("Contributors:\n1. Alice\n2. Bob\n3. Charlie");
        });
    }
});
