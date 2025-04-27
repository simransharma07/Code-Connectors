// Global variables for nutrition tracking
const foodDatabase = [
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13 },
    { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    { name: 'Egg', calories: 68, protein: 5.5, carbs: 0.5, fat: 4.8 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Greek Yogurt', calories: 133, protein: 10, carbs: 6, fat: 6 },
    { name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21 },
    { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 3.6 },
    { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50 },
    { name: 'Milk', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 }
];

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
let targetCalories = 2000;

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

// Global variables for step tracking
let dailySteps = 0;
let stepGoal = 10000;
let stepHistory = [];

// User profile data
let userProfileData = {
    displayName: "Health User",
    username: "healthuser123",
    gender: "Not specified",
    dateOfBirth: "Not specified",
    memberSince: "April 2025",
    accountType: "Premium Account"
};

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Update button text/icon based on current mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
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

// Function to toggle mobile sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
        console.log('Toggling sidebar:', sidebar.classList.contains('active'));
    }
}

// Function to close mobile sidebar
function closeMobileSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
}

// Function to show sections/tabs in the dashboard
function showSection(event, sectionId) {
    if (event) {
        event.preventDefault();
    }

    console.log(`Showing section: ${sectionId}`);

    // Get the dashboard grid and all the possible sections
    const dashboardGrid = document.querySelector('.dashboard-grid');
    const activitySection = document.querySelector('.activity-section');
    const statsSection = document.getElementById('statssection');
    const nutritionSection = document.getElementById('nutritionsection');
    const appointmentsSection = document.getElementById('appointmentsection');
    const settingsSection = document.getElementById('settingsSection');

    // First hide all sections
    if (dashboardGrid) dashboardGrid.style.display = 'none';
    if (activitySection) activitySection.style.display = 'none';
    if (statsSection) statsSection.style.display = 'none';
    if (nutritionSection) nutritionSection.style.display = 'none';
    if (appointmentsSection) appointmentsSection.style.display = 'none';
    if (settingsSection) settingsSection.style.display = 'none';

    // Show the selected section
    if (sectionId === 'home') {
        // For home, show both the dashboard grid and the activity section
        if (dashboardGrid) dashboardGrid.style.display = 'grid';
        if (activitySection) activitySection.style.display = 'block';
    } else if (sectionId === 'stats') {
        if (statsSection) statsSection.style.display = 'block';
    } else if (sectionId === 'nutrition') {
        if (nutritionSection) nutritionSection.style.display = 'block';
    } else if (sectionId === 'appointments') {
        if (appointmentsSection) appointmentsSection.style.display = 'block';
    } else if (sectionId === 'settings') {
        if (settingsSection) settingsSection.style.display = 'block';
    }

    // Update active menu item
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });

    // If the event comes from a menu item, set it as active
    if (event && event.currentTarget) {
        const parentItem = event.currentTarget.closest('.sidebar-item');
        if (parentItem) {
            parentItem.classList.add('active');
        }
    } else if (sectionId) {
        // If there's no event but there is a sectionId, find the corresponding menu item
        const menuItem = document.querySelector(`.sidebar-item a[onclick*="showSection(event, '${sectionId}')"]`);
        if (menuItem) {
            const parentItem = menuItem.closest('.sidebar-item');
            if (parentItem) {
                parentItem.classList.add('active');
            }
        }
    }

    // For mobile, close sidebar after selection
    closeMobileSidebar();
}

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
    
    // Hide gender page 
    document.querySelector(".gender-body").style.display = "none";
    
    // Show dashboard
    const dashboard = document.getElementById("dashboardPage");
    dashboard.style.display = "block";
    
    // Show home section by default (explicitly call showSection)
    showSection(null, 'home');
    
    // Initialize dashboard components
    initNutritionTracker();
    
    // Initialize step tracker
    initStepTracker();
    
    // Initialize dashboard elements
    initDashboard();
    
    // Load saved water amount
    loadWaterAmount();
}

