// 1. Set the date you started dating (Year, Month (0-11), Day)
// Note: Month is 0-indexed (0 = Jan, 1 = Feb, etc.)
const startDate = new Date(2025, 3, 28);

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

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

// 2. Envelope Interaction
function openEnvelope() {
    const envelope = document.querySelector('.envelope-wrapper');
    envelope.classList.toggle('open');
}

// 3. Scroll Reveal Animation for Timeline
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

// 4. Broken Heart / Flying Heart Animation (Optional Simple Effect)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";

    // Add CSS for this dynamically or in style.css
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

// Add simple floating animation style
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
`;
document.head.appendChild(style);

setInterval(createHeart, 500);
