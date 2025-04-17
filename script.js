const sheetURL = "https://script.google.com/macros/s/AKfycbyLltyKvcusA05NoFzArb3kF3Dr2JWSn7n2QpbJnoDWG2cUHs00eL5MyJLTkDH9n10ung/exec";
const listEl = document.getElementById("announcementList");

fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
        listEl.innerHTML = "";
        if (data.length === 0) {
            listEl.innerHTML = "<li>No announcements yet!</li>";
            return;
        }

        data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.message;
            listEl.appendChild(li);
        });
    })
    .catch(error => {
        listEl.innerHTML = "<li>Error loading announcements.</li>";
        console.error(error);
    });
