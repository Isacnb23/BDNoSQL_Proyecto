$(document).ready(function () {

    const API_USUARIOS = "http://localhost:3000/api/usuarios";

    function cargarUsuarios() {
        $.ajax({
            url: API_USUARIOS,
            method: "GET",
            success: function (usuarios) {
                let filas = "";

                usuarios.forEach(u => {
                    const estadoBadge = u.estado === 'activo' 
                        ? '<span class="badge bg-success">Activo</span>' 
                        : '<span class="badge bg-secondary">Inactivo</span>';
                    
                    filas += `
                        <tr>
                            <td>${u.nombre}</td>
                            <td>${u.email}</td>
                            <td>${estadoBadge}</td>
                            <td>${new Date(u.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${u._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${u._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#usuariosBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los usuarios");
            }
        });
    }

    cargarUsuarios();

    $("#agregarUsuarioBtn").click(function () {
        $("#usuarioForm")[0].reset();
        $("#usuarioId").val("");
        $("#usuarioModalLabel").text("Agregar Usuario");
        $("#password").prop('required', true);
    });

    $("#guardarUsuario").click(function () {

        const usuario = {
            nombre: $("#nombre").val(),
            email: $("#email").val(),
            estado: $("#estado").val()
        };

        const password = $("#password").val();
        const id = $("#usuarioId").val();

        
        if (password !== "") {
            usuario.password = password;
        }

        if (id === "") {
            
            if (!password) {
                alert("La contraseña es obligatoria al crear un usuario");
                return;
            }

            $.ajax({
                url: API_USUARIOS,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function () {
                    $("#usuarioModal").modal("hide");
                    cargarUsuarios();
                },
                error: function () {
                    alert("Error al crear usuario");
                }
            });

        } else {
           
            $.ajax({
                url: `${API_USUARIOS}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(usuario),
                success: function () {
                    $("#usuarioModal").modal("hide");
                    cargarUsuarios();
                },
                error: function () {
                    alert("Error al actualizar usuario");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_USUARIOS}/${id}`,
            method: "GET",
            success: function (usuario) {
                $("#usuarioId").val(usuario._id);
                $("#nombre").val(usuario.nombre);
                $("#email").val(usuario.email);
                $("#estado").val(usuario.estado);
                $("#password").val(""); 
                $("#password").prop('required', false); 
                
                $("#usuarioModalLabel").text("Editar Usuario");
                $("#usuarioModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del usuario");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este usuario?")) return;

        $.ajax({
            url: `${API_USUARIOS}/${id}`,
            method: "DELETE",
            success: function () {
                cargarUsuarios();
            },
            error: function () {
                alert("Error al eliminar el usuario");
            }
        });
    });

});