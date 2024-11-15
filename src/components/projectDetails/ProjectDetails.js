import React from 'react';
import { useLocation } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetails = () => {
    const { state } = useLocation();
    const project = state?.project;

    if (!project) {
        return <div>Projeto não encontrado</div>;
    }

    return (
        <div className='project-details'>
            <div className='project-name-view-card'>
                <h1>{project.name}</h1>
            </div>
            <div className='view-card-details'>
                <h2>Responsável:</h2>
                <p>{project.project_manager}</p>
            </div>
            <div className='view-card-details'>
                <h2>Descrição:</h2>
                <p>{project.description}</p>
            </div>
            <div className='view-card-details'>
                <h2>Tasks:</h2>
                <ul className='tasks-list'>
                    {project.tasks.map((task, index) => (
                        <li className='task-details' key={index}>
                            <h4>{task.name}</h4>
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='view-card-details'>
                <h2>Início/Entrega:</h2>
                <p>{new Date(project.start_date).toLocaleDateString()} - {new Date(project.end_date).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default ProjectDetails;