function skip() {
    // Hide gender page
    document.querySelector(".gender-body").style.display = "none";
    
    // Show dashboard
    const dashboard = document.getElementById("dashboardPage");
    dashboard.style.display = "block";
    
    // Show home section by default (explicitly call showSection instead of manually setting displays)
    showSection(null, 'home');
    
    // Initialize dashboard components
    initNutritionTracker();
    
    // Initialize step tracker
    initStepTracker();
    
    // Initialize dashboard elements
    initDashboard();
    
    // Load saved water amount
    loadWaterAmount();
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

// Terms & Conditions Modal Functionality
function showTermsModal() {
    const termsModal = document.getElementById('termsModal');
    if (termsModal) {
        termsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
}

// Initialize Terms & Conditions Modal events
document.addEventListener('DOMContentLoaded', function() {
    // Terms & Conditions Modal
    const closeTermsBtn = document.getElementById('closeTermsBtn');
    if (closeTermsBtn) {
        closeTermsBtn.addEventListener('click', function() {
            document.getElementById('termsModal').style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // About Us Modal
    const aboutUsBtn = document.getElementById('aboutUsBtn');
    const closeAboutUsBtn = document.getElementById('closeAboutUsBtn');
    
    if (aboutUsBtn) {
        aboutUsBtn.addEventListener('click', function() {
            document.getElementById('aboutUsModal').style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    }
    
    if (closeAboutUsBtn) {
        closeAboutUsBtn.addEventListener('click', function() {
            document.getElementById('aboutUsModal').style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
});

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

// Enhanced feedback form initialization
function initFeedbackForm() {
    const feedbackModal = document.getElementById("feedback-modal");
    const openBtn = document.getElementById("open-feedback-btn");
    const closeBtn = feedbackModal?.querySelector(".close-btn");
    const steps = document.querySelectorAll(".feedback-step");
    const progressFill = document.querySelector(".progress-fill");
    const progressText = document.querySelector(".progress-text");
    const emojis = document.querySelectorAll(".emoji");
    const nextStep1 = document.getElementById("next-step1");
    const nextStep2 = document.getElementById("next-step2");
    const prevStep2 = document.getElementById("prev-step2");
    const prevStep3 = document.getElementById("prev-step3");
    const submitBtn = document.getElementById("submit-feedback");
    const closeThankYou = document.querySelector(".close-thank-you");
    const warningMessage = document.getElementById("warningMessage");
    
    // Open feedback modal
    if (openBtn) {
        openBtn.addEventListener("click", () => {
            feedbackModal.style.display = "flex";
            resetForm();
        });
    }
    
    // Close feedback modal
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            feedbackModal.style.display = "none";
        });
    }
    
    // Close on thank you button
    if (closeThankYou) {
        closeThankYou.addEventListener("click", () => {
            feedbackModal.style.display = "none";
            resetForm();
        });
    }
    
    // ESC key to close modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && feedbackModal && feedbackModal.style.display === "flex") {
            feedbackModal.style.display = "none";
        }
    });
    
    // Click outside to close
    if (feedbackModal) {
        feedbackModal.addEventListener("click", (e) => {
            if (e.target === feedbackModal) {
                feedbackModal.style.display = "none";
            }
        });
    }
    
    // Emoji rating selection
    emojis.forEach(emoji => {
        emoji.addEventListener("click", () => {
            // Remove selected class from all emojis
            emojis.forEach(e => e.classList.remove("selected"));
            // Add selected class to clicked emoji
            emoji.classList.add("selected");
            
            const ratings = [
                "Very Dissatisfied", 
                "Dissatisfied", 
                "Neutral", 
                "Satisfied", 
                "Very Satisfied"
            ];
            
            const rating = parseInt(emoji.dataset.rating);
            const ratingTextElement = document.querySelector(".rating-text");
            if (ratingTextElement) {
                ratingTextElement.textContent = ratings[rating - 1];
            }
            
            // Enable next button once a rating is selected
            if (nextStep1) {
                nextStep1.disabled = false;
            }
        });
    });
    
    // Navigate to step 2
    if (nextStep1) {
        nextStep1.addEventListener("click", () => {
            document.getElementById("step1").classList.add("hidden");
            document.getElementById("step2").classList.remove("hidden");
            if (progressFill) progressFill.style.width = "66.66%";
            if (progressText) progressText.textContent = "Step 2 of 3";
        });
    }
    
    // Navigate back to step 1
    if (prevStep2) {
        prevStep2.addEventListener("click", () => {
            document.getElementById("step2").classList.add("hidden");
            document.getElementById("step1").classList.remove("hidden");
            if (progressFill) progressFill.style.width = "33.33%";
            if (progressText) progressText.textContent = "Step 1 of 3";
        });
    }
    
    // Navigate to step 3
    if (nextStep2) {
        nextStep2.addEventListener("click", () => {
            document.getElementById("step2").classList.add("hidden");
            document.getElementById("step3").classList.remove("hidden");
            if (progressFill) progressFill.style.width = "100%";
            if (progressText) progressText.textContent = "Step 3 of 3";
        });
    }
    
    // Navigate back to step 2
    if (prevStep3) {
        prevStep3.addEventListener("click", () => {
            document.getElementById("step3").classList.add("hidden");
            document.getElementById("step2").classList.remove("hidden");
            if (progressFill) progressFill.style.width = "66.66%";
            if (progressText) progressText.textContent = "Step 2 of 3";
        });
    }
    
    // Toggle contact details
    const contactToggle = document.getElementById("contact-toggle");
    const contactDetails = document.getElementById("contact-details");
    const toggleLabel = document.getElementById("toggle-label");
    
    if (contactToggle && toggleLabel && contactDetails) {
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
    
    // Submit feedback
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const feedbackText = document.getElementById("feedback-text").value.trim();
            
            if (feedbackText.length < 5) {
                if (warningMessage) {
                    warningMessage.textContent = "Please provide more detailed feedback (at least 5 characters).";
                }
                return;
            }
            
            // In a real app, you would send this data to a server
            console.log("Feedback submitted:", {
                rating: document.querySelector(".emoji.selected")?.getAttribute("data-rating"),
                categories: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value),
                feedback: feedbackText,
                contactRequested: contactToggle ? contactToggle.checked : false,
                email: contactToggle && contactToggle.checked && document.getElementById("contact-email") ? 
                       document.getElementById("contact-email").value : ""
            });
            
            // Show thank you message
            document.getElementById("step3").classList.add("hidden");
            document.getElementById("thank-you").classList.remove("hidden");
        });
    }
    
    // Function to reset form to initial state
    function resetForm() {
        // Reset to step 1
        steps.forEach(step => {
            if (step.id === "step1") {
                step.classList.remove("hidden");
            } else {
                step.classList.add("hidden");
            }
        });
        
        // Reset progress bar
        if (progressFill) progressFill.style.width = "33.33%";
        if (progressText) progressText.textContent = "Step 1 of 3";
        
        // Reset emoji selection
        emojis.forEach(e => e.classList.remove("selected"));
        const ratingTextElement = document.querySelector(".rating-text");
        if (ratingTextElement) {
            ratingTextElement.textContent = "Select your rating";
        }
        
        // Disable next button
        if (nextStep1) {
            nextStep1.disabled = true;
        }
        
        // Uncheck all categories
        document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
        
        // Clear text input
        const feedbackTextElement = document.getElementById("feedback-text");
        if (feedbackTextElement) {
            feedbackTextElement.value = "";
        }
        
        // Reset contact toggle
        if (contactToggle) {
            contactToggle.checked = false;
        }
        
        if (contactDetails) {
            contactDetails.classList.add("hidden");
        }
        
        if (toggleLabel) {
            toggleLabel.textContent = "No";
        }
        
        // Clear warning messages
        if (warningMessage) {
            warningMessage.textContent = "";
        }
    }
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
    const calorieRemainingElem = document.getElementById('calorie-remaining');
    
    if (calorieProgressElem) calorieProgressElem.textContent = dailyNutrition.calories;
    if (calorieConsumedElem) calorieConsumedElem.textContent = dailyNutrition.calories;
    if (calorieTargetElem) calorieTargetElem.textContent = targetCalories;
    
    // Calculate and update remaining calories
    const remaining = Math.max(0, targetCalories - dailyNutrition.calories);
    if (calorieRemainingElem) calorieRemainingElem.textContent = remaining;
    
    // Update progress ring
    const progressPercentage = Math.min(100, (dailyNutrition.calories / targetCalories) * 100);
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        progressCircle.style.setProperty('--progress', `${progressPercentage}%`);
    }
    
    // Update macronutrient values
    const proteinElem = document.getElementById('protein-value');
    const carbsElem = document.getElementById('carbs-value');
    const fatElem = document.getElementById('fat-value');
    
    if (proteinElem) proteinElem.textContent = dailyNutrition.protein;
    if (carbsElem) carbsElem.textContent = dailyNutrition.carbs;
    if (fatElem) fatElem.textContent = dailyNutrition.fat;
    
    // Calculate and update macronutrient percentages
    const proteinPercentElem = document.getElementById('protein-percent');
    const carbsPercentElem = document.getElementById('carbs-percent');
    const fatPercentElem = document.getElementById('fat-percent');
    
    const totalMacros = dailyNutrition.protein + dailyNutrition.carbs + dailyNutrition.fat;
    
    // Fix: Better handling of small or zero values to prevent NaN or incorrect percentages
    if (totalMacros > 0.1) { // Using a small threshold instead of exactly 0
        // Ensure percentages add up to 100% by normalizing
        let proteinPercent = Math.round((dailyNutrition.protein / totalMacros) * 100);
        let carbsPercent = Math.round((dailyNutrition.carbs / totalMacros) * 100);
        let fatPercent = Math.round((dailyNutrition.fat / totalMacros) * 100);
        
        // Fix: Adjust percentages if they don't add up to 100%
        const totalPercent = proteinPercent + carbsPercent + fatPercent;
        if (totalPercent !== 100 && totalPercent > 0) {
            // Distribute the difference proportionally
            const diff = 100 - totalPercent;
            if (proteinPercent >= carbsPercent && proteinPercent >= fatPercent) {
                proteinPercent += diff;
            } else if (carbsPercent >= proteinPercent && carbsPercent >= fatPercent) {
                carbsPercent += diff;
            } else {
                fatPercent += diff;
            }
        }
        
        if (proteinPercentElem) proteinPercentElem.textContent = `${proteinPercent}%`;
        if (carbsPercentElem) carbsPercentElem.textContent = `${carbsPercent}%`;
        if (fatPercentElem) fatPercentElem.textContent = `${fatPercent}%`;
    } else {
        if (proteinPercentElem) proteinPercentElem.textContent = '0%';
        if (carbsPercentElem) carbsPercentElem.textContent = '0%';
        if (fatPercentElem) fatPercentElem.textContent = '0%';
    }
    
    // Update daily summary metrics
    const mealsLoggedElem = document.getElementById('meals-logged');
    const avgCaloriesElem = document.getElementById('avg-calories');
    const goalProgressElem = document.getElementById('goal-progress');
    
    // Count meals logged
    const totalMealsLogged = Object.values(meals).reduce((total, mealItems) => total + mealItems.length, 0);
    if (mealsLoggedElem) mealsLoggedElem.textContent = totalMealsLogged;
    
    // Set average daily calories (could be calculated from history in a real app)
    if (avgCaloriesElem) avgCaloriesElem.textContent = `${dailyNutrition.calories} kcal`;
    
    // Calculate goal progress
    const goalProgress = Math.min(100, Math.round((dailyNutrition.calories / targetCalories) * 100));
    if (goalProgressElem) goalProgressElem.textContent = `${goalProgress}%`;
    
    // Update macronutrient chart if Chart.js is available
    updateMacroChart();
}

