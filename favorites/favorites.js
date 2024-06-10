// favorites.js

// Función para agregar un ítem a favoritos
const addToFavorites = (title, imageSrc, videoSrc) => {
  console.log("addToFavorites called");
  const favoriteItem = { title, imageSrc, videoSrc };

  // Obtener los favoritos del Local Storage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  console.log("Favorites before adding:", favorites);

  // Verificar si el elemento ya está en favoritos comparando solo el imageSrc
  const alreadyExists = favorites.some(
    (favorite) => favorite.imageSrc === favoriteItem.imageSrc
  );

  if (alreadyExists) {
    console.log("This item is already in your favorites", favoriteItem);
    alert("This item is already in your favorites");
    return;
  }

  // Agregar el nuevo favorito
  favorites.push(favoriteItem);

  // Guardar los favoritos en el Local Storage
  localStorage.setItem("favorites", JSON.stringify(favorites));

  console.log("Favorites after adding:", favorites);
  alert("Added to favorites");
};

// Función para eliminar un ítem de favoritos
const removeFromFavorites = (title) => {
  console.log("removeFromFavorites called");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((fav) => fav.title !== title);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Removed from favorites");
};

// Función para renderizar los favoritos en una página específica
const renderFavorites = (containerId) => {
  console.log("renderFavorites called");
  const favoritesContainer = document.getElementById(containerId);

  if (!favoritesContainer) return;

  // Obtener los favoritos del Local Storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Limpiar el contenedor de favoritos
  favoritesContainer.innerHTML = "";

  // Renderizar los favoritos
  favorites.forEach((favorite) => {
    const slide = document.createElement("div");
    slide.classList.add(
      "new-slide",
      "relative",
      "overflow-hidden",
      "rounded-lg"
    );

    slide.innerHTML = `
      <img src="${favorite.imageSrc}" class="w-full h-full object-cover transition-transform duration-300 ease-in-out" />
      <div class="hover-content absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out">
        <h3 class="text-xl text-white mb-4">${favorite.title}</h3>
        <div class="flex space-x-4">
          <button class="icon-button play-button" data-video-src="${favorite.videoSrc}">
            <i class="fas fa-play"></i>
          </button>
          <button class="icon-button remove-fav-button">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;

    favoritesContainer.appendChild(slide);

    // Añadir evento para eliminar favoritos
    slide.querySelector(".remove-fav-button").addEventListener("click", () => {
      removeFromFavorites(favorite.title);
      slide.remove();
    });

    // Añadir evento para reproducir video
    slide.querySelector(".play-button").addEventListener("click", () => {
      const videoSrc = favorite.videoSrc;
      window.location.href = `../inicio/video.html?src=${encodeURIComponent(
        videoSrc
      )}`;
    });
  });
};

// Función para inicializar los botones de favoritos en cualquier página
const initializeFavoriteButtons = () => {
  console.log("initializeFavoriteButtons called");
  const favoriteButtons = document.querySelectorAll(".fav-button");

  favoriteButtons.forEach((button) => {
    // Remover cualquier evento click existente
    button.removeEventListener("click", handleFavoriteButtonClick);

    // Añadir el nuevo evento click
    button.addEventListener("click", handleFavoriteButtonClick);
  });
};

// Manejador del evento click para los botones de favoritos
const handleFavoriteButtonClick = (event) => {
  console.log("fav-button clicked");
  const button = event.currentTarget;
  const slide = button.closest(".relative");
  const titleElement = slide.querySelector("h3") || slide.querySelector("h1");
  const title = titleElement ? titleElement.textContent : "Unknown Title";
  let imageSrc = "";

  if (slide.querySelector("img")) {
    imageSrc = slide.querySelector("img").src;
  } else {
    imageSrc = getComputedStyle(slide.closest("main")).backgroundImage.slice(
      5,
      -2
    );
  }

  const videoSrc = slide
    .querySelector(".play-button")
    .getAttribute("data-video-src");

  addToFavorites(title, imageSrc, videoSrc);
};

// Para renderizar favoritos en la página de favoritos
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  renderFavorites("favorites-container");
  initializeFavoriteButtons();
});
