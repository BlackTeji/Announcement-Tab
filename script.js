const sheetURL = "https://script.google.com/macros/s/AKfycbyLltyKvcusA05NoFzArb3kF3Dr2JWSn7n2QpbJnoDWG2cUHs00eL5MyJLTkDH9n10ung/exec";

const announcementList = document.getElementById("announcements");

fetch(sheetURL)
    .then(res => res.json())
    .then(data => {
        announcementList.innerHTML = "";

        if (data.length === 0) {
            announcementList.innerHTML = "<li>No announcements at the moment.</li>";
        } else {
            data.forEach((item, index) => {
                const li = document.createElement("li");
                li.textContent = item.Announcements;
                announcementList.appendChild(li);
            });
        }
    })
    .catch(err => {
        announcementList.innerHTML = "<li>Error loading announcements. Please try again later.</li>";
        console.error("Fetch error:", err);
    });