function updateMacroChart() {
    const chartCanvas = document.getElementById('macro-chart');
    if (chartCanvas && window.Chart) {
        // Performance optimization: Only destroy and recreate the chart when necessary
        // Calculate calorie values from macronutrients
        const proteinCals = dailyNutrition.protein * 4; // 4 calories per gram of protein
        const carbsCals = dailyNutrition.carbs * 4;    // 4 calories per gram of carbs
        const fatCals = dailyNutrition.fat * 9;        // 9 calories per gram of fat
        
        // If chart already exists, update data instead of recreating
        if (window.macroChart) {
            window.macroChart.data.datasets[0].data = [proteinCals, carbsCals, fatCals];
            window.macroChart.update('none'); // Use 'none' animation for better performance
            return;
        }
        
        // Create new chart only if it doesn't exist
        window.macroChart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Protein', 'Carbs', 'Fat'],
                datasets: [{
                    data: [proteinCals, carbsCals, fatCals],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF4D6D', '#2693E6', '#FFB922'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                animation: {
                    duration: 500 // Reduced animation duration for better performance
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                                const value = context.raw;
                                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                                return `${context.label}: ${percentage}% (${Math.round(value)} kcal)`;
                            }
                        }
                    }
                }
            }
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
    
    // Save to localStorage
    saveNutritionDataToLocalStorage();
}

function saveNutritionDataToLocalStorage() {
    localStorage.setItem('meals', JSON.stringify(meals));
    localStorage.setItem('dailyNutrition', JSON.stringify(dailyNutrition));
    localStorage.setItem('targetCalories', targetCalories.toString());
}

