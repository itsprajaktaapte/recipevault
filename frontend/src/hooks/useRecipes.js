import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/recipes`);
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      setError("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (recipeData) => {
    const res = await fetch(`${API_URL}/api/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    const newRecipe = await res.json();
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const toggleFavourite = async (id) => {
    const res = await fetch(`${API_URL}/api/recipes/${id}/favourite`, {
      method: "PATCH",
    });
    const updated = await res.json();
    setRecipes((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const deleteRecipe = async (id) => {
    await fetch(`${API_URL}/api/recipes/${id}`, { method: "DELETE" });
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return { recipes, loading, error, addRecipe, toggleFavourite, deleteRecipe };
};

export default useRecipes;