// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Apply inline styles to fix CSS issues
    applyInlineStyles();

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
            } else {
                alert("Please enter valid credentials.");
            }
        });
    }

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
    }

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
    
    // Save water reminder settings without page refresh
    const waterReminderBtn = document.getElementById("set-water-reminder");
    if (waterReminderBtn) {
        waterReminderBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const waterTarget = document.getElementById("water-target").value;
            const waterInterval = document.getElementById("water-interval").value;
            console.log("Water reminder set:", { target: waterTarget, interval: waterInterval });
            alert("Water reminder settings saved successfully!");
        });
    }

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
});