function toggleContributors() {
    const panel = document.getElementById('contributorsPanel');
    if (panel) {
        panel.classList.toggle('open');
    }
}

function initNutritionTracker() {
    // Load saved nutrition data
    const savedNutrition = localStorage.getItem('dailyNutrition');
    if (savedNutrition) {
        dailyNutrition = JSON.parse(savedNutrition);
    }

    const savedMeals = localStorage.getItem('meals');
    if (savedMeals) {
        meals = JSON.parse(savedMeals);
    }

    const savedTargetCalories = localStorage.getItem('targetCalories');
    if (savedTargetCalories) {
        targetCalories = parseInt(savedTargetCalories);
    }
    
    // Load saved meal plans
    loadSavedMealPlans();

    // Update displays
    updateNutritionDisplay();
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(updateMealDisplay);
    
    // Display Monday's meal plan by default
    updateMealPlanDisplay('monday');

    // Initialize food forms
    initFoodForms();

    // Initialize meal tabs
    initMealTabs();
    
    // Initialize meal plan tabs
    initMealPlanTabs();

    // Set up water reminder
    setupWaterReminder();
    
    // Initialize calorie calculator
    initCalorieCalculator();
}

function initMealPlanTabs() {
    // Handle day selection in meal planner
    const dayButtons = document.querySelectorAll('.day-btn');
    let currentActiveDay = 'monday'; // Default active day
    
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const day = btn.getAttribute('data-day');
            
            // Update active button styling
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update the displayed meal plan
            currentActiveDay = day;
            updateMealPlanDisplay(day);
        });
    });
    
    // Handle toggle between view and create mode
    const viewPlanBtn = document.getElementById('view-plan-btn');
    const createPlanBtn = document.getElementById('create-plan-btn');
    const viewPlanContent = document.getElementById('view-plan-content');
    const createPlanContent = document.getElementById('create-plan-content');
    
    if (viewPlanBtn && createPlanBtn && viewPlanContent && createPlanContent) {
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
    
    // Handle saving meal plans
    const saveMealPlanBtn = document.getElementById('save-meal-plan');
    if (saveMealPlanBtn) {
        saveMealPlanBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission/page refresh
            
            const day = document.getElementById('plan-day').value;
            const mealType = document.getElementById('plan-meal').value;
            const description = document.getElementById('meal-description').value.trim();
            
            if (!description) {
                alert('Please enter a meal description.');
                return;
            }
            
            // Save to mealPlans object
            if (!mealPlans[day]) {
                mealPlans[day] = { breakfast: '', lunch: '', dinner: '' };
            }
            
            mealPlans[day][mealType] = description;
            
            // Save to localStorage
            saveMealPlansToLocalStorage();
            
            // Show success message
            alert(`Meal plan for ${mealType} on ${day} has been saved.`);
            
            // Switch back to view mode and show the updated plan
            if (viewPlanBtn && viewPlanContent && createPlanContent) {
                viewPlanBtn.classList.add('active');
                createPlanBtn.classList.remove('active');
                viewPlanContent.classList.remove('hidden');
                createPlanContent.classList.add('hidden');
                
                // Update day buttons to reflect the day we just edited
                dayButtons.forEach(btn => {
                    if (btn.getAttribute('data-day') === day) {
                        btn.click();
                    }
                });
            }
            
            // Clear the form
            document.getElementById('meal-description').value = '';
        });
    }
}

function saveMealPlansToLocalStorage() {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
}

function loadSavedMealPlans() {
    const savedMealPlans = localStorage.getItem('mealPlans');
    if (savedMealPlans) {
        try {
            mealPlans = JSON.parse(savedMealPlans);
        } catch (e) {
            console.error('Error loading saved meal plans:', e);
        }
    }
}

function initCalorieCalculator() {
    const calculatorForm = document.getElementById('calorie-calculator');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page refresh
            
            // Get form values
            const age = parseInt(document.getElementById('calc-age').value);
            const gender = document.getElementById('calc-gender').value;
            const weight = parseFloat(document.getElementById('calc-weight').value);
            const height = parseFloat(document.getElementById('calc-height').value);
            const activityLevel = parseFloat(document.getElementById('calc-activity').value);
            const goal = document.getElementById('calc-goal').value;
            
            // Validate inputs
            if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel) || !gender || !goal) {
                alert('Please fill in all fields correctly.');
                return;
            }
            
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
            let calculatedTarget;
            if (goal === 'lose') {
                calculatedTarget = Math.round(maintenance - 500); // 500 calorie deficit
            } else if (goal === 'gain') {
                calculatedTarget = Math.round(maintenance + 500); // 500 calorie surplus
            } else {
                calculatedTarget = maintenance;
            }
            
            // Display results
            document.getElementById('bmr-result').textContent = Math.round(bmr);
            document.getElementById('maintenance-result').textContent = maintenance;
            document.getElementById('target-result').textContent = calculatedTarget;
            
            // Make the result section visible
            const resultSection = document.getElementById('calculator-result');
            if (resultSection) {
                resultSection.style.display = 'block';
                resultSection.classList.add('show');
            }
            
            // Ask if user wants to update their calorie target
            const updateTarget = confirm('Would you like to update your daily calorie target to ' + calculatedTarget + ' calories?');
            if (updateTarget) {
                targetCalories = calculatedTarget;
                document.getElementById('calorie-target').textContent = calculatedTarget;
                
                // Save to localStorage
                localStorage.setItem('targetCalories', calculatedTarget.toString());
                
                // Update nutrition display to reflect the new target
                updateNutritionDisplay();
            }
        });
    }
}

