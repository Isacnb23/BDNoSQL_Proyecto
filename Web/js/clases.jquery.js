$(document).ready(function () {

    const API_CLASES = "http://localhost:3000/api/clases";
    const API_CURSOS = "http://localhost:3000/api/cursos";
    const API_PROFESORES = "http://localhost:3000/api/profesores";


    // ============================
    //   CARGAR TODAS LAS CLASES
    // ============================
    function cargarClases() {
        $.ajax({
            url: API_CLASES,
            method: "GET",
            success: function (clases) {
                let filas = "";

                clases.forEach(c => {
                    filas += `
                        <tr>
                            <td>${c.cursoId}</td>
                            <td>${new Date(c.fecha).toLocaleDateString()}</td>
                            <td>${c.tema}</td>
                            <td>${c.descripcion}</td>
                            <td>${c.profesorId}</td>
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

                $("#clasesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar las clases");
            }
        });
    }

    cargarClases();


    // ============================
    //   BOTÓN AGREGAR CLASE
    // ============================
    $("#agregarClaseBtn").click(function () {
        $("#claseForm")[0].reset();
        $("#claseId").val("");
        $("#claseModalLabel").text("Agregar Clase");

        cargarCursos();
        cargarProfesores();
    });


    // ============================
    //     GUARDAR (POST / PUT)
    // ============================
    $("#guardarClase").click(function () {

        const clase = {
            cursoId: $("#cursoId").val(),
            fecha: $("#fecha").val(),
            tema: $("#tema").val(),
            descripcion: $("#descripcion").val(),
            profesorId: $("#profesorId").val()
        };

        const id = $("#claseId").val();

        if (id === "") {
            // CREAR
            $.ajax({
                url: API_CLASES,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(clase),
                success: function () {
                    $("#claseModal").modal("hide");
                    cargarClases();
                },
                error: function () {
                    alert("Error al crear la clase");
                }
            });

        } else {
            // EDITAR
            $.ajax({
                url: `${API_CLASES}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(clase),
                success: function () {
                    $("#claseModal").modal("hide");
                    cargarClases();
                },
                error: function () {
                    alert("Error al actualizar clase");
                }
            });
        }
    });



    // ============================
    //   EDITAR - CARGAR POR ID
    // ============================
    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_CLASES}/${id}`,
            method: "GET",
            success: function (clase) {

                cargarCursos();
                cargarProfesores();

                // Espera para llenar selects
                setTimeout(() => {
                    $("#cursoId").val(clase.cursoId);
                    $("#fecha").val(clase.fecha.split("T")[0]);
                    $("#tema").val(clase.tema);
                    $("#descripcion").val(clase.descripcion);
                    $("#profesorId").val(clase.profesorId);
                    $("#claseId").val(clase._id);
                }, 200);

                $("#claseModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos de la clase");
            }
        });
    });



    // ============================
    //         ELIMINAR
    // ============================
    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar esta clase?")) return;

        $.ajax({
            url: `${API_CLASES}/${id}`,
            method: "DELETE",
            success: function () {
                cargarClases();
            },
            error: function () {
                alert("Error al eliminar clase");
            }
        });
    });



    // ============================
    //      CARGAR CURSOS
    // ============================
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


    // ============================
    //    CARGAR PROFESORES
    // ============================
    function cargarProfesores() {
        $.ajax({
            url: API_PROFESORES,
            method: "GET",
            success: function (profesores) {
                let opciones = "<option disabled selected>Seleccione un profesor</option>";
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
