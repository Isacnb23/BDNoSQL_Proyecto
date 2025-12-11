$(document).ready(function () {

    const APIURL = "http://localhost:3000/api/pagos";
    const ESTUDIANTES_URL = "http://localhost:3000/api/estudiantes";

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

    function cargarPagos() {
        $.ajax({
            url: APIURL,
            method: "GET",
            success: function (pagos) {
                let filas = "";

                pagos.forEach(p => {
                    // Badge de color según el estado
                    let estadoBadge = '';
                    if (p.estado === 'pagado') {
                        estadoBadge = '<span class="badge bg-success">Pagado</span>';
                    } else if (p.estado === 'pendiente') {
                        estadoBadge = '<span class="badge bg-warning text-dark">Pendiente</span>';
                    } else if (p.estado === 'fallido') {
                        estadoBadge = '<span class="badge bg-danger">Fallido</span>';
                    }

                    filas += `
                        <tr>
                            <td>${p.estudiante}</td>
                            <td>$${p.monto.toFixed(2)}</td>
                            <td>${new Date(p.fechaPago).toLocaleDateString()}</td>
                            <td>${p.metodoPago}</td>
                            <td>${estadoBadge}</td>
                            <td>${new Date(p.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${p._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${p._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#pagosBody").html(filas);
            },
            error: function () {
                alert("Error al cargar los pagos");
            }
        });
    }

    cargarPagos();
    cargarEstudiantes();

    $("#agregarPagoBtn").click(function () {
        $("#pagoForm")[0].reset();
        $("#pagoId").val("");
        $("#pagoModalLabel").text("Agregar Pago");
        cargarEstudiantes();
    });

    $("#guardarPago").click(function () {
        const pago = {
            estudianteId: $("#estudianteId").val(),
            monto: parseFloat($("#monto").val()),
            fechaPago: $("#fechaPago").val(),
            metodoPago: $("#metodoPago").val(),
            estado: $("#estado").val()
        };

        const id = $("#pagoId").val();

        if (id === "") {
            // ===== CREAR =====
            $.ajax({
                url: APIURL,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(pago),
                success: function () {
                    $("#pagoModal").modal("hide");
                    cargarPagos();
                    alert("Pago registrado exitosamente");
                },
                error: function () {
                    alert("Error al crear pago");
                }
            });
        } else {
            // ===== EDITAR =====
            $.ajax({
                url: `${APIURL}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(pago),
                success: function () {
                    $("#pagoModal").modal("hide");
                    cargarPagos();
                    alert("Pago actualizado exitosamente");
                },
                error: function () {
                    alert("Error al actualizar pago");
                }
            });
        }
    });

    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "GET",
            success: function (p) {
                cargarEstudiantes();
                
                $("#pagoId").val(p._id);
                $("#estudianteId").val(p.estudianteId);
                $("#monto").val(p.monto);
                $("#fechaPago").val(p.fechaPago.split('T')[0]);
                $("#metodoPago").val(p.metodoPago);
                $("#estado").val(p.estado);

                $("#pagoModalLabel").text("Editar Pago");
                $("#pagoModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del pago");
            }
        });
    });

    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar este pago?")) return;

        $.ajax({
            url: `${APIURL}/${id}`,
            method: "DELETE",
            success: function () {
                cargarPagos();
                alert("Pago eliminado exitosamente");
            },
            error: function () {
                alert("Error al eliminar pago");
            }
        });
    });

});