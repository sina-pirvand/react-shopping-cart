import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  return (
    showModal && (
      <div className="flex-col flex items-center fixed inset-0 left-0 lg:left-[19vw] bg-black bg-opacity-90 gap-1 p-2 text-white font-normal uppercase text-sm min-h-full overflow-auto w-[100vw] lg:w-[80vw]">
        <button
          className="px-2 py-2 bg-rose-500 text-white text-xs font-bold uppercase rounded hover:bg-rose-600 focus:outline-none self-end"
          onClick={toggle}
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="flex flex-col gap-4 w-[100%] md:w-[80%] lg:w-[70%] 2xl:[60%]">
          {cartItems.map((item) => (
            <div
              className="flex-col lg:flex-row flex justify-between items-center bg-gray-800 rounded-lg px-2 lg:px-10 py-5"
              key={item.id}
            >
              <div className="flex items-center justify-start gap-4 self-stretch">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="rounded-md h-24"
                />
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg">{item.title}</h1>
                  <p className="font-extrabold text-lg">{`${item.price}$`}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-5 lg:mt-0">
                <button
                  className="px-4 py-2 bg-rose-500 text-white text-xs font-bold uppercase rounded hover:bg-rose-600 focus:outline-none w-[40px]"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-rose-500 text-white text-xs font-bold uppercase rounded hover:bg-rose-600 focus:outline-none w-[40px]"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <>
            <div className=" bg-rose-500 w-[100%] my-2">
              <h1 className="text-lg font-bold text-white rounded-lg p-2 text-center">
                Total: ${getCartTotal()}
              </h1>
            </div>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 my-2"
              onClick={() => {
                clearCart();
              }}
            >
              Clear cart
            </button>
          </>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
      </div>
    )
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
};
