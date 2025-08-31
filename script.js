// Liste der JSON-Dateien im "cars"-Ordner
const carFiles = [
  "audi.json",
  "bmw.json",
  "mercedes.json",
  "vw.json",
  "porsche.json",
  "tesla.json",
  "opel.json"
];

let cars = [];

// Funktion lädt alle JSON-Dateien und speichert sie in "cars"
async function loadCars() {
  cars = [];

  for (const file of carFiles) {
    try {
      const response = await fetch(`cars/${file}`);
      if (!response.ok) throw new Error(`Fehler beim Laden von ${file}`);

      const data = await response.json();

      // IDs anpassen, damit sie eindeutig sind (falls mehrere Marken die gleiche ID 1 haben)
      data.forEach((car, index) => {
        car.globalId = `${file.replace(".json", "")}-${car.id || index}`;
      });

      cars.push(...data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Alle Autos geladen:", cars);
}

// Beispiel: nach Laden der Autos ausgeben
loadCars().then(() => {
  // alle Autos auf Index-Seite rendern
  renderBrands();
});

// ----------------------------
// Beispiel-Funktion für Anzeige
// ----------------------------
function renderBrands() {
  const container = document.getElementById("brandsGrid");
  if (!container) return;

  container.innerHTML = "";

  // alle Marken aus den Daten extrahieren
  const brands = [...new Set(cars.map(car => car.brand))];

  brands.forEach(brand => {
    const brandDiv = document.createElement("div");
    brandDiv.className = "brand-card";
    brandDiv.innerText = brand;

    // Klick -> Ergebnisse für diese Marke anzeigen
    brandDiv.addEventListener("click", () => {
      window.location.href = `results.html?brand=${encodeURIComponent(brand)}`;
    });

    container.appendChild(brandDiv);
  });
}
