function ItemCard({ item, onTap }) {
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
        gap: "10px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div>{item.name}</div>
      <div style={{ fontSize: "14px", opacity: 0.9 }}>{item.category}</div>
    </div>
  );
}

export default ItemCard;
