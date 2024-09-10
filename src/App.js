import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeGrid from './components/RecipeGrid';
import RecipeDetails from './components/RecipeDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';
import './styles/RecipeGrid.css';
import './styles/RecipeCard.css';
import './styles/RecipeDetails.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<RecipeGrid />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
