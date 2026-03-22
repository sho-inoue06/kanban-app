import { useEffect, useState } from "react";
import StockBoard from "./StockBoard";
import ShoppingList from "./ShoppingList.js";
import AddItemForm from "./AddItemForm";
import ItemManager from "./ItemManager";
import MasterDataManager from "./MasterDataManager";

const defaultCategory = "日用品";
const defaultCategories = ["日用品", "食品", "飲み物", "掃除", "その他"];
const defaultStores = ["フェルナ", "スギ薬局"];

const defaultItems = [
  { id: 1, name: "洗剤", issued: false, category: "掃除", stores: ["スギ薬局"] },
  { id: 2, name: "シャンプー", issued: false, category: "日用品", stores: ["スギ薬局"] },
  { id: 3, name: "トイレットペーパー", issued: false, category: "日用品", stores: ["フェルナ", "スギ薬局"] },
  { id: 4, name: "ラップ", issued: false, category: "食品", stores: ["フェルナ"] },
  { id: 5, name: "ゴミ袋", issued: false, category: "掃除", stores: ["フェルナ", "スギ薬局"] },
];

function App() {
  const [tab, setTab] = useState("stock");
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");

    if (!saved) return defaultCategories;

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });
  const [stores, setStores] = useState(() => {
    const saved = localStorage.getItem("stores");

    if (!saved) return defaultStores;

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultStores;
    } catch {
      return defaultStores;
    }
  });
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");

    if (!saved) return defaultItems;

    try {
      return JSON.parse(saved).map((item) => ({
        ...item,
        category: item.category || defaultCategory,
        stores: Array.isArray(item.stores) ? item.stores : [],
      }));
    } catch {
      return defaultItems;
    }
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("stores", JSON.stringify(stores));
  }, [stores]);

  const handleIssue = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, issued: true } : item
      )
    );
  };

  const handlePurchase = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, issued: false } : item
      )
    );
  };

  const handleAddItem = (name, category, stores) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newItem = {
      id: Date.now(),
      name: trimmedName,
      issued: false,
      category: category || defaultCategory,
      stores: Array.isArray(stores) ? stores : [],
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (id, name, category, stores) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name: trimmedName,
              category: category || item.category || defaultCategory,
              stores: Array.isArray(stores) ? stores : item.stores || [],
            }
          : item
      )
    );
  };

  const handleEditCategory = (oldCategory, newCategory) => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory || oldCategory === trimmedCategory) return;
    if (categories.includes(trimmedCategory)) return;

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category === oldCategory ? trimmedCategory : category
      )
    );

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.category === oldCategory
          ? { ...item, category: trimmedCategory }
          : item
      )
    );
  };

  const handleAddCategory = (categoryName) => {
    const trimmedCategory = categoryName.trim();

    if (!trimmedCategory || categories.includes(trimmedCategory)) return;

    setCategories((prevCategories) => [...prevCategories, trimmedCategory]);
  };

  const handleDeleteCategory = (categoryName) => {
    if (categories.length <= 1) return;

    const fallbackCategory = categories.find((category) => category !== categoryName);
    if (!fallbackCategory) return;

    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryName)
    );

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.category === categoryName
          ? { ...item, category: fallbackCategory }
          : item
      )
    );
  };

  const handleAddStore = (storeName) => {
    const trimmedStore = storeName.trim();

    if (!trimmedStore || stores.includes(trimmedStore)) return;

    setStores((prevStores) => [...prevStores, trimmedStore]);
  };

  const handleEditStore = (oldStore, newStore) => {
    const trimmedStore = newStore.trim();

    if (!trimmedStore || oldStore === trimmedStore) return;
    if (stores.includes(trimmedStore)) return;

    setStores((prevStores) =>
      prevStores.map((store) => (store === oldStore ? trimmedStore : store))
    );

    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        stores: (item.stores || []).map((store) =>
          store === oldStore ? trimmedStore : store
        ),
      }))
    );
  };

  const handleDeleteStore = (storeName) => {
    if (stores.length <= 1) return;

    setStores((prevStores) => prevStores.filter((store) => store !== storeName));

    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        stores: (item.stores || []).filter((store) => store !== storeName),
      }))
    );
  };

  return (
    <div style={{ padding: 16, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>在庫管理MVP</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button type="button" onClick={() => setTab("stock")}>
          在庫ボード
        </button>
        <button type="button" onClick={() => setTab("shopping")}>
          買い物リスト
        </button>
        <button type="button" onClick={() => setTab("manage")}>
          管理
        </button>
      </div>

      {tab === "stock" && (
        <StockBoard items={items} onIssue={handleIssue} categories={categories} />
      )}
      {tab === "shopping" && (
        <ShoppingList
          items={items}
          onPurchase={handlePurchase}
          stores={stores}
        />
      )}
      {tab === "manage" && (
        <div
          style={{
            backgroundColor: "#f1ede4",
            border: "2px solid #b8ad98",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontSize: 18,
              letterSpacing: "0.08em",
            }}
          >
            管理モード
          </h2>
          <AddItemForm
            onAdd={handleAddItem}
            categories={categories}
            stores={stores}
          />
          <MasterDataManager
            title="カテゴリ管理"
            items={categories}
            onAddItem={handleAddCategory}
            onEditItem={handleEditCategory}
            onDeleteItem={handleDeleteCategory}
          />
          <MasterDataManager
            title="買える店管理"
            items={stores}
            onAddItem={handleAddStore}
            onEditItem={handleEditStore}
            onDeleteItem={handleDeleteStore}
          />
          <ItemManager
            items={items}
            categories={categories}
            stores={stores}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      )}
    </div>
  );
}

export default App;
