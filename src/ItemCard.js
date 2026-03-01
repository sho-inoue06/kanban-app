function ItemCard({ item, onTap }) {
  return (
    <div
      onClick={() => onTap(item.id)}
      style={ {
        backgroundColor: item.issued ? "#e74c3c" : "#2ecc71",
        color: "white",
        padding: "24px",
        borderRadius: "12px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        userSelect: "none"
      } }
    >
      {item.name}
    </div>
  );
}

export default ItemCard;