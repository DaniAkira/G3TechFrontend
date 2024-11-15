import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import ProjectDetails from "../../components/projectDetails/ProjectDetails";
import './ProjectDetailsPage.css';

const ProjectDetailsPage = () => {
    const { state } = useLocation();
    const project = state?.project;
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/edit-project/${project._id}`, { state: { project } });
    };

    return (
        <div>
            <Header />
            <ProjectDetails />
            <div className="buttons">
                <button onClick={() => navigate('/')}>Voltar</button>
                <button onClick={() => handleView()}>Editar</button>
            </div>
        </div>
    )
}

export default ProjectDetailsPage;