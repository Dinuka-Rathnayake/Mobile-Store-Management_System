// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addItemToCart = (item) => {
//     setCartItems((prevCartItems) => [...prevCartItems, item]);
//   };

//   const removeItemFromCart = (itemId) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.filter((item) => item.id !== itemId)
//     );
//   };

//   const updateItemQuantity = (itemId, quantity) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.map((item) => {
//         if (item.id === itemId) {
//           return { ...item, quantity };
//         }
//         return item;
//       })
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addItemToCart,
//         removeItemFromCart,
//         updateItemQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };













import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext([]);
export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
      const storedCartItems = localStorage.getItem("cartItems");
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
  
    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addItemToCart = (item) => {
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item._id);
        if (existingItemIndex !== -1) {
          setCartItems(
            cartItems.map((cartItem, index) =>
              index === existingItemIndex
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          );
        } else {
          setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
      };

  const removeItemFromCart = (id) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
  };

  const increaseItemQuantity = (id) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseItemQuantity = (id) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === id);
    if (existingItem.quantity === 1) {
      removeItemFromCart(id);
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
