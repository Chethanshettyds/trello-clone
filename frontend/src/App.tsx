import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './components/Home/Home';
import Board from './components/Board/Board';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board/:id" element={<Board />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;