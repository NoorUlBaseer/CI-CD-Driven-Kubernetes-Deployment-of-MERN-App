import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="card group overflow-hidden transition-all duration-300 hover:translate-y-[-4px]">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden h-64 bg-neutral-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<div class="flex items-center justify-center h-full"><div class="text-neutral-400 text-sm">No Image Available</div></div>';
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-neutral-400 text-sm">No Image Available</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-neutral-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-neutral-500 text-sm line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-primary-600 font-semibold">
              ${product.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary py-1 px-3 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              Add
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
