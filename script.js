// ---------------- Login Handling ----------------
document.getElementById("loginPage").style.display="none" // to HIDE login
document.querySelector(".gender-body") // to SHOW gender section


    // Global variable to store selected gender
    let selectedGender = '';

    // Function to select gender
    window.selectGender = function(gender) {
        selectedGender = gender;

        // Remove selection from all gender elements
        document.querySelectorAll('.gender').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selected class to the chosen gender
        document.querySelector(`.gender[data-gender="${gender}"]`).classList.add('selected');
    };

    // Function to handle form submission on gender page
    window.submitForm = function() {
        const birthday = document.getElementById('birthday').value;

        if (!birthday) {
            alert('Please select your birthday');
            return;
        }

        // Save gender and birthday to localStorage
        localStorage.setItem('userGender', selectedGender);
        localStorage.setItem('userBirthday', birthday);

        // Show the dashboard
        showDashboard();
    };

    // Function to skip gender selection
    window.skip = function() {
        showDashboard();
    };

    // Function to show the dashboard
    function showDashboard() {
        document.querySelector('.gender-body').classList.add('hidden');
        document.querySelector('.gender-body').style.display = 'none';

        document.getElementById('dashboardPage').style.display = 'flex';
    }

    // Function to toggle contributors panel
    window.toggleContributors = function() {
        const panel = document.getElementById('contributorsPanel');
        if (panel) {
            panel.classList.toggle('open');
        }
    };

    // Function to add contributors
    window.addContributor = function() {
        const contributorName = prompt('Enter name of contributor:');
        if (!contributorName || contributorName.trim() === '') return;

        const contributorEmail = prompt('Enter email address of contributor:');
        if (!contributorEmail || contributorEmail.trim() === '') return;

        const contributorList = document.getElementById('contributorList');
        if (contributorList) {
            const newItem = document.createElement('li');
            newItem.innerHTML = `
                <div>
                    <strong>${contributorName}</strong> (${contributorEmail})
                    <button onclick="this.parentNode.parentNode.remove()">Remove</button>
                </div>
            `;
            contributorList.appendChild(newItem);

            // Save contributors to localStorage
            saveContributors();
        }
    };

    // Function to save contributors to localStorage
    function saveContributors() {
        const contributorItems = document.querySelectorAll('#contributorList li');
        const contributors = [];

        contributorItems.forEach(item => {
            const name = item.querySelector('strong').textContent;
            const email = item.textContent.match(/\((.*?)\)/)[1];
            contributors.push({ name, email });
        });

        localStorage.setItem('contributors', JSON.stringify(contributors));
    }

    // Function to load contributors from localStorage
    function loadContributors() {
        const storedContributors = localStorage.getItem('contributors');
        if (!storedContributors) return;

        const contributors = JSON.parse(storedContributors);
        const contributorList = document.getElementById('contributorList');

        contributors.forEach(contributor => {
            const newItem = document.createElement('li');
            newItem.innerHTML = `
                <div>
                    <strong>${contributor.name}</strong> (${contributor.email})
                    <button onclick="this.parentNode.parentNode.remove()">Remove</button>
                </div>
            `;
            contributorList.appendChild(newItem);
        });
    }

    // Function to show sections/tabs in the dashboard
    window.showSection = function(event, sectionId) {
        if (event) {
            event.preventDefault();
        }

        // Hide all sections
        const sections = ['home', 'stats', 'nutrition', 'appointments', 'settings'];
        sections.forEach(section => {
            // Default section mapping to DOM elements
            let sectionElement;
            switch(section) {
                case 'home':
                    sectionElement = document.querySelector('.activity-section');
                    break;
                case 'stats':
                    sectionElement = document.getElementById('statssection');
                    break;
                case 'nutrition':
                    sectionElement = document.querySelector('.nutrition-section');
                    break;
                case 'appointments':
                    sectionElement = document.getElementById('appointmentsection');
                    break;
                case 'settings':
                    sectionElement = document.getElementById('settingsSection');
                    break;
            }

            if (sectionElement) {
                sectionElement.style.display = 'none';
            }
        });

        // Show the selected section
        let selectedSection;
        switch(sectionId) {
            case 'home':
                selectedSection = document.querySelector('.activity-section');
                break;
            case 'stats':
                selectedSection = document.getElementById('statssection');
                break;
            case 'nutrition':
                selectedSection = document.querySelector('.nutrition-section');
                break;
            case 'appointments':
                selectedSection = document.getElementById('appointmentsection');
                break;
            case 'settings':
                selectedSection = document.getElementById('settingsSection');
                break;
        }

        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Update active menu item
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });

        // If the event comes from a menu item, set it as active
        if (event && event.currentTarget) {
            event.currentTarget.closest('.sidebar-item').classList.add('active');
        }

        // For mobile, close sidebar after selection
        closeMobileSidebar();
    };

    // Function to open/close mobile sidebar
    window.toggleSidebar = function() {
        const sidebar = document.getElementById('mobileSidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    };

    // Function to close mobile sidebar
    function closeMobileSidebar() {
        const sidebar = document.getElementById('mobileSidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }

    // Load saved contributors on page load
    loadContributors();

    // Handle login form submission

document.addEventListener("DOMContentLoaded", function() {
    // Initially hide gender and dashboard pages
    if (document.querySelector(".gender-body")) {
        document.querySelector(".gender-body").style.display = "none";
    }
    if (document.getElementById("dashboardPage")) {
        document.getElementById("dashboardPage").style.display = "none";
    }
    
    // Handle login form

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username && password) {

                // Hide background image and login container
                document.getElementById("login-page-background").style.opacity = "0";
                
                setTimeout(() => {
                    // Hide the entire login page after fade out animation completes
                    document.getElementById("loginPage").classList.add("hidden");
                    document.getElementById("loginPage").style.display = "none";
                    
                    // Show gender selection page
                    const genderBody = document.querySelector(".gender-body");
                    genderBody.classList.remove("hidden");
                    genderBody.style.display = "flex";
                    genderBody.style.justifyContent = "center";
                    genderBody.style.alignItems = "center";
                    genderBody.style.height = "100vh";
                    genderBody.style.backgroundColor = "rgba(255, 255, 255, 1)";
                }, 500); // Matches the transition duration

                document.getElementById("loginPage").style.display = "none";
                const loginPage = document.getElementById("loginPage");
                const genderBody = document.querySelector(".gender-body");
                if (genderBody) {
                    genderBody.classList.remove("hidden"); 
                    genderBody.style.display = "block";
                }

            } else {
                alert("Please enter valid credentials.");
            }
        });
    }
});


    // Handle nutrition section - meal tabs functionality
    const mealTabs = document.querySelectorAll(".meal-tab");
    if (mealTabs.length > 0) {
        mealTabs.forEach(tab => {
            tab.addEventListener("click", function() {
                const mealType = this.getAttribute("data-meal");
                
                // Remove active class from all tabs and hide all content
                document.querySelectorAll(".meal-tab").forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".meal-content").forEach(content => {
                    content.classList.add("hidden");
                    content.style.display = "none";
                });
                
                // Add active class to clicked tab and show corresponding content
                this.classList.add("active");
                const activeContent = document.getElementById(mealType + "-content");
                if (activeContent) {
                    activeContent.classList.remove("hidden");
                    activeContent.style.display = "block";
                }
            });
        });


