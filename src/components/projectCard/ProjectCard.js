import React, { useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../contexts/MessageContext';
import './ProjectCard.css';

const ProjectCard = ({ project, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setMessage } = useContext(MessageContext);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleView = () => {
        navigate(`/project/${project._id}`, { state: { project } });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/project/${project._id}`)
            .then(response => {
                console.log(response.message);
                if (response.status === 200) {
                    console.log(`Projeto ${project.name} deletado`);
                    setMessage('Projeto excluido com sucesso.');
                    onDelete(project._id);
                } else {
                    console.error('Erro ao deletar o projeto:', response.statusText);
                }
            })
            .catch(error => console.error('Erro ao buscar projetos:', error));
        closeModal();
    };


    return (
        <div className="project-card">
            <div className='card-first-section'>
                <p>{project.name}</p>
                <div className="project-actions">
                    <button onClick={handleView} className="view-btn">
                        <img 
                            src='assets/search.png'
                            alt="view-btn"
                        ></img>
                    </button>
                    <button onClick={openModal} className="delete-btn">
                        <img 
                            src='assets/trash.png'
                            alt="trash-btn"
                        ></img>
                    </button>
                </div>
            </div>
            <div className='card-second-section'>
                <p className='card-project-description'>{project.description}</p>
                <div className="project-dates">
                    <p>Início:</p>
                    <span> {new Date(project.start_date).toLocaleDateString()}</span>
                    <p>Entrega:</p>
                    <span> {new Date(project.end_date).toLocaleDateString()}</span>
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Delete"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Deletar o projeto {project.name}?</h2>
                <div className="modal-actions">
                    <button onClick={closeModal} className="modal-button">
                        Cancelar
                    </button>
                    <button onClick={handleDelete} className="modal-button">
                        Deletar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default ProjectCard;