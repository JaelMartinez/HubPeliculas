document.querySelectorAll(".play-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const videoSrc = event.currentTarget.getAttribute("data-video-src");
    window.location.href = `../inicio/video.html?src=${encodeURIComponent(
      videoSrc
    )}`;
  });
});
// Obtener los botones de favoritos
// Obtener los botones de favoritos

// Lógica para el logout
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  sessionStorage.removeItem("loggedIn");
  window.location.href = "../login/login.html";
});
