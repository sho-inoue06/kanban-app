import React from "react";

function ShoppingList({ items, onPurchase }) {
  // issued: true のアイテムだけフィルタ
  const issuedItems = items.filter((item) => item.issued);

  return (
    <div>
      <h2>🛒 買い物リスト</h2>
      {issuedItems.length === 0 ? (
        <p style= {{color: "#888", textAlign: "center"}} >買うものはありません</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0}} >
          {issuedItems.map((item) => (
            <li
              key={item.id}
              onClick={() => onPurchase(item.id)}
              style={{
                padding: "12px 16px",
                margin: "8px 0",
                backgroundColor: "#ffe0e0",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;