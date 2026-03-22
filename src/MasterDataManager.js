import { useEffect, useState } from "react";

function MasterDataRow({ item, onEditItem, onDeleteItem }) {
  const [draftValue, setDraftValue] = useState(item);

  useEffect(() => {
    setDraftValue(item);
  }, [item]);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        paddingBottom: 8,
        borderBottom: "1px solid #c5bca8",
      }}
    >
      <input
        type="text"
        value={draftValue}
        onChange={(event) => setDraftValue(event.target.value)}
        style={{
          flex: 1,
          padding: "8px 12px",
          border: "1px solid #9d927d",
          backgroundColor: "#fffdf7",
        }}
      />
      <button
        type="button"
        onClick={() => onEditItem(item, draftValue)}
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
        onClick={() => onDeleteItem(item)}
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

function MasterDataManager({
  title,
  items = [],
  onAddItem,
  onEditItem,
  onDeleteItem,
}) {
  const [newValue, setNewValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem(newValue);
    setNewValue("");
  };

  return (
    <section
      style={{
        marginBottom: 20,
        padding: 12,
        border: "1px solid #b8ad98",
        borderRadius: 8,
        backgroundColor: "#e5dece",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>{title}</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          type="text"
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
          placeholder="新しい項目を追加"
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #9d927d",
            backgroundColor: "#fffdf7",
          }}
        />
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
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <MasterDataRow
            key={item}
            item={item}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </section>
  );
}

export default MasterDataManager;
