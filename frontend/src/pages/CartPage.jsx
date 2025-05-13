import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { showToast } = useToast();

  const handleCheckout = () => {
    setCheckoutLoading(true);

    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      showToast("Order placed successfully!", "success");
      setCheckoutLoading(false);
    }, 1500);
  };

  return (
    <div className="py-8">
      <div className="container-custom mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="mt-4 text-lg font-medium text-neutral-800">
              Your cart is empty
            </h2>
            <p className="mt-2 text-neutral-600">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products" className="mt-6 inline-block btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <ul className="divide-y divide-neutral-200">
                  {cartItems.map((item) => (
                    <li key={item._id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML =
                                  '<div class="flex items-center justify-center h-full"><div class="text-neutral-400 text-xs">No Image</div></div>';
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-neutral-400 text-xs">
                                No Image
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium text-neutral-900">
                                <Link
                                  to={`/products/${item._id}`}
                                  className="hover:text-primary-600">
                                  {item.name}
                                </Link>
                              </h3>
                              <p className="mt-1 text-sm text-neutral-500">
                                {item.category}
                              </p>
                            </div>
                            <p className="text-base font-medium text-neutral-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-neutral-300 rounded-md">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                className="px-3 py-1 text-neutral-600 hover:bg-neutral-100">
                                -
                              </button>
                              <span className="px-3 py-1 text-neutral-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                className="px-3 py-1 text-neutral-600 hover:bg-neutral-100">
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item._id)}
                              className="text-sm font-medium text-error-600 hover:text-error-500">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-medium text-neutral-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-base text-neutral-700">
                    <p>Subtotal</p>
                    <p>${getCartTotal().toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between text-base text-neutral-700">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>

                  <div className="flex justify-between text-base text-neutral-700">
                    <p>Tax</p>
                    <p>${(getCartTotal() * 0.07).toFixed(2)}</p>
                  </div>

                  <div className="border-t border-neutral-200 pt-4 flex justify-between text-lg font-medium text-neutral-900">
                    <p>Total</p>
                    <p>${(getCartTotal() * 1.07).toFixed(2)}</p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="mt-6 btn btn-primary w-full py-3">
                  {checkoutLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Checkout"
                  )}
                </button>

                <div className="mt-4">
                  <button
                    onClick={clearCart}
                    className="text-sm text-neutral-500 hover:text-neutral-700">
                    Clear cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
