import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const incrementQuantity = () => {
    if (product.countInStock && quantity >= product.countInStock) return;
    setQuantity((prevQty) => prevQty + 1);
  };

  const decrementQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prevQty) => prevQty - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${product.name} added to cart`, "success");
  };

  if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-neutral-100 h-full">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
              style={{ maxHeight: "500px" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<div class="flex items-center justify-center h-full"><div class="text-neutral-400 text-lg">No Image Available</div></div>';
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-neutral-400 text-lg">No Image Available</div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {product.name}
            </h1>

            <div className="mt-4">
              <span className="text-3xl font-bold text-primary-600">
                ${product.price?.toFixed(2)}
              </span>
            </div>

            {product.countInStock !== undefined && (
              <div className="mt-2">
                <span
                  className={`text-sm ${
                    product.countInStock > 0
                      ? "text-success-600"
                      : "text-error-600"
                  }`}>
                  {product.countInStock > 0
                    ? `In Stock (${product.countInStock})`
                    : "Out of Stock"}
                </span>
              </div>
            )}

            <div className="mt-6 text-neutral-700">{product.description}</div>

            {product.category && (
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {product.category}
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-l-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-50">
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                max={product.countInStock || undefined}
                className="w-14 h-10 border-t border-b border-neutral-300 text-center"
              />
              <button
                onClick={incrementQuantity}
                disabled={
                  product.countInStock && quantity >= product.countInStock
                }
                className="w-10 h-10 rounded-r-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-50">
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.countInStock || product.countInStock <= 0}
              className="btn btn-primary w-full py-3 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
