const loadBtn = document.getElementById("loadBtn");
const refreshBtn = document.getElementById("refreshBtn");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");


let users = [];


async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
}


function createUserCard(user) {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
    `;

    return card;
}


function renderUsers(list) {
    usersContainer.innerHTML = "";

    list.forEach(user => {
        usersContainer.appendChild(createUserCard(user));
    });
}


async function loadUsers() {

    errorDiv.classList.add("hidden");
    usersContainer.innerHTML = "";

    loadingDiv.classList.remove("hidden");

    loadBtn.disabled = true;
    refreshBtn.disabled = true;

    loadBtn.textContent = "Loading...";
    refreshBtn.textContent = "Refreshing...";

    try {
        users = await fetchUsers();
        renderUsers(users);

    } catch (error) {
        errorDiv.textContent = "Failed to load users. Please try again.";
        errorDiv.classList.remove("hidden");
        console.log(error);

    } finally {
        loadingDiv.classList.add("hidden");

        loadBtn.disabled = false;
        refreshBtn.disabled = false;

        loadBtn.textContent = "Load Users";
        refreshBtn.textContent = "Refresh Users";
    }
}


loadBtn.addEventListener("click", loadUsers);
refreshBtn.addEventListener("click", loadUsers);


searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(term)
    );

    renderUsers(filtered);
});