// Function to show Terms & Conditions modal
function showTermsModal(event) {
    if (event) {
        event.preventDefault();
    }
    
    const termsModal = document.getElementById('termsModal');
    if (termsModal) {
        termsModal.style.display = 'flex';
        
        // Add event listener to close button
        const closeBtn = termsModal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.onclick = function() {
                termsModal.style.display = "none";
            };
        }
        
        // Click outside to close
        window.onclick = function(event) {
            if (event.target === termsModal) {
                termsModal.style.display = "none";
            }
        };
        
        // ESC key to close
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && termsModal.style.display === "flex") {
                termsModal.style.display = "none";
            }
        });
    }
    
    // For mobile, close sidebar after selection
    closeMobileSidebar();
}

// Function to initialize step tracker
function initStepTracker() {
    // Load saved step data from localStorage
    loadStepData();

    // Update the UI with current step data
    updateStepDisplay();

    // Initialize event listeners for step tracker
    const addStepsBtn = document.getElementById('add-steps-btn');
    if (addStepsBtn) {
        addStepsBtn.addEventListener('click', addSteps);
    }

    // Populate step history
    displayStepHistory();
}

// Function to add steps
function addSteps() {
    const stepInput = document.getElementById('step-input');
    const stepCount = parseInt(stepInput.value);

    if (isNaN(stepCount) || stepCount <= 0) {
        alert('Please enter a valid number of steps');
        return;
    }

    // Add steps to daily total
    dailySteps += stepCount;

    // Create a step history entry
    const now = new Date();
    const stepEntry = {
        timestamp: now.toISOString(),
        count: stepCount,
        formattedTime: formatTime(now)
    };

    // Add to step history
    stepHistory.unshift(stepEntry); // Add to front of array
    
    // Limit history to 10 items
    if (stepHistory.length > 10) {
        stepHistory.pop(); // Remove oldest entry
    }

    // Update the UI
    updateStepDisplay();
    displayStepHistory();

    // Save to localStorage
    saveStepData();

    // Reset input field
    stepInput.value = '';

    // Show confirmation message
    showStepConfirmation(stepCount);
}

// Function to update step display
function updateStepDisplay() {
    const stepsCount = document.getElementById('steps-count');
    const todaySteps = document.getElementById('today-steps');
    const stepsGoal = document.getElementById('steps-goal');
    const stepsRemaining = document.getElementById('steps-remaining');
    const stepProgress = document.querySelector('.step-progress-circle');
    
    if (stepsCount) stepsCount.textContent = dailySteps.toLocaleString();
    if (todaySteps) todaySteps.textContent = dailySteps.toLocaleString();
    if (stepsGoal) stepsGoal.textContent = stepGoal.toLocaleString();
    
    // Calculate and update remaining steps
    const remaining = Math.max(0, stepGoal - dailySteps);
    if (stepsRemaining) stepsRemaining.textContent = remaining.toLocaleString();
    
    // Update progress circle
    if (stepProgress) {
        const progressPercentage = Math.min(100, (dailySteps / stepGoal) * 100);
        stepProgress.style.setProperty('--progress', `${progressPercentage}%`);
    }
}

// Function to display step history
function displayStepHistory() {
    const historyList = document.getElementById('step-history-list');
    
    if (!historyList) return;
    
    if (stepHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No recent step data</p>';
        return;
    }
    
    historyList.innerHTML = '';
    
    stepHistory.forEach(entry => {
        const stepEntryElement = document.createElement('div');
        stepEntryElement.className = 'step-entry';
        
        stepEntryElement.innerHTML = `
            <span class="step-date">${entry.formattedTime}</span>
            <span class="step-count">${entry.count.toLocaleString()} steps</span>
        `;
        
        historyList.appendChild(stepEntryElement);
    });
}

// Format time for display
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + 
           ' ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

