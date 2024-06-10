window.addEventListener("load", () => {
  var carousels = document.querySelectorAll(".carousel");

  for (var i = 0; i < carousels.length; i++) {
    carousel(carousels[i]);
  }
});

function carousel(root) {
  var figure = root.querySelector("figure"),
    nav = root.querySelector("nav"),
    images = figure.children,
    n = images.length,
    gap = root.dataset.gap || 0,
    bfc = "bfc" in root.dataset,
    theta = (2 * Math.PI) / n,
    currImage = 0,
    animationDuration = 1.5;

  setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
  window.addEventListener("resize", () => {
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
  });

  setupNavigation();

  function setupCarousel(n, s) {
    var apothem = s / (2 * Math.tan(Math.PI / n));
    figure.style.transformOrigin = `50% 50% ${-apothem}px`;

    for (var i = 0; i < n; i++) images[i].style.padding = `${gap}px`;
    for (i = 1; i < n; i++) {
      images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
      images[i].style.transform = `rotateY(${i * theta}rad)`;
    }
    if (bfc) {
      for (i = 0; i < n; i++) images[i].style.backfaceVisibility = "hidden";
    }

    rotateCarousel(currImage);
  }

  function setupNavigation() {
    nav.addEventListener("click", onClick, true);

    function onClick(e) {
      e.stopPropagation();

      var t = e.target;
      if (t.tagName.toUpperCase() != "BUTTON") return;

      if (t.classList.contains("next")) {
        currImage++;
      } else if (t.classList.contains("prev")) {
        currImage--;
      } else if (t.classList.contains("random")) {
        currImage = Math.floor(Math.random() * n);
      }

      rotateCarousel(currImage, true);
    }
  }

  function rotateCarousel(imageIndex, openNewPage = false) {
    figure.style.transition = `transform ${animationDuration}s ease-in-out`;
    figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;

    // Esperar el tiempo de animación antes de abrir la nueva ventana
    if (openNewPage) {
      setTimeout(() => {
        openPageForImage(images[imageIndex % n]);
      }, animationDuration * 1000);
    }
  }

  function openPageForImage(image) {
    const imageName = image.getAttribute("alt");
    let pageUrl = "";

    switch (imageName) {
      case "Avatar":
        pageUrl = "../infoRandom/Avatar.html";
        break;
      case "BlackPanther":
        pageUrl = "../infoRandom/BlackPanther.html";
        break;
      case "Euphoria":
        pageUrl = "../infoRandom/Euphoria.html";
        break;
      case "HouseOfTheDragon":
        pageUrl = "../infoRandom/HouseOfTheDragon.html";
        break;
      case "Ozark":
        pageUrl = "../infoRandom/Ozark.html";
        break;
      case "StrangerThings":
        pageUrl = "../infoRandom/StrangerThings.html";
        break;
      case "TheBoys":
        pageUrl = "../infoRandom/TheBoys.html";
        break;
      case "TheLastOfUs":
        pageUrl = "../infoRandom/TheLastOfUs.html";
        break;
      case "TopGunMaverick":
        pageUrl = "../infoRandom/TopGunMaverick.html";
        break;
      case "Bridgerton":
        pageUrl = "../infoRandom/Bridgerton.html";
        break;
      case "TheBatman":
        pageUrl = "../infoRandom/TheBatman.html";
        break;

      // Agrega más casos según las imágenes y páginas que tengas
      default:
        pageUrl = "../carousel/carousel.html";
    }

    if (pageUrl) {
      window.location.href = pageUrl;
    }
  }
}
// Verificar si el usuario está logueado

// Lógica para el logout
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
  window.location.href = "../login/login.html";
});
