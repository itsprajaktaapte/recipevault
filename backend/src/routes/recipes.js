const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

let recipes = [
  {
    id: uuidv4(),
    title: "Butter Chicken",
    category: "Indian",
    ingredients: "Chicken, butter, cream, tomato, spices",
    instructions: "Marinate chicken, cook in butter sauce with cream and tomatoes.",
    favourite: true,
  },
  {
    id: uuidv4(),
    title: "Avocado Toast",
    category: "Breakfast",
    ingredients: "Bread, avocado, lemon, salt, pepper",
    instructions: "Toast bread, mash avocado with lemon juice, season and serve.",
    favourite: false,
  },
];

// GET all recipes
router.get("/", (req, res) => {
  res.json(recipes);
});

// GET single recipe
router.get("/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  res.json(recipe);
});

// POST create recipe
router.post("/", (req, res) => {
  const { title, category, ingredients, instructions } = req.body;
  if (!title || !category || !ingredients || !instructions) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newRecipe = {
    id: uuidv4(),
    title,
    category,
    ingredients,
    instructions,
    favourite: false,
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// PATCH toggle favourite
router.patch("/:id/favourite", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) return res.status(404).json({ message: "Recipe not found" });
  recipe.favourite = !recipe.favourite;
  res.json(recipe);
});

// DELETE recipe
router.delete("/:id", (req, res) => {
  const index = recipes.findIndex((r) => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Recipe not found" });
  recipes.splice(index, 1);
  res.json({ message: "Recipe deleted" });
});

module.exports = router;