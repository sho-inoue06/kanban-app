import React from "react";
import ItemCard from "./ItemCard";

function StockBoard({ items = [], onIssue, categories = [] }) {
  const handleTap = (id) => {
    const item = items.find((x) => x.id === id);
    if (!item) return;
    if (item.issued) return; // すでに発行済みなら何もしない
    onIssue(id); // ← AppのhandleIssueを呼ぶ
  };

  const groupedItems = categories
    .map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div style= {{padding: "20px" }}>
      <h1>在庫ボード</h1>
      {groupedItems.map((group) => (
        <div key={group.category} style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "12px" }}>{group.category}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            {group.items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onTap={handleTap}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StockBoard;
