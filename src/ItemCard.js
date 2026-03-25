import { formatTimestamp } from "./dateTime";

function ItemCard({ item, onTap }) {
  const statusLabel = item.issued ? "発行日" : "購入日";
  const statusTimestamp = formatTimestamp(item.issued ? item.issuedAt : item.purchasedAt);

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
      {statusTimestamp && (
        <div style={{ fontSize: "12px", opacity: 0.85 }}>
          {statusLabel}: {statusTimestamp}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
        {(item.stores || []).map((store) => (
          <span
            key={store}
            style={{
              padding: "2px 8px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.18)",
              fontSize: "12px",
            }}
          >
            {store}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ItemCard;
