import React from "react";

function ShoppingList({ items, onPurchase, categories = [] }) {
  // issued: true のアイテムだけフィルタ
  const issuedItems = items.filter((item) => item.issued);
  const groupedItems = categories
    .map((category) => ({
      category,
      items: issuedItems.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <h2>🛒 買い物リスト</h2>
      {issuedItems.length === 0 ? (
        <p style= {{color: "#888", textAlign: "center"}} >買うものはありません</p>
      ) : (
        groupedItems.map((group) => (
          <div key={group.category} style={{ marginBottom: "20px" }}>
            <h3>{group.category}</h3>
            <ul style={{ listStyle: "none", padding: 0}} >
              {group.items.map((item) => (
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
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingList;
