import { useState } from 'react';
import ProductCard from './ProductCard';
import { useToast } from '../../context/ToastContext';

const ProductList = ({ products, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { showToast } = useToast();
  
  if (loading) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    showToast('Error loading products', 'error');
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-neutral-800">Something went wrong</h3>
          <p className="text-neutral-600 mt-2">Unable to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="min-h-[300px] flex justify-center items-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-neutral-800">No products found</h3>
          <p className="text-neutral-600 mt-2">Try adjusting your search or filters.</p>
        </div>
      </div>
    );
  }
  
  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {categories.length > 0 && (
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-600">No products match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;