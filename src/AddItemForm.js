import { useEffect, useState } from "react";
import StoreSelector from "./StoreSelector";

function AddItemForm({ onAdd, categories = [], stores = [] }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0] || "その他");
  const [selectedStores, setSelectedStores] = useState([]);
  const [isStorePickerOpen, setIsStorePickerOpen] = useState(false);

  useEffect(() => {
    if (!categories.includes(category)) {
      setCategory(categories[0] || "その他");
    }
  }, [categories, category]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onAdd(trimmedName, category, selectedStores);
    setName("");
    setCategory(categories[0] || "その他");
    setSelectedStores([]);
    setIsStorePickerOpen(false);
  };

  const toggleStore = (store) => {
    setSelectedStores((prevStores) =>
      prevStores.includes(store)
        ? prevStores.filter((value) => value !== store)
        : [...prevStores, store]
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
        padding: 12,
        border: "1px solid #b8ad98",
        borderRadius: 8,
        backgroundColor: "#e5dece",
      }}
    >
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="アイテム名を入力"
        style={{
          flex: 1,
          padding: "8px 12px",
          border: "1px solid #9d927d",
          backgroundColor: "#fffdf7",
        }}
      />
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        style={{
          padding: "8px 12px",
          border: "1px solid #9d927d",
          backgroundColor: "#fffdf7",
        }}
      >
        {categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div
        style={{
          minWidth: "100%",
        }}
      >
        <StoreSelector
          stores={stores}
          selectedStores={selectedStores}
          isOpen={isStorePickerOpen}
          onToggleOpen={() => setIsStorePickerOpen((prev) => !prev)}
          onToggleStore={toggleStore}
          buttonLabel="店舗を選ぶ"
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "8px 12px",
          border: "1px solid #7c725f",
          backgroundColor: "#d8cfbf",
          cursor: "pointer",
        }}
      >
        追加
      </button>
    </form>
  );
}

export default AddItemForm;
