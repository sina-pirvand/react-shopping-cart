import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/cartContext";
import Cart from "../Cart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const getProducts = async () => {
    const respond = await fetch("https://dummyjson.com/products");
    const data = await respond.json();
    setProducts(data.products);
  };
  useEffect(() => {
    getProducts();
  }, []);
  const { cartItems, addToCart } = useContext(CartContext);
  const toggle = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <div className="flex justify-between items-center px-4 md:px-20">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">
          Shop
        </h1>
        <div
          className="drawer-content flex items-center cursor-pointer relative hover:scale-105 w-[40px] ml-auto"
          onClick={toggle}
        >
          <ShoppingCartIcon className="w-[32px]" />
          <span className="bg-rose-500 rounded-full px-1.5 text-white text-sm absolute top-[-5px] right-[-7px]">
            {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg px-10 py-10"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="rounded-md h-48 mx-auto"
            />
            <div className="mt-4">
              <h1 className="text-lg uppercase font-bold">{product.title}</h1>
              <p className="mt-2 text-gray-600 text-sm">
                {product.description.slice(0, 40)}...
              </p>
              <p className="mt-2 text-gray-600 font-bold">${product.price}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                className="px-4 py-2 bg-rose-500 text-white text-xs font-bold uppercase rounded hover:bg-rose-600 focus:outline-none"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Cart showModal={showModal} toggle={toggle} />
    </div>
  );
};
export default Products;
