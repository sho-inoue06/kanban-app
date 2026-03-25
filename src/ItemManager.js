import { useState } from "react";
import { formatTimestamp } from "./dateTime";
import "./ItemManager.css";
import StoreSelector from "./StoreSelector";

function ItemRow({ item, categories, stores, onEditItem, onDeleteItem }) {
  const [draftName, setDraftName] = useState(item.name);
  const [draftCategory, setDraftCategory] = useState(item.category);
  const [draftStores, setDraftStores] = useState(item.stores || []);
  const [isStorePickerOpen, setIsStorePickerOpen] = useState(false);

  const toggleStore = (store) => {
    setDraftStores((prevStores) =>
      prevStores.includes(store)
        ? prevStores.filter((value) => value !== store)
        : [...prevStores, store]
    );
  };

  return (
    <div className={`item-manager__row${item.issued ? " item-manager__row--issued" : ""}`}>
      <div className="item-manager__field">
        <div className="item-manager__field-label">アイテム</div>
        <input
          type="text"
          value={draftName}
          onChange={(event) => setDraftName(event.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px solid #9d927d",
            backgroundColor: "#fffdf7",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div className="item-manager__field">
        <div className="item-manager__field-label">カテゴリ</div>
        <select
          value={draftCategory}
          onChange={(event) => setDraftCategory(event.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px solid #9d927d",
            backgroundColor: "#fffdf7",
            boxSizing: "border-box",
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="item-manager__field">
        <div className="item-manager__field-label">店舗</div>
        <StoreSelector
          stores={stores}
          selectedStores={draftStores}
          isOpen={isStorePickerOpen}
          onToggleOpen={() => setIsStorePickerOpen((prev) => !prev)}
          onToggleStore={toggleStore}
          buttonLabel="店舗を選ぶ"
        />
      </div>
      <div className="item-manager__field">
        <div className="item-manager__field-label">発行日</div>
        <div className="item-manager__timestamp">
          {formatTimestamp(item.issuedAt) || "未記録"}
        </div>
      </div>
      <div className="item-manager__field">
        <div className="item-manager__field-label">購入日</div>
        <div className="item-manager__timestamp">
          {formatTimestamp(item.purchasedAt) || "未記録"}
        </div>
      </div>
      <div className="item-manager__field">
        <div className="item-manager__field-label">操作</div>
        <button
          type="button"
          onClick={() => onEditItem(item.id, draftName, draftCategory, draftStores)}
          style={{
            padding: "8px 12px",
            border: "1px solid #7c725f",
            backgroundColor: "#d8cfbf",
            cursor: "pointer",
          }}
        >
          保存
        </button>
      </div>
      <div className="item-manager__field">
        <div className="item-manager__field-label">削除</div>
        <button
          type="button"
          onClick={() => onDeleteItem(item.id)}
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
    </div>
  );
}

function ItemManager({
  items = [],
  categories = [],
  stores = [],
  onEditItem,
  onDeleteItem,
}) {
  return (
    <section>
      <h3 style={{ marginBottom: 8 }}>アイテム編集</h3>
      <div className="item-manager__viewport">
        <div className="item-manager__table">
          <div className="item-manager__header">
            <div>アイテム</div>
            <div>カテゴリ</div>
            <div>店舗</div>
            <div>発行日</div>
            <div>購入日</div>
            <div>操作</div>
            <div>削除</div>
          </div>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              categories={categories}
              stores={stores}
              onEditItem={onEditItem}
              onDeleteItem={onDeleteItem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ItemManager;
