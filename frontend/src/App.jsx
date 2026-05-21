import { useState } from "react";
import useRecipes from "./hooks/useRecipes";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";
import SearchBar from "./components/SearchBar";

const App = () => {
  const { recipes, loading, error, addRecipe, toggleFavourite, deleteRecipe } = useRecipes();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showFavourites, setShowFavourites] = useState(false);

  const filtered = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
    const matchesFavourite = !showFavourites || r.favourite;
    return matchesSearch && matchesCategory && matchesFavourite;
  });

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#2d6a4f", marginBottom: "6px" }}>
          🍳 RecipeVault
        </h1>
        <p style={{ color: "#888", fontSize: "16px" }}>
          Your personal recipe collection
        </p>
      </div>

      <RecipeForm onAdd={addRecipe} />

      <SearchBar
        value={search}
        onChange={setSearch}
        filter={categoryFilter}
        onFilterChange={setCategoryFilter}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <p style={{ color: "#888", fontSize: "14px" }}>
          {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={() => setShowFavourites((prev) => !prev)}
          style={{
            background: showFavourites ? "#fff0f0" : "white",
            border: "1px solid #ddd",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            cursor: "pointer",
            color: showFavourites ? "#e05555" : "#666",
          }}
        >
          {showFavourites ? "❤️ Favourites only" : "🤍 Show favourites"}
        </button>
      </div>

      {loading && <p style={{ color: "#888" }}>Loading recipes...</p>}
      {error && <p style={{ color: "#e05555" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {filtered.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavourite={toggleFavourite}
            onDelete={deleteRecipe}
          />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>
          <p style={{ fontSize: "48px" }}>🍽️</p>
          <p style={{ fontSize: "18px", marginTop: "12px" }}>No recipes found</p>
        </div>
      )}
    </div>
  );
};

export default App;