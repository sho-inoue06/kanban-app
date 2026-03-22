import { useState } from "react";

function ItemRow({ item, categories, onEditItem, onDeleteItem }) {
  const [draftName, setDraftName] = useState(item.name);
  const [draftCategory, setDraftCategory] = useState(item.category);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(160px, 2fr) minmax(120px, 1fr) auto auto",
        gap: 8,
        alignItems: "center",
        padding: "10px 12px",
        borderTop: "1px solid #c5bca8",
        backgroundColor: item.issued ? "#f7d5d2" : "#ebe6da",
      }}
    >
      <input
        type="text"
        value={draftName}
        onChange={(event) => setDraftName(event.target.value)}
        style={{
          padding: "8px 10px",
          border: "1px solid #9d927d",
          backgroundColor: "#fffdf7",
        }}
      />
      <select
        value={draftCategory}
        onChange={(event) => setDraftCategory(event.target.value)}
        style={{
          padding: "8px 10px",
          border: "1px solid #9d927d",
          backgroundColor: "#fffdf7",
        }}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onEditItem(item.id, draftName, draftCategory)}
        style={{
          padding: "8px 12px",
          border: "1px solid #7c725f",
          backgroundColor: "#d8cfbf",
          cursor: "pointer",
        }}
      >
        保存
      </button>
      <button
        type="button"
        onClick={() => onDeleteItem(item.id)}
        style={{
          padding: "8px 12px",
          border: "1px solid #7c725f",
          backgroundColor: "#c89f98",
          cursor: "pointer",
        }}
      >
        削除
      </button>
    </div>
  );
}

function ItemManager({ items = [], categories = [], onEditItem, onDeleteItem }) {
  return (
    <section>
      <h3 style={{ marginBottom: 8 }}>アイテム編集</h3>
      <div
        style={{
          border: "1px solid #b8ad98",
          backgroundColor: "#e5dece",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(160px, 2fr) minmax(120px, 1fr) auto auto",
            gap: 8,
            padding: "10px 12px",
            backgroundColor: "#d4cab7",
            fontSize: 12,
            letterSpacing: "0.08em",
          }}
        >
          <div>ITEM</div>
          <div>CATEGORY</div>
          <div>ACTION</div>
          <div>REMOVE</div>
        </div>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            categories={categories}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </section>
  );
}

export default ItemManager;