let isPanelOpen = false;

function toggleContributors() {
  const panel = document.getElementById('contributorsPanel');
  isPanelOpen = !isPanelOpen;
  panel.classList.toggle('open', isPanelOpen);
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

    const genderBody = document.querySelector(".gender-body");
    if (genderBody) {
        genderBody.style.display = "none";
    }

    const dashboard = document.getElementById("dashboardPage");
    if (dashboard) {
        dashboard.style.display = "block";
        // Initialize dashboard components
        initNutritionTracker();
        updateStats();
    }
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

// ---------------- Section Navigation with Active State ----------------
function showSection(event, sectionId) {
    event.preventDefault();

    // Hide all sections
    document.querySelectorAll(
        ".stats-section, .appointment-section, .settings-section, .activity-section, .nutrition-section"
    ).forEach(section => {
        section.style.display = "none";
    });

function updateStats() {
    const training = document.getElementById("trainingInput").value;
    const steps = document.getElementById("stepsInput").value;
    const calories = document.getElementById("caloriesInput").value;
    
    // Update display values
    document.getElementById("trainingDisplay").textContent = training;
    document.getElementById("stepsDisplay").textContent = steps;
    document.getElementById("caloriesDisplay").textContent = calories;
    
    // Save to localStorage
    localStorage.setItem("healthStats", JSON.stringify({ training, steps, calories }));
}
    // Add active class to clicked item
    if (event.currentTarget) {
        const parentLi = event.currentTarget.closest('.sidebar-item');
        if (parentLi) {
            parentLi.classList.add('active');
        }
    }

    const sectionMap = {
        home: ".activity-section",
        stats: ".stats-section",
        appointments: ".appointment-section",
        settings: ".settings-section",
        nutrition: ".nutrition-section"
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

// ---------------- Nutrition Tracker Functionality ----------------
function initNutritionTracker() {
    // Sample food database (in a real app, this would come from an API or larger database)
    const foodDatabase = [
        { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
        { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
        { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13 },
        { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
        { name: 'Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5 },
        { name: 'Greek Yogurt', calories: 100, protein: 10, carbs: 3.6, fat: 5 },
        { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
        { name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21 },
        { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
        { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3 },
        { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
        { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.6 },
        { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50 },
        { name: 'Milk', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 }
    ]};
    
    // Track daily nutrition totals
    let dailyNutrition = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
    };
    
    // Track meals
    let meals = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: []
    };
    
    // Target calories (could be customized based on user goals)
    const targetCalories = 2000;
    
    // Meal plan data structure
    let mealPlans = {
        monday: { breakfast: '', lunch: '', dinner: '' },
        tuesday: { breakfast: '', lunch: '', dinner: '' },
        wednesday: { breakfast: '', lunch: '', dinner: '' },
        thursday: { breakfast: '', lunch: '', dinner: '' },
        friday: { breakfast: '', lunch: '', dinner: '' },
        saturday: { breakfast: '', lunch: '', dinner: '' },
        sunday: { breakfast: '', lunch: '', dinner: '' }
    };
    
    // Initialize meal tabs
    initMealTabs();
    
    // Initialize meal plan tabs
    initMealPlanTabs();
    
    // Setup water reminder settings
    setupWaterReminder();
    
    // Initialize food tracking forms
    initFoodForms();
    
    // Initialize visual elements like progress indicators and charts
    initVisualElements();
    
    // Initialize calorie calculator
    initCalorieCalculator();
    
    // Try to load saved data from localStorage
    loadSavedData();
    
    function initMealTabs() {
        const mealTabs = document.querySelectorAll('.meal-tab');
        const mealContents = document.querySelectorAll('.meal-content');
        
        mealTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetMeal = tab.getAttribute('data-meal');
                
                // Remove active class from all tabs and contents
                mealTabs.forEach(t => t.classList.remove('active'));
                mealContents.forEach(c => c.classList.add('hidden'));
                
                // Add active class to selected tab and content
                tab.classList.add('active');
                document.getElementById(`${targetMeal}-content`).classList.remove('hidden');

            });
        });
    }
    
    function initMealPlanTabs() {
        // View/Create plan toggle
        const viewPlanBtn = document.getElementById('view-plan-btn');
        const createPlanBtn = document.getElementById('create-plan-btn');
        const viewPlanContent = document.getElementById('view-plan-content');
        const createPlanContent = document.getElementById('create-plan-content');
        
        if (viewPlanBtn && createPlanBtn) {
            viewPlanBtn.addEventListener('click', () => {
                viewPlanBtn.classList.add('active');
                createPlanBtn.classList.remove('active');
                viewPlanContent.classList.remove('hidden');
                createPlanContent.classList.add('hidden');
            });
            
            createPlanBtn.addEventListener('click', () => {
                createPlanBtn.classList.add('active');
                viewPlanBtn.classList.remove('active');
                createPlanContent.classList.remove('hidden');
                viewPlanContent.classList.add('hidden');
            });
        }
        
        // Day selector buttons
        const dayBtns = document.querySelectorAll('.day-btn');
        if (dayBtns.length) {
            let currentDay = 'monday';
            
            dayBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    dayBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentDay = btn.getAttribute('data-day');
                    updateMealPlanDisplay(currentDay);
                });
            });
        }
        
        // Save meal plan button
        const savePlanBtn = document.getElementById('save-meal-plan');
        if (savePlanBtn) {
            savePlanBtn.addEventListener('click', () => {
                const day = document.getElementById('plan-day').value;
                const meal = document.getElementById('plan-meal').value;
                const description = document.getElementById('meal-description').value;
                
                if (description.trim()) {
                    mealPlans[day][meal] = description;
                    saveMealPlansToLocalStorage();
                    
                    // Show confirmation and reset form
                    alert(`Meal plan for ${meal} on ${day.charAt(0).toUpperCase() + day.slice(1)} has been saved!`);

                    document.getElementById('meal-description').value = '';
                    
                    // Switch back to view mode and show the updated plan
                    if (viewPlanBtn) {
                        viewPlanBtn.click();
                    }
                    
                    // Update the current day display
                    updateMealPlanDisplay(day);
                    
                    // Activate the day button for the selected day
                    dayBtns.forEach(btn => {
                        if (btn.getAttribute('data-day') === day) {
                            btn.click();
                        }
                    });
                } else {
                    alert('Please enter a meal description before saving.');
                }
            });
        }
    }

    function updateMealPlanDisplay(day) {
        const dayPlan = mealPlans[day] || { breakfast: '', lunch: '', dinner: '' };
        
        // Update breakfast
        const breakfastContainer = document.getElementById('plan-breakfast');
        if (breakfastContainer) {
            if (dayPlan.breakfast) {
                breakfastContainer.innerHTML = <div class="plan-meal-item">${dayPlan.breakfast}</div>;
            } else {
                breakfastContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
            }
        }
        
        // Update lunch
        const lunchContainer = document.getElementById('plan-lunch');
        if (lunchContainer) {
            if (dayPlan.lunch) {
                lunchContainer.innerHTML = <div class="plan-meal-item">${dayPlan.lunch}</div>;
            } else {
                lunchContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
            }
        }
        
        // Update dinner
        const dinnerContainer = document.getElementById('plan-dinner');
        if (dinnerContainer) {
            if (dayPlan.dinner) {
                dinnerContainer.innerHTML = <div class="plan-meal-item">${dayPlan.dinner}</div>;
            } else {
                dinnerContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
            }
        }
>>>>>>> Stashed changes
    }
    
    function setupWaterReminder() {
        const setWaterReminderBtn = document.getElementById('set-water-reminder');
        
        if (setWaterReminderBtn) {
            setWaterReminderBtn.addEventListener('click', () => {
                const waterTarget = document.getElementById('water-target').value;
                const reminderInterval = document.getElementById('water-interval').value;
                
                // Save water reminder settings to localStorage
                localStorage.setItem('waterTarget', waterTarget);
                localStorage.setItem('waterReminderInterval', reminderInterval);
                
                // Set water reminder (in a real app, this would use the Notifications API)
                alert(`Water reminder set! Target: ${waterTarget}ml, Reminder interval: Every ${reminderInterval} minutes.`);

<<<<<<< Updated upstream
    // Handle meal plan toggle buttons
    const viewPlanBtn = document.getElementById("view-plan-btn");
    const createPlanBtn = document.getElementById("create-plan-btn");
    const viewPlanContent = document.getElementById("view-plan-content");
    const createPlanContent = document.getElementById("create-plan-content");

    if (viewPlanBtn && createPlanBtn) {
        viewPlanBtn.addEventListener("click", function() {
            viewPlanBtn.classList.add("active");
            createPlanBtn.classList.remove("active");
            if (viewPlanContent) viewPlanContent.style.display = "block";
            if (createPlanContent) {
                createPlanContent.style.display = "none";
                createPlanContent.classList.add("hidden");
            }
        });

        createPlanBtn.addEventListener("click", function() {
            createPlanBtn.classList.add("active");
            viewPlanBtn.classList.remove("active");
            if (createPlanContent) {
                createPlanContent.style.display = "block";
                createPlanContent.classList.remove("hidden");
            }
            if (viewPlanContent) viewPlanContent.style.display = "none";
        });
    }

    // Handle day selector buttons
    const dayButtons = document.querySelectorAll(".day-btn");
    if (dayButtons.length > 0) {
        dayButtons.forEach(btn => {
            btn.addEventListener("click", function() {
                const day = this.getAttribute("data-day");
                
                // Remove active class from all buttons
                dayButtons.forEach(b => b.classList.remove("active"));
                
                // Add active class to clicked button
                this.classList.add("active");
                
                // Here you would typically load the meal plan for the selected day
                console.log("Selected day:", day);
                // You could implement meal plan loading functionality here
            });
        });
    }

    // Handle nutrition forms to prevent page refresh and add items
    const foodForms = {
        "breakfast": document.getElementById("add-breakfast"),
        "lunch": document.getElementById("add-lunch"),
        "dinner": document.getElementById("add-dinner"),
        "snacks": document.getElementById("add-snacks")
    };

    Object.keys(foodForms).forEach(mealType => {
        const form = foodForms[mealType];
        if (form) {
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                
                const foodName = document.getElementById(mealType + "-food-search").value.trim();
                const amount = document.getElementById(mealType + "-amount").value;
                
                if (foodName && amount) {
                    // Add the food item to the appropriate meal list
                    addFoodItem(mealType, foodName, amount);
                    
                    // Clear the form inputs
                    document.getElementById(mealType + "-food-search").value = "";
                    document.getElementById(mealType + "-amount").value = "";
                }
            });
        }
    });

    // Function to add food items to the meal lists
    function addFoodItem(mealType, foodName, amount) {
        const foodListContainer = document.getElementById(mealType + "-items");
        if (foodListContainer) {
            // Remove "no items" message if it exists
            const emptyMessage = foodListContainer.querySelector(".empty-meal-message");
            if (emptyMessage) {
                foodListContainer.removeChild(emptyMessage);
            }
            
            // Create food item element
            const foodItem = document.createElement("div");
            foodItem.className = "food-item";
            
            // Calculate some dummy nutrition values for demonstration
            const calories = Math.round(amount * 1.5);
            const protein = Math.round(amount * 0.1);
            const carbs = Math.round(amount * 0.2);
            const fat = Math.round(amount * 0.05);
            
            // Create the HTML structure
            foodItem.innerHTML = `
                <div class="food-info">
                    <div class="food-name">${foodName}</div>
                    <div class="food-details">${amount}g | ${calories} kcal | ${protein}g protein | ${carbs}g carbs | ${fat}g fat</div>
                </div>
                <button class="food-delete" type="button">×</button>
            `;
            
            // Add delete functionality
            const deleteBtn = foodItem.querySelector(".food-delete");
            deleteBtn.addEventListener("click", function() {
                foodListContainer.removeChild(foodItem);
                
                // If no items left, show the empty message again
                if (foodListContainer.childElementCount === 0) {
                    const emptyMsg = document.createElement("p");
                    emptyMsg.className = "empty-meal-message";
                    emptyMsg.textContent = "No items added yet";
                    foodListContainer.appendChild(emptyMsg);
                }
                
                // Update totals
                updateNutritionTotals();
            });
            
            // Add to the list
            foodListContainer.appendChild(foodItem);
            
            // Update nutrition totals
            updateNutritionTotals();
            
            // Show success alert
            alert(`Added ${foodName} (${amount}g) to ${mealType}`);
        }
    }

    // Function to update nutrition totals
    function updateNutritionTotals() {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        
        // Get all food items
        const foodItems = document.querySelectorAll(".food-item");
        foodItems.forEach(item => {
            const details = item.querySelector(".food-details").textContent;
            
            // Extract values using regex
            const caloriesMatch = details.match(/(\d+) kcal/);
            const proteinMatch = details.match(/(\d+)g protein/);
            const carbsMatch = details.match(/(\d+)g carbs/);
            const fatMatch = details.match(/(\d+)g fat/);
            
            if (caloriesMatch) totalCalories += parseInt(caloriesMatch[1]);
            if (proteinMatch) totalProtein += parseInt(proteinMatch[1]);
            if (carbsMatch) totalCarbs += parseInt(carbsMatch[1]);
            if (fatMatch) totalFat += parseInt(fatMatch[1]);
        });
        
        // Update the displayed totals
        document.getElementById("calorie-progress").textContent = totalCalories;
        document.getElementById("calorie-consumed").textContent = totalCalories;
        document.getElementById("protein-value").textContent = totalProtein;
        document.getElementById("carbs-value").textContent = totalCarbs;
        document.getElementById("fat-value").textContent = totalFat;
        
        // Update progress ring (adjust based on target)
        const target = parseInt(document.getElementById("calorie-target").textContent);
        const percentage = Math.min(Math.round((totalCalories / target) * 100), 100);
        const progressRing = document.querySelector(".progress-ring");
        if (progressRing) {
            progressRing.style.background = `conic-gradient(#4CAF50 ${percentage}%, #E0E0E0 ${percentage}%)`;
        }
        
        // Update macro chart if Chart.js is available
        updateMacroChart(totalProtein, totalCarbs, totalFat);
    }

    // Function to update the macro chart
    function updateMacroChart(protein, carbs, fat) {
        const ctx = document.getElementById("macro-chart");
        if (ctx && window.Chart) {
            // Check if chart already exists
            if (window.macroChart) {
                // Update existing chart
                window.macroChart.data.datasets[0].data = [protein, carbs, fat];
                window.macroChart.update();
            } else {
                // Create new chart
                window.macroChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Protein', 'Carbs', 'Fat'],
                        datasets: [{
                            data: [protein, carbs, fat],
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        }
                    }
                });
            }
        }
    }

    // Handle calorie calculator form
    const calorieCalcForm = document.getElementById("calorie-calculator");
    if (calorieCalcForm) {
        calorieCalcForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const age = parseInt(document.getElementById("calc-age").value);
            const gender = document.getElementById("calc-gender").value;
            const weight = parseFloat(document.getElementById("calc-weight").value);
            const height = parseInt(document.getElementById("calc-height").value);
            const activityLevel = parseFloat(document.getElementById("calc-activity").value);
            const goal = document.getElementById("calc-goal").value;
            
            // BMR calculation using Harris-Benedict equation
            let bmr = 0;
            if (gender === "male") {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
            
            // Calculate maintenance calories
            const maintenance = Math.round(bmr * activityLevel);
            
            // Calculate target calories based on goal
            let target = maintenance;
            if (goal === "lose") {
                target = Math.round(maintenance * 0.85); // 15% deficit
            } else if (goal === "gain") {
                target = Math.round(maintenance * 1.15); // 15% surplus
            }
            
            // Update the results
            document.getElementById("bmr-result").textContent = Math.round(bmr);
            document.getElementById("maintenance-result").textContent = maintenance;
            document.getElementById("target-result").textContent = target;
            
            // Show the results
            const resultsDiv = document.getElementById("calculator-result");
            resultsDiv.classList.add("show");
            resultsDiv.style.display = "block";
            
            // Update the calorie target in the nutrition tracker
            document.getElementById("calorie-target").textContent = target;
        });
    }

    // Other existing forms
    const nutritionForms = [
        document.getElementById("calorie-calculator"),
        document.getElementById("appointment-form"),
        document.getElementById("medicine-form")
    ];

    nutritionForms.forEach(form => {
        if (form) {
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                console.log("Form submitted:", form.id);
            });
        }
    });

    // Handle meal plan save button without page refresh
    const saveMealPlanBtn = document.getElementById("save-meal-plan");
    if (saveMealPlanBtn) {
        saveMealPlanBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const day = document.getElementById("plan-day").value;
            const meal = document.getElementById("plan-meal").value;
            const description = document.getElementById("meal-description").value;
            
            if (description.trim() === "") {
                alert("Please enter a meal description");
                return;
            }
            
            // Save the meal plan (in a real app, this would be stored in a database)
            saveMealPlanToLocalStorage(day, meal, description);
            
            // Clear form and show success message
            document.getElementById("meal-description").value = "";
            alert(`Meal plan for ${meal} on ${day} saved successfully!`);
            
            // Switch back to view mode
            if (document.getElementById("view-plan-btn")) {
                document.getElementById("view-plan-btn").click();
                
                // Update the displayed meal plans for the current day
                updateMealPlansDisplay(day);
            }
        });
    }
    
    // Function to save meal plans to localStorage
    function saveMealPlanToLocalStorage(day, mealType, description) {
        // Get existing meal plans from localStorage or create a new object
        const storedPlans = localStorage.getItem('mealPlans');
        let mealPlans = storedPlans ? JSON.parse(storedPlans) : {};
        
        // Initialize day if it doesn't exist
        if (!mealPlans[day]) {
            mealPlans[day] = {};
        }
        
        // Save the meal plan
        mealPlans[day][mealType] = description;
        
        // Store back to localStorage
        localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
    }
    
    // Function to update meal plan display
    function updateMealPlansDisplay(selectedDay) {
        const storedPlans = localStorage.getItem('mealPlans');
        if (!storedPlans) return;
        
        const mealPlans = JSON.parse(storedPlans);
        const dayPlan = mealPlans[selectedDay];
        
        if (!dayPlan) return;
        
        // Update each meal type
        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
            const planContainer = document.getElementById(`plan-${mealType}`);
            if (planContainer) {
                if (dayPlan[mealType]) {
                    // Clear existing content
                    planContainer.innerHTML = '';
                    
                    // Create the plan item
                    const planItem = document.createElement('div');
                    planItem.className = 'plan-meal-item';
                    planItem.textContent = dayPlan[mealType];
                    
                    planContainer.appendChild(planItem);
                } else {
                    planContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
                }
            }
        });
    }

    // Handle dark mode toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        // Check for saved dark mode preference in localStorage
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        
        // Apply dark mode on page load if it was active before
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            darkModeToggle.innerHTML = "☀️ Light Mode";
        }
        
        // Toggle dark mode on button click
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
            
            // Save preference to localStorage
            const isDarkModeActive = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", isDarkModeActive);
            
            // Update button text based on current state
            darkModeToggle.innerHTML = isDarkModeActive ? "☀️ Light Mode" : "🌙 Dark Mode";
        });
    }
    
    // Handle feedback modal functionality
    const openFeedbackBtn = document.getElementById("open-feedback-btn");
    const feedbackModal = document.getElementById("feedback-modal");
    const closeBtn = document.querySelector(".close-btn");
    const closeThankYouBtn = document.querySelector(".close-thank-you");
    const emojiRatings = document.querySelectorAll(".emoji");
    const nextStep1 = document.getElementById("next-step1");
    const nextStep2 = document.getElementById("next-step2");
    const prevStep2 = document.getElementById("prev-step2");
    const submitBtn = document.querySelector(".submit-btn");
    const prevStep3 = document.querySelector("#step3 .prev-btn");
    const feedbackText = document.getElementById("feedback-text");
    const warningMessage = document.getElementById("warningMessage");
    const contactToggle = document.getElementById("contact-toggle");
    const toggleLabel = document.getElementById("toggle-label");
    const contactDetails = document.getElementById("contact-details");
    
    // Open feedback modal
    if (openFeedbackBtn && feedbackModal) {
        openFeedbackBtn.addEventListener("click", function() {
            feedbackModal.style.display = "flex";
            // Reset form when opening
            resetFeedbackForm();
        });
    }

    // Close feedback modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            feedbackModal.style.display = "none";
        });
    }

    // Close feedback modal after thank you and reset form
    if (closeThankYouBtn) {
        closeThankYouBtn.addEventListener("click", function() {
            feedbackModal.style.display = "none";
            resetFeedbackForm();
        });
    }

    // Close feedback modal when clicking outside the modal content
    window.addEventListener("click", function(event) {
        if (event.target === feedbackModal) {
            feedbackModal.style.display = "none";
            resetFeedbackForm();
        }
    });

    // Handle emoji rating selection
    if (emojiRatings) {
        emojiRatings.forEach(emoji => {
            emoji.addEventListener("click", function() {
                // Remove selected class from all emojis
                emojiRatings.forEach(e => e.classList.remove("selected"));
                
                // Add selected class to clicked emoji
                this.classList.add("selected");
                
                // Update rating text based on selection
                const rating = this.getAttribute("data-rating");
                updateRatingText(rating);
                
                // Enable the next button
                if (nextStep1) {
                    nextStep1.disabled = false;
                }
            });
        });
    }

    // Update rating text based on selected emoji
    function updateRatingText(rating) {
        const ratingText = document.querySelector(".rating-text");
        if (ratingText) {
            switch(rating) {
                case "1":
                    ratingText.textContent = "Very Dissatisfied";
                    break;
                case "2":
                    ratingText.textContent = "Dissatisfied";
                    break;
                case "3":
                    ratingText.textContent = "Neutral";
                    break;
                case "4":
                    ratingText.textContent = "Satisfied";
                    break;
                case "5":
                    ratingText.textContent = "Very Satisfied";
                    break;
                default:
                    ratingText.textContent = "Select your rating";
            }
        }
    }

    // Navigate to step 2
    if (nextStep1) {
        nextStep1.addEventListener("click", function() {
            document.getElementById("step1").classList.add("hidden");
            document.getElementById("step2").classList.remove("hidden");
            document.querySelector(".progress-fill").style.width = "66.66%";
            document.querySelector(".progress-text").textContent = "Step 2 of 3";
        });
    }

    // Navigate back to step 1
    if (prevStep2) {
        prevStep2.addEventListener("click", function() {
            document.getElementById("step2").classList.add("hidden");
            document.getElementById("step1").classList.remove("hidden");
            document.querySelector(".progress-fill").style.width = "33.33%";
            document.querySelector(".progress-text").textContent = "Step 1 of 3";
        });
    }

    // Navigate to step 3
    if (nextStep2) {
        nextStep2.addEventListener("click", function() {
            document.getElementById("step2").classList.add("hidden");
            document.getElementById("step3").classList.remove("hidden");
            document.querySelector(".progress-fill").style.width = "100%";
            document.querySelector(".progress-text").textContent = "Step 3 of 3";
        });
    }

    // Navigate back to step 2
    if (prevStep3) {
        prevStep3.addEventListener("click", function() {
            document.getElementById("step3").classList.add("hidden");
            document.getElementById("step2").classList.remove("hidden");
            document.querySelector(".progress-fill").style.width = "66.66%";
            document.querySelector(".progress-text").textContent = "Step 2 of 3";
        });
    }

    // Toggle contact details visibility
    if (contactToggle && toggleLabel && contactDetails) {
        contactToggle.addEventListener("change", function() {
            if (this.checked) {
                toggleLabel.textContent = "Yes";
                contactDetails.classList.remove("hidden");
            } else {
                toggleLabel.textContent = "No";
                contactDetails.classList.add("hidden");
            }
        });
    }

    // Submit feedback
    if (submitBtn && feedbackText) {
        submitBtn.addEventListener("click", function() {
            if (feedbackText.value.trim().length < 10) {
                warningMessage.textContent = "Please provide more detailed feedback (at least 10 characters)";
                return;
            }
            
            warningMessage.textContent = "";
            
            // In a real app, you would send the feedback data to a server here
            console.log("Feedback submitted:", {
                rating: document.querySelector(".emoji.selected")?.getAttribute("data-rating") || "",
                categories: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value),
                feedback: feedbackText.value,
                contactRequested: contactToggle.checked,
                email: contactToggle.checked ? document.getElementById("contact-email").value : ""
            });
            
            // Show thank you message
            document.getElementById("step3").classList.add("hidden");
            document.getElementById("thank-you").classList.remove("hidden");
        });
    }

    // Reset feedback form to initial state
    function resetFeedbackForm() {
        // Reset to step 1
        document.getElementById("step1").classList.remove("hidden");
        document.getElementById("step2").classList.add("hidden");
        document.getElementById("step3").classList.add("hidden");
        document.getElementById("thank-you").classList.add("hidden");
        
        // Reset progress
        document.querySelector(".progress-fill").style.width = "33.33%";
        document.querySelector(".progress-text").textContent = "Step 1 of 3";
        
        // Clear emoji selection
        emojiRatings.forEach(e => e.classList.remove("selected"));
        document.querySelector(".rating-text").textContent = "Select your rating";
        
        // Disable next button
        if (nextStep1) {
            nextStep1.disabled = true;
        }
        
        // Uncheck all categories
        document.querySelectorAll('input[name="category"]:checked').forEach(cb => cb.checked = false);
        
        // Clear text input
        if (feedbackText) {
            feedbackText.value = "";
        }
        
        // Clear warning
        if (warningMessage) {
            warningMessage.textContent = "";
        }
        
        // Reset contact toggle
        if (contactToggle) {
            contactToggle.checked = false;
            toggleLabel.textContent = "No";
            contactDetails.classList.add("hidden");
        }
    }

    // Update statistics
    window.updateStats = function (event) {
        // Prevent default form submission behavior
        if (event) {
            event.preventDefault();
        }
        
        // Save the values to localStorage to persist the data
        const training = document.getElementById("trainingInput").value;
        const steps = document.getElementById("stepsInput").value;
        const calories = document.getElementById("caloriesInput").value;

        if (training) {
            document.getElementById("trainingDisplay").textContent = training + " hours/week";
            localStorage.setItem("trainingStats", training);
        }
        
        if (steps) {
            document.getElementById("stepsDisplay").textContent = steps + " km/week";
            localStorage.setItem("stepsStats", steps);
        }
        
        if (calories) {
            document.getElementById("caloriesDisplay").textContent = calories + " kcal/week";
            localStorage.setItem("caloriesStats", calories);
        }

        // Clear input fields
        document.getElementById("trainingInput").value = "";
        document.getElementById("stepsInput").value = "";
        document.getElementById("caloriesInput").value = "";

        alert("Statistics updated successfully!");
    };

    // Load saved stats data from localStorage on page load
    function loadSavedStats() {
        const training = localStorage.getItem("trainingStats");
        const steps = localStorage.getItem("stepsStats");
        const calories = localStorage.getItem("caloriesStats");

        if (training) document.getElementById("trainingDisplay").textContent = training + " hours/week";
        if (steps) document.getElementById("stepsDisplay").textContent = steps + " km/week";
        if (calories) document.getElementById("caloriesDisplay").textContent = calories + " kcal/week";
    }

    // Apply essential inline styles for key elements
    function applyInlineStyles() {
        // Style gender selection elements
        const genderContainer = document.querySelector(".container");
        if (genderContainer) {
            genderContainer.style.background = "#1f1f1f";
            genderContainer.style.padding = "30px";
            genderContainer.style.borderRadius = "15px";
            genderContainer.style.textAlign = "center";
            genderContainer.style.width = "90%";
            genderContainer.style.maxWidth = "400px";
            genderContainer.style.color = "white";
        }

        const genderOptions = document.querySelectorAll(".gender");
        genderOptions.forEach(option => {
            option.style.border = "2px solid #888";
            option.style.borderRadius = "10px";
            option.style.padding = "10px";
            option.style.cursor = "pointer";
            option.style.margin = "10px auto";
            option.style.display = "block";
        });

        const birthdayInput = document.getElementById("birthday");
        if (birthdayInput) {
            birthdayInput.style.padding = "10px";
            birthdayInput.style.marginTop = "10px";
            birthdayInput.style.width = "80%";
            birthdayInput.style.fontSize = "16px";
            birthdayInput.style.borderRadius = "8px";
            birthdayInput.style.border = "none";
        }

        const skipElement = document.querySelector(".skip");
        if (skipElement) {
            skipElement.style.marginTop = "10px";
            skipElement.style.color = "#aaa";
            skipElement.style.cursor = "pointer";
            skipElement.style.textDecoration = "underline";
        }

        // Style dashboard content
        const dashboardContent = document.querySelector(".dashboard-content");
        if (dashboardContent) {
            dashboardContent.style.flexGrow = "1";
            dashboardContent.style.padding = "20px";
            dashboardContent.style.overflowY = "auto";
            dashboardContent.style.transition = "background-color 0.3s ease";
        }

        // Initialize activity section to be visible by default
        const activitySection = document.querySelector(".activity-section");
        if (activitySection) {
            activitySection.style.display = "block";
        }

        // Hide the other sections initially
        const sectionsToHide = ["#statssection", ".nutrition-section", "#appointmentsection", "#settingsSection"];
        sectionsToHide.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) section.style.display = "none";
        });
    }

    // Load saved stats on page load
    loadSavedStats();
