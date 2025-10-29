import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
console.log(cartItems);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="text-center text-2xl mt-10">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-secondery mb-8 text-center">
        Your Cart
      </h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md p-4 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-buttons font-bold">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-4 text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right font-semibold text-lg">
        Total: <span className="text-buttons">₹{totalPrice}</span>
      </div>
    </div>
  );
}

export default Cart;
