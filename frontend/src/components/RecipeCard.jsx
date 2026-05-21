const RecipeCard = ({ recipe, onToggleFavourite, onDelete }) => {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid #e8e8e0",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>
            {recipe.title}
          </h3>
          <span style={{
            fontSize: "12px",
            background: "#f0ede8",
            padding: "2px 10px",
            borderRadius: "20px",
            color: "#666",
          }}>
            {recipe.category}
          </span>
        </div>
        <button
          onClick={() => onToggleFavourite(recipe.id)}
          style={{
            background: "none",
            border: "none",
            fontSize: "22px",
            cursor: "pointer",
            lineHeight: 1,
          }}
          title={recipe.favourite ? "Remove favourite" : "Add favourite"}
        >
          {recipe.favourite ? "❤️" : "🤍"}
        </button>
      </div>

      <div>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "4px", fontWeight: "500" }}>
          INGREDIENTS
        </p>
        <p style={{ fontSize: "14px", color: "#444" }}>{recipe.ingredients}</p>
      </div>

      <div>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "4px", fontWeight: "500" }}>
          INSTRUCTIONS
        </p>
        <p style={{ fontSize: "14px", color: "#444" }}>{recipe.instructions}</p>
      </div>

      <button
        onClick={() => onDelete(recipe.id)}
        style={{
          alignSelf: "flex-end",
          background: "none",
          border: "1px solid #ffb3b3",
          color: "#e05555",
          padding: "6px 14px",
          borderRadius: "6px",
          fontSize: "13px",
          cursor: "pointer",
          marginTop: "4px",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default RecipeCard;