$(document).ready(function () {

    const API_ROLES = "http://localhost:3000/api/roles";

    function cargarRoles() {
        $.ajax({
            url: API_ROLES,
            method: "GET",
            success: function (roles) {
                let filas = "";

                roles.forEach(r => {
                    const permisosList = Array.isArray(r.permisos) ? r.permisos.join(", ") : r.permisos;
                    
                    filas += `
                        <tr>
                            <td>${r.nombre}</td>
                            <td>${permisosList}</td>
                            <td>${new Date(r.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${r._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${r._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#rolesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los roles");
            }
        });
    }

    cargarRoles();

    $("#agregarRolBtn").click(function () {
        $("#rolForm")[0].reset();
        $("#rolId").val("");
        $("#rolModalLabel").text("Agregar Rol");
    });

    $("#guardarRol").click(function () {

        const permisosTexto = $("#permisos").val();
        const permisosArray = permisosTexto.split(",").map(p => p.trim()).filter(p => p !== "");

        const rol = {
            nombre: $("#nombre").val(),
            permisos: permisosArray
        };

        const id = $("#rolId").val();

        if (id === "") {
            
            $.ajax({
                url: API_ROLES,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(rol),
                success: function () {
                    $("#rolModal").modal("hide");
                    cargarRoles();
                },
                error: function () {
                    alert("Error al crear rol");
                }
            });

        } else {
            
            $.ajax({
                url: `${API_ROLES}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(rol),
                success: function () {
                    $("#rolModal").modal("hide");
                    cargarRoles();
                },
                error: function () {
                    alert("Error al actualizar rol");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_ROLES}/${id}`,
            method: "GET",
            success: function (rol) {
                $("#rolId").val(rol._id);
                $("#nombre").val(rol.nombre);
                
                const permisosTexto = Array.isArray(rol.permisos) ? rol.permisos.join(", ") : rol.permisos;
                $("#permisos").val(permisosTexto);
                
                $("#rolModalLabel").text("Editar Rol");
                $("#rolModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del rol");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este rol?")) return;

        $.ajax({
            url: `${API_ROLES}/${id}`,
            method: "DELETE",
            success: function () {
                cargarRoles();
            },
            error: function () {
                alert("Error al eliminar el rol");
            }
        });
    });

});