import { useEffect, useState } from "react";
import StockBoard from "./StockBoard";
import ShoppingList from "./ShoppingList.js";
import AddItemForm from "./AddItemForm";

const defaultCategory = "日用品";
const categories = ["日用品", "食品", "飲み物", "掃除", "その他"];

const defaultItems = [
  { id: 1, name: "洗剤", issued: false, category: "掃除" },
  { id: 2, name: "シャンプー", issued: false, category: "日用品" },
  { id: 3, name: "トイレットペーパー", issued: false, category: "日用品" },
  { id: 4, name: "ラップ", issued: false, category: "食品" },
  { id: 5, name: "ゴミ袋", issued: false, category: "掃除" },
];

function App() {
  const [tab, setTab] = useState("stock");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");

    if (!saved) return defaultItems;

    try {
      return JSON.parse(saved).map((item) => ({
        ...item,
        category: item.category || defaultCategory,
      }));
    } catch {
      return defaultItems;
    }
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleIssue = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, issued: true } : item
      )
    );
  };

  const handlePurchase = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, issued: false } : item
      )
    );
  };

  const handleAddItem = (name, category) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newItem = {
      id: Date.now(),
      name: trimmedName,
      issued: false,
      category: category || defaultCategory,
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (id, name, category) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name: trimmedName,
              category: category || item.category || defaultCategory,
            }
          : item
      )
    );
  };

  return (
    <div style={{ padding: 16, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>在庫管理MVP</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => setTab("stock")}>
          在庫ボード
        </button>
        <button type="button" onClick={() => setTab("shopping")}>
          買い物リスト
        </button>
      </div>

      {tab === "stock" && (
        <>
          <AddItemForm onAdd={handleAddItem} categories={categories} />
          <StockBoard
            items={items}
            onIssue={handleIssue}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
            categories={categories}
          />
        </>
      )}
      {tab === "shopping" && (
        <ShoppingList
          items={items}
          onPurchase={handlePurchase}
          categories={categories}
        />
      )}
    </div>
  );
}

export default App;
