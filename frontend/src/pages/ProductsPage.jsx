import { useState, useEffect } from 'react';
import ProductList from '../components/product/ProductList';
import { getProducts } from '../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="py-8">
      <div className="container-custom mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">All Products</h1>
            <p className="text-neutral-600 mt-1">
              Browse our collection of high-quality products
            </p>
          </div>
        </div>
        
        <ProductList products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default ProductsPage;