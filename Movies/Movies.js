function toggleHeaderClass() {
  var header = document.getElementById("header");
  header.classList.toggle("bg-gray-950", window.scrollY > 0);
}

// Ejecutar la función inmediatamente al cargar la página
toggleHeaderClass();

// Y también en cada evento de desplazamiento
window.addEventListener("scroll", toggleHeaderClass);

document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".new-handle")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".new-handle");
  }
  if (handle != null) onHandleClick(handle);
});

const throttleProgressBar = throttle(() => {
  document.querySelectorAll(".new-progress-bar").forEach(calculateProgressBar);
}, 250);

window.addEventListener("resize", throttleProgressBar);

document.querySelectorAll(".new-progress-bar").forEach(calculateProgressBar);

function calculateProgressBar(progressBar) {
  const row = progressBar.closest(".new-row");
  if (!row) return; // Verificación de existencia de .new-row

  const slider = row.querySelector(".new-slider");
  if (!slider) return; // Verificación de existencia de .new-slider

  progressBar.innerHTML = "";
  const itemCount = slider.children.length;
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  );
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1);
    sliderIndex = progressBarItemCount - 1;
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("new-progress-item");
    if (i === sliderIndex) {
      barItem.classList.add("active");
    }
    progressBar.append(barItem);
  }
}

function onHandleClick(handle) {
  const row = handle.closest(".new-row");
  if (!row) return; // Verificación de existencia de .new-row

  const progressBar = row.querySelector(".new-progress-bar");
  const slider = row.querySelector(".new-slider");
  if (!progressBar || !slider) return; // Verificación de existencia de .new-progress-bar y .new-slider

  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = progressBar.children.length;
  if (handle.classList.contains("new-left-handle")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[progressBarItemCount - 1].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex - 1].classList.add("active");
    }
  }

  if (handle.classList.contains("new-right-handle")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[0].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex + 1].classList.add("active");
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

// Obtener los botones de favoritos
const favoriteButtons = document.querySelectorAll(".fav-button");

favoriteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const slide = button.closest(".new-slide");
    const title = slide.querySelector("h3").textContent;
    const imageSrc = slide.querySelector("img").src;
    const videoSrc = slide
      .querySelector(".play-button")
      .getAttribute("data-video-src");

    const favoriteItem = {
      title,
      imageSrc,
      videoSrc,
    };

    // Obtener los favoritos del Local Storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Verificar si el elemento ya está en favoritos
    const alreadyExists = favorites.some(
      (favorite) => favorite.title === favoriteItem.title
    );

    if (alreadyExists) {
      alert("This item is already in your favorites");
      return;
    }

    // Agregar el nuevo favorito
    favorites.push(favoriteItem);

    // Guardar los favoritos en el Local Storage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("Added to favorites");
  });
});

const playButtons = document.querySelectorAll(".play-button");
playButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const videoSrc = button.dataset.videoSrc;
    window.location.href = `../inicio/video.html?src=${encodeURIComponent(
      videoSrc
    )}`;
  });
});
// Verificar si el usuario está logueado
if (!localStorage.getItem("loggedIn") && !sessionStorage.getItem("loggedIn")) {
  window.location.href = "../login/login.html";
}
// Lógica para el logout
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
  window.location.href = "../login/login.html";
});
