const sheetURL = "https://script.google.com/macros/s/AKfycbyLltyKvcusA05NoFzArb3kF3Dr2JWSn7n2QpbJnoDWG2cUHs00eL5MyJLTkDH9n10ung/exec";
const listEl = document.getElementById("announcementList");

fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
        listEl.innerHTML = ""; // Clear the loading message

        if (data.length === 0) {
            listEl.innerHTML = "<li>No announcements yet!</li>";
            return;
        }

        data.forEach(announcement => {
            const item = document.createElement("li");
            item.textContent = announcement.message; // adjust to your column header
            listEl.appendChild(item);
        });
    })
    .catch(error => {
        listEl.innerHTML = `<li>Error loading announcements. Please try again later.</li>`;
        console.error("Error fetching announcements:", error);
    });
