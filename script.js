// Global variable to store selected gender
let selectedGender = '';

// Function to select gender - globally accessible
function selectGender(gender) {
    selectedGender = gender;
    console.log(`Selected gender: ${gender}`);
    
    // Remove selection from all gender elements
    document.querySelectorAll('.gender').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selected class to the chosen gender
    const selectedElement = document.querySelector(`.gender[data-gender="${gender}"]`);
    if (selectedElement) {
        selectedElement.classList.add('selected');
    }
}

// Function to handle form submission on gender page
function submitForm() {
    const birthday = document.getElementById('birthday').value;
    
    if (!selectedGender) {
        alert('Please select your gender.');
        return;
    }
    
    if (!birthday) {
        alert('Please enter your birthday.');
        return;
    }
    
    // Save gender and birthday to localStorage
    localStorage.setItem('userGender', selectedGender);
    localStorage.setItem('userBirthday', birthday);
    
    // Hide gender page and show dashboard
    document.querySelector(".gender-body").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
    
    // Initialize dashboard components
    initNutritionTracker();
}

// Function to skip gender selection
function skip() {
    document.querySelector(".gender-body").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
    
    // Initialize dashboard components
    initNutritionTracker();
}

// Function to show/hide modal dialogs
function showModal() {
    const feedbackModal = document.getElementById("feedback-modal");
    if (feedbackModal) {
        feedbackModal.style.display = "flex";
        feedbackModal.style.opacity = "1";
    }
}

function closeModal() {
    const feedbackModal = document.getElementById("feedback-modal");
    if (feedbackModal) {
        feedbackModal.style.opacity = "0";
        setTimeout(() => {
            feedbackModal.style.display = "none";
        }, 200);
    }
}

// Function for styling inputs and buttons
function styleInputsAndButtons() {
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
}

function updateMealPlanDisplay(day) {
        const dayPlan = mealPlans[day] || { breakfast: '', lunch: '', dinner: '' };
        
        // Update breakfast
        const breakfastContainer = document.getElementById('plan-breakfast');
        if (breakfastContainer) {
            if (dayPlan.breakfast) {
                breakfastContainer.innerHTML = `<div class="plan-meal-item">${dayPlan.breakfast}</div>`;
            } else {
                breakfastContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
            }
        }
        
        // Update lunch
        const lunchContainer = document.getElementById('plan-lunch');
        if (lunchContainer) {
            if (dayPlan.lunch) {
                lunchContainer.innerHTML = `<div class="plan-meal-item">${dayPlan.lunch}</div>`;
            } else {
                lunchContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
            }
        }
        
        // Update dinner
        const dinnerContainer = document.getElementById('plan-dinner');
        if (dinnerContainer) {
            if (dayPlan.dinner) {
                dinnerContainer.innerHTML = `<div class="plan-meal-item">${dayPlan.dinner}</div>`;
            } else {
                dinnerContainer.innerHTML = '<p class="empty-plan-message">No meal planned</p>';
            }
        }
    }

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
            });
        }
    }

function initFoodForms() {
        // Add event listeners to forms
        ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(mealType => {
            const form = document.getElementById(`add-${mealType}`);
            
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

// ---------------- DOM Content Loaded ----------------
document.addEventListener("DOMContentLoaded", function () {
    // Initially hide gender and dashboard pages
    if (document.querySelector(".gender-body")) {
        document.querySelector(".gender-body").style.display = "none";
    }
    if (document.getElementById("dashboardPage")) {
        document.getElementById("dashboardPage").style.display = "none";
    }

    // Set up login form handler
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
                    if (genderBody) {
                        genderBody.classList.remove("hidden");
                        genderBody.style.display = "flex";
                        genderBody.style.justifyContent = "center";
                        genderBody.style.alignItems = "center";
                        genderBody.style.height = "100vh";
                        genderBody.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    }
                }, 500); // Matches the transition duration
            } else {
                alert("Please enter valid credentials.");
            }
        });
    }
    
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
    const dashboardVisible = document.getElementById("dashboardPage") && 
                            document.getElementById("dashboardPage").style.display === "block";
    if (dashboardVisible) {
        initNutritionTracker();
    }
    
    // Handle medicine form
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

    // Handle appointment form
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

    // Apply inline styling to inputs and buttons
    styleInputsAndButtons();

    // Set up feedback modal
    const feedbackModal = document.getElementById("feedback-modal");
    const openBtn = document.getElementById("open-feedback-btn");
    const closeBtn = document.querySelector(".close-btn");
    const sendBtn = document.querySelector(".send-btn");
    const cancelBtn = document.querySelector(".cancel-btn");

    if (openBtn) openBtn.addEventListener("click", showModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
    
    // Set up emoji ratings
    document.querySelectorAll(".emoji").forEach(emoji => {
        emoji.addEventListener("click", function () {
            document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Handle feedback submission
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

    // Set up contributors button
    const contributorsBtn = document.getElementById("contributors-btn");
    if (contributorsBtn) {
        contributorsBtn.addEventListener("click", function () {
            alert("Contributors:\n1. Alice\n2. Bob\n3. Charlie");
        });
    }

    // Set up water tracking
    const waterButton = document.querySelector(".activity-card.water button");
    if (waterButton) {
        waterButton.addEventListener("click", function() {
            // Add water tracking functionality here
        });
    }
    
    // Set up activity card interaction
    document.querySelectorAll(".activity-card button").forEach(button => {
        button.addEventListener("click", () => {
            const type = button.getAttribute("data-type");
            alert(`${type} activity tracked!`);
        });
    });
    
    // Set up logout button
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            document.getElementById("dashboardPage").style.display = "none";
            document.getElementById("loginPage").classList.remove("hidden");
            const menuDropdown = document.querySelector('.menu-dropdown');
            if (menuDropdown) menuDropdown.classList.remove("show");
        });
    }

    // Load saved contributors
    loadContributors();
});
