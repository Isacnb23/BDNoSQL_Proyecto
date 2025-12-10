$(document).ready(function () {
    const API_ASISTENCIAS = "http://localhost:3000/api/asistencias";
    const API_ESTUDIANTES = "http://localhost:3000/api/estudiantes";
    const API_CLASES = "http://localhost:3000/api/clases";

    function cargarAsistencias() {
        $.ajax({
            url: API_ASISTENCIAS,
            method: "GET",
            success: function (asistencias) {
                let filas = "";

                asistencias.forEach(a => {
                    filas += `
                <tr>
                    <td>${a.estudiante}</td>
                    <td>${a.clase}</td>
                    <td>${new Date(a.fecha).toLocaleDateString()}</td>
                    <td>${a.estado}</td>
                    <td>${new Date(a.fechaCreacion).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar" data-id="${a._id}">
                            <i class="fa fa-edit"></i>
                        </button>
                    </td>
                </tr>
                `;
                });

                $("#asistenciasBody").html(filas);
            },
            error: function () {
                alert("Error al cargar las asistencias");
            }
        });
    }

    cargarAsistencias();
    cargarCursosFiltro();

    $("#guardarAsistencia").click(function () {

        const id = $("#asistenciaId").val();

        const asistencia = {
            estudianteId: $("#estudianteId").val(),
            claseId: $("#claseId").val(),
            fecha: $("#fecha").val(),
            estado: $("#estado").val()
        };

        $.ajax({
            url: `${API_ASISTENCIAS}/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(asistencia),
            success: function () {
                $("#asistenciaModal").modal("hide");
                cargarAsistencias();
            },
            error: function () {
                alert("Error al actualizar la asistencia");
            }
        });
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_ASISTENCIAS}/${id}`,
            method: "GET",
            success: function (a) {
                cargarEstudiantes();
                cargarClases();

                setTimeout(() => {
                    $("#asistenciaId").val(a._id);
                    $("#estudianteId").val(a.estudianteId);
                    $("#claseId").val(a.claseId);
                    $("#fecha").val(a.fecha.split("T")[0]);
                    $("#estado").val(a.estado);
                }, 200);

                $("#asistenciaModal").modal("show");
            },
            error: function () {
                alert("Error al cargar la asistencia");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Desea eliminar esta asistencia?")) return;

        $.ajax({
            url: `${API_ASISTENCIAS}/${id}`,
            method: "DELETE",
            success: function () {
                cargarAsistencias();
            },
            error: function () {
                alert("Error al eliminar horario.");
            }
        });
    });

    $("#cursoFiltro").change(function () {
        const cursoId = $(this).val();

        if (cursoId === "todos") {
            $("#claseFiltro").html(`<option value="">Seleccione una clase</option>`);
            cargarAsistencias();
            return; 
        }

        $.ajax({
            url: `${API_CLASES}/curso/${cursoId}`,
            method: "GET",
            success: function (clases) {
                let opciones = `<option value="">Seleccione una clase</option>`;
                clases.forEach(c => {
                    opciones += `
                <option value="${c._id}">
                    ${new Date(c.fecha).toLocaleDateString()} - ${c.tema}
                </option>`;
                });

                $("#claseFiltro").html(opciones);
            },
            error: function () {
                alert("Error al cargar clases");
            }
        });
    });


    $("#claseFiltro").change(function () {
        const claseId = $(this).val();
        if (!claseId) return;

        $.ajax({
            url: `${API_ASISTENCIAS}/clase/${claseId}`,
            method: "GET",
            success: function (asistencias) {
                let filas = "";

                if (asistencias.length === 0) {
                    filas = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No hay asistencias registradas para esta clase
                    </td>
                </tr>`;
                } else {
                    asistencias.forEach(a => {
                        filas += `
                    <tr>
                        <td>${a.estudiante}</td>
                        <td>${a.clase}</td>
                        <td>${new Date(a.fecha).toLocaleDateString()}</td>
                        <td>${a.estado}</td>
                        <td>${new Date(a.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                            <button class="btn btn-warning btn-sm editar" data-id="${a._id}">
                                <i class="fa fa-edit"></i>
                            </button>
                        </td>
                    </tr>`;
                    });
                }

                $("#asistenciasBody").html(filas);
            },
            error: function () {
                alert("Error al filtrar asistencias");
            }
        });
    });




    function cargarEstudiantes() {
        $.ajax({
            url: API_ESTUDIANTES,
            method: "GET",
            success: function (estudiantes) {
                let opciones = `<option value="" disabled selected>Seleccione un estudiante</option>`;
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

    function cargarClases() {
        $.ajax({
            url: API_CLASES,
            method: "GET",
            success: function (clases) {
                let opciones = `<option value="" disabled selected>Seleccione una clase</option>`;

                clases.forEach(c => {
                    opciones += `<option value="${c._id}">${c.tema}</option>`;
                });

                $("#claseId").html(opciones);
            },
            error: function () {
                alert("Error al cargar clases");
            }
        });
    }

    function cargarCursosFiltro() {
        $.ajax({
            url: "http://localhost:3000/api/cursos",
            method: "GET",
            success: function (cursos) {
                let opciones = `<option value="todos">Todos los cursos</option>`;
                cursos.forEach(c => {
                    opciones += `<option value="${c._id}">${c.nombre}</option>`;
                });
                $("#cursoFiltro").html(opciones);
            }
        });
    }

});
