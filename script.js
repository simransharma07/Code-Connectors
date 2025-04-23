// ---------------- Login Handling ----------------
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("genderPage").style.display = "block"; // show gender setup next
    } else {
        alert("Please enter valid credentials.");
    }
});

// ---------------- Gender Page Handling ----------------
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Hide login page
    document.getElementById("loginPage").classList.add("hidden");

    // Show gender page
    document.querySelector(".gender-body").classList.remove("hidden");
});
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

  // Log the selected values (or save them)
  console.log("Gender:", selectedGender);
  console.log("Birthday:", birthday);

  // Move to the dashboard
  document.querySelector(".gender-body").classList.add("hidden");
  document.getElementById("dashboardPage").style.display = "block";
}

function skip() {
  document.querySelector(".gender-body").classList.add("hidden");
  document.getElementById("dashboardPage").style.display = "block";
}





// ---------------- Header Animation on Load ----------------
window.addEventListener('load', () => {
    document.querySelector('.dashboard-content header h1').style.animationDelay = '0.3s';
});

// ---------------- Mobile Sidebar Toggle ----------------
function toggleSidebar() {
    document.getElementById("mobileSidebar").classList.toggle("active");
}

// ---------------- Section Navigation ----------------
function showSection(event, sectionId) {
    event.preventDefault();

    document.querySelectorAll('.stats-section, .appointment-section, .settings-section, .activity-section')
        .forEach(sec => sec.style.display = 'none');

    const sectionMap = {
        home: '.activity-section',
        stats: '.stats-section',
        appointments: '.appointment-section',
        settings: '.settings-section'
    };

    if (sectionMap[sectionId]) {
        document.querySelector(sectionMap[sectionId]).style.display = 'block';
    }
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

    // -------- Input and Button Styling --------
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

    // -------- Feedback Modal Handling --------
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
});
// ------Sleep and water acitivity enabled-----
// -------- Track Water --------
    document.querySelector(".activity-card.water button").addEventListener("click", function() {
        const waterIntake = prompt("Enter your water intake in liters (e.g., 2.5L):");
        if (waterIntake && !isNaN(waterIntake)) {
            alert(`Water Intake Recorded: ${waterIntake} liters`);
            // You can save this data to local storage or a server if needed
        } else {
            alert("Please enter a valid number for water intake.");
        }
    });

    // -------- Track Sleep --------
    document.querySelector(".activity-card.sleep button").addEventListener("click", function() {
        const sleepDuration = prompt("Enter your sleep duration in hours (e.g., 8):");
        if (sleepDuration && !isNaN(sleepDuration)) {
            alert(`Sleep Duration Recorded: ${sleepDuration} hours`);
            // You can save this data to local storage or a server if needed
        } else {
            alert("Please enter a valid number for sleep duration.");
        }
    });


// ---------------- Stats Update Function ----------------
function updateStats() {
    const training = document.getElementById('trainingInput').value;
    const steps = document.getElementById('stepsInput').value;
    const calories = document.getElementById('caloriesInput').value;

    if (training) document.getElementById('trainingDisplay').textContent = `${training} hours/week`;
    if (steps) document.getElementById('stepsDisplay').textContent = `${steps} km/week`;
    if (calories) document.getElementById('caloriesDisplay').textContent = `${calories} kcal/week`;
}




function skip() {
  document.querySelector(".gender-body").classList.add("hidden");
  document.getElementById("dashboardPage").style.display = "block";
}





// ---------------- Header Animation on Load ----------------
window.addEventListener('load', () => {
    document.querySelector('.dashboard-content header h1').style.animationDelay = '0.3s';
});

// ---------------- Mobile Sidebar Toggle ----------------
function toggleSidebar() {
    document.getElementById("mobileSidebar").classList.toggle("active");
}

// ---------------- Section Navigation ----------------
function showSection(event, sectionId) {
    event.preventDefault();

    document.querySelectorAll('.stats-section, .appointment-section, .settings-section, .activity-section')
        .forEach(sec => sec.style.display = 'none');

    const sectionMap = {
        home: '.activity-section',
        stats: '.stats-section',
        appointments: '.appointment-section',
        settings: '.settings-section'
    };

    if (sectionMap[sectionId]) {
        document.querySelector(sectionMap[sectionId]).style.display = 'block';
    }
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

    // -------- Input and Button Styling --------
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

    // -------- Feedback Modal Handling --------
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
});

// ---------------- Stats Update Function ----------------
function updateStats() {
    const training = document.getElementById('trainingInput').value;
    const steps = document.getElementById('stepsInput').value;
    const calories = document.getElementById('caloriesInput').value;

    if (training) document.getElementById('trainingDisplay').textContent = `${training} hours/week`;
    if (steps) document.getElementById('stepsDisplay').textContent = `${steps} km/week`;
    if (calories) document.getElementById('caloriesDisplay').textContent = `${calories} kcal/week`;
}
let isPanelOpen = false;

function toggleContributors() {
  const panel = document.getElementById('contributorsPanel');
  isPanelOpen = !isPanelOpen;
  panel.classList.toggle('open', isPanelOpen);
}

function addContributor() {
  const list = document.getElementById('contributorList');
  const newItem = document.createElement('li');
  newItem.innerText = 'new_contributor_' + (list.children.length + 1);
  list.appendChild(newItem);
}

