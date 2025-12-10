$(document).ready(function () {
    const API_EVALUACIONES = "http://localhost:3000/api/evaluaciones";
    const API_CURSOS = "http://localhost:3000/api/cursos";

    function cargarEvaluaciones() {
        $.ajax({
            url: API_EVALUACIONES,
            method: "GET",
            success: function (evaluaciones) {
                let filas = "";

                evaluaciones.forEach(e => {
                    filas += `
                    <tr>
                        <td>${e.curso}</td>
                        <td>${e.nombre}</td>
                        <td>${e.tipo}</td>
                        <td>${new Date(e.fecha).toLocaleDateString()}</td>
                        <td>${e.puntajeMaximo}</td>
                        <td>${new Date(e.fechaCreacion).toLocaleDateString()}</td>
                        <td>
                            <button class="btn btn-warning btn-sm editar" data-id="${e._id}">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm eliminar" data-id="${e._id}">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                });

                $("#evaluacionesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar las evaluaciones");
            }
        });
    }

    cargarEvaluaciones();
    cargarCursosFiltro();

    $("#agregarEvaluacionBtn").click(function () {
        $("#evaluacionForm")[0].reset();
        $("#evaluacionId").val("");
        $("#evaluacionModalLabel").text("Agregar Evaluación");
        cargarCursos();
    });


    $("#guardarEvaluacion").click(function () {

        const evaluacion = {
            cursoId: $("#cursoId").val(),
            nombre: $("#nombre").val(),
            tipo: $("#tipo").val(),
            fecha: $("#fecha").val(),
            puntajeMaximo: $("#puntajeMaximo").val()
        };

        const id = $("#evaluacionId").val();

        if (id === "") {
            // CREAR
            $.ajax({
                url: API_EVALUACIONES,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(evaluacion),
                success: function () {
                    $("#evaluacionModal").modal("hide");
                    cargarEvaluaciones();
                },
                error: function () {
                    alert("Error al crear evaluación");
                }
            });

        } else {
            // EDITAR
            $.ajax({
                url: `${API_EVALUACIONES}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(evaluacion),
                success: function () {
                    $("#evaluacionModal").modal("hide");
                    cargarEvaluaciones();
                },
                error: function () {
                    alert("Error al actualizar evaluación");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_EVALUACIONES}/${id}`,
            method: "GET",
            success: function (e) {
                cargarCursos();

                setTimeout(() => {
                    $("#evaluacionId").val(e._id);
                    $("#cursoId").val(e.cursoId);
                    $("#nombre").val(e.nombre);
                    $("#tipo").val(e.tipo);
                    $("#fecha").val(e.fecha.split("T")[0]);
                    $("#puntajeMaximo").val(e.puntajeMaximo);
                }, 200);

                $("#evaluacionModal").modal("show");
            },
            error: function () {
                alert("Error al cargar la evaluación");
            }
        });
    });


    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Desea eliminar esta evaluación?")) return;

        $.ajax({
            url: `${API_EVALUACIONES}/${id}`,
            method: "DELETE",
            success: function () {
                cargarEvaluaciones();
            },
            error: function () {
                alert("Error al eliminar evaluación");
            }
        });
    });

    $("#cursoFiltro").change(function () {
        const cursoId = $(this).val();

        if (cursoId === "todos") {
            cargarEvaluaciones();
        } else {
            $.ajax({
                url: `${API_EVALUACIONES}/curso/${cursoId}`,
                method: "GET",
                success: function (evaluaciones) {
                    let filas = "";

                    if (evaluaciones.length === 0) {
                        filas = `
                        <tr>
                            <td colspan="7" class="text-center text-muted">
                                No hay evaluaciones registradas para este curso
                            </td>
                        </tr>`;
                    } else {
                        evaluaciones.forEach(e => {
                            filas += `
                            <tr>
                                <td>${e.curso}</td>
                                <td>${e.nombre}</td>
                                <td>${e.tipo}</td>
                                <td>${new Date(e.fecha).toLocaleDateString()}</td>
                                <td>${e.puntajeMaximo}</td>
                                <td>${new Date(e.fechaCreacion).toLocaleDateString()}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm editar" data-id="${e._id}">
                                        <i class="fa fa-edit"></i>
                                    </button>
                                    <button class="btn btn-danger btn-sm eliminar" data-id="${e._id}">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>`;
                        });
                    }

                    $("#evaluacionesBody").html(filas);
                },
                error: function () {
                    alert("Error al filtrar evaluaciones");
                }
            });
        }
    });


    function cargarCursos() {
        $.ajax({
            url: API_CURSOS,
            method: "GET",
            success: function (cursos) {
                let opciones = `<option value="" disabled selected>Seleccione un curso</option>`;

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

    function cargarCursosFiltro() {
        $.ajax({
            url: API_CURSOS,
            method: "GET",
            success: function (cursos) {
                let opciones = `<option value="todos">Todos los cursos</option>`;

                cursos.forEach(c => {
                    opciones += `<option value="${c._id}">${c.nombre}</option>`;
                });

                $("#cursoFiltro").html(opciones);
            },
            error: function () {
                alert("Error al cargar cursos");
            }
        });
    }
});
