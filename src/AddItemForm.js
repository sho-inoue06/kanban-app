import { useState } from "react";

function AddItemForm({ onAdd, categories = [] }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0] || "その他");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onAdd(trimmedName, category);
    setName("");
    setCategory(categories[0] || "その他");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, marginBottom: 16 }}
    >
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="アイテム名を入力"
        style={{ flex: 1, padding: "8px 12px" }}
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        style={{ padding: "8px 12px" }}
      >
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button type="submit">追加</button>
    </form>
  );
}

export default AddItemForm;
