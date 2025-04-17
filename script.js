// Replace this with your actual deployed Google Apps Script URL
const sheetURL = 'https://script.google.com/macros/s/AKfycbyLltyKvcusA05NoFzArb3kF3Dr2JWSn7n2QpbJnoDWG2cUHs00eL5MyJLTkDH9n10ung/exec';

window.onload = async function loadAnnouncements() {
    console.log("Script loaded. Fetching announcements...");

    try {
        const response = await fetch(sheetURL);
        const data = await response.json();
        console.log("Fetched data:", data);

        const list = document.getElementById('announcementList');
        console.log("Found list element:", list);

        if (!list) {
            console.error("announcementList not found in the DOM!");
            return;
        }

        list.innerHTML = ''; // Clear placeholder

        if (!data || data.length === 0) {
            list.innerHTML = '<li>No announcements available.</li>';
            console.warn("Data array is empty.");
            return;
        }

        data.forEach((item, index) => {
            console.log(`Rendering item #${index + 1}:`, item);
            const li = document.createElement('li');
            li.textContent = item.announcement || "Missing text";
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching announcements:", error);
        const list = document.getElementById('announcementList');
        if (list) {
            list.innerHTML = '<li>Error loading announcements. Please try again later.</li>';
        }
    }
};
