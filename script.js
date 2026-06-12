// Toggle Sidebar
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}

// Dark Mode Logic
function toggleDarkMode() {
    const body = document.body;
    const isDark = document.getElementById("dark-mode-toggle").checked;
    
    if (isDark) {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    }
}

// Check for saved theme preference
window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        document.getElementById("dark-mode-toggle").checked = true;
    }
};

// Settings Modal
function openSettings() {
    document.getElementById("settings-modal").style.display = "block";
    toggleMenu(); // Close sidebar when opening settings
}

function closeSettings() {
    document.getElementById("settings-modal").style.display = "none";
}

// Fan Join Button
function joinFan() {
    const msg = document.getElementById("join-msg");
    const btn = document.getElementById("join-btn");
    btn.style.display = "none";
    msg.innerHTML = "You Are Now A Fan! 🙂";
    msg.style.color = "var(--accent-color)";
    msg.style.fontWeight = "bold";
}