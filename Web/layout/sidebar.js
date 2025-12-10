const sidebar = `
<div class="d-flex flex-column p-3 text-white bg-primary" style="width: 280px; height: 100vh;">
    <h4 class="text-center fw-bold">Sistema Académico</h4>
    <hr>

    <ul class="nav flex-column">
        <li><a data-page="inicio" href="http://localhost:3000/index.html" class="nav-link text-white"><i class="fas fa-home me-2"></i>Inicio</a></li>
        <li><a data-page="profesores" href="http://localhost:3000/module/profesores.html" class="nav-link text-white"><i class="fas fa-chalkboard-teacher me-2"></i>Profesores</a></li>
        <li><a data-page="estudiantes" href="http://localhost:3000/module/estudiantes.html" class="nav-link text-white"><i class="fas fa-user-graduate me-2"></i>Estudiantes</a></li>
        <li><a data-page="cursos" href="http://localhost:3000/module/cursos.html" class="nav-link text-white"><i class="fas fa-book me-2"></i>Cursos</a></li>
        <li><a data-page="inscripciones" href="http://localhost:3000/module/inscripciones.html" class="nav-link text-white"><i class="fas fa-user-check me-2"></i>Inscripciones</a></li>
        <li><a data-page="horarios" href="http://localhost:3000/module/horarios.html" class="nav-link text-white"><i class="fa-solid fa-calendar me-2"></i>Horarios</a></li>
        <li><a data-page="idiomas" href="http://localhost:3000/module/idiomas.html" class="nav-link text-white"><i class="fas fa-language me-2"></i>Idiomas</a></li>
        <li><a data-page="niveles" href="http://localhost:3000/module/niveles.html" class="nav-link text-white"><i class="fas fa-layer-group me-2"></i>Niveles</a></li>
        <li><a data-page="sedes" href="http://localhost:3000/module/sedes.html" class="nav-link text-white"><i class="fas fa-building me-2"></i>Sedes</a></li>
        <li><a data-page="roles" href="http://localhost:3000/module/roles.html" class="nav-link text-white"><i class="fas fa-user-shield me-2"></i>Roles</a></li>
        <li><a data-page="usuarios" href="http://localhost:3000/module/usuarios.html" class="nav-link text-white"><i class="fas fa-users me-2"></i>Usuarios</a></li>
        <li><a data-page="asistencias" href="http://localhost:3000/module/asistencias.html" class="nav-link text-white"><i class="fas fa-clipboard-check me-2"></i>Asistencia</a></li>
        <li><a data-page="evaluaciones" href="http://localhost:3000/module/evaluaciones.html" class="nav-link text-white"><i class="fas fa-file-alt me-2"></i>Evaluaciones</a></li>
    </ul>

    <hr>
     <button onclick="cerrarSesion()" class="btn btn-danger w-100">
        <i class="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
    </button>
</div>
`;

const sidebarContainer = $("#sidebar");
sidebarContainer.append(sidebar);

const currentPage = $('body').data('page');
$(`.nav-link[data-page="${currentPage}"]`).addClass('active');
