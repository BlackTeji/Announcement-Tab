// Replace this with your actual deployed Google Apps Script URL
const sheetURL = 'https://script.google.com/macros/s/AKfycbyLltyKvcusA05NoFzArb3kF3Dr2JWSn7n2QpbJnoDWG2cUHs00eL5MyJLTkDH9n10ung/exec';

window.onload = async function loadAnnouncements() {
    console.log("Script loaded. Fetching announcements...");

    try {
        const response = await fetch(sheetURL);
        const data = await response.json();
        console.log("Fetched data:", data);

        const list = document.getElementById('announcementList');
        list.innerHTML = ''; // Clear existing list

        if (data.length === 0) {
            list.innerHTML = '<li>No announcements available.</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.announcement;
                list.appendChild(li);
            });
        }

    } catch (error) {
        console.error("Error fetching announcements:", error);
        const list = document.getElementById('announcementList');
        list.innerHTML = '<li>Error loading announcements. Please try again later.</li>';
    }
};
