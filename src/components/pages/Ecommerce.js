/**
 * Ecommerce Component
 *
 * @file Ecommerce.js
 * @author Sadikshya Oli
 * @description eCommerce page for Woodland Conservation merchandise.
 *              Displays eco-friendly products with add-to-cart functionality.
 *
 * @component
 * @param {Array} cart - Current cart items array
 * @param {Function} setCart - Function to update cart state
 *
 * @returns {JSX.Element} Ecommerce page with product grid
 */

import React from "react";
import GridContainer from "../UI/GridContainer";
import tshirt from "../../assets/eco_tshirt.jpeg";
import tote from "../../assets/eco_bag.jpeg";
import bottle from "../../assets/eco_bottle.jpeg";
import cap from "../../assets/eco_cap.jpeg";

/**
 * Product catalog configuration
 * @constant {Array<Object>} products
 */
const products = [
  {
    id: 1,
    name: "Eco-Friendly T-Shirt",
    price: "$25",
    image: tshirt,
    description: "Soft organic cotton T-shirt with Woodland Conservation logo.",
    features: ["100% Organic Cotton", "Fair Trade Certified", "Eco-Friendly Dyes"]
  },
  {
    id: 2,
    name: "Reusable Tote Bag",
    price: "$15",
    image: tote,
    description: "Durable eco tote for everyday use — reduce plastic waste.",
    features: ["Recycled Materials", "Machine Washable", "Heavy Duty"]
  },
  {
    id: 3,
    name: "Bamboo Water Bottle",
    price: "$30",
    image: bottle,
    description: "Sustainable bottle made from bamboo and stainless steel.",
    features: ["BPA Free", "Double Wall Insulated", "Leak Proof"]
  },
  {
    id: 4,
    name: "Conservation Cap",
    price: "$20",
    image: cap,
    description: "Breathable cap to show your support for the environment.",
    features: ["UV Protection", "Adjustable Fit", "Moisture Wicking"]
  },
];

const Ecommerce = ({ cart, setCart }) => {
  /**
   * Adds a product to the shopping cart
   * @param {Object} product - Product object to add to cart
   */
  const addToCart = (product) => {
    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (!existingItem) {
      // Add new product with quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
      alert(`✅ ${product.name} added to cart!`);
    } else {
      // Update quantity if already in cart
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCart(updatedCart);
      alert(`✅ ${product.name} quantity updated in cart!`);
    }
  };

  return (
    <div className="p-6 md:p-10 lg:p-12 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      {/* Page Header */}
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Woodland Conservation Merchandise
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Support conservation by purchasing eco-friendly merchandise. Every purchase helps protect our forests.
        </p>

        {/* Cart Preview Badge */}
        {cart.length > 0 && (
          <div className="mt-6 inline-block bg-green-100 dark:bg-green-900 px-6 py-3 rounded-full shadow-md">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              🛒 {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} item(s) in your cart
            </p>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <GridContainer gridCols="2" gap="8" maxWidth="6xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-72 object-contain p-6 transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Details */}
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                {product.name}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                {product.description}
              </p>

              {/* Product Features */}
              {product.features && (
                <ul className="mb-4 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
                      <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">
                  {product.price}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </GridContainer>

      {/* Bottom Call to Action */}
      <div className="mt-16 text-center bg-green-100 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Make a Difference Today
        </h3>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          All proceeds from merchandise sales go directly to woodland conservation efforts.
          Together, we can protect and restore our precious forests for future generations.
        </p>
      </div>
    </div>
  );
};

export default Ecommerce;

