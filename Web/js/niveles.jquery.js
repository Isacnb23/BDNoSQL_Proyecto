$(document).ready(function () {

    const API_NIVELES = "http://localhost:3000/api/niveles";

    function cargarNiveles() {
        $.ajax({
            url: API_NIVELES,
            method: "GET",
            success: function (niveles) {
                let filas = "";

                niveles.forEach(n => {
                    filas += `
                        <tr>
                            <td>${n.nombre}</td>
                            <td>${n.descripcion}</td>
                            <td>${n.duracion}</td>
                            <td>${new Date(n.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${n._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${n._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#nivelesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los niveles");
            }
        });
    }

    cargarNiveles();

    $("#agregarNivelBtn").click(function () {
        $("#nivelForm")[0].reset();
        $("#nivelId").val("");
        $("#nivelModalLabel").text("Agregar Nivel");
    });

    $("#guardarNivel").click(function () {

        const nivel = {
            nombre: $("#nombre").val(),
            descripcion: $("#descripcion").val(),
            duracion: parseInt($("#duracion").val())
        };

        const id = $("#nivelId").val();

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: API_NIVELES,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(nivel),
                success: function () {
                    $("#nivelModal").modal("hide");
                    cargarNiveles();
                },
                error: function () {
                    alert("Error al crear nivel");
                }
            });

        } else {
            
            $.ajax({
                url: `${API_NIVELES}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(nivel),
                success: function () {
                    $("#nivelModal").modal("hide");
                    cargarNiveles();
                },
                error: function () {
                    alert("Error al actualizar nivel");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_NIVELES}/${id}`,
            method: "GET",
            success: function (nivel) {
                $("#nivelId").val(nivel._id);
                $("#nombre").val(nivel.nombre);
                $("#descripcion").val(nivel.descripcion);
                $("#duracion").val(nivel.duracion);
                
                $("#nivelModalLabel").text("Editar Nivel");
                $("#nivelModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del nivel");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este nivel?")) return;

        $.ajax({
            url: `${API_NIVELES}/${id}`,
            method: "DELETE",
            success: function () {
                cargarNiveles();
            },
            error: function () {
                alert("Error al eliminar el nivel");
            }
        });
    });

});