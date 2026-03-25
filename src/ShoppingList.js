import React from "react";
import { formatTimestamp } from "./dateTime";

const uncategorizedStoreLabel = "店舗未設定";

function ShoppingList({ items, onPurchase, stores = [] }) {
  const issuedItems = items.filter((item) => item.issued);

  const groupedItems = [...stores, uncategorizedStoreLabel]
    .map((store) => ({
      store,
      items: issuedItems.filter((item) => {
        const itemStores = item.stores || [];

        if (store === uncategorizedStoreLabel) {
          return itemStores.length === 0;
        }

        return itemStores.includes(store);
      }),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <h2>🛒 買い物リスト</h2>
      {issuedItems.length === 0 ? (
        <p style={{ color: "#888", textAlign: "center" }}>買うものはありません</p>
      ) : (
        groupedItems.map((group) => (
          <div key={group.store} style={{ marginBottom: "20px" }}>
            <h3>{group.store}</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {group.items.map((item) => (
                <li
                  key={`${group.store}-${item.id}`}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    <span>{item.name}</span>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        backgroundColor: "#fff4b8",
                        fontSize: "12px",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  {formatTimestamp(item.issuedAt) && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: "12px",
                        color: "#7a5b5b",
                      }}
                    >
                      発行日: {formatTimestamp(item.issuedAt)}
                    </div>
                  )}
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