=======
            });
        }
    }
    
    function initFoodForms() {
        // Add event listeners to forms
        ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(mealType => {
            const form = document.getElementById(`add-${mealType}`);
            // You can now add logic for each form
        });
    }
    
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const foodInput = document.getElementById(`${mealType}-food-search`);
                    const amountInput = document.getElementById(`${mealType}-amount`);
                    
                    const foodName = foodInput.value.trim();
                    const amount = parseInt(amountInput.value);
                    
                    if (foodName && !isNaN(amount) && amount > 0) {
                        addFoodToMeal(foodName, amount, mealType);
                        foodInput.value = '';
                        amountInput.value = '';
                    } else {
                        alert('Please enter a valid food name and amount.');
                    }
                });
                
                // Add autocomplete for food search
                const foodInput = document.getElementById(`${mealType}-food-search`);

                if (foodInput) {
                    foodInput.addEventListener('input', (e) => {
                        const searchTerm = e.target.value.toLowerCase();
                
                        if (searchTerm.length >= 2) {
                            const matches = foodDatabase.filter(food => 
                                food.name.toLowerCase().includes(searchTerm)
                            );
                
                            // In a real app, show autocomplete dropdown here
                            if (matches.length && matches.length <= 5) {
                                console.log(`Matches for ${searchTerm}:`, matches.map(m => m.name));
                            }
                        }
                    });
                }
                
    
    function addFoodToMeal(foodName, amount, mealType) {
        // Find the food in database
        const food = foodDatabase.find(f => f.name.toLowerCase() === foodName.toLowerCase());
        
        if (!food) {
            // For demo purposes, add a custom food with basic calorie estimate
            const customCalories = Math.round(amount * 1.5); // Simple approximation
            const customProtein = Math.round(amount * 0.05);
            const customCarbs = Math.round(amount * 0.1);
            const customFat = Math.round(amount * 0.08);
            
            const customFood = {
                name: foodName,
                calories: customCalories,
                protein: customProtein,
                carbs: customCarbs,
                fat: customFat,
                amount: amount,
                custom: true
            };
            
            meals[mealType].push(customFood);
        } else {
            // Calculate nutrition based on amount
            const ratio = amount / 100; // Assuming database values are per 100g
            const mealItem = {
                name: food.name,
                calories: Math.round(food.calories * ratio),
                protein: Math.round(food.protein * ratio * 10) / 10,
                carbs: Math.round(food.carbs * ratio * 10) / 10,
                fat: Math.round(food.fat * ratio * 10) / 10,
                amount: amount
            };
            
            meals[mealType].push(mealItem);
        }
        
        // Update display
        updateMealDisplay(mealType);
        updateTotalNutrition();
        
        // Save to localStorage
        saveNutritionDataToLocalStorage();
        
        // Show confirmation
let message;
if (food && food.calories) {
    message = `Added ${amount}g of ${foodName} (${Math.round(food.calories * amount / 100)} calories)`;
} else {
    message = `Added ${amount}g of ${foodName} (estimated ${Math.round(amount * 1.5)} calories)`;
}
console.log(message);

        
        
        // Display a temporary message (in a real app, this would be a nicer toast notification)
        alert(message);
    }
    
    function updateMealDisplay(mealType) {
        const container = document.getElementById(`${mealType}-items`);

        if (container) {
            if (meals[mealType].length === 0) {
                container.innerHTML = '<p class="empty-meal-message">No items added yet</p>';

  return;
            }
            
            container.innerHTML = '';
            
            meals[mealType].forEach((item, index) => {
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item';
                
                foodItem.innerHTML = `
                    <div class="food-info">
                        <div class="food-name">${item.name} (${item.amount}g)</div>
                        <div class="food-details">
                            ${item.calories} kcal | P: ${item.protein}g | C: ${item.carbs}g | F: ${item.fat}g
                        </div>
                    </div>
                    <button class="food-delete" data-meal="${mealType}" data-index="${index}">×</button>
                `;
                
                container.appendChild(foodItem);
            });
            
            // Add event listeners to delete buttons
            const deleteButtons = container.querySelectorAll('.food-delete');
            deleteButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const meal = btn.getAttribute('data-meal');
                    const index = parseInt(btn.getAttribute('data-index'));
                    
                    // Remove item from meals
                    meals[meal].splice(index, 1);
                    
                    // Update displays
                    updateMealDisplay(meal);
                    updateTotalNutrition();
                    
                    // Save to localStorage
                    saveNutritionDataToLocalStorage();
                });
            });
        }
    }
    
    function updateTotalNutrition() {
        // Reset daily totals
        dailyNutrition = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        };
        
        // Calculate totals from all meals
        Object.keys(meals).forEach(mealType => {
            meals[mealType].forEach(item => {
                dailyNutrition.calories += item.calories;
                dailyNutrition.protein += item.protein;
                dailyNutrition.carbs += item.carbs;
                dailyNutrition.fat += item.fat;
            });
        });
        
        // Round values
        dailyNutrition.protein = Math.round(dailyNutrition.protein * 10) / 10;
        dailyNutrition.carbs = Math.round(dailyNutrition.carbs * 10) / 10;
        dailyNutrition.fat = Math.round(dailyNutrition.fat * 10) / 10;
        
        // Update display
        updateNutritionDisplay();
    }
    
    function updateNutritionDisplay() {
        // Update calorie progress
        const calorieProgressElem = document.getElementById('calorie-progress');
        const calorieConsumedElem = document.getElementById('calorie-consumed');
        const calorieTargetElem = document.getElementById('calorie-target');
        
        if (calorieProgressElem) calorieProgressElem.textContent = dailyNutrition.calories;
        if (calorieConsumedElem) calorieConsumedElem.textContent = dailyNutrition.calories;
        if (calorieTargetElem) calorieTargetElem.textContent = targetCalories;
        
        // Update progress ring
        const progressPercentage = Math.min(100, (dailyNutrition.calories / targetCalories) * 100);
        const progressRing = document.querySelector('.progress-ring');
        if (progressRing) {
            progressRing.style.background = `conic-gradient(#4CAF50 ${progressPercentage}%, #E0E0E0 0%)`;

        }
        
        // Update macronutrient values
        const proteinElem = document.getElementById('protein-value');
        const carbsElem = document.getElementById('carbs-value');
        const fatElem = document.getElementById('fat-value');
        
        if (proteinElem) proteinElem.textContent = dailyNutrition.protein;
        if (carbsElem) carbsElem.textContent = dailyNutrition.carbs;
        if (fatElem) fatElem.textContent = dailyNutrition.fat;
        
        // Update macronutrient chart if Chart.js is available
        updateMacroChart();
    }
    
    function updateMacroChart() {
        const chartCanvas = document.getElementById('macro-chart');
        if (chartCanvas && window.Chart) {
            // Destroy existing chart if any
            if (window.macroChart) {
                window.macroChart.destroy();
            }
            
            // Create new chart
            window.macroChart = new Chart(chartCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Protein', 'Carbs', 'Fat'],
                    datasets: [{
                        data: [dailyNutrition.protein * 4, dailyNutrition.carbs * 4, dailyNutrition.fat * 9],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF4D6D', '#2693E6', '#FFB922']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: 70,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                const dataset = data.datasets[tooltipItem.datasetIndex];
                                const total = dataset.data.reduce((acc, val) => acc + val, 0);
                                const value = dataset.data[tooltipItem.index];
                                const percentage = Math.round((value / total) * 100);
                                return `${data.labels[tooltipItem.index]}: ${percentage}%`;

                            }
                        }
                    }
                }
            });
        }
    }
    
    function initCalorieCalculator() {
        const calculatorForm = document.getElementById('calorie-calculator');
        const resultContainer = document.getElementById('calculator-result');

        if (calculatorForm) {
            calculatorForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const age = parseInt(document.getElementById('calc-age').value);
                const gender = document.getElementById('calc-gender').value;
                const weight = parseFloat(document.getElementById('calc-weight').value);
                const height = parseFloat(document.getElementById('calc-height').value);
                const activityLevel = parseFloat(document.getElementById('calc-activity').value);
                const goal = document.getElementById('calc-goal').value;
                
                // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
                let bmr;
                if (gender === 'male') {
                    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
                } else {
                    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
                }
                
                // Calculate maintenance calories
                const maintenance = Math.round(bmr * activityLevel);
                
                // Calculate target calories based on goal
                let targetCalories;
                if (goal === 'lose') {
                    targetCalories = Math.round(maintenance - 500); // 500 calorie deficit
                } else if (goal === 'gain') {
                    targetCalories = Math.round(maintenance + 500); // 500 calorie surplus
                } else {
                    targetCalories = maintenance;
                }
                
                // Display results
                document.getElementById('bmr-result').textContent = Math.round(bmr);
                document.getElementById('maintenance-result').textContent = maintenance;
                document.getElementById('target-result').textContent = targetCalories;
                
                // Show result container with animation
                resultContainer.classList.add('show');
                
                // Save calculated target to localStorage
                localStorage.setItem('calculatedCalorieTarget', targetCalories);
                
                // Option to update calorie target in the app
            if (confirm(`Would you like to update your daily calorie target to ${targetCalories} calories?`)) {
                    document.getElementById('calorie-target').textContent = targetCalories;
                    updateNutritionDisplay();
                    localStorage.setItem('calorieTarget', targetCalories);
                }
            });
        }
    
    function initVisualElements() {
        // Initialize charts or visual elements here
        updateMacroChart();
        
        // Initialize meal displays
        Object.keys(meals).forEach(mealType => {
            updateMealDisplay(mealType);
        });
        
        // Initialize meal plan display
        updateMealPlanDisplay('monday');
    }
    function saveNutritionDataToLocalStorage() {
        localStorage.setItem('healthTrackerMeals', JSON.stringify(meals));
        localStorage.setItem('healthTrackerNutrition', JSON.stringify(dailyNutrition));
    }
    
    function saveMealPlansToLocalStorage() {
        localStorage.setItem('healthTrackerMealPlans', JSON.stringify(mealPlans));
    }
    
    function loadSavedData() {
        // Try to load meals
        const savedMeals = localStorage.getItem('healthTrackerMeals');
        if (savedMeals) {
            try {
                meals = JSON.parse(savedMeals);
                Object.keys(meals).forEach(mealType => {
                    updateMealDisplay(mealType);
                });
            } catch (e) {
                console.error('Error loading saved meals', e);
            }
        }
        
        // Try to load nutrition data
        const savedNutrition = localStorage.getItem('healthTrackerNutrition');
        if (savedNutrition) {
            try {
                dailyNutrition = JSON.parse(savedNutrition);
                updateNutritionDisplay();
            } catch (e) {
                console.error('Error loading saved nutrition data', e);
            }
        }
        
        // Try to load meal plans
        const savedMealPlans = localStorage.getItem('healthTrackerMealPlans');
        if (savedMealPlans) {
            try {
                mealPlans = JSON.parse(savedMealPlans);
                updateMealPlanDisplay('monday');
            } catch (e) {
                console.error('Error loading saved meal plans', e);
            }
        }
        
        // Load water reminder settings
        const waterTarget = localStorage.getItem('waterTarget');
        const waterInterval = localStorage.getItem('waterReminderInterval');
        
        if (waterTarget) {
            document.getElementById('water-target').value = waterTarget;
        }
        
        if (waterInterval) {
            document.getElementById('water-interval').value = waterInterval;
        }
        
        // Load calorie target if previously calculated
        const savedCalorieTarget = localStorage.getItem('calorieTarget');
        if (savedCalorieTarget) {
            const calorieTargetElem = document.getElementById('calorie-target');
            if (calorieTargetElem) {
                calorieTargetElem.textContent = savedCalorieTarget;
                updateNutritionDisplay();
            }
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

    // Initialize nutrition tracker functionality
    initNutritionTracker();
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
            /**
             * Displays an alert for a confirmed appointment
             * @param {string} doctor - The name of the doctor
             * @param {string} date - The date of the appointment
             * @param {string} time - The time of the appointment
             * @returns {void} - Shows an alert dialog with appointment details
             */
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
>>>>>>> Stashed changes
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
        // Add water tracking functionality here
    });
}
});
// ---------------- Stats Update Function ----------------
function updateStats() {
    const training = document.getElementById("trainingInput").value;
    const steps = document.getElementById("stepsInput").value;
    const calories = document.getElementById("caloriesInput").value;

}
// ---------------- Logout Function ----------------
document.getElementById("logoutBtn").addEventListener("click", function () {
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("loginPage").classList.remove("hidden");
    menuDropdown.classList.remove("show");
});

// ---------------- Activity Cards Interaction ----------------
document.querySelectorAll(".activity-card button").forEach(button => {
    button.addEventListener("click", () => {
        const type = button.getAttribute("data-type");
        alert(`${type} activity tracked!`);
    });
});

// Optional: update stats if needed
function updateActivityCard(type, value) {
    const display = document.querySelector(`.activity-card[data-type="${type}"] .activity-value`);
    if (display) {
        display.textContent = value;
    }
}}
