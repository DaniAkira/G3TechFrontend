import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../projectCard/ProjectCard';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/project')
            .then(response => {
                console.log(response.data);
                setProjects(response.data);
            })
            .catch(error => console.error('Erro ao buscar projetos:', error));
    }, []);

    const handleProjectDelete = (projectId) => {
        setProjects(projects.filter(project => project._id !== projectId));
    }

    return (
        <div className="project-list">
            {projects.map(project => (
                <ProjectCard key={project._id} project={project} onDelete={handleProjectDelete}/>
            ))}
        </div>
    );
}

export default ProjectList;