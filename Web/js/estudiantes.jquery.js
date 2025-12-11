$(document).ready(function () {

    const APIURL = "http://localhost:3000/api/estudiantes";

    function cargarEstudiantes() {
        $.ajax({
            url: APIURL,
            method: "GET",
            success: function (estudiantes) {
                let filas = "";

                estudiantes.forEach(p => {
                    filas += `
                        <tr>
                            <td>${p.nombre} ${p.apellido}</td>
                            <td>${p.email}</td>
                            <td>${p.telefono}</td>
                            <td>${new Date(p.fechaNacimiento).toLocaleDateString()}</td>
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

                $("#estudiantesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los estudiantes");
            }
        });
    }

    cargarEstudiantes();


    $("#agregarEstudianteBtn").click(function () {
        $("#estudianteForm")[0].reset();
        $("#estudianteId").val("");
        $("#estudianteModalLabel").text("Agregar Estudiante");
    });


    $("#guardarEstudiante").click(function () {

        const estudiante = {
            nombre: $("#nombre").val(),
            apellido: $("#apellido").val(),
            email: $("#email").val(),
            telefono: $("#telefono").val(),
            fechaNacimiento: $("#fechaNacimiento").val()
        };

        const id = $("#estudianteId").val();

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: APIURL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(estudiante),
                success: function () {
                    $("#estudianteModal").modal("hide");
                    cargarEstudiantes();
                },
                error: function () {
                    alert("Error al crear estudiante");
                }
            });

        } else {
            // ===== EDITAR =====
            $.ajax({
                url: `${APIURL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(estudiante),
                success: function () {
                    $("#estudianteModal").modal("hide");
                    cargarEstudiantes();
                },
                error: function () {
                    alert("Error al actualizar estudiante");
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
                $("#estudianteId").val(p._id);
                $("#nombre").val(p.nombre);
                $("#apellido").val(p.apellido);
                $("#email").val(p.email);
                $("#telefono").val(p.telefono);
                $("#fechaNacimiento").val(p.fechaNacimiento?.substring(0, 10));


                $("#estudianteModalLabel").text("Editar estudiante");
                $("#estudianteModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del estudiante");
            }
        });
    });


    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este estudiante?")) return;

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "DELETE",
            success: function () {
                cargarEstudiantes();
            },
            error: function () {
                alert("Error al eliminar estudiante");
            }
        });
    });

});
