$(document).ready(function () {

    const APIURL = "http://localhost:3000/api/certificados";
    const ESTUDIANTES_URL = "http://localhost:3000/api/estudiantes";
    const CURSOS_URL = "http://localhost:3000/api/cursos";

    // Cargar estudiantes en el selector
    function cargarEstudiantes() {
        $.ajax({
            url: ESTUDIANTES_URL,
            method: "GET",
            success: function (estudiantes) {
                let opciones = '<option value="">Seleccione un estudiante</option>';
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

    // Cargar cursos en el selector
    function cargarCursos() {
        $.ajax({
            url: CURSOS_URL,
            method: "GET",
            success: function (cursos) {
                let opciones = '<option value="">Seleccione un curso</option>';
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

    function cargarCertificados() {
        $.ajax({
            url: APIURL,
            method: "GET",
            success: function (certificados) {
                let filas = "";

                certificados.forEach(c => {
                    // Badge de color según la nota
                    let notaBadge = '';
                    if (c.notaFinal >= 90) {
                        notaBadge = `<span class="badge bg-success">${c.notaFinal}</span>`;
                    } else if (c.notaFinal >= 70) {
                        notaBadge = `<span class="badge bg-primary">${c.notaFinal}</span>`;
                    } else if (c.notaFinal >= 60) {
                        notaBadge = `<span class="badge bg-warning text-dark">${c.notaFinal}</span>`;
                    } else {
                        notaBadge = `<span class="badge bg-danger">${c.notaFinal}</span>`;
                    }

                    filas += `
                        <tr>
                            <td>${c.estudiante}</td>
                            <td>${c.curso}</td>
                            <td><strong>${c.codigo}</strong></td>
                            <td>${new Date(c.fechaEmision).toLocaleDateString()}</td>
                            <td>${notaBadge}</td>
                            <td>${new Date(c.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-info btn-sm ver" data-id="${c._id}">
                                    <i class="fa fa-eye"></i>
                                </button>
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

                $("#certificadosBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los certificados");
            }
        });
    }

    cargarCertificados();

    $("#agregarCertificadoBtn").click(function () {
        $("#certificadoForm")[0].reset();
        $("#certificadoId").val("");
        $("#certificadoModalLabel").text("Emitir Nuevo Certificado");
        cargarEstudiantes();
        cargarCursos();
    });

    $("#guardarCertificado").click(function () {
        const certificado = {
            estudianteId: $("#estudianteId").val(),
            cursoId: $("#cursoId").val(),
            fechaEmision: $("#fechaEmision").val(),
            codigo: $("#codigo").val(),
            notaFinal: parseFloat($("#notaFinal").val())
        };

        const id = $("#certificadoId").val();

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: APIURL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(certificado),
                success: function () {
                    $("#certificadoModal").modal("hide");
                    cargarCertificados();
                    alert("Certificado emitido exitosamente");
                },
                error: function (xhr) {
                    if (xhr.responseJSON && xhr.responseJSON.mesaje) {
                        alert("Error: " + xhr.responseJSON.mesaje);
                    } else {
                        alert("Error al crear certificado");
                    }
                }
            });
        } else {
            // ===== EDITAR =====
            $.ajax({
                url: `${APIURL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(certificado),
                success: function () {
                    $("#certificadoModal").modal("hide");
                    cargarCertificados();
                    alert("Certificado actualizado exitosamente");
                },
                error: function () {
                    alert("Error al actualizar certificado");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "GET",
            success: function (c) {
                cargarEstudiantes();
                cargarCursos();
                
                $("#certificadoId").val(c._id);
                $("#estudianteId").val(c.estudianteId);
                $("#cursoId").val(c.cursoId);
                $("#fechaEmision").val(c.fechaEmision.split('T')[0]);
                $("#codigo").val(c.codigo);
                $("#notaFinal").val(c.notaFinal);

                $("#certificadoModalLabel").text("Editar Certificado");
                $("#certificadoModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del certificado");
            }
        });
    });

    $(document).on("click", ".ver", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "GET",
            success: function (c) {
                alert(`Certificado\n\nCódigo: ${c.codigo}\nNota Final: ${c.notaFinal}\nFecha de Emisión: ${new Date(c.fechaEmision).toLocaleDateString()}`);
            },
            error: function () {
                alert("Error al cargar datos del certificado");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este certificado?")) return;

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "DELETE",
            success: function () {
                cargarCertificados();
                alert("Certificado eliminado exitosamente");
            },
            error: function () {
                alert("Error al eliminar certificado");
            }
        });
    });

    // Generar código automático
    $("#generarCodigo").click(function() {
        const cursoSelect = $("#cursoId option:selected").text();
        const cursoAbrev = cursoSelect.substring(0, 3).toUpperCase();
        const año = new Date().getFullYear();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const codigo = `${cursoAbrev}-${año}-${random}`;
        $("#codigo").val(codigo);
    });

});