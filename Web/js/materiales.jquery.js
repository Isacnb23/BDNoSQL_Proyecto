$(document).ready(function () {

    const APIURL = "http://localhost:3000/api/materiales";
    const CURSOS_URL = "http://localhost:3000/api/cursos";

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
                $("#cursoFiltro").html('<option value="todos">Todos los cursos</option>' + opciones);
            },
            error: function () {
                alert("Error al cargar cursos");
            }
        });
    }

    function cargarMateriales(cursoFiltro = "todos") {
        $.ajax({
            url: APIURL,
            method: "GET",
            success: function (materiales) {
                let filas = "";

                materiales.forEach(m => {
                    // Filtrar por curso si se seleccionó uno
                    if (cursoFiltro !== "todos" && m.cursoId !== cursoFiltro) {
                        return;
                    }

                    // Icono según el tipo de material
                    let iconoTipo = '';
                    switch(m.tipo) {
                        case 'PDF':
                            iconoTipo = '<i class="fas fa-file-pdf text-danger"></i>';
                            break;
                        case 'Video':
                            iconoTipo = '<i class="fas fa-video text-primary"></i>';
                            break;
                        case 'Audio':
                            iconoTipo = '<i class="fas fa-volume-up text-info"></i>';
                            break;
                        case 'Enlace':
                            iconoTipo = '<i class="fas fa-link text-success"></i>';
                            break;
                        case 'Libro Digital':
                            iconoTipo = '<i class="fas fa-book text-warning"></i>';
                            break;
                    }

                    filas += `
                        <tr>
                            <td>${m.curso}</td>
                            <td>${m.nombre}</td>
                            <td>${m.descripcion.substring(0, 50)}${m.descripcion.length > 50 ? '...' : ''}</td>
                            <td>${iconoTipo} ${m.tipo}</td>
                            <td>
                                <a href="${m.url}" target="_blank" class="btn btn-sm btn-info">
                                    <i class="fas fa-external-link-alt"></i> Abrir
                                </a>
                            </td>
                            <td>${new Date(m.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${m._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${m._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#materialesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los materiales");
            }
        });
    }

    cargarMateriales();
    cargarCursos();

    // Filtro por curso
    $("#cursoFiltro").change(function() {
        const cursoSeleccionado = $(this).val();
        cargarMateriales(cursoSeleccionado);
    });

    $("#agregarMaterialBtn").click(function () {
        $("#materialForm")[0].reset();
        $("#materialId").val("");
        $("#materialModalLabel").text("Agregar Material");
        cargarCursos();
    });

    $("#guardarMaterial").click(function () {
        const material = {
            nombre: $("#nombre").val(),
            descripcion: $("#descripcion").val(),
            tipo: $("#tipo").val(),
            url: $("#url").val(),
            cursoId: $("#cursoId").val()
        };

        const id = $("#materialId").val();

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: APIURL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(material),
                success: function () {
                    $("#materialModal").modal("hide");
                    cargarMateriales();
                    alert("Material agregado exitosamente");
                },
                error: function () {
                    alert("Error al crear material");
                }
            });
        } else {
            // ===== EDITAR =====
            $.ajax({
                url: `${APIURL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(material),
                success: function () {
                    $("#materialModal").modal("hide");
                    cargarMateriales();
                    alert("Material actualizado exitosamente");
                },
                error: function () {
                    alert("Error al actualizar material");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "GET",
            success: function (m) {
                cargarCursos();
                
                $("#materialId").val(m._id);
                $("#nombre").val(m.nombre);
                $("#descripcion").val(m.descripcion);
                $("#tipo").val(m.tipo);
                $("#url").val(m.url);
                $("#cursoId").val(m.cursoId);

                $("#materialModalLabel").text("Editar Material");
                $("#materialModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del material");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este material?")) return;

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "DELETE",
            success: function () {
                cargarMateriales();
                alert("Material eliminado exitosamente");
            },
            error: function () {
                alert("Error al eliminar material");
            }
        });
    });

});