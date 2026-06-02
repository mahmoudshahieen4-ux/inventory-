// localStorage utility for persisting app data

export const storageKeys = {
  PRODUCTS: "app_products",
  SALES_HISTORY: "app_sales_history",
  SETTINGS: "app_settings",
};

// Products management
export const getProducts = () => {
  try {
    const stored = localStorage.getItem(storageKeys.PRODUCTS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error retrieving products:", error);
    return null;
  }
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem(storageKeys.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products:", error);
  }
};

// Sales history management
export const getSalesHistory = () => {
  try {
    const stored = localStorage.getItem(storageKeys.SALES_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error retrieving sales history:", error);
    return [];
  }
};

export const saveSalesHistory = (history) => {
  try {
    localStorage.setItem(storageKeys.SALES_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error("Error saving sales history:", error);
  }
};

export const addSaleRecord = (record) => {
  const history = getSalesHistory();
  const newRecord = {
    id: Date.now(),
    ...record,
    date: new Date().toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  history.unshift(newRecord);
  saveSalesHistory(history);
  return newRecord;
};

// Get low stock items
export const getLowStockItems = (products = null, threshold = 5) => {
  const productsToCheck = products || getProducts();
  if (!productsToCheck) return [];

  return productsToCheck.filter((product) => {
    const stock = Number(product.stock);
    return stock <= threshold;
  });
};
