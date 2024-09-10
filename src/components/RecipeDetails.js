// RecipeDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetails.css';
import { FaArrowLeft } from 'react-icons/fa';

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded API key
  const API_KEY = 'd58aef0c04a04c95bf45ac7b4d070b26';

  const fetchRecipeDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-icon" /> Back
      </button>
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <h3>Ingredients:</h3>
      <ul className="ingredients-list">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p className="instructions" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
}

export default RecipeDetails;
