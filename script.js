// WELCOME TRIGGER //
const welcomeBtn = document.getElementById('welcome-trigger');
const loginBox = document.getElementById('login-box');
const signupBox = document.getElementById('signup-box');

if (welcomeBtn) {
    welcomeBtn.addEventListener('click', function() {
        welcomeBtn.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });
}

// DISABLED BUTTON LOGIN //
const usenameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('btn-login');

function checkInputs() {
    if (usenameInput && passwordInput && loginBtn) {
        if (usenameInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            loginBtn.removeAttribute('disabled');
        } else {
            loginBtn.setAttribute('disabled', 'true');
        }
    }
}

if (usenameInput && passwordInput) {
    usenameInput.addEventListener('input', checkInputs);
    passwordInput.addEventListener('input', checkInputs);
    checkInputs();
}

// MENU NAVIGATION //
const authLink = document.getElementById('auth-link');
const authOptionsBox = document.getElementById('options-box');
const btnBackToLogin = document.getElementById('btn-back-to-login');
const btnGoToSignup = document.getElementById('btn-goto-signup');
const btnGoToForgot = document.getElementById('btn-goto-forgot');
const btnBackFromSignup = document.getElementById('btn-back-from-signup');

if (authLink) {
    authLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginBox.classList.add('hidden');
        authOptionsBox.classList.remove('hidden');
    });
}

if (btnBackToLogin) {
    btnBackToLogin.addEventListener('click', function() {
        authOptionsBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });
}

if (btnGoToSignup) {
    btnGoToSignup.addEventListener('click', function() {
        authOptionsBox.classList.add('hidden');
        signupBox.classList.remove('hidden');
    });
}

if (btnGoToForgot) {
    btnGoToForgot.addEventListener('click', function() {
        console.log("Forgot password clicked");
    });
}

if (btnBackFromSignup) {
    btnBackFromSignup.addEventListener('click', function() {
        signupBox.classList.add('hidden');
        authOptionsBox.classList.remove('hidden');
    });
}

window.addEventListener('pageshow', function() {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.reset();
    }

    const monthSelect = document.getElementById('su-month');
    if (monthSelect) {
        monthSelect.value = "";
    }
});

// MAX DAY & YEAR //
const dayInput = document.getElementById('su-day');
const yearInput = document.getElementById('su-year');
const monthSelect = document.getElementById('su-month');

function getMaxDays(month, year) {
    if (!month) return 31;

    month = parseInt(month);
    year = parseInt(year) || 2026;

    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        return isLeap ? 29 : 28;
    }

    if ([4, 6, 9, 11].includes(month)) return 30;

    return 31;
}

function updateDayMax() {
    if (!dayInput || !monthSelect || !yearInput) return;
    const maxDay = getMaxDays(monthSelect.value, yearInput.value);
    let currentDay = parseInt(dayInput.value);

    if (currentDay > maxDay) {
        dayInput.value = maxDay;
    }
}

if (yearInput) {
    yearInput.addEventListener('input', function() {
        let value = this.value.replace(/[^0-9]/g, '');

        if (value.length === 4 && parseInt(value) > 2026) {
            value = value.slice(0, 3);
        }

        this.value = value;
        updateDayMax();
    });
}

if (dayInput) {
    dayInput.addEventListener('input', function() {
        let value = this.value.replace(/[^0-9]/g, '');
        const maxDay = getMaxDays(monthSelect ? monthSelect.value : '', yearInput ? yearInput.value : '');

        if (value !== '' && parseInt(value) > maxDay) {
            value = value.slice(0, -1);
        }

        if (value.length > 2) {
            value = value.slice(0, 2);
        }

        this.value = value;
    });
}

if (monthSelect) {
    monthSelect.addEventListener('change', function() {
        updateDayMax();
    });
}

// SHOW / HIDE PASSWORD //
function setupPasswordToggle(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleId);

    if (!passwordInput || !toggleBtn) return;

    passwordInput.addEventListener('focus', function() {
        toggleBtn.classList.remove('hidden');
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            toggleBtn.classList.add('hidden');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            toggleBtn.classList.remove('hidden');
        }
    });

    toggleBtn.addEventListener('click', function() {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    });
}

setupPasswordToggle('password', 'toggle-password');
setupPasswordToggle('su-password', 'su-toggle-password');

// DISABLED BUTTON SIGN UP //
const suUsername = document.getElementById('su-username');
const suEmail = document.getElementById('su-email');
const suMonth = document.getElementById('su-month');
const suDay = document.getElementById('su-day');
const suYear = document.getElementById('su-year');
const suPassword = document.getElementById('su-password');
const registerBtn = document.getElementById('btn-register');

function checkSignupInputs() {
    if (!suUsername || !suEmail || !suMonth || !suDay || !suYear || !suPassword || !registerBtn) return;

    const isFilled = suUsername.value.trim() !== "" &&
                     suEmail.value.trim() !== "" &&
                     suMonth.value !== "" &&
                     suDay.value.trim() !== "" &&
                     suYear.value.trim() !== "" &&
                     suPassword.value.trim() !== "";

    if (isFilled) {
        registerBtn.removeAttribute('disabled');
    } else {
        registerBtn.setAttribute('disabled', 'true');
    }
}

if (suUsername && suEmail && suMonth && suDay && suYear && suPassword) {
    [suUsername, suEmail, suDay, suYear, suPassword].forEach(input => {
        input.addEventListener('input', checkSignupInputs);
    });
    suMonth.addEventListener('change', checkSignupInputs);
    checkSignupInputs();
}

// REGISTER SUBMIT TO BACKEND //
const signupForm = document.getElementById('signup-form');

if (signupForm) {
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('su-username').value;
        const email = document.getElementById('su-email').value.trim();
        const birthMonth = document.getElementById('su-month').value;
        const birthDay = document.getElementById('su-day').value;
        const birthYear = document.getElementById('su-year').value;
        const password = document.getElementById('su-password').value;
        const emailError = document.getElementById('email-error');

        // 1. Reset pesan error kustom
        if (emailError) {
            emailError.textContent = '';
            emailError.classList.remove('show');
        }

        // 2. Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (emailError) {
                emailError.textContent = 'Format email tidak valid (contoh: nama@gmail.com)';
                emailError.classList.add('show');
            }
            return; // Hentikan kirim data jika format salah
        }

        // 3. Kirim data ke backend jika email sudah benar
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, birthMonth, birthDay, birthYear, password })
            });

            const data = await response.json();

            if (data.success) {
                signupForm.reset();
                if (monthSelect) monthSelect.value = "";
            }
        } catch (error) {
            console.error('Error server:', error);
        }
    });
}