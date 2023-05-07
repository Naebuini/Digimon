const DIGIMON_API_URL = "https://digimon-api.vercel.app/api/digimon";

async function getDigimons() {
  const response = await fetch(DIGIMON_API_URL);
  const digimons = await response.json();
  return digimons;
}

function displayDigimons(digimons) {
  const digimonContainer = document.getElementById("digimon-container");
  digimonContainer.innerHTML = "";

  digimons.forEach((digimon) => {
    const digimonCard = document.createElement("div");
    digimonCard.classList.add("digimon-card");

    const digimonImage = document.createElement("img");
    digimonImage.src = digimon.img;
    digimonImage.alt = digimon.name;

    const digimonName = document.createElement("h3");
    digimonName.innerText = digimon.name;

    const digimonLevel = document.createElement("p");
    digimonLevel.innerText = `Nivel: ${digimon.level}`;

    digimonCard.appendChild(digimonImage);
    digimonCard.appendChild(digimonName);
    digimonCard.appendChild(digimonLevel);

    digimonContainer.appendChild(digimonCard);
  });
}

async function searchDigimon() {
  const nameSearch = document.getElementById("name-search").value.toLowerCase();
  const digimons = await getDigimons();
  const filteredDigimons = digimons.filter((digimon) =>
    digimon.name.toLowerCase().includes(nameSearch)
  );
  displayDigimons(filteredDigimons);
}

async function filterByLevel() {
  const levelSelect = document.getElementById("level-select");
  const selectedLevel = levelSelect.options[levelSelect.selectedIndex].value;
  const digimons = await getDigimons();
  let filteredDigimons = digimons;
  if (selectedLevel) {
    filteredDigimons = digimons.filter((digimon) => digimon.level === selectedLevel);
  }
  displayDigimons(filteredDigimons);
}

(async function init() {
  const digimons = await getDigimons();
  displayDigimons(digimons);
})();
