import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/product/ProductDetail';
import { getProductById } from '../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. It may not exist or has been removed.');
        setLoading(false);
        
        if (err.response?.status === 404) {
          navigate('/404', { replace: true });
        }
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-neutral-800">Error Loading Product</h2>
          <p className="text-neutral-600 mt-2">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container-custom mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
        
        <ProductDetail product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;