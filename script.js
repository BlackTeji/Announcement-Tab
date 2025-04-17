const sheetURL = 'https://script.google.com/macros/s/AKfycbyLltyKvcusA05NoFzArb3kF3Dr2JWSn7n2QpbJnoDWG2cUHs00eL5MyJLTkDH9n10ung/exec';

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
                li.textContent = item.announcement; // 'announcement' must match your column header in Sheets
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
