$(document).ready(function () {
    const API_USUARIOS = "http://localhost:3000/api/usuarios";

    $("#loginForm").submit(function (e) {
        e.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        $.ajax({
            url: API_USUARIOS,
            method: "GET",
            success: function (usuarios) {
                const usuario = usuarios.find(u => u.email === email && u.password === password);

                if (usuario) {
                    localStorage.setItem("usuarioLogueado", usuario.nombre);
                    window.location.href = "http://localhost:3000";
                } else {
                    $("#errorMessage").text("Correo o contraseña incorrectos").addClass("show");
                    setTimeout(() => $("#errorMessage").removeClass("show"), 3000);
                }
            },
            error: function () {
                $("#errorMessage").text("Error al conectar").addClass("show");
            }
        });
    });
});