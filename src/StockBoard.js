import React from "react";
import ItemCard from "./ItemCard";

function StockBoard({ items = [], onIssue }) {
  const handleTap = (id) => {
    const item = items.find((x) => x.id === id);
    if (!item) return;
    if (item.issued) return; // すでに発行済みなら何もしない
    onIssue(id); // ← AppのhandleIssueを呼ぶ
  };

  return (
    <div style= {{padding: "20px" }}>
      <h1>在庫ボード</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onTap={handleTap} />
        ))}
      </div>
    </div>
  );
}

export default StockBoard;