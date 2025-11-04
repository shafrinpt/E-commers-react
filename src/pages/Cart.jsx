import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const message = cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} - ₹${item.price} x ${item.quantity}`
      )
      .join("%0A");

    const total = `Total: ₹${totalPrice}`;
    const fullMessage = `🛍️ New Order:%0A${message}%0A%0A${total}%0A%0APlease confirm my order!`;

    const phoneNumber = "918891278251";
    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, "_blank");
  };

  // ✅ Empty cart — center above footer (no scroll)
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-160px)] bg-white">
        {/* 👆 160px = header + footer combined height, adjust if needed */}
        <h2 className="text-center text-2xl font-semibold">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  // ✅ Cart with items — normal scrollable view
  return (
    <div className="min-h-[calc(100vh-100px)] px-4 md:px-16 py-10">
      <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">
        Your Cart
      </h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.uniqueId}
            className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md p-4 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-amber-900 font-bold">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => dispatch(decreaseQuantity(item.uniqueId))}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>

              <span className="text-lg font-semibold">{item.quantity}</span>

              <button
                onClick={() => dispatch(increaseQuantity(item.uniqueId))}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item.uniqueId))}
                className="ml-4 text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="font-semibold text-lg">
          Total: <span className="text-amber-900 font-bold">₹{totalPrice}</span>
        </div>

        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition"
          >
            Checkout on WhatsApp
          </button>

          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
