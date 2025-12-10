$(document).ready(function () {

    const API_USUARIOS = "http://localhost:3000/api/usuarios";
    const API_ROLES = "http://localhost:3000/api/roles";

    function cargarRolesSelect() {
        $.ajax({
            url: API_ROLES,
            method: "GET",
            success: function (roles) {
                let opciones = '<option value="">Seleccione un rol...</option>';
                roles.forEach(r => {
                    opciones += `<option value="${r._id}">${r.nombre}</option>`;
                });
                $("#nota_rol").html(opciones); // CAMBIADO: de #rol a #nota_rol
            },
            error: function () {
                console.error("Error al cargar roles");
            }
        });
    }

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
                    
                    const rolNombre = u.nota_rol?.nombre || 'Sin rol';
                    const fechaCreacion = new Date(u.fechaCreacion).toLocaleDateString();
                    
                    filas += `
                        <tr>
                            <td>${u.nombre}</td>
                            <td>${u.email}</td>
                            <td><span class="badge bg-info">${rolNombre}</span></td>
                            <td>${estadoBadge}</td>
                            <td>${fechaCreacion}</td>
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

    cargarRolesSelect();
    cargarUsuarios();

    $("#agregarUsuarioBtn").click(function () {
        $("#usuarioForm")[0].reset();
        $("#usuarioId").val("");
        $("#usuarioModalLabel").text("Agregar Usuario");
        $("#password").prop('required', true);
        cargarRolesSelect();
    });

    $("#guardarUsuario").click(function () {
        const usuario = {
            nombre: $("#nombre").val(),
            email: $("#email").val(),
            nota_rol: $("#nota_rol").val(), 
            estado: $("#estado").val()
        };

        const password = $("#password").val();
        const id = $("#usuarioId").val();

        if (!usuario.nota_rol) {
            alert("Debe seleccionar un rol");
            return;
        }

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
                    alert("Usuario creado exitosamente");
                },
                error: function (xhr) {
                    const error = xhr.responseJSON?.message || "Error al crear usuario";
                    alert(error);
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
                    alert("Usuario actualizado exitosamente");
                },
                error: function (xhr) {
                    const error = xhr.responseJSON?.message || "Error al actualizar usuario";
                    alert(error);
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
                
                cargarRolesSelect();
                setTimeout(() => {
                    const rolId = usuario.nota_rol?._id || usuario.nota_rol;
                    $("#nota_rol").val(rolId); 
                }, 100);
                
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
                alert("Usuario eliminado exitosamente");
            },
            error: function () {
                alert("Error al eliminar el usuario");
            }
        });
    });

});