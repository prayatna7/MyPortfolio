
let trollClicks = 0;
let currentLang = 'en';

// Language Toggle
document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ne' : 'en';
    updateLanguageVisibility();
});

function updateLanguageVisibility() {
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = currentLang === 'en' ? 'block' : 'none');
    document.querySelectorAll('.lang-ne').forEach(el => el.style.display = currentLang === 'ne' ? 'block' : 'none');
}

// Teleporting Function (Desktop & Mobile)
function teleport(e, btn) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    trollClicks++;

    const padding = 20;
    const maxX = window.innerWidth - btn.offsetWidth - padding;
    const maxY = window.innerHeight - btn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    btn.style.position = 'fixed';
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
    btn.style.zIndex = "9999";

    if (trollClicks >= 10) {
        const heart = document.getElementById('heart-pop');
        heart.style.display = 'block';
        setTimeout(() => { heart.style.display = 'none'; }, 1000);
        trollClicks = 0; // Reset for more hearts later
    }
}

function deshbhakt() {
    const area = document.getElementById('interaction-area');
    area.innerHTML = `<div class="message-box">
            <h2 class="lang-en">Thank You for your vote!<br>You Are A DESHBHAKT!</h2>
            <h2 class="lang-ne">धन्यवाद🙏<br>अब हजुर पनि देशभक्त!🙂</h2>
            <button onclick="location.reload()" style="margin-top:20px; padding:10px; cursor:pointer;">Back to Home</button>
        </div> `;
    updateLanguageVisibility();
}

function showSubMenu(type) {
    const area = document.getElementById('interaction-area');
    let content = '';

    if (type === 'monarchy') {
        content = `
            <div class="sub-menu-wrapper">
                <h3 class="lang-en">Who will be the king?</h3>
                <div class="sub-menu-grid">
                    <div class="card" onclick="deshbhakt()">
                        <img src="Balen.jfif" alt="Balen">
                        <p>Balen Shah</p>
                    </div>
                    <div class="card unclickable" 
                         onmouseover="teleport(event, this)" 
                         ontouchstart="teleport(event, this)" 
                         onclick="teleport(event, this)">
                        <img src="Gyanendra.jpg" alt="Gyanendra">
                        <p>Gyanendra Shah</p>
                </div></div>
            </div>`;
    } else if (type === 'oli') {
        content = `<div class="sub-menu-wrapper"><h3>Who will win in Jhapa-5?</h3>
            <div class="sub-menu-grid">
                <div class="card" onclick="deshbhakt()"><img src="Balen.jfif"><p>Balen</p></div>
                <div class="card unclickable" onmouseover="teleport(event, this)" ontouchstart="teleport(event, this)"><img src="KP.jpg"><p>KP Oli</p></div>
            </div><button onclick="location.reload()">Go Back</button></div>`;
    } else if (type === 'gagan') {
        content = `<div class="sub-menu-wrapper"><h3>Who will be the next PM?</h3>
            <div class="sub-menu-grid">
            <div class="card" onclick="deshbhakt()"><img src="Balen.jfif"><p>Balendra Shah</p></div>
            <div class="card unclickable" onmouseover="teleport(event, this)" ontouchstart="teleport(event, this)"><img src="Gagan.jpg"><p>Gagan Thapa</p></div>
            </div><button onclick="location.reload()">Go Back</button></div>`;
    }

    area.innerHTML = content + `<button onclick="location.reload()" style="margin-top:30px; background:none; color:white; border:1px solid #fff; padding:8px 15px; cursor:pointer; border-radius:5px;">← Back</button>`;
    updateLanguageVisibility();
}
function generateSubMenu(enQ, neQ, trollName, balenName) {
    return `
        <div class="sub-menu-wrapper">
            <h3 class="lang-en">${enQ}</h3>
            <h3 class="lang-ne">${neQ}</h3>
            <div class="sub-menu-grid">
                <div class="card unclickable" 
                     onmouseover="teleport(event, this)" 
                     ontouchstart="teleport(event, this)" 
                     onclick="teleport(event, this)">
                    <p>${trollName}</p>
                </div>
                <div class="card" onclick="deshbhakt()">
                    <p>${balenName}</p>
                </div>
            </div>
        </div>`;
}