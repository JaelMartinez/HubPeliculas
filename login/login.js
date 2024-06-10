document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    // Obtener los usuarios registrados desde el Local Storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      if (remember) {
        localStorage.setItem("loggedIn", true);
      } else {
        sessionStorage.setItem("loggedIn", true);
      }
      window.location.href = "../inicio/inicio.html";
    } else {
      alert("Invalid username or password");
    }
  });
