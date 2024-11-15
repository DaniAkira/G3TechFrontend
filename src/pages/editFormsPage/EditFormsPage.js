import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageContext } from "../../contexts/MessageContext";
import Modal from 'react-modal';
import axios from "axios";
import './EditFormsPage.css';

const EditFormsPage = () => {
  const { state } = useLocation();
  const project = state?.project;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { message, setMessage } = useContext(MessageContext);
  const [projectName, setProjectName] = useState(project.name || '');
  const [projectManager, setProjectManager] = useState(project.project_manager || '');
  const [description, setDescription] = useState(project.description || '');
  const [tasks, setTasks] = useState(project.tasks);
  const [startDate, setStartDate] = useState(project.start_date ? project.start_date.split('T')[0] : '');
  const [endDate, setEndDate] = useState(project.end_date ? project.end_date.split('T')[0] : '');
  const [taskId, setTaskId] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { name: '', description: '', isNew: true }]);
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = () => {
    console.log(taskId);
    axios.delete(`http://localhost:3000/project/${project._id}/tasks/${taskId}`)
      .then(response => {
        if (response.status === 200) {
          setMessage('Tarefa excluida com sucesso.');
          navigate('/');
        } else {
          console.error('Erro ao deletar tarefa:', response.statusText);
        }
      })
      .catch(error => console.error('Erro ao buscar projetos:', error));
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTasks = tasks.filter(task => task.isNew);
    const existingTasks = tasks.filter(task => !task.isNew);

    const projectData = {
      name: projectName,
      project_manager: projectManager,
      description: description,
      start_date: startDate,
      end_date: endDate,
      tasks: existingTasks.map(task => ({
        name: task.name,
        description: task.description
      }))
    };
    console.log({ projectData });
    if (
      !projectData.name ||
      !projectData.project_manager ||
      !projectData.description ||
      !projectData.start_date ||
      !projectData.end_date ||
      !projectData.tasks
    ) {
      setMessage('Todos os campos são obrigatórios..');
    } else {
      try {
        if (newTasks.length > 0) {
          for (const newTask of newTasks) {
            if (!newTask.name || !newTask.description) {
              console.error('Nova tarefa inválida:', newTask);
              throw new Error('Nova tarefa inválida. Verifique se todas as novas tarefas têm nome e descrição.');
            }

            const newTaskData = {
              task: {
                name: newTask.name,
                description: newTask.description
              }
            };
    
            console.log(`newTaskData: ${newTaskData}`);
    
            const responseNewTask = await axios.post(
              `http://localhost:3000/project/${project._id}/tasks`, 
              newTaskData,
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
            );
    
            console.log('responseNewTask status:', responseNewTask.status);
            console.log('responseNewTask data:', responseNewTask.data);
    
            if (responseNewTask.status !== 201) {
              throw new Error('Erro ao adicionar novas tasks');
            }
          }
        }

        const response = await axios.patch(`http://localhost:3000/project/${project._id}`, projectData);
        console.log(response.status);
        if (response.status === 200) {
          console.log('Projeto editado com sucesso!');
          setMessage('Projeto editado com sucesso!');
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao editar o projeto:', error);
      };
    }
  };


  return (
    <div>
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}
      <Header />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className='forms-label project-name'>
          <label>Nome do Projeto</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className='forms-label project-manager'>
          <label>Nomes dos responsáveis</label>
          <input
            type="text"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
          />
        </div>
        <div className='forms-label project-description'>
          <label>Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='forms-label tasks'>
          <label>Tasks</label>
          {tasks.map((task, index) => (
            <div key={index} className="task">
              <div className="task-title">
                <p>{task.name}</p>
                <button type="button" onClick={() => {
                  openModal();
                  setTaskId(task._id);
                }} className="trash-btn">
                  <img
                    src='../assets/trash.png'
                    alt="trash-btn"
                  ></img>
                </button>
              </div>
              <input
                type="text"
                value={task.name}
                onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                value={task.description}
                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
              />
            </div>
          ))}
          <button className='new-task-btn' type="button" onClick={handleAddTask}>
            Adicionar nova tarefa
            <img
              src='../assets/plus.png'
              alt="plusbtn"
            ></img>
          </button>
        </div>
        <div className='forms-label start-date'>
          <label>Data de início</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className='forms-label end-date'>
          <label>Data de entrega</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button type="submit">Concluir</button>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Deletar a tarefa { }?</h2>
        <div className="modal-actions">
          <button onClick={closeModal} className="modal-button">
            Cancelar
          </button>
          <button onClick={handleDeleteTask} className="modal-button">
            Deletar
          </button>
        </div>
      </Modal>
    </div>
  )
};

export default EditFormsPage;