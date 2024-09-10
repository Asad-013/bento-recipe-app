// RecipeGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import '../styles/RecipeGrid.css';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  // Hardcoded API key
  const API_KEY = 'd58aef0c04a04c95bf45ac7b4d070b26';

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * recipesPerPage;
      const query = searchQuery ? `&query=${searchQuery}` : '';
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?number=${recipesPerPage}&offset=${offset}&apiKey=${API_KEY}${query}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      fetchRecipes();
    }, 500); // Delay of 500ms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Fetch recipes on page change
  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="recipe-grid-container">
      <div className="search-bar-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="recipe-grid">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <p>No recipes found. Try searching for something else!</p>
            )}
          </div>
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              className="pagination-button"
              disabled={currentPage === 1}
            >
              <FaArrowLeft /> Previous
            </button>
            <span className="current-page">Page {currentPage}</span>
            <button onClick={handleNextPage} className="pagination-button">
              Next <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeGrid;
