import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const CartPage = () => {
  const { cart, total, removeFromCart, clearCart } = useCart();
  const { isDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h2 className="text-xl font-semibold mb-2 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Looks like you haven't added any services yet.</p>
            <Link 
              to="/rate-card" 
              className="inline-flex items-center px-6 py-3 bg-conison-cyan text-white rounded-lg hover:bg-conison-cyan-dark transition-colors duration-300"
            >
              Browse Services
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                {cart.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.service}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-conison-cyan">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="px-6 py-3 bg-conison-cyan text-white rounded-lg hover:bg-conison-cyan-dark transition-colors duration-300 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 