$(document).ready(function () {

    const API_AULAS = "http://localhost:3000/api/aulas";
    const API_SEDES = "http://localhost:3000/api/sedes"; 
    // ← Asumo que tenés un endpoint de sedes (porque aula usa sedeId)

    // ============================
    //   CARGAR TODAS LAS AULAS
    // ============================
    function cargarAulas() {
        $.ajax({
            url: API_AULAS,
            method: "GET",
            success: function (aulas) {
                let filas = "";

                aulas.forEach(a => {
                    filas += `
                        <tr>
                            <td>${a.nombre}</td>
                            <td>${a.capacidad}</td>
                            <td>${a.sedeId}</td>
                            <td>${a.equipamiento.join(", ")}</td>
                            <td>${new Date(a.fechaCreacion).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-warning btn-sm editar" data-id="${a._id}">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm eliminar" data-id="${a._id}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

                $("#aulasBody").html(filas);
            },
            error: function () {
                alert("Error al cargar las aulas");
            }
        });
    }

    cargarAulas();

    // ============================
    //   BOTÓN AGREGAR AULA
    // ============================
    $("#agregarAulaBtn").click(function () {
        $("#aulaForm")[0].reset();
        $("#aulaId").val("");
        $("#aulaModalLabel").text("Agregar Aula");

        cargarSedes();
    });

    // ============================
    //    GUARDAR AULA (POST / PUT)
    // ============================
    $("#guardarAula").click(function () {

        const aula = {
            nombre: $("#nombre").val(),
            capacidad: $("#capacidad").val(),
            sedeId: $("#sedeId").val(),
            equipamiento: $("#equipamiento").val().split(",")  // separa por coma
        };

        const id = $("#aulaId").val();

        if (id === "") {
            // ------- CREAR -------
            $.ajax({
                url: API_AULAS,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(aula),
                success: function () {
                    $("#aulaModal").modal("hide");
                    cargarAulas();
                },
                error: function () {
                    alert("Error al crear aula");
                }
            });

        } else {
            // ------- EDITAR -------
            $.ajax({
                url: `${API_AULAS}/${id}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(aula),
                success: function () {
                    $("#aulaModal").modal("hide");
                    cargarAulas();
                },
                error: function () {
                    alert("Error al actualizar aula");
                }
            });
        }
    });

    // ============================
    //   EDITAR AULA (GET por ID)
    // ============================
    $(document).on("click", ".editar", function () {
        const id = $(this).data("id");

        $.ajax({
            url: `${API_AULAS}/${id}`,
            method: "GET",
            success: function (aula) {

                cargarSedes();
                setTimeout(() => {
                    $("#nombre").val(aula.nombre);
                    $("#capacidad").val(aula.capacidad);
                    $("#sedeId").val(aula.sedeId);
                    $("#equipamiento").val(aula.equipamiento.join(","));
                    $("#aulaId").val(aula._id);
                }, 200);

                $("#aulaModal").modal("show");
            },
            error: function () {
                alert("Error al cargar datos del aula");
            }
        });
    });

    // ============================
    //       ELIMINAR AULA
    // ============================
    $(document).on("click", ".eliminar", function () {
        const id = $(this).data("id");

        if (!confirm("¿Seguro que desea eliminar esta aula?")) return;

        $.ajax({
            url: `${API_AULAS}/${id}`,
            method: "DELETE",
            success: function () {
                cargarAulas();
            },
            error: function () {
                alert("Error al eliminar aula");
            }
        });
    });


    // ============================
    //        CARGAR SEDES
    // ============================
    function cargarSedes() {
        $.ajax({
            url: API_SEDES,
            method: "GET",
            success: function (sedes) {
                let opciones = "<option value='' disabled selected>Seleccione una sede</option>";
                sedes.forEach(s => {
                    opciones += `<option value="${s._id}">${s.nombre}</option>`;
                });
                $("#sedeId").html(opciones);
            },
            error: function () {
                alert("Error al cargar sedes");
            }
        });
    }

});
