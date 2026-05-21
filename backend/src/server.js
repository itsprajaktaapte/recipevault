const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "RecipeVault backend is running" });
});

app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});