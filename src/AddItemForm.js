import { useState } from "react";

function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onAdd(trimmedName);
    setName("");
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
      <button type="submit">追加</button>
    </form>
  );
}

export default AddItemForm;
