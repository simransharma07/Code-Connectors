// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Handle login form submission
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
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
    }

    // Gender selection handling
    let selectedGender = "";

    window.selectGender = function (gender) {
        selectedGender = gender;

        document.querySelectorAll(".gender").forEach(el => el.classList.remove("selected"));
        const selected = document.querySelector(`.gender[data-gender="${gender}"]`);
        if (selected) {
            selected.classList.add("selected");
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
        document.getElementById("dashboardPage").style.display = "block";
    };

    // Option to skip gender selection
    window.skip = function () {
        document.querySelector(".gender-body").classList.add("hidden");
        document.getElementById("dashboardPage").style.display = "block";
    };
});
