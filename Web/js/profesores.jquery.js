$(document).ready(function () {

    const APIURL = "http://localhost:3000/api/profesores";

    function cargarProfesores() {
        $.ajax({
            url: APIURL,
            method: "GET",
            success: function (profesores) {
                let filas = "";

                profesores.forEach(p => {
                    filas += `
                        <tr>
                            <td>${p.nombre} ${p.apellido}</td>
                            <td>${p.email}</td>
                            <td>${p.telefono}</td>
                            <td>${p.especialidad}</td>
                            <td>${new Date(p.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${p._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${p._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#profesoresBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los profesores");
            }
        });
    }

    cargarProfesores();


    $("#agregarProfesorBtn").click(function () {
        $("#profesorForm")[0].reset();
        $("#profesorId").val("");
        $("#profesorModalLabel").text("Agregar Profesor");
    });


    $("#guardarProfesor").click(function () {

        const profesor = {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            email: $("#email").val(),
            telefono: $("#telefono").val(),
            especialidad: $("#especialidad").val()
        };

        const id = $("#profesorId").val();

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: APIURL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(profesor),
                success: function () {
                    $("#profesorModal").modal("hide");
                    cargarProfesores();
                },
                error: function () {
                    alert("Error al crear profesor");
                }
            });

        } else {
            // ===== EDITAR =====
            $.ajax({
                url: `${APIURL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(profesor),
                success: function () {
                    $("#profesorModal").modal("hide");
                    cargarProfesores();
                },
                error: function () {
                    alert("Error al actualizar profesor");
                }
            });
        }

    });


    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "GET",
            success: function (p) {
                $("#profesorId").val(p._id);
                $("#nombre").val(p.nombre);
                $("#apellido").val(p.apellido);
                $("#email").val(p.email);
                $("#telefono").val(p.telefono);
                $("#especialidad").val(p.especialidad);

                $("#profesorModalLabel").text("Editar Profesor");
                $("#profesorModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del profesor");
            }
        });
    });


    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este profesor?")) return;

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "DELETE",
            success: function () {
                cargarProfesores();
            },
            error: function () {
                alert("Error al eliminar profesor");
            }
        });
    });

});
