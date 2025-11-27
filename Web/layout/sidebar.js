const sidebar = `
<div class="d-flex flex-column p-3 text-white bg-primary" style="width: 280px; height: 100vh;">
    <h4 class="text-center fw-bold">Sistema Académico</h4>
    <hr>

    <ul class="nav flex-column">
        <li><a data-page="inicio" href="/BDNoSQL_Proyecto/Web/index.html" class="nav-link text-white"><i class="fas fa-home me-2"></i>Inicio</a></li>
        <li><a data-page="profesores" href="/BDNoSQL_Proyecto/Web/module/profesores.html" class="nav-link text-white"><i class="fas fa-chalkboard-teacher me-2"></i>Profesores</a></li>
        <li><a data-page="estudiantes" href="/BDNoSQL_Proyecto/Web/module/estudiantes.html" class="nav-link text-white"><i class="fas fa-user-graduate me-2"></i>Estudiantes</a></li>
        <li><a href="/BDNoSQL_Proyecto/Web/module/cursos.html" class="nav-link text-white"><i class="fas fa-book me-2"></i>Cursos</a></li>
        <li><a href="/BDNoSQL_Proyecto/Web/module/horarios.html" class="nav-link text-white"><i class="fas fa-calendar-alt me-2"></i>Horarios</a></li>
        <li><a href="/BDNoSQL_Proyecto/Web/module/pagos.html" class="nav-link text-white"><i class="fas fa-money-check-dollar me-2"></i>Pagos</a></li>
    </ul>

    <hr>
</div>
`;

const sidebarContainer = $("#sidebar");
sidebarContainer.append(sidebar);

const currentPage = $('body').data('page');
$(`.nav-link[data-page="${currentPage}"]`).addClass('active');
