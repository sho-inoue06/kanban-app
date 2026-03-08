function ItemCard({ item, onTap, onDelete }) {
  return (
    <div
      onClick={() => onTap(item.id)}
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
      <div>{item.name}</div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(item.id);
        }}
        style={{
          alignSelf: "center",
          border: "none",
          borderRadius: "999px",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        削除
      </button>
    </div>
  );
}

export default ItemCard;
