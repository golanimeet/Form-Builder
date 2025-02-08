import React from 'react';
import './Components/style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from "./Components/Layout";
import Dashboard from './Components/Dashboard';
import Forms from './Components/Forms';


function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/templates" element={<h1>Templates Page</h1>} />
            <Route path="/submissions" element={<h1>Submissions Page</h1>} />
            <Route path="/logout" element={<h1>Logout Page</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