// Show step confirmation message
function showStepConfirmation(count) {
    // Create a temporary message element
    const confirmationMsg = document.createElement('div');
    confirmationMsg.className = 'step-confirmation';
    confirmationMsg.textContent = `Added ${count.toLocaleString()} steps!`;
    confirmationMsg.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        transition: opacity 0.5s;
    `;
    
    // Add to DOM
    document.body.appendChild(confirmationMsg);
    
    // Remove after 3 seconds
    setTimeout(() => {
        confirmationMsg.style.opacity = '0';
        setTimeout(() => {
            if (confirmationMsg.parentNode) {
                confirmationMsg.parentNode.removeChild(confirmationMsg);
            }
        }, 500);
    }, 2500);
}

// Function to save step data to localStorage
function saveStepData() {
    localStorage.setItem('dailySteps', dailySteps.toString());
    localStorage.setItem('stepHistory', JSON.stringify(stepHistory));
    localStorage.setItem('stepGoal', stepGoal.toString());
}

// Function to load step data from localStorage
function loadStepData() {
    const savedSteps = localStorage.getItem('dailySteps');
    if (savedSteps) {
        dailySteps = parseInt(savedSteps);
    }
    
    const savedHistory = localStorage.getItem('stepHistory');
    if (savedHistory) {
        try {
            stepHistory = JSON.parse(savedHistory);
        } catch (e) {
            console.error('Error loading step history:', e);
            stepHistory = [];
        }
    }
    
    const savedGoal = localStorage.getItem('stepGoal');
    if (savedGoal) {
        stepGoal = parseInt(savedGoal);
    }
}

// Function to reset daily steps
function resetDailySteps() {
    // This would typically be called at midnight
    // For demo purposes, you could add a reset button
    dailySteps = 0;
    updateStepDisplay();
    saveStepData();
}

// Function to update user profile display
function updateUserProfileDisplay() {
    // Update display name in both profile and sidebar
    document.getElementById('user-display-name').textContent = userProfileData.displayName;
    
    // Update sidebar username
    const sidebarUserName = document.getElementById('sidebar-username');
    if (sidebarUserName) {
        sidebarUserName.textContent = userProfileData.displayName;
    }
    
    // Update other profile information
    document.getElementById('user-username').textContent = userProfileData.username;
    document.getElementById('user-gender').textContent = userProfileData.gender;
    document.getElementById('user-dob').textContent = userProfileData.dateOfBirth;
    document.getElementById('user-member-since').textContent = userProfileData.memberSince;
    document.getElementById('user-account-type').textContent = userProfileData.accountType;
    
    // Update user stats summaries from stored data
    updateUserStatsDisplay();
}

// Health tips array
const healthTips = [
    "Regular health check-ups are important for preventive care and early detection of issues.",
    "Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week.",
    "Stay hydrated by drinking at least 8 glasses of water daily.",
    "Include a variety of fruits and vegetables in your diet for essential vitamins and minerals.",
    "Prioritize quality sleep. Most adults need 7-9 hours of sleep per night.",
    "Practice mindfulness or meditation to reduce stress and improve mental wellbeing.",
    "Limit processed foods and foods high in added sugars and unhealthy fats.",
    "Take short breaks when working at a desk for long periods to reduce eye strain and muscle stiffness.",
    "Regular strength training helps maintain muscle mass and bone density as you age.",
    "Don't forget to stretch before and after exercise to prevent injuries."
];

// Function to refresh health tip
function refreshHealthTip() {
    const tipElement = document.getElementById('health-tip-text');
    if (tipElement) {
        const randomIndex = Math.floor(Math.random() * healthTips.length);
        tipElement.textContent = `"${healthTips[randomIndex]}"`;
        
        // Add animation effect
        tipElement.style.opacity = '0';
        setTimeout(() => {
            tipElement.style.opacity = '1';
        }, 300);
    }
}

// Function to add reminder
function addReminder() {
    const reminderText = document.getElementById('reminder-text').value.trim();
    const reminderTime = document.getElementById('reminder-time').value;
    
    if (!reminderText) {
        alert('Please enter a reminder text');
        return;
    }
    
    const reminderList = document.getElementById('reminder-list');
    const emptyMessage = reminderList.querySelector('.empty-reminder-message');
    
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    const reminderItem = document.createElement('div');
    reminderItem.className = 'reminder-item';
    
    // Format time display
    let timeDisplay = '';
    if (reminderTime === 'custom') {
        const now = new Date();
        timeDisplay = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        const mins = parseInt(reminderTime);
        timeDisplay = mins < 60 ? `${mins}m` : `${mins/60}h`;
    }
    
    reminderItem.innerHTML = `
        <div class="reminder-text">${reminderText}</div>
        <span class="reminder-time">${timeDisplay}</span>
        <button class="delete-reminder">&times;</button>
    `;
    
    reminderList.appendChild(reminderItem);
    
    // Add event listener to delete button
    const deleteBtn = reminderItem.querySelector('.delete-reminder');
    deleteBtn.addEventListener('click', () => {
        reminderList.removeChild(reminderItem);
        
        // Add empty message if no reminders left
        if (reminderList.children.length === 0) {
            reminderList.innerHTML = '<p class="empty-reminder-message">No active reminders</p>';
        }
    });
    
    // Clear input field
    document.getElementById('reminder-text').value = '';
}

// Function to initialize dashboard elements
function initDashboard() {
    // Initialize health tip refresh button
    const refreshTipBtn = document.getElementById('refresh-tip-btn');
    if (refreshTipBtn) {
        refreshTipBtn.addEventListener('click', refreshHealthTip);
        // Set initial random tip
        refreshHealthTip();
    }
    
    // Initialize reminder add button
    const addReminderBtn = document.getElementById('add-reminder-btn');
    if (addReminderBtn) {
        addReminderBtn.addEventListener('click', addReminder);
    }
    
    // Initialize water tracking buttons
    const waterAddBtns = document.querySelectorAll('.water-add-btn');
    waterAddBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseInt(btn.getAttribute('data-amount'));
            addWater(amount);
        });
    });
    
    // Initialize custom water button
    const customWaterBtn = document.getElementById('custom-water-btn');
    if (customWaterBtn) {
        customWaterBtn.addEventListener('click', () => {
            const amount = prompt('Enter water amount in ml:', '250');
            if (amount && !isNaN(amount) && parseInt(amount) > 0) {
                addWater(parseInt(amount));
            }
        });
    }
    
    // Initialize water goal update button
    const updateWaterGoalBtn = document.getElementById('update-water-goal');
    if (updateWaterGoalBtn) {
        updateWaterGoalBtn.addEventListener('click', updateWaterGoal);
    }
    
    // Initialize water reset button
    const resetWaterBtn = document.getElementById('reset-water-btn');
    if (resetWaterBtn) {
        resetWaterBtn.addEventListener('click', resetWaterTracker);
    }
}

// Function to add water
function addWater(amount) {
    const waterAmountElem = document.getElementById('water-amount');
    const waterTargetElem = document.getElementById('water-target');
    const waterFillElem = document.getElementById('water-fill');
    
    if (waterAmountElem && waterTargetElem && waterFillElem) {
        const currentAmount = parseInt(waterAmountElem.textContent) || 0;
        const targetAmount = parseInt(waterTargetElem.textContent) || 2000;
        const newAmount = currentAmount + amount;
        
        waterAmountElem.textContent = newAmount;
        
        // Update water fill visualization
        const fillPercentage = Math.min(100, (newAmount / targetAmount) * 100);
        waterFillElem.style.height = `${fillPercentage}%`;
        
        // Check if goal is reached
        if (newAmount >= targetAmount && currentAmount < targetAmount) {
            // Show completion popup
            showWaterCompletionPopup(targetAmount);
        }
        
        // Update the progress percentage display
        const waterProgressElem = document.getElementById('water-progress-percent');
        if (waterProgressElem) {
            waterProgressElem.textContent = `${Math.round(fillPercentage)}%`;
        }
        
        // Save to localStorage
        localStorage.setItem('waterAmount', newAmount);
    }
}

// Function to show water goal completion popup
function showWaterCompletionPopup(goalAmount) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'water-completion-popup';
    popup.innerHTML = `
        <div class="water-completion-content">
            <div class="completion-icon">💧</div>
            <h3>Congratulations!</h3>
            <p>You've reached your daily water goal of ${goalAmount}ml!</p>
            <div class="completion-buttons">
                <button class="continue-btn">Continue Tracking</button>
                <button class="restart-btn">Restart Goal</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(popup);
    
    // Animate popup
    setTimeout(() => {
        popup.classList.add('active');
    }, 100);
    
    // Add event listeners to buttons
    const continueBtn = popup.querySelector('.continue-btn');
    const restartBtn = popup.querySelector('.restart-btn');
    
    continueBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    });
    
    restartBtn.addEventListener('click', () => {
        // Reset water amount
        resetWaterTracker();
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    });
}

