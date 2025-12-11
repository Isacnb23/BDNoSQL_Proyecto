$(document).ready(function () {

    const API_INSCRIPCIONES = "http://localhost:3000/api/inscripciones";
    const API_ESTUDIANTES = "http://localhost:3000/api/estudiantes";
    const API_CURSOS = "http://localhost:3000/api/cursos";
    const API_CLASES = "http://localhost:3000/api/clases";

    function cargarInscripciones() {
        $.ajax({
            url: API_INSCRIPCIONES,
            method: "GET",
            success: function (inscripciones) {
                let filas = "";

                inscripciones.forEach(i => {
                    filas += `
                <tr>
                    <td>${i.estudiante}</td>
                    <td>${i.curso}</td>
                    <td>${i.clase}</td>
                    <td>${i.fechaInscripcion ? new Date(i.fechaInscripcion).toLocaleDateString() : "Sin fecha"}</td>
                    <td>${i.estado}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar" data-id="${i._id}">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm eliminar" data-id="${i._id}">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `;
                });

                $("#inscripcionesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar las inscripciones");
            }
        });
    }


    cargarInscripciones();

    $("#agregarInscripcionBtn").click(function () {
        $("#inscripcionForm")[0].reset();
        $("#inscripcionId").val("");
        $("#inscripcionModalLabel").text("Agregar Inscripción");

        cargarEstudiantes();
        cargarCursos();

        $("#claseId").html(`<option selected disabled>Seleccione una clase</option>`);
    });

    $("#cursoId").change(function () {
        const cursoId = $(this).val();
        if (!cursoId) return;
        cargarClasePorCurso(cursoId);
    });

    function cargarClasePorCurso(cursoId) {
        $.ajax({
            url: `${API_CLASES}/curso/${cursoId}`,
            method: "GET",
            success: function (clases) {
                if (!clases.length) {
                    $("#claseId").html(`<option disabled>No hay clases</option>`);
                    return;
                }
                const clase = clases[0];
                $("#claseId").html(`
                    <option value="${clase._id}" selected>
                        ${new Date(clase.fecha).toLocaleDateString()} - ${clase.tema}
                    </option>
                `);
            },
            error: function () {
                alert("Error al cargar la clase");
            }
        });
    }

    $("#guardarInscripcion").click(function () {

        const inscripcion = {
            estudianteId: $("#estudianteId").val(),
            cursoId: $("#cursoId").val(),
            claseId: $("#claseId").val(),
            estado: $("#estado").val()
        };

        const id = $("#inscripcionId").val();

        if (id === "") {
            // CREAR
            if (!$("#claseId").val()) {
                alert("Debe existir una clase para el curso seleccionado");
                return;
            }

            $.ajax({
                url: API_INSCRIPCIONES,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(inscripcion),
                success: function () {
                    $("#inscripcionModal").modal("hide");
                    cargarInscripciones();
                },
                error: function () {
                    alert("Error al crear inscripción.");
                }
            });

        } else {
            // EDITAR
            $.ajax({
                url: `${API_INSCRIPCIONES}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(inscripcion),
                success: function () {
                    $("#inscripcionModal").modal("hide");
                    cargarInscripciones();
                },
                error: function () {
                    alert("Error al actualizar inscripción.");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_INSCRIPCIONES}/${id}`,
            method: "GET",
            success: function (i) {

                cargarEstudiantes();
                cargarCursos();

                setTimeout(() => {
                    $("#inscripcionId").val(i._id);
                    $("#estudianteId").val(i.estudianteId);
                    $("#cursoId").val(i.cursoId);
                    $("#estado").val(i.estado);
                }, 200);

                $("#inscripcionModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos de inscripción.");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Desea eliminar esta inscripción?")) return;

        $.ajax({
            url: `${API_INSCRIPCIONES}/${id}`,
            method: "DELETE",
            success: function () {
                cargarInscripciones();
            },
            error: function () {
                alert("Error al eliminar inscripción.");
            }
        });
    });

    function cargarEstudiantes() {
        $.ajax({
            url: API_ESTUDIANTES,
            method: "GET",
            success: function (estudiantes) {
                let opciones = "<option disabled selected>Seleccione un estudiante</option>";
                estudiantes.forEach(e => {
                    opciones += `<option value="${e._id}">${e.nombre} ${e.apellido}</option>`;
                });
                $("#estudianteId").html(opciones);
            },
            error: function () {
                alert("Error al cargar estudiantes");
            }
        });
    }

    function cargarCursos() {
        $.ajax({
            url: API_CURSOS,
            method: "GET",
            success: function (cursos) {
                let opciones = "<option disabled selected>Seleccione un curso</option>";
                cursos.forEach(c => {
                    opciones += `<option value="${c._id}">${c.nombre}</option>`;
                });
                $("#cursoId").html(opciones);
            },
            error: function () {
                alert("Error al cargar cursos");
            }
        });
    }
});
