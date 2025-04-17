// script.js
const announcementList = document.getElementById("announcementList");
const addBtn = document.getElementById("addAnnouncementBtn");
const newAnnouncementInput = document.getElementById("newAnnouncementInput");
const closeBtn = document.getElementById("closeAnnouncements");
const container = document.getElementById("announcementContainer");

// Sample starter announcements
const announcements = [
    "🎉 Public holiday on Monday! Time to flex small 😎",
    "🕒 System maintenance at 11pm tonight. No panic, abeg.",
    "🚨 Please submit your reports before Friday noon!"
];

function renderAnnouncements() {
    announcementList.innerHTML = "";
    if (announcements.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No new announcements. Enjoy your day! 🎈";
        li.style.fontStyle = "italic";
        announcementList.appendChild(li);
        return;
    }

    announcements.forEach((announcement, index) => {
        const li = document.createElement("li");
        li.textContent = announcement;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✖️";
        removeBtn.style.marginLeft = "10px";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.border = "none";
        removeBtn.style.background = "transparent";
        removeBtn.onclick = () => {
            announcements.splice(index, 1);
            renderAnnouncements();
        };

        li.appendChild(removeBtn);
        announcementList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const value = newAnnouncementInput.value.trim();
    if (value === "") {
        alert("Oga, type something first!");
        return;
    }
    announcements.unshift(value);
    newAnnouncementInput.value = "";
    renderAnnouncements();
});

closeBtn.addEventListener("click", () => {
    container.style.display = "none";
});

window.addEventListener("load", renderAnnouncements);
