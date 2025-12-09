$(document).ready(function () {

    const API_IDIOMAS = "http://localhost:3000/api/idiomas";

    function cargarIdiomas() {
        $.ajax({
            url: API_IDIOMAS,
            method: "GET",
            success: function (idiomas) {
                let filas = "";

                idiomas.forEach(i => {
                    filas += `
                        <tr>
                            <td>${i.nombre}</td>
                            <td>${i.codigo}</td>
                            <td>${i.pais}</td>
                            <td>${new Date(i.fechaCreacion).toLocaleDateString()}</td>
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

                $("#idiomasBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los idiomas");
            }
        });
    }

    cargarIdiomas();

    $("#agregarIdiomaBtn").click(function () {
        $("#idiomaForm")[0].reset();
        $("#idiomaId").val("");
        $("#idiomaModalLabel").text("Agregar Idioma");
    });

    $("#guardarIdioma").click(function () {

        const idioma = {
            nombre: $("#nombre").val(),
            codigo: $("#codigo").val(),
            pais: $("#pais").val()
        };

        const id = $("#idiomaId").val();

        if (id === "") {
            
            $.ajax({
                url: API_IDIOMAS,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(idioma),
                success: function () {
                    $("#idiomaModal").modal("hide");
                    cargarIdiomas();
                },
                error: function () {
                    alert("Error al crear idioma");
                }
            });

        } else {
            
            $.ajax({
                url: `${API_IDIOMAS}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(idioma),
                success: function () {
                    $("#idiomaModal").modal("hide");
                    cargarIdiomas();
                },
                error: function () {
                    alert("Error al actualizar idioma");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_IDIOMAS}/${id}`,
            method: "GET",
            success: function (idioma) {
                $("#idiomaId").val(idioma._id);
                $("#nombre").val(idioma.nombre);
                $("#codigo").val(idioma.codigo);
                $("#pais").val(idioma.pais);
                
                $("#idiomaModalLabel").text("Editar Idioma");
                $("#idiomaModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del idioma");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este idioma?")) return;

        $.ajax({
            url: `${API_IDIOMAS}/${id}`,
            method: "DELETE",
            success: function () {
                cargarIdiomas();
            },
            error: function () {
                alert("Error al eliminar el idioma");
            }
        });
    });

});