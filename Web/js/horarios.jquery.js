$(document).ready(function () {
    const API_HORARIOS = "http://localhost:3000/api/horarios";
    const API_CURSOS = "http://localhost:3000/api/cursos";
    const API_AULA = "http://localhost:3000/api/aulas";

    function cargarHorarios() {
        $.ajax({
            url: API_HORARIOS,
            method: "GET",
            success: function (horarios) {
                let filas = "";

                horarios.forEach(h => {
                    filas += `
                <tr>
                    <td>${h.curso}</td>
                    <td>${h.diaSemana}</td>
                    <td>${h.horaInicio}</td>
                    <td>${h.horaFin}</td>
                    <td>${h.aula}</td>
                    <td>${new Date(h.fechaCreacion).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-warning btn-sm editar" data-id="${h._id}">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm eliminar" data-id="${h._id}">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `;
                });

                $("#horariosBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los horarios");
            }
        });
    }

    cargarHorarios();
    cargarCursosFiltro();

    $("#agregarHorarioBtn").click(function () {
        $("#horarioForm")[0].reset();
        $("#horarioId").val("");
        $("#horarioModalLabel").text("Agregar Horario");

        cargarCursos();
        cargarAulas();
    });

    // BOTÓN: Guardar (crear o editar)
    $("#guardarHorario").click(function () {

        const horario = {
            cursoId: $("#cursoId").val(),
            diaSemana: $("#diaSemana").val(),
            horaInicio: $("#horaInicio").val(),
            horaFin: $("#horaFin").val(),
            aula: $("#aulaId").val()
        };

        const id = $("#horarioId").val();

        if (id === "") {
            // CREAR
            $.ajax({
                url: API_HORARIOS,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(horario),
                success: function () {
                    $("#horarioModal").modal("hide");
                    cargarHorarios();
                },
                error: function () {
                    alert("Error al crear horario.");
                }
            });

        } else {
            // EDITAR
            $.ajax({
                url: `${API_HORARIOS}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(horario),
                success: function () {
                    $("#horarioModal").modal("hide");
                    cargarHorarios();
                },
                error: function () {
                    alert("Error al actualizar horario.");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_HORARIOS}/${id}`,
            method: "GET",
            success: function (h) {
                cargarCursos();
                cargarAulas();
                setTimeout(() => {
                    $("#horarioId").val(h._id);
                    $("#cursoId").val(h.cursoId);
                    $("#diaSemana").val(h.diaSemana);
                    $("#horaInicio").val(h.horaInicio);
                    $("#horaFin").val(h.horaFin);
                    $("#aulaId").val(h.aula);
                }, 200);

                $("#horarioModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del horario.");
            }
        });
    });


    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Desea eliminar este horario?")) return;

        $.ajax({
            url: `${API_HORARIOS}/${id}`,
            method: "DELETE",
            success: function () {
                cargarHorarios();
            },
            error: function () {
                alert("Error al eliminar horario.");
            }
        });
    });

    $("#cursoFiltro").change(function () {
        const cursoId = $(this).val();

        if (cursoId === "todos") {
            cargarHorarios();
        } else {
            $.ajax({
                url: `${API_HORARIOS}/curso/${cursoId}`,
                method: "GET",
                success: function (horarios) {
                    let filas = "";

                    if (horarios.length === 0) {
                        filas = `
                        <tr>
                            <td colspan="7" class="text-center text-muted">
                                No hay horarios registrados para este curso
                            </td>
                        </tr>`;
                    } else {
                        horarios.forEach(h => {
                            filas += `
                        <tr>
                            <td>${h.curso}</td>
                            <td>${h.diaSemana}</td>
                            <td>${h.horaInicio}</td>
                            <td>${h.horaFin}</td>
                            <td>${h.aula}</td>
                            <td>${new Date(h.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${h._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${h._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>`;
                        });
                    }
                    $("#horariosBody").html(filas);
                },
                error: function () {
                    alert("Error al filtrar horarios");
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


    function cargarAulas() {
        $.ajax({
            url: API_AULA,
            method: "GET",
            success: function (aulas) {
                let opciones = `<option value="" disabled selected>Seleccione un aula</option>`;
                aulas.forEach(a => {
                    opciones += `<option value="${a._id}">
                                ${a.nombre || a.codigo}
                             </option>`;
                });

                $("#aulaId").html(opciones);
            },
            error: function () {
                alert("Error al cargar aulas");
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
