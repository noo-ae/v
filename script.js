// 1. Set the date you started dating (Year, Month (0-11), Day)
// Note: Month is 0-indexed (0 = Jan, 1 = Feb, etc.)
const startDate = new Date(2025, 3, 28);

// 2. PIN Protection System
function checkPin() {
    const pinInput = document.getElementById('pin-input');
    const inputVal = pinInput.value;
    const errorMsg = document.getElementById('error-msg');

    // Check if 4 digits are entered
    if (inputVal.length === 4) {
        if (inputVal === "2803") {
            // Correct Password
            errorMsg.innerText = "";
            unlockWebsite();
            // Optional: Start music here
        } else {
            // Wrong Password
            errorMsg.innerText = "รหัสผิดง่ะ ลองใหม่นะ ❤️";
            pinInput.value = "";
            // Shake animation
            const container = document.querySelector('.login-container');
            container.style.animation = "shake 0.5s ease";
            setTimeout(() => {
                container.style.animation = "";
            }, 500);
        }
    }
}

function unlockWebsite() {
    const overlay = document.getElementById('login-overlay');

    // Add fade out effect
    overlay.style.opacity = '0';

    setTimeout(() => {
        overlay.classList.add('hidden');
        document.body.classList.remove('locked');
    }, 1000); // Wait for fade out
}

// 3. Timer Logic
function updateTimer() {
    const now = new Date();
    // Use Math.abs to handle if startDate is in future (though normally it should be past)
    // But since year 2025 is in future relative to now (if incorrect), let's assume it works for future dates too or user meant 2024
    // Allowing flexible calculation
    const diff = Math.abs(now - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateTimer, 1000);
updateTimer(); // Run once immediately

// 4. Envelope Interaction
function openEnvelope() {
    const envelope = document.querySelector('.envelope-wrapper');
    const headerTitle = document.querySelector('#love-letter h2');

    envelope.classList.toggle('open');

    if (envelope.classList.contains('open')) {
        headerTitle.classList.add('hidden');
    } else {
        headerTitle.classList.remove('hidden');
    }
}

// 5. Scroll Reveal Animation for Timeline
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    observer.observe(item);
});

// 6. Floating Hearts Animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";

    heart.style.position = 'fixed';
    heart.style.bottom = '-50px';
    heart.style.zIndex = '0';
    heart.style.opacity = '0.5';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp linear forwards';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';

    document.querySelector('.floating-hearts').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Add styles dynamically for animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

setInterval(createHeart, 500);

// Auto-focus on PIN input when page loads
window.onload = function () {
    const pinInput = document.getElementById('pin-input');
    if (pinInput) {
        pinInput.focus();
    }
};
