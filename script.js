// Replace this with your actual deployed Google Apps Script URL
const sheetURL = 'https://script.google.com/macros/s/AKfycbzSqFKX1xGzEEv7VrPs67t4b_CcK4CB7J5krL-Xb7EdEmjWmDNU2amn6t5YnAkDQieryg/exec';

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

            // Ensure the announcement text exists and is properly formatted
            const announcementText = item.announcement || "Missing text";
            const li = document.createElement('li');
            li.textContent = announcementText;

            // Append to the list
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching announcements:", error);

        // Show error message in the list if there's an issue
        const list = document.getElementById('announcementList');
        if (list) {
            list.innerHTML = '<li>Error loading announcements. Please try again later.</li>';
        }
    }
};
