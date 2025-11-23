/**
 * Cart Component
 *
 * @file Cart.js
 * @author Sadikshya Oli
 * @description Shopping cart page with item management, quantity controls,
 *              order summary, and localStorage persistence.
 *
 * @component
 * @param {Array} cart - Array of cart items with product details
 * @param {Function} setCart - Function to update cart state
 *
 * @returns {JSX.Element} Shopping cart page
 */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  /**
   * Persist cart to localStorage whenever it changes
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Removes an item from the cart
   * @param {number} id - Product ID to remove
   */
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  /**
   * Clears all items from the cart
   */
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
    }
  };

  /**
   * Updates the quantity of a cart item
   * @param {number} id - Product ID to update
   * @param {number} newQty - New quantity value (minimum 1)
   */
  const updateQuantity = (id, newQty) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  /**
   * Calculates the total price of all items in cart
   * @returns {number} Total price
   */
  const calculateTotal = () => {
    return cart.reduce(
      (sum, item) =>
        sum + Number(item.price.replace("$", "")) * (item.quantity || 1),
      0
    );
  };

  /**
   * Calculates the total number of items in cart
   * @returns {number} Total item count
   */
  const calculateTotalItems = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  const total = calculateTotal();
  const totalItems = calculateTotalItems();

  return (
    <div className="p-6 md:p-10 lg:p-12 min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Page Header */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          🛒 Your Shopping Cart
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Review your items before checkout
        </p>
      </div>

      {/* Empty Cart State */}
      {cart.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              Start shopping to add items to your cart!
            </p>
            <Link
              to="/ecommerce"
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-green-600 dark:text-green-400 mr-2">📦</span>
                  Cart Items ({totalItems})
                </h2>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 transition-all duration-300 hover:shadow-md"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shadow-sm"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start mt-3 space-x-3">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Quantity:
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-lg font-bold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-lg font-bold w-12 text-center bg-white dark:bg-gray-800 py-1 rounded-lg">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-lg font-bold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24 space-y-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">📋</span>
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Total Items:
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Subtotal:
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-4 bg-green-50 dark:bg-gray-700 rounded-lg px-4">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  {/* Checkout Button */}
                  <button
                    onClick={() => alert("🎉 Checkout feature coming soon! Thank you for supporting conservation.")}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Proceed to Checkout 💳
                  </button>

                  {/* Clear Cart Button */}
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Clear Cart 🗑️
                  </button>

                  {/* Continue Shopping Link */}
                  <Link
                    to="/ecommerce"
                    className="block w-full text-center bg-white dark:bg-gray-800 border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Continue Shopping 🛍️
                  </Link>
                </div>

                {/* Conservation Note */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                    <span className="font-semibold">🌳 Conservation Impact:</span><br />
                    Your purchase supports forest restoration and wildlife protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

