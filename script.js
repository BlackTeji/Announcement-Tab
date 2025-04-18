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
            return;
        }

        data.forEach((item, index) => {
            const announcementText = item.announcement || "Missing text";
            console.log(`Rendering item #${index + 1}:`, announcementText);

            const li = document.createElement('li');

            // Check for multiline bullets using - or •
            if (announcementText.includes('\n') && (announcementText.includes('- ') || announcementText.includes('•'))) {
                const lines = announcementText.split('\n');
                const ul = document.createElement('ul');

                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                        const bulletLi = document.createElement('li');
                        bulletLi.textContent = trimmed.substring(1).trim();
                        ul.appendChild(bulletLi);
                    } else if (trimmed.length > 0) {
                        // Add non-bullet lines as separate paragraphs
                        const p = document.createElement('p');
                        p.textContent = trimmed;
                        li.appendChild(p);
                    }
                });

                li.appendChild(ul);
            } else {
                // Regular single-line announcement
                li.innerHTML = announcementText;
            }
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
