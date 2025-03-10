// Get elements
const stepCountElement = document.getElementById('step-count');
const waterIntakeElement = document.getElementById('water-intake');
const medicineNameInput = document.getElementById('medicine-name');
const medicineTimeInput = document.getElementById('medicine-time');
const setMedicineBtn = document.getElementById('set-medicine-btn');
const appointmentDateInput = document.getElementById('appointment-date');
const appointmentTimeInput = document.getElementById('appointment-time');
const setAppointmentBtn = document.getElementById('set-appointment-btn');

// Initialize variables
let stepCount = 0;
let waterIntake = 0;
let medicineReminders = [];
let appointmentReminders = [];

// Add event listeners
setMedicineBtn.addEventListener('click', setMedicineReminder);
setAppointmentBtn.addEventListener('click', setAppointmentReminder);

// Functions
function setMedicineReminder() {
    const medicineName = medicineNameInput.value;
const medicineTime = medicineTimeInput.value;
medicineReminders.push({ name: medicineName, time: medicineTime });
console.log(medicineReminders);
medicineNameInput.value = '';
medicineTimeInput.value = '';
}

function setAppointmentReminder() {
    const appointmentDate = appointmentDateInput.value;
    const appointmentTime = appointmentTimeInput.value;
    appointmentReminders.push({ date: appointmentDate, time: appointmentTime });
    console.log(appointmentReminders);
    appointmentDateInput.value = '';
    appointmentTimeInput.value = '';
}

// Update step count and water intake display
function updateDisplay() {
    stepCountElement.textContent = stepCount;
    waterIntakeElement.textContent = waterIntake + ' mL';
}

// Simulate step count and water intake increase
setInterval(() => {
    stepCount++;
    waterIntake += 100;
    updateDisplay();
}, 1000);
