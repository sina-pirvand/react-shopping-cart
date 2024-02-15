import { createContext, useState, useEffect } from "react";

//let's create the cart context
export const CartContext = createContext();
//create the cart provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  // first feature: ADD ITEM
  const addToCart = (item) => {
    // check if the item is already in the cart
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      // if the item is already in the cart, increase the quantity of the item
      setCartItems(
        cartItems.map(
          (cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    }
    // if the item is not in the cart, add the item to the cart
    else setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };
  // 2nd feature: REMOVE ITEM
  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (isItemInCart.quantity === 1)
      // if the quantity of the item is 1, remove the item from the cart
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? // if the quantity of the item is greater than 1, decrease the quantity of the item
              { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };
  // 3rd feature: CLEAR CART
  const clearCart = () => {
    setCartItems([]); // set the cart items to an empty array
  };
  // CALCULATE CART TOTAL
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  // SAVE CART ITEMS IN BROWSER
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  // GET CART ITEMS FROM BROWSER
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) setCartItems(JSON.parse(cartItems));
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
