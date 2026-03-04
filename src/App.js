import { useEffect, useState } from "react";
import StockBoard from "./StockBoard";
import ShoppingList from "./ShoppingList.js";
import AddItemForm from "./AddItemForm";

const defaultItems = [
  { id: 1, name: "洗剤", issued: false },
  { id: 2, name: "シャンプー", issued: false },
  { id: 3, name: "トイレットペーパー", issued: false },
  { id: 4, name: "ラップ", issued: false },
  { id: 5, name: "ゴミ袋", issued: false },
];

function App() {
  const [tab, setTab] = useState("stock");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");

    if (!saved) return defaultItems;

    try {
      return JSON.parse(saved);
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

  const handleAddItem = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newItem = {
      id: Date.now(),
      name: trimmedName,
      issued: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
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
          <AddItemForm onAdd={handleAddItem} />
          <StockBoard items={items} onIssue={handleIssue} />
        </>
      )}
      {tab === "shopping" && (
        <ShoppingList items={items} onPurchase={handlePurchase} />
      )}
    </div>
  );
}

export default App;
