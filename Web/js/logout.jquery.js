function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "/module/login.html";
}