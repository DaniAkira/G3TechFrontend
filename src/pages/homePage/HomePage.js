import React, { useContext, useEffect } from 'react';
import Header from '../../components/header/Header';
import ProjectList from '../../components/projectList/ProjectList';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { MessageContext } from '../../contexts/MessageContext';

const HomePage = () => {
    const navigate = useNavigate();

    const { message, setMessage } = useContext(MessageContext);

    useEffect(() => {
        if (message) {
        const timer = setTimeout(() => {
            setMessage('');
        }, 2000);

        return () => clearTimeout(timer);
        }
    }, [message, setMessage]);

    const handleAddProjectClick = () => {
        navigate('/registerProject');
    }

    return (
        <div className="home-page">
        {message && (
            <div className="success-message">
                {message}
            </div>
        )}
            <Header />
            <div className="add-project-section">
                <button className="add-project-btn" onClick={handleAddProjectClick}>Adicionar novo projeto</button>
            </div>
            <ProjectList />
        </div>
    );
}

export default HomePage;