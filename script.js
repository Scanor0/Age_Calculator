const dayIn = document.getElementById('day');
const monthIn = document.getElementById('month');
const yearIn = document.getElementById('year');
const submitBtn = document.getElementById('submit-btn');

const outYears = document.getElementById('out-years');
const outMonths = document.getElementById('out-months');
const outDays = document.getElementById('out-days');

function calculateAge() {
    const day = parseInt(dayIn.value);
    const month = parseInt(monthIn.value) - 1;
    const year = parseInt(yearIn.value);

    const birthday = new Date(year, month, day);
    const today = new Date();

    if (!validateInputs(day, month, year, birthday, today)) return;

    let diffYears = today.getFullYear() - birthday.getFullYear();
    let diffMonths = today.getMonth() - birthday.getMonth();
    let diffDays = today.getDate() - birthday.getDate();

    if (diffDays < 0) {
        diffMonths--;
        const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        diffDays += prevMonthDays;
    }

    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    animateResult(outYears, diffYears);
    animateResult(outMonths, diffMonths);
    animateResult(outDays, diffDays);
}
function validateInputs(d, m, y, bDay, today) {
    let isValid = true;

    document.querySelectorAll('.input-group').forEach(ig => ig.classList.remove('error'));
    document.querySelectorAll('.error-msg').forEach(msg => msg.innerText = "");

    if (isNaN(d) || d < 1 || d > 31 || bDay.getDate() !== d) {
        setError(dayIn, "Jour invalide");
        isValid = false;
    }

    if (isNaN(m) || m < 0 || m > 11) {
        setError(monthIn, "Mois invalide");
        isValid = false;
    }

    if (isNaN(y) || y > today.getFullYear()) {
        setError(yearIn, "Doit être dans le passé");
        isValid = false;
    }

    if (bDay > today) {
        setError(yearIn, "Date future invalide");
        isValid = false;
    }

    return isValid;
}
function setError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('error');
    parent.querySelector('.error-msg').innerText = message;
}
function animateResult(element, finalValue) {
    if (finalValue === 0) {
        element.innerText = 0;
        return;
    }

    let current = 0;
    const step = finalValue > 50 ? 2 : 1;

    const timer = setInterval(() => {
        if (current >= finalValue) {
            element.innerText = finalValue;
            clearInterval(timer);
        } else {
            current += step;
            element.innerText = current;
        }
    }, 30);
}
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateAge();
});