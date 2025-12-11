$(document).ready(function () {

    const API_CURSOS = "http://localhost:3000/api/cursos";
    const API_CLASES = "http://localhost:3000/api/clases";
    const API_INSCRIPCIONES = "http://localhost:3000/api/inscripciones";
    const API_ASISTENCIAS = "http://localhost:3000/api/asistencias";

    function cargarCursos() {
        $.ajax({
            url: API_CURSOS,
            method: "GET",
            success: function (cursos) {
                let opciones = `<option value="">Seleccione un curso</option>`;
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
    cargarCursos();

    $("#cursoId").change(function () {
        const cursoId = $(this).val();
        if (!cursoId) return;
        cargarEstudiantes(cursoId);
        $.ajax({
            url: `${API_CLASES}/curso/${cursoId}`,
            method: "GET",
            success: function (clases) {
                const clase = clases[0];

                $("#claseId").html(`
                    <option value="${clase._id}" selected>
                        ${new Date(clase.fecha).toLocaleDateString()} - ${clase.tema}
                    </option>
                `);

            },
            error: function () {
                alert("Error al obtener la clase del curso");
            }
        });
    });

    function cargarEstudiantes(cursoId) {
        $.ajax({
            url: `${API_INSCRIPCIONES}/curso/${cursoId}`,
            method: "GET",
            success: function (estudiantes) {
                let filas = "";

                estudiantes.forEach(e => {
                    filas += `
                <tr>
                    <td>${e.nombre} ${e.apellido}</td>
                    <td>
                        <select class="form-control estado" data-id="${e._id}">
                            <option value="presente" selected>Presente</option>
                            <option value="ausente">Ausente</option>
                            <option value="justificado">Justificado</option>
                        </select>
                    </td>
                </tr>`;
                });

                $("#tablaEstudiantesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar estudiantes");
            }
        });
    }


    $("#guardarAsistencia").click(function () {
        const claseId = $("#claseId").val();

        if (!claseId) {
            alert("Debe seleccionar una clase");
            return;
        }

        const asistencias = [];

        $(".estado").each(function () {
            asistencias.push({
                estudianteId: $(this).data("id"),
                estado: $(this).val()
            });
        });

        $.ajax({
            url: `${API_ASISTENCIAS}/masivo`,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                claseId,
                asistencias
            }),
            success: function () {
                alert("Asistencias registradas correctamente");
                window.location.href = "asistencias.html";
            },
            error: function (err) {
                alert("Error al registrar asistencias");
                console.error(err);
            }
        });
    });

});
