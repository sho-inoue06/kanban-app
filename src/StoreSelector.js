function StoreSelector({
  stores = [],
  selectedStores = [],
  isOpen = false,
  onToggleOpen,
  onToggleStore,
  buttonLabel = "店を選ぶ",
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
        }}
      >
        {selectedStores.length > 0 ? (
          selectedStores.map((store) => (
            <span
              key={store}
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                backgroundColor: "#d4cab7",
                fontSize: "12px",
                lineHeight: 1.3,
              }}
            >
              {store}
            </span>
          ))
        ) : (
          <span style={{ fontSize: "12px", color: "#6f6657" }}>
            店舗未選択
          </span>
        )}
        <button
          type="button"
          onClick={onToggleOpen}
          style={{
            padding: "7px 10px",
            border: "1px solid #7c725f",
            backgroundColor: isOpen ? "#cfc4b0" : "#fffdf7",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {buttonLabel}
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            display: "grid",
            gap: 6,
            padding: 10,
            border: "1px solid #b8ad98",
            borderRadius: 8,
            backgroundColor: "#f7f3ea",
            maxHeight: 180,
            overflowY: "auto",
          }}
        >
          {stores.length > 0 ? (
            stores.map((store) => (
              <label
                key={store}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedStores.includes(store)}
                  onChange={() => onToggleStore(store)}
                />
                <span>{store}</span>
              </label>
            ))
          ) : (
            <div style={{ fontSize: "12px", color: "#6f6657" }}>
              先に買える店を追加してください
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StoreSelector;
