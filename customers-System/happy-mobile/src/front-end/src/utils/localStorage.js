const CART_KEY = "cartItems";

export const getItemFromLocalStorage = () => {
  const storedData = localStorage.getItem(CART_KEY);

  return storedData ? JSON.parse(storedData) : [];
};

export const setItemToLocalStorage = (data) => {
  localStorage.setItem(CART_KEY, JSON.stringify(data));
};
