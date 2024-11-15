import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/homePage/HomePage';
import FormPage from '../pages/formPage/FormPage';
import ProjectDetailsPage from '../pages/projectDetailsPage/ProjectDetailsPage';
import EditFormsPage from '../pages/editFormsPage/EditFormsPage';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route path="/registerProject" element={<FormPage/>} />
                <Route path="/project/:id" element={<ProjectDetailsPage />} />
                <Route path="/edit-project/:id" element={<EditFormsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Rotas };