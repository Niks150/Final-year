document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const smallBox = document.getElementById("small-box");
    const container = document.querySelector(".scrollable-container");

    // Helper function to create a box for any item (lost/found)
    function createBox(item, type) {
        const box = document.createElement("a");
        box.classList.add("box");
        box.setAttribute("href", "#");

        box.innerHTML = `
            <img src="../backend/uploads/${item.image}" alt="${item.name}">
        `;

        box.addEventListener("click", function (event) {
            event.preventDefault();

            smallBox.innerHTML = `
                <button id="close-btn">❌</button>
                <img src="../backend/uploads/${item.image}" alt="${item.name}">
                <div class="section"><strong>Item Name:</strong> <p>${item.name}</p></div>
                <div class="section"><strong>Category:</strong> <p>${item.category}</p></div>
                <div class="section"><strong>Location:</strong> <p>${item.location}</p></div>
                <div class="section"><strong>Description:</strong> <p>${item.description}</p></div>
                <div class="section"><strong>Type:</strong> <p>${type}</p></div>
            `;

            overlay.style.display = "flex";

            document.getElementById("close-btn").addEventListener("click", function () {
                overlay.style.display = "none";
            });
        });

        container.appendChild(box);
    }

    // Fetch Found Items
    fetch('http://localhost:3000/api/founditems')
        .then(res => res.json())
        .then(data => {
            data.forEach(item => createBox(item, "Found"));
        })
        .catch(err => console.error("Error fetching found items:", err));

    // Fetch Lost Items
    fetch('http://localhost:3000/api/lostitems/all')
        .then(res => res.json())
        .then(data => {
            data.forEach(item => createBox(item, "Lost"));
        })
        .catch(err => console.error("Error fetching lost items:", err));
});
