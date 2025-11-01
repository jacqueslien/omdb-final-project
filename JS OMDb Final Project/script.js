function openMenu() {
  document.body.classList.add('menu--open');
  const menu = document.getElementById('menu');
  menu.classList.add('active');
}

function closeMenu() {
  document.body.classList.remove('menu--open')
  const menu = document.getElementById('menu')
  menu.classList.remove('active');
}

const API_KEY = "3e2dd73a";
const API_URL = "https://www.omdbapi.com/";

document.getElementById("searchBtn").addEventListener("click", searchMovies);
document.getElementById("q").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchMovies();
});

async function searchMovies() {
  const query = document.getElementById("q").value.trim();
  const type = document.getElementById("type").value;
  const resultsDiv = document.getElementById("results");
  const statusDiv = document.getElementById("status");

  if (!query) {
    statusDiv.textContent = "Please enter a movie or show title.";
    return;
  }

  statusDiv.textContent = "Loading...";
  resultsDiv.innerHTML = "";

  try {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}&type=${type}`);
    const data = await response.json();

    if (data.Response === "False") {
      statusDiv.textContent = data.Error || "No results found.";
      return;
    }

    statusDiv.textContent = "";
    data.Search.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${
          item.Poster !== "N/A"
            ? item.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }" alt="${item.Title}">
        <h3>${item.Title}</h3>
        <p>${item.Year}</p>
        <p>${item.Type}</p>
      `;
      resultsDiv.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Error fetching data.";
  }
}

