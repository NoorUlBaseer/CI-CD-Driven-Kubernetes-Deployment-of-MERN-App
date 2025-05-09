import { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { createProduct, updateProduct } from '../../services/productService';

const ProductForm = ({ product = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        category: product.category || '',
        countInStock: product.countInStock || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'countInStock' 
        ? value === '' ? '' : Number(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.price) {
      showToast('Name and price are required', 'error');
      return;
    }
    
    try {
      setLoading(true);
      
      if (product) {
        await updateProduct(product._id, formData);
        showToast('Product updated successfully', 'success');
      } else {
        await createProduct(formData);
        showToast('Product created successfully', 'success');
        // Reset form if creating a new product
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
          countInStock: '',
        });
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      showToast(error.response?.data?.message || 'Error saving product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
          Product Name <span className="text-error-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 input w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-neutral-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 input w-full"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-neutral-700">
            Price <span className="text-error-500">*</span>
          </label>
          <div className="mt-1 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">
              $
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input pl-7 w-full"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="countInStock" className="block text-sm font-medium text-neutral-700">
            Stock Quantity
          </label>
          <input
            type="number"
            min="0"
            id="countInStock"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            className="mt-1 input w-full"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-neutral-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 input w-full"
        />
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-neutral-700">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 input w-full"
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Product preview" 
              className="h-32 w-32 object-cover rounded-md" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x300?text=Invalid+Image+URL';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={() => onSuccess()} className="btn btn-secondary">
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            `${product ? 'Update' : 'Create'} Product`
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;