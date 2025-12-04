$(document).ready(function () {

    const API_CURSOS = "http://localhost:3000/api/cursos";
    const API_IDIOMAS = "http://localhost:3000/api/idiomas";
    const API_NIVELES = "http://localhost:3000/api/niveles";
    const API_PROFESORES = "http://localhost:3000/api/profesores";


    function cargarCursos() {
        $.ajax({
            url: API_CURSOS,
            method: "GET",
            success: function (cursos) {
                let filas = "";

                cursos.forEach(c => {
                    filas += `
                        <tr>
                            <td>${c.nombre}</td>
                            <td>${c.descripcion}</td>
                            <td>${c.idioma}</td>
                            <td>${c.nivel}</td>
                            <td>${c.profesor}</td>
                            <td>${new Date(c.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${c._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${c._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#cursosBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los cursos");
            }
        });
    }

    cargarCursos();

    $("#agregarCursoBtn").click(function () {
        $("#cursoForm")[0].reset();
        $("#cursoId").val("");
        $("#cursoModalLabel").text("Agregar Curso");

        cargarIdiomas();
        cargarNiveles();
        cargarProfesores();
    });

    $("#guardarCurso").click(function () {

        const curso = {
            nombre: $("#nombre").val(),
            descripcion: $("#descripcion").val(),
            idiomaId: $("#idiomaId").val(),
            nivelId: $("#nivelId").val(),
            profesorId: $("#profesorId").val()
        };

        const id = $("#cursoId").val(); // hidden input

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: API_CURSOS,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(curso),
                success: function () {
                    $("#cursoModal").modal("hide");
                    cargarCursos();
                },
                error: function () {
                    alert("Error al crear curso");
                }
            });

        } else {
            // ===== EDITAR =====
            $.ajax({
                url: `${API_CURSOS}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(curso),
                success: function () {
                    $("#cursoModal").modal("hide");
                    cargarCursos();

                },
                error: function () {
                    alert("Error al actualizar curso");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_CURSOS}/${id}`,
            method: "GET",
            success: function (curso) {
                cargarIdiomas();
                cargarNiveles();
                cargarProfesores();
                // Sin el delay no se muestran los selects, entonces hay que ponerle un timeOut para que carguen 
                setTimeout(() => {
                    $("#nombre").val(curso.nombre);
                    $("#descripcion").val(curso.descripcion);
                    $("#idiomaId").val(curso.idiomaId);
                    $("#nivelId").val(curso.nivelId);
                    $("#profesorId").val(curso.profesorId);
                }, 200);

                // Mostrar modal
                $("#cursoModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del curso");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este curso?")) return;

        $.ajax({
            url: `${API_CURSOS}/${id}`,
            method: "DELETE",
            success: function () {
                cargarCursos();
            },
            error: function () {
                alert("Error al eliminar el curso");
            }
        });
    });


    function cargarIdiomas() {
        $.ajax({
            url: API_IDIOMAS,
            method: "GET",
            success: function (idiomas) {
                let opciones = "<option value='' disabled selected>Seleccione un idioma</option>";
                idiomas.forEach(i => {
                    opciones += `<option value="${i._id}">${i.nombre}</option>`;
                });
                $("#idiomaId").html(opciones);
            },
            error: function () {
                alert("Error al cargar idiomas");
            }
        });
    }

    function cargarNiveles() {
        $.ajax({
            url: API_NIVELES,
            method: "GET",
            success: function (niveles) {
                let opciones = "<option value='' disabled selected>Seleccione un nivel</option>";
                niveles.forEach(n => {
                    opciones += `<option value="${n._id}">${n.nombre}</option>`;
                });
                $("#nivelId").html(opciones);
            },
            error: function () {
                alert("Error al cargar niveles");
            }
        });
    }

    function cargarProfesores() {
        $.ajax({
            url: API_PROFESORES,
            method: "GET",
            success: function (profesores) {
                let opciones = "<option value='' disabled selected>Seleccione un profesor</option>";
                profesores.forEach(p => {
                    opciones += `<option value="${p._id}">${p.nombre} ${p.apellido}</option>`;
                });
                $("#profesorId").html(opciones);
            },
            error: function () {
                alert("Error al cargar profesores");
            }
        });
    }

});
