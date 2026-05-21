import { useState } from "react";

const emptyForm = {
  title: "",
  category: "Indian",
  ingredients: "",
  instructions: "",
};

const RecipeForm = ({ onAdd }) => {
  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.ingredients || !form.instructions) return;
    await onAdd(form);
    setForm(emptyForm);
    setOpen(false);
  };

  const categories = ["Indian", "Breakfast", "Lunch", "Dinner", "Dessert", "Other"];

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    fontFamily: "inherit",
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "#2d6a4f",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "24px",
        }}
      >
        + Add Recipe
      </button>
    );
  }

  return (
    <div style={{
      background: "white",
      border: "1px solid #e8e8e0",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      <h3 style={{ fontSize: "18px", fontWeight: "600" }}>New Recipe</h3>

      <input
        name="title"
        placeholder="Recipe title"
        value={form.title}
        onChange={handleChange}
        style={inputStyle}
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        style={{ ...inputStyle, background: "white", cursor: "pointer" }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        value={form.ingredients}
        onChange={handleChange}
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <textarea
        name="instructions"
        placeholder="Instructions"
        value={form.instructions}
        onChange={handleChange}
        rows={4}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleSubmit}
          style={{
            background: "#2d6a4f",
            color: "white",
            border: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Save Recipe
        </button>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "1px solid #ddd",
            padding: "10px 24px",
            borderRadius: "8px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;