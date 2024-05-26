import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/style.css';
import App from './App';
import MovieDetails from './components/MovieDetails';

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/movie-database-site">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
