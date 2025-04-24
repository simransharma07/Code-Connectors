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

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Update button text/icon based on current mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️ Light Mode';
        // Save dark mode preference
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.textContent = '🌙 Dark Mode';
        // Save light mode preference
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Function to check for saved theme preference
function checkDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.textContent = '☀️ Light Mode';
        }
    }
}

// -------- Enhanced Feedback Modal Functionality --------
function initFeedbackForm() {
    const feedbackModal = document.getElementById("feedback-modal");
    const openBtn = document.getElementById("open-feedback-btn");
    const closeBtn = document.querySelector(".close-btn");
    const steps = document.querySelectorAll(".feedback-step");
    const progressFill = document.querySelector(".progress-fill");
    const progressText = document.querySelector(".progress-text");
    const emojis = document.querySelectorAll(".emoji");
    const ratingText = document.querySelector(".rating-text");
    const nextBtns = document.querySelectorAll(".next-btn");
    const prevBtns = document.querySelectorAll(".prev-btn");
    const submitBtn = document.querySelector(".submit-btn");
    const contactToggle = document.getElementById("contact-toggle");
    const contactDetails = document.getElementById("contact-details");
    const toggleLabel = document.getElementById("toggle-label");
    const thankYouScreen = document.getElementById("thank-you");
    const closeThankYou = document.querySelector(".close-thank-you");
    
    let currentStep = 1;
    let selectedRating = 0;
    
    // Open feedback modal
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            feedbackModal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
            resetForm();
        });
    }
    
    // Close feedback modal
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeFeedbackModal();
        });
    }
    
    // Close on thank you button
    if (closeThankYou) {
        closeThankYou.addEventListener("click", () => {
            closeFeedbackModal();
        });
    }
    
    function closeFeedbackModal() {
        feedbackModal.style.display = "none";
        document.body.style.overflow = "auto"; // Enable scrolling again
    }
    
    // ESC key to close modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && feedbackModal.style.display === "flex") {
            closeFeedbackModal();
        }
    });
    
    // Click outside to close
    feedbackModal.addEventListener("click", (e) => {
        if (e.target === feedbackModal) {
            closeFeedbackModal();
        }
    });
    
    // Emoji rating selection
    emojis.forEach(emoji => {
        emoji.addEventListener("click", () => {
            emojis.forEach(e => e.classList.remove("selected"));
            emoji.classList.add("selected");
            selectedRating = emoji.dataset.value;
            
            const ratings = [
                "Very Dissatisfied", 
                "Dissatisfied", 
                "Neutral", 
                "Satisfied", 
                "Very Satisfied"
            ];
            
            ratingText.textContent = ratings[selectedRating - 1];
            
            // Enable next button once a rating is selected
            document.querySelector("#step1 .next-btn").disabled = false;
        });
    });
    
    // Handle next button clicks
    nextBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep < 3) {
                goToStep(currentStep + 1);
            }
        });
    });
    
    // Handle previous button clicks
    prevBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    });
    
    // Toggle contact details
    if (contactToggle) {
        contactToggle.addEventListener("change", () => {
            if (contactToggle.checked) {
                contactDetails.classList.remove("hidden");
                toggleLabel.textContent = "Yes";
            } else {
                contactDetails.classList.add("hidden");
                toggleLabel.textContent = "No";
            }
        });
    }
    
    // Handle form submission
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const feedbackText = document.getElementById("feedback-text").value.trim();
            const warning = document.getElementById("warningMessage");
            
            if (feedbackText === "") {
                warning.textContent = "Please write some feedback before submitting.";
                return;
            }
            
            // Collect all feedback data
            const feedbackData = {
                rating: selectedRating,
                categories: [],
                feedback: feedbackText,
                contactMe: contactToggle.checked,
                email: contactToggle.checked ? document.getElementById("contact-email").value : ""
            };
            
            // Get selected categories
            document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
                feedbackData.categories.push(checkbox.value);
            });
            
            // In a real app, you would send this data to your server
            console.log("Feedback data collected:", feedbackData);
            
            // Show thank you screen
            goToStep(4);
        });
    }
    
    // Function to change steps
    function goToStep(step) {
        if (step < 1 || step > 4) return;
        
        steps.forEach(s => s.classList.add("hidden"));
        
        if (step === 4) {
            // Thank you screen
            thankYouScreen.classList.remove("hidden");
            progressFill.style.width = "100%";
            progressText.textContent = "Complete";
        } else {
            // Regular step
            document.getElementById(`step${step}`).classList.remove("hidden");
            progressFill.style.width = `${(step / 3) * 100}%`;
            progressText.textContent = `Step ${step} of 3`;
        }
        
        currentStep = step;
    }
    
    // Reset form to initial state
    function resetForm() {
        goToStep(1);
        emojis.forEach(e => e.classList.remove("selected"));
        document.querySelector("#step1 .next-btn").disabled = true;
        ratingText.textContent = "Select a rating";
        document.getElementById("feedback-text").value = "";
        document.getElementById("warningMessage").textContent = "";
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
        contactToggle.checked = false;
        contactDetails.classList.add("hidden");
        toggleLabel.textContent = "No";
        if (document.getElementById("contact-email")) {
            document.getElementById("contact-email").value = "";
        }
    }
}

// ---------------- DOM Content Loaded ----------------
document.addEventListener("DOMContentLoaded", function () {
    // Apply saved dark mode preference
    checkDarkModePreference();
    
    // Add event listener to dark mode toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Initialize the enhanced feedback form
    initFeedbackForm();

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
    
    // -------- Track Water --------
    const waterButton = document.querySelector(".activity-card.water button");
    if (waterButton) {
        waterButton.addEventListener("click", function() {
            const waterIntake = prompt("Enter your water intake in liters (e.g., 2.5L):");
            if (waterIntake && !isNaN(waterIntake)) {
                alert(`Water Intake Recorded: ${waterIntake} liters`);
                // You can save this data to local storage or a server if needed
            } else {
                alert("Please enter a valid number for water intake.");
            }
        });
    }

    // -------- Track Sleep --------
    const sleepButton = document.querySelector(".activity-card.sleep button");
    if (sleepButton) {
        sleepButton.addEventListener("click", function() {
            const sleepDuration = prompt("Enter your sleep duration in hours (e.g., 8):");
            if (sleepDuration && !isNaN(sleepDuration)) {
                alert(`Sleep Duration Recorded: ${sleepDuration} hours`);
                // You can save this data to local storage or a server if needed
            } else {
                alert("Please enter a valid number for sleep duration.");
            }
        });
    }
});

// Function to toggle the visibility of the contributors panel
function toggleContributors() {
    const contributorsPanel = document.getElementById("contributorsPanel");
    contributorsPanel.style.display = contributorsPanel.style.display === "none" || contributorsPanel.style.display === "" ? "block" : "none";
}

// Function to add a new contributor
function addContributor() {
    const contributorName = prompt("Enter contributor name:");
    if (contributorName) {
        const contributorList = document.getElementById("contributorList");

        // Create a new list item for the contributor
        const newContributor = document.createElement("li");
        newContributor.textContent = contributorName;

        // Add the new contributor to the list
        contributorList.appendChild(newContributor);
    } else {
        alert("Please enter a valid contributor name.");
    }
}
