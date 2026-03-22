import { useState } from "react";

function CategoryManager({ categories = [], onEditCategory }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [draftCategory, setDraftCategory] = useState("");

  const startEdit = (category) => {
    setEditingCategory(category);
    setDraftCategory(category);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setDraftCategory("");
  };

  const saveEdit = () => {
    onEditCategory(editingCategory, draftCategory);
    cancelEdit();
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: 12,
        border: "1px solid #b8ad98",
        borderRadius: 8,
        backgroundColor: "#e5dece",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>カテゴリ編集</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {categories.map((category) => (
          <div
            key={category}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              paddingBottom: 8,
              borderBottom: "1px solid #c5bca8",
            }}
          >
            {editingCategory === category ? (
              <>
                <input
                  type="text"
                  value={draftCategory}
                  onChange={(event) => setDraftCategory(event.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    border: "1px solid #9d927d",
                    backgroundColor: "#fffdf7",
                  }}
                />
                <button
                  type="button"
                  onClick={saveEdit}
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
                  onClick={cancelEdit}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #7c725f",
                    backgroundColor: "#d8cfbf",
                    cursor: "pointer",
                  }}
                >
                  キャンセル
                </button>
              </>
            ) : (
              <>
                <div style={{ flex: 1 }}>{category}</div>
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #7c725f",
                    backgroundColor: "#d8cfbf",
                    cursor: "pointer",
                  }}
                >
                  編集
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;
