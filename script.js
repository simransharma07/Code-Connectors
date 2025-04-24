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

// ---------------- Section Navigation with Active State ----------------
function showSection(event, sectionId) {
    event.preventDefault();

    // Hide all sections
    document.querySelectorAll(
        ".stats-section, .appointment-section, .settings-section, .activity-section, .nutrition-section"
    ).forEach(section => {
        section.style.display = "none";
    });

    // Remove active class from all sidebar items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });

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
        { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 }
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
                            
                            if (matches.length && matches.length <= 5) {
                                // In a real app, show autocomplete dropdown here
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
        const message = food ? 
            `Added ${amount}g of ${foodName} (${Math.round(food.calories * amount / 100)} calories)` : 
            `Added ${amount}g of ${foodName} (estimated ${Math.round(amount * 1.5)} calories)`;
        
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
