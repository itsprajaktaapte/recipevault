const SearchBar = ({ value, onChange, filter, onFilterChange }) => {
  const categories = ["All", "Indian", "Breakfast", "Lunch", "Dinner", "Dessert", "Other"];

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          minWidth: "200px",
          padding: "10px 16px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          outline: "none",
        }}
      />
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{
          padding: "10px 16px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "white",
          cursor: "pointer",
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;