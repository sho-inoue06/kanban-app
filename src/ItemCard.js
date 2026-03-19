import { useState } from "react";

function ItemCard({ item, onTap, onDelete, onEdit, categories = [] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(item.name);
  const [draftCategory, setDraftCategory] = useState(item.category || categories[0] || "その他");

  const startEdit = (event) => {
    event.stopPropagation();
    setDraftName(item.name);
    setDraftCategory(item.category || categories[0] || "その他");
    setIsEditing(true);
  };

  const cancelEdit = (event) => {
    event.stopPropagation();
    setDraftName(item.name);
    setDraftCategory(item.category || categories[0] || "その他");
    setIsEditing(false);
  };

  const saveEdit = (event) => {
    event.stopPropagation();

    const trimmedName = draftName.trim();
    if (!trimmedName) return;

    onEdit(item.id, trimmedName, draftCategory);
    setIsEditing(false);
  };

  return (
    <div
      onClick={() => {
        if (!isEditing) {
          onTap(item.id);
        }
      }}
      style={{
        backgroundColor: item.issued ? "#e74c3c" : "#2ecc71",
        color: "white",
        padding: "24px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={draftName}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => setDraftName(event.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <select
            value={draftCategory}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => setDraftCategory(event.target.value)}
            style={{
              padding: "8px 10px",
              borderRadius: "8px",
              border: "none",
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={saveEdit}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              保存
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              キャンセル
            </button>
          </div>
        </>
      ) : (
        <>
          <div>{item.name}</div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>{item.category}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            <button
              type="button"
              onClick={startEdit}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              編集
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(item.id);
              }}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ItemCard;
