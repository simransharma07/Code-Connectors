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

    // Hide all sections
    const sections = {
        'home': '.activity-section',
        'stats': '#statssection',
        'nutrition': '#nutritionsection',
        'appointments': '#appointmentsection',
        'settings': '#settingsSection'
    };
    
    Object.values(sections).forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = 'none';
        }
    });

    // Show the selected section
    const currentSection = sections[sectionId];
    if (currentSection) {
        const sectionElement = document.querySelector(currentSection);
        if (sectionElement) {
            sectionElement.style.display = 'block';
        }
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
    
    // Hide gender page and show dashboard
    document.querySelector(".gender-body").style.display = "none";
    document.getElementById("dashboardPage").style.display = "block";
    
    // Initialize dashboard components
    initNutritionTracker();
}

function skip() {
    // Hide gender page
    document.querySelector(".gender-body").style.display = "none";
    
    // Show dashboard
    const dashboard = document.getElementById("dashboardPage");
    dashboard.style.display = "block";
    
    // Show home section by default
    const homeSection = document.querySelector(".activity-section");
    if (homeSection) {
        homeSection.style.display = "block";
    }
    
    // Highlight home menu item
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    const homeMenuItem = document.querySelector('.sidebar-item');
    if (homeMenuItem) {
        homeMenuItem.classList.add('active');
    }
    
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
            closeBtn.addEventListener("click", () => {
                termsModal.style.display = "none";
            });
        }
        
        // Click outside to close
        termsModal.addEventListener("click", (e) => {
            if (e.target === termsModal) {
                termsModal.style.display = "none";
            }
        });
        
        // ESC key to close
        document.addEventListener("keydown", (e) => {
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

    // Chatbot functionality
    const chatbot = {
        toggle: document.querySelector('.chatbot-toggle'),
        container: document.querySelector('.chatbot-container'),
        closeBtn: document.querySelector('.chatbot-close'),
        messages: document.querySelector('.chatbot-messages'),
        input: document.querySelector('.chatbot-input input'),
        sendBtn: document.querySelector('.chatbot-send'),
        notification: document.querySelector('.chatbot-notification'),

        init() {
            if (!this.toggle || !this.container) return;

            // Show welcome message after 3 seconds
            setTimeout(() => {
                this.notification.classList.add('active');
                this.notification.textContent = '1';
            }, 3000);

            // Toggle chatbot
            this.toggle.addEventListener('click', () => {
                this.container.classList.add('active');
                this.notification.classList.remove('active');
                if (!this.messages.hasChildNodes()) {
                    this.addBotMessage("Hello! I'm your AI Health Assistant. I can help you with:");
                    this.addBotMessage("• Nutrition advice\n• Exercise recommendations\n• Health tips\n• Wellness guidance");
                }
            });

            // Close chatbot
            this.closeBtn?.addEventListener('click', () => {
                this.container.classList.remove('active');
            });

            // Send message
            const sendMessage = () => {
                const message = this.input.value.trim();
                if (message) {
                    this.addUserMessage(message);
                    this.generateResponse(message);
                    this.input.value = '';
                }
            };

            this.sendBtn?.addEventListener('click', sendMessage);
            this.input?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        },

        addUserMessage(message) {
            const div = document.createElement('div');
            div.className = 'message user-message';
            div.textContent = message;
            this.messages.appendChild(div);
            this.scrollToBottom();
        },

        addBotMessage(message) {
            const div = document.createElement('div');
            div.className = 'message bot-message';
            div.textContent = message;
            this.messages.appendChild(div);
            this.scrollToBottom();
        },

        showTyping() {
            const div = document.createElement('div');
            div.className = 'bot-typing';
            div.textContent = 'AI is typing';
            this.messages.appendChild(div);
            this.scrollToBottom();
            return div;
        },

        scrollToBottom() {
            this.messages.scrollTop = this.messages.scrollHeight;
        },

        generateResponse(userMessage) {
            const responses = {
                hello: "Hi! How can I help you with your health today?",
                nutrition: "I can provide nutrition advice and healthy eating tips. What specific information are you looking for?",
                exercise: "Regular exercise is crucial for health. I can suggest workouts based on your goals. What type of exercise interests you?",
                sleep: "Good sleep is essential! The recommended sleep duration is 7-9 hours per night. Would you like some tips for better sleep?",
                stress: "I can suggest stress management techniques like meditation, deep breathing, or mindfulness exercises. Would you like to learn more?",
                water: "Staying hydrated is important! You should aim to drink 8 glasses of water daily. Would you like me to set up water intake reminders?",
                diet: "A balanced diet is key to good health. I can help you plan healthy meals. Are you interested in specific dietary advice?",
                workout: "I can recommend workouts based on your fitness level and goals. What type of workout are you looking for?",
                meditation: "Meditation can help reduce stress and improve mental clarity. Would you like to learn some meditation techniques?",
                vitamins: "Vitamins and minerals are essential for health. The best sources are varied, whole foods. Would you like specific nutrition recommendations?",
                default: "I can help you with nutrition, exercise, sleep, and general health advice. What would you like to know more about?"
            };

            const typing = this.showTyping();
            
            setTimeout(() => {
                typing.remove();
                const message = userMessage.toLowerCase();
                let response = responses.default;

                for (let key in responses) {
                    if (message.includes(key)) {
                        response = responses[key];
                        break;
                    }
                }

                this.addBotMessage(response);
            }, 1500);
        }
    };

    // Initialize chatbot
    chatbot.init();
});