// Function to reset water tracker
function resetWaterTracker() {
    const waterAmountElem = document.getElementById('water-amount');
    const waterFillElem = document.getElementById('water-fill');
    const waterProgressElem = document.getElementById('water-progress-percent');
    
    if (waterAmountElem) waterAmountElem.textContent = '0';
    if (waterFillElem) waterFillElem.style.height = '0%';
    if (waterProgressElem) waterProgressElem.textContent = '0%';
    
    // Save reset state to localStorage
    localStorage.setItem('waterAmount', '0');
}

// Function to update water goal
function updateWaterGoal() {
    const goalInput = document.getElementById('water-goal-input');
    const waterTargetElem = document.getElementById('water-target');
    
    if (goalInput && waterTargetElem) {
        const newGoal = parseInt(goalInput.value);
        
        if (!isNaN(newGoal) && newGoal > 0) {
            waterTargetElem.textContent = newGoal;
            localStorage.setItem('waterTargetGoal', newGoal);
            
            // Update the progress percentage based on new goal
            const currentAmount = parseInt(document.getElementById('water-amount').textContent) || 0;
            const fillPercentage = Math.min(100, (currentAmount / newGoal) * 100);
            
            const waterFillElem = document.getElementById('water-fill');
            if (waterFillElem) {
                waterFillElem.style.height = `${fillPercentage}%`;
            }
            
            const waterProgressElem = document.getElementById('water-progress-percent');
            if (waterProgressElem) {
                waterProgressElem.textContent = `${Math.round(fillPercentage)}%`;
            }
            
            // Show confirmation toast
            showToastMessage(`Water goal updated to ${newGoal}ml`);
        } else {
            showToastMessage('Please enter a valid goal', 'error');
        }
    }
}

