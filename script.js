// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Apply inline styles to fix CSS issues
    applyInlineStyles();

    // Handle login form submission
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (username && password) {
                document.getElementById("loginPage").classList.add("hidden");
                document.getElementById("loginPage").style.display = "none"; // Add inline style
                const genderBody = document.querySelector(".gender-body");
                genderBody.classList.remove("hidden");
                genderBody.style.display = "flex"; // Add inline style
                genderBody.style.justifyContent = "center";
                genderBody.style.alignItems = "center";
                genderBody.style.height = "100vh";
                genderBody.style.backgroundColor = "rgba(255, 255, 255, 1)";
            } else {
                alert("Please enter valid credentials.");
            }
        });
    }

    // Gender selection handling
    let selectedGender = "";

    window.selectGender = function (gender) {
        selectedGender = gender;

        document.querySelectorAll(".gender").forEach(el => {
            el.classList.remove("selected");
            el.style.borderColor = "#888"; // Reset all borders
        });

        const selected = document.querySelector(`.gender[data-gender="${gender}"]`);
        if (selected) {
            selected.classList.add("selected");
            selected.style.borderColor = "#00f0ff"; // Highlight selected gender
            selected.style.backgroundColor = "#2a2a2a"; // Add background color
        }
    };

    // Handle gender + birthday submission
    window.submitForm = function () {
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
        document.querySelector(".gender-body").style.display = "none"; // Add inline style

        const dashboardPage = document.getElementById("dashboardPage");
        dashboardPage.style.display = "flex"; // Use flex instead of block for better layout
        dashboardPage.style.height = "100vh";
        dashboardPage.style.width = "100%";

        // Initialize sidebar after dashboard is shown
        initializeSidebar();
    };

    // Option to skip gender selection
    window.skip = function () {
        document.querySelector(".gender-body").classList.add("hidden");
        document.querySelector(".gender-body").style.display = "none"; // Add inline style

        const dashboardPage = document.getElementById("dashboardPage");
        dashboardPage.style.display = "flex"; // Use flex instead of block for better layout
        dashboardPage.style.height = "100vh";
        dashboardPage.style.width = "100%";

        // Initialize sidebar after dashboard is shown
        initializeSidebar();
    };

    // Section navigation
    window.showSection = function (event, sectionName) {
        if (event) event.preventDefault();

        // Hide all sections first
        document.querySelectorAll(".dashboard-content section").forEach(section => {
            section.style.display = "none";
        });

        // Show selected section
        switch (sectionName) {
            case 'home':
                document.querySelector(".activity-section").style.display = "block";
                break;
            case 'stats':
                document.getElementById("statssection").style.display = "block";
                break;
            case 'nutrition':
                document.querySelector(".nutrition-section").style.display = "block";
                break;
            case 'appointments':
                document.getElementById("appointmentsection").style.display = "block";
                break;
            case 'settings':
                document.getElementById("settingsSection").style.display = "block";
                break;
        }

        // Update active state in sidebar
        document.querySelectorAll(".sidebar-item").forEach(item => {
            item.classList.remove("active");
            item.querySelector("a").style.backgroundColor = "transparent";
            item.querySelector("a").style.color = "white";
        });

        if (event && event.currentTarget) {
            const menuItem = event.currentTarget.closest(".sidebar-item");
            if (menuItem) {
                menuItem.classList.add("active");
                menuItem.querySelector("a").style.backgroundColor = "white";
                menuItem.querySelector("a").style.color = "#FF5722";
            }
        }
    };

    // Sidebar toggle
    window.toggleSidebar = function () {
        const sidebar = document.querySelector(".mobile-sidebar");
        if (sidebar.style.left === "0px" || sidebar.classList.contains("active")) {
            sidebar.style.left = "-280px";
            sidebar.classList.remove("active");
        } else {
            sidebar.style.left = "0px";
            sidebar.classList.add("active");
        }
    };

    // Initialize sidebar on load
    function initializeSidebar() {
        const sidebar = document.querySelector(".mobile-sidebar");
        sidebar.style.position = "fixed";
        sidebar.style.top = "0";
        sidebar.style.left = "-280px";
        sidebar.style.width = "280px";
        sidebar.style.height = "100%";
        sidebar.style.background = "linear-gradient(135deg, #FF8C42, #FF5722)";
        sidebar.style.color = "white";
        sidebar.style.transition = "left 0.3s ease-in-out";
        sidebar.style.zIndex = "1000";
        sidebar.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)";
        sidebar.style.display = "flex";
        sidebar.style.flexDirection = "column";
        sidebar.style.overflowY = "auto";

        // Style sidebar toggle button
        const toggleBtn = document.querySelector(".sidebar-toggle");
        toggleBtn.style.position = "fixed";
        toggleBtn.style.top = "15px";
        toggleBtn.style.left = "15px";
        toggleBtn.style.backgroundColor = "#FF5722";
        toggleBtn.style.color = "white";
        toggleBtn.style.width = "45px";
        toggleBtn.style.height = "45px";
        toggleBtn.style.border = "none";
        toggleBtn.style.borderRadius = "8px";
        toggleBtn.style.display = "flex";
        toggleBtn.style.alignItems = "center";
        toggleBtn.style.justifyContent = "center";
        toggleBtn.style.fontSize = "20px";
        toggleBtn.style.cursor = "pointer";
        toggleBtn.style.zIndex = "1100";
        toggleBtn.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
    }

    // Contributors panel toggle
    window.toggleContributors = function () {
        const panel = document.getElementById("contributorsPanel");
        if (panel.style.right === "0px" || panel.classList.contains("open")) {
            panel.style.right = "-400px";
            panel.classList.remove("open");
        } else {
            panel.style.right = "0px";
            panel.classList.add("open");

            // Style the panel if CSS is not working
            panel.style.position = "fixed";
            panel.style.top = "100px";
            panel.style.width = "300px";
            panel.style.maxWidth = "250px";
            panel.style.background = "white";
            panel.style.border = "2px solid #007bff";
            panel.style.padding = "20px";
            panel.style.borderRadius = "10px";
            panel.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            panel.style.zIndex = "999";
            panel.style.fontSize = "14px";
        }
    };

    // Add contributor function
    window.addContributor = function () {
        const name = prompt("Enter contributor's name:");
        if (name) {
            const email = prompt("Enter contributor's email (optional):");
            const list = document.getElementById("contributorList");
            const item = document.createElement("li");
            item.textContent = name + (email ? ` (${email})` : "");

            // Add remove button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.marginLeft = "10px";
            removeBtn.style.fontSize = "12px";
            removeBtn.style.padding = "3px 8px";
            removeBtn.style.backgroundColor = "#ff5252";
            removeBtn.style.color = "white";
            removeBtn.style.border = "none";
            removeBtn.style.borderRadius = "4px";
            removeBtn.style.cursor = "pointer";

            removeBtn.onclick = function () {
                list.removeChild(item);
            };

            item.appendChild(removeBtn);
            list.appendChild(item);
        }
    };

    // Update statistics
    window.updateStats = function () {
        const training = document.getElementById("trainingInput").value;
        const steps = document.getElementById("stepsInput").value;
        const calories = document.getElementById("caloriesInput").value;

        if (training) document.getElementById("trainingDisplay").textContent = training + " hours/week";
        if (steps) document.getElementById("stepsDisplay").textContent = steps + " km/week";
        if (calories) document.getElementById("caloriesDisplay").textContent = calories + " kcal/week";

        alert("Statistics updated successfully!");
    };

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
});
