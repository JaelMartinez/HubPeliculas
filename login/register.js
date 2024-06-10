document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      alert("Username already exists");
      return;
    }

    // Guardar el nuevo usuario en Local Storage
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");

    // Redirigir al usuario a la página de login
    window.location.href = "login.html";
  });
