const sheetURL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_URL_HERE/exec';

async function loadAnnouncements() {
    try {
        const response = await fetch(sheetURL);
        const data = await response.json();

        const list = document.getElementById('announcementList');
        list.innerHTML = ''; // Clear previous list

        if (data.length === 0) {
            list.innerHTML = '<li>No announcements available.</li>';
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.announcement; // Assuming your column is named 'announcement'
                list.appendChild(li);
            });
        }
    } catch (error) {
        document.getElementById('announcementList').innerHTML =
            '<li>Error loading announcements. Please try again later.</li>';
        console.error('Error fetching data:', error);
    }
}

window.onload = loadAnnouncements;