// Function to show toast messages
function showToastMessage(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Function to load saved water amount
function loadWaterAmount() {
    const savedAmount = localStorage.getItem('waterAmount');
    const savedGoal = localStorage.getItem('waterTargetGoal');
    const waterAmountElem = document.getElementById('water-amount');
    const waterTargetElem = document.getElementById('water-target');
    const waterFillElem = document.getElementById('water-fill');
    const waterProgressElem = document.getElementById('water-progress-percent');
    
    if (savedGoal && waterTargetElem) {
        waterTargetElem.textContent = savedGoal;
        
        // Also update the goal input field
        const goalInput = document.getElementById('water-goal-input');
        if (goalInput) {
            goalInput.placeholder = savedGoal;
        }
    }
    
    if (savedAmount && waterAmountElem && waterTargetElem && waterFillElem) {
        const amount = parseInt(savedAmount);
        const targetAmount = parseInt(waterTargetElem.textContent) || 2000;
        
        waterAmountElem.textContent = amount;
        
        // Update water fill visualization
        const fillPercentage = Math.min(100, (amount / targetAmount) * 100);
        waterFillElem.style.height = `${fillPercentage}%`;
        
        if (waterProgressElem) {
            waterProgressElem.textContent = `${Math.round(fillPercentage)}%`;
        }
    }
}

// Enhanced AI Health Assistant Chatbot
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');

    // Function to toggle chatbot visibility
    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
        
        // If opening for the first time, show welcome message
        if (chatbotContainer.classList.contains('active') && chatbotMessages.children.length === 0) {
            setTimeout(() => {
                // Add welcome message
                addBotMessage("Hello! I'm your AI Health Assistant.");
                
                // Add capabilities message
                setTimeout(() => {
                    const capabilitiesMessage = document.createElement('div');
                    capabilitiesMessage.className = 'bot-welcome';
                    
                    const bulletPoints = document.createElement('div');
                    bulletPoints.className = 'bullet-points';
                    
                    const capabilities = [
                        "Nutrition advice",
                        "Exercise recommendations",
                        "Health tips",
                        "Wellness guidance"
                    ];
                    
                    let bulletHTML = "I can help you with:";
                    capabilities.forEach(capability => {
                        bulletHTML += `
                        <div class="bullet">
                            <span class="bullet-dot">•</span>
                            <span>${capability}</span>
                        </div>`;
                    });
                    
                    capabilitiesMessage.innerHTML = bulletHTML;
                    chatbotMessages.appendChild(capabilitiesMessage);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                }, 1000);
            }, 500);
        }
    }

    // Function to send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message to chat
            addUserMessage(message);
            
            // Clear input
            chatbotInput.value = '';
            
            // Show bot is typing
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'bot-typing';
            typingIndicator.textContent = 'AI is typing';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            
            // Generate response after a short delay
            setTimeout(() => {
                chatbotMessages.removeChild(typingIndicator);
                generateResponse(message);
            }, 1500);
        }
    }

    // Function to add user message
    function addUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'message user-message';
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to add bot message
    function addBotMessage(text) {
        const message = document.createElement('div');
        message.className = 'message bot-message';
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to generate response
    function generateResponse(userMessage) {
        // Simple keyword-based responses
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            addBotMessage("Hi there! How can I help with your health and wellness today?");
        }
        else if (lowerMessage.includes('nutrition') || lowerMessage.includes('food') || lowerMessage.includes('diet')) {
            addBotMessage("A balanced diet is crucial for good health. Try to include proteins, carbohydrates, healthy fats, vitamins, and minerals in your meals. Would you like some specific nutrition advice?");
        }
        else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
            addBotMessage("Regular exercise is important for physical and mental health. Aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity per week. What type of exercises do you enjoy?");
        }
        else if (lowerMessage.includes('sleep') || lowerMessage.includes('rest')) {
            addBotMessage("Quality sleep is essential for health. Adults should aim for 7-9 hours of sleep per night. Creating a consistent sleep schedule and a relaxing bedtime routine can help improve sleep quality.");
        }
        else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
            addBotMessage("Managing stress is important for overall wellbeing. Techniques like deep breathing, meditation, physical activity, and maintaining social connections can help reduce stress levels. Would you like to learn some specific stress management techniques?");
        }
        else if (lowerMessage.includes('water') || lowerMessage.includes('hydration')) {
            addBotMessage("Staying hydrated is crucial for health. The general recommendation is to drink about 8 glasses (2 liters) of water daily, but individual needs may vary based on activity level, climate, and overall health.");
        }
        else if (lowerMessage.includes('vitamin') || lowerMessage.includes('mineral') || lowerMessage.includes('supplement')) {
            addBotMessage("Vitamins and minerals are essential nutrients your body needs. While a balanced diet should provide most nutrients, supplements might be necessary in some cases. It's best to consult with a healthcare provider before starting any supplements.");
        }
        else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
            addBotMessage("You're welcome! If you have any other questions about health or wellness, feel free to ask.");
        }
        else {
            addBotMessage("I'm here to help with nutrition advice, exercise recommendations, and general wellness guidance. Could you provide more details about what you'd like to know?");
        }
    }

    // Event listeners
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// ---------------- DOM Content Loaded ----------------
document.addEventListener("DOMContentLoaded", function () {
    // Initially hide gender and dashboard pages
    const genderBody = document.querySelector(".gender-body");
    const dashboardPage = document.getElementById("dashboardPage");
    
    if (genderBody) {
        genderBody.style.display = "none";
    }
    if (dashboardPage) {
        dashboardPage.style.display = "none";
    }

    // Set up login form handler
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username && password) {
                document.body.style.cursor = 'wait';
                
                // Update the user profile data with the entered username
                userProfileData.displayName = username;
                userProfileData.username = username;
                
                // Update the sidebar username
                const sidebarUsername = document.getElementById("sidebar-username");
                if (sidebarUsername) {
                    sidebarUsername.textContent = username;
                }
                
                // Save user profile data to localStorage for persistence
                localStorage.setItem('userProfileData', JSON.stringify(userProfileData));
                
                // Hide login page background with transition
                const loginBackground = document.getElementById("login-page-background");
                if (loginBackground) {
                    loginBackground.style.opacity = "0";
                    setTimeout(() => {
                        loginBackground.remove(); // Remove the background element completely
                    }, 500);
                }
                
                setTimeout(() => {
                    // Hide the entire login page
                    const loginPage = document.getElementById("loginPage");
                    if (loginPage) {
                        loginPage.classList.add("hidden");
                        loginPage.style.display = "none";
                    }
                    
                    // Show gender selection page
                    if (genderBody) {
                        genderBody.classList.remove("hidden");
                        genderBody.style.display = "flex";
                        genderBody.style.justifyContent = "center";
                        genderBody.style.alignItems = "center";
                        genderBody.style.height = "100vh";
                        genderBody.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    }
                    
                    // Reset cursor
                    document.body.style.cursor = 'default';
                }, 500);
            } else {
                // Show error message for empty fields
                const errorMessage = document.getElementById("login-error");
                if (errorMessage) {
                    errorMessage.textContent = "Please enter valid credentials.";
                } else {
                    // Create error message element if it doesn't exist
                    const error = document.createElement("p");
                    error.id = "login-error";
                    error.className = "login-error";
                    error.textContent = "Please enter valid credentials.";
                    error.style.color = "#e74c3c";
                    error.style.marginTop = "10px";
                    
                    // Insert error after the login button
                    const loginButton = loginForm.querySelector(".btn");
                    if (loginButton) {
                        loginButton.insertAdjacentElement('afterend', error);
                    } else {
                        loginForm.appendChild(error);
                    }
                }
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
    
    // Initialize step tracker functionality
    initStepTracker();
    
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

    // Sign out functionality
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to sign out?')) {
                document.getElementById("dashboardPage").style.display = "none";
                document.getElementById("loginPage").style.display = "block";
                document.getElementById("loginPage").classList.remove("hidden");
                document.getElementById("login-page-background").style.opacity = "1";
                
                // Clear any sensitive user data from localStorage if needed
                // localStorage.clear(); // Uncomment if you want to clear all stored data
                
                // Reset form fields
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
            }
        });
    }

    // About Us Modal functionality
    const aboutUsBtn = document.getElementById('aboutUsBtn');
    const aboutUsModal = document.getElementById('aboutUsModal');
    const aboutUsCloseBtn = aboutUsModal?.querySelector('.close-btn');

    if (aboutUsBtn && aboutUsModal) {
        aboutUsBtn.addEventListener('click', () => {
            aboutUsModal.style.display = 'flex';
        });
    }

    if (aboutUsCloseBtn) {
        aboutUsCloseBtn.addEventListener('click', () => {
            aboutUsModal.style.display = 'none';
        });
    }

    // Set up Terms & Conditions link
    const termsLink = document.getElementById('termsLink');
    if (termsLink) {
        termsLink.addEventListener('click', showTermsModal);
    }

    // Initialize chatbot
    initChatbot();

    // Initialize dashboard elements
    initDashboard();

    // Load saved water amount
    loadWaterAmount();
});
