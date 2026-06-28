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
    document.getElementById('interaction-area').innerHTML = `
        <div class="message-box">
            <h2>धन्यवाद🙏<br>अब हजुर पनि देशभक्त!🙂</h2>
            <button onclick="location.reload()">फर्किनुहोस्</button>
        </div>`;
}

function showSubMenu(type) {
    const area = document.getElementById('interaction-area');
    if (type === 'monarchy') {
        area.innerHTML = `<div class="sub-menu-wrapper"><h3>राजा को बन्ने?</h3>
            <div class="sub-menu-grid">
                <div class="card" onclick="deshbhakt()"><img src="Balen.jfif"><p>बालेन शाह</p></div>
                <div class="card unclickable" onmouseover="teleport(event, this)" ontouchstart="teleport(event, this)">
                    <img src="Gyanendra.jpg"><p>ज्ञानेन्द्र शाह</p>
                </div></div>
            </div><button onclick="location.reload()">पछाडि जानुहोस्</button></div>`;
    } else if (type === 'oli') {
        area.innerHTML = `<div class="sub-menu-wrapper"><h3>झापा-५ मा कस्ले जित्ला?</h3>
            <div class="sub-menu-grid">
                <div class="card" onclick="deshbhakt()"><img src="Balen.jfif"><p>बालेन</p></div>
                <div class="card unclickable" onmouseover="teleport(event, this)" ontouchstart="teleport(event, this)"><img src="KP.jpg"><p>केपी ओली</p></div>
            </div><button onclick="location.reload()">पछाडि जानुहोस्</button></div>`;
    } else if (type === 'gagan') {
        area.innerHTML = `<div class="sub-menu-wrapper"><h3>अब को बन्छ प्रधानमन्त्री?</h3>
            <div class="sub-menu-grid">
            <div class="card" onclick="deshbhakt()"><img src="Balen.jfif"><p>बालेन</p></div>
            <div class="card unclickable" onmouseover="teleport(event, this)" ontouchstart="teleport(event, this)"><img src="Gagan.jpg"><p>गगन</p></div>
            </div><button onclick="location.reload()">पछाडि जानुहोस्</button></div>`;
    }
}