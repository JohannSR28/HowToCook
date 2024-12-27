// Récupérer les éléments nécessaires
const slider = document.getElementById("slider");
const sliderLeft = document.getElementById("slider-left");
const sliderRight = document.getElementById("slider-right");

// Largeur d'un item (assurez-vous que c'est cohérent avec CSS)
const itemWidth = slider.querySelector(".meal-prep").offsetWidth + 10; // +10 pour le margin

// Événements pour défiler à gauche
sliderLeft.addEventListener("click", () => {
  slider.scrollBy({ left: -itemWidth * 5, behavior: "smooth" });
});

// Événements pour défiler à droite
sliderRight.addEventListener("click", () => {
  slider.scrollBy({ left: itemWidth * 5, behavior: "smooth" });
});

// Gestion de l'état des boutons (facultatif)
function updateButtons() {
  sliderLeft.disabled = slider.scrollLeft === 0;
  sliderRight.disabled =
    slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth;
}

// Mettre à jour les boutons au défilement
slider.addEventListener("scroll", updateButtons);

// Initialisation des boutons au chargement
updateButtons();
