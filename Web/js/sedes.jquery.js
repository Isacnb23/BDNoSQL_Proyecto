$(document).ready(function () {

    const API_SEDES = "http://localhost:3000/api/sedes";

    function cargarSedes() {
        $.ajax({
            url: API_SEDES,
            method: "GET",
            success: function (sedes) {
                let filas = "";

                sedes.forEach(s => {
                    filas += `
                        <tr>
                            <td>${s.nombre}</td>
                            <td>${s.direccion}</td>
                            <td>${s.telefono}</td>
                            <td>${s.ciudad}</td>
                            <td>${new Date(s.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${s._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${s._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#sedesBody").html(filas);
            },
            error: function () {
                alert("Error al cargar las sedes");
            }
        });
    }

    cargarSedes();

    $("#agregarSedeBtn").click(function () {
        $("#sedeForm")[0].reset();
        $("#sedeId").val("");
        $("#sedeModalLabel").text("Agregar Sede");
    });

    $("#guardarSede").click(function () {

        const sede = {
            nombre: $("#nombre").val(),
            direccion: $("#direccion").val(),
            telefono: $("#telefono").val(),
            ciudad: $("#ciudad").val()
        };

        const id = $("#sedeId").val();

        if (id === "") {
            
            $.ajax({
                url: API_SEDES,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(sede),
                success: function () {
                    $("#sedeModal").modal("hide");
                    cargarSedes();
                },
                error: function () {
                    alert("Error al crear sede");
                }
            });

        } else {
            
            $.ajax({
                url: `${API_SEDES}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(sede),
                success: function () {
                    $("#sedeModal").modal("hide");
                    cargarSedes();
                },
                error: function () {
                    alert("Error al actualizar sede");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_SEDES}/${id}`,
            method: "GET",
            success: function (sede) {
                $("#sedeId").val(sede._id);
                $("#nombre").val(sede.nombre);
                $("#direccion").val(sede.direccion);
                $("#telefono").val(sede.telefono);
                $("#ciudad").val(sede.ciudad);
                
                $("#sedeModalLabel").text("Editar Sede");
                $("#sedeModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos de la sede");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar esta sede?")) return;

        $.ajax({
            url: `${API_SEDES}/${id}`,
            method: "DELETE",
            success: function () {
                cargarSedes();
            },
            error: function () {
                alert("Error al eliminar la sede");
            }
        });
    });

});
