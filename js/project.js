// Datos de proyectos (para facilitar actualizaciones)
const projectsData = [
    {
        title: 'Proyecto 1',
        description: 'Aplicación web desarrollada con React y Node.js que permite gestionar tareas de manera colaborativa.',
        image: 'images/projects/proyecto1.jpg',
        github: '#',
        demo: '#',
        technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
        title: 'Proyecto 2',
        description: 'E-commerce completo con carrito de compras, autenticación y pasarela de pagos integrada.',
        image: 'images/projects/proyecto2.jpg',
        github: '#',
        demo: '#',
        technologies: ['Vue.js', 'Express', 'PostgreSQL']
    },
    {
        title: 'Proyecto 3',
        description: 'App responsive para clima y noticias, consumiendo APIs externas en tiempo real.',
        image: 'images/projects/proyecto3.jpg',
        github: '#',
        demo: '#',
        technologies: ['JavaScript', 'API REST', 'CSS3']
    }
];

// Función para cargar proyectos dinámicamente
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const technologies = project.technologies.map(tech => 
            `<span class="skill-tag" style="margin-right: 0.5rem; margin-bottom: 0.5rem;">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div style="margin-bottom: 1rem;">
                    ${technologies}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> Código
                    </a>
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Cargar proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProjects);