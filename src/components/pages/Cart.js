// Author: Sadikshya Oli
// Enhanced Cart.js with totals, clear cart, quantity selector, animations,
// modal checkout placeholder, and localStorage persistence.

import React, { useEffect } from "react";

const Cart = ({ cart, setCart }) => {
    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Remove item
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // Clear entire cart
    const clearCart = () => setCart([]);

    // Update quantity (+ / -)
    const updateQuantity = (id, newQty) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
            )
        );
    };

    // Calculate total
    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price.replace("$", "")) * (item.quantity || 1),
        0
    );

    return (
        <div className="p-8 min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-4xl font-bold text-center mb-10">🛒 Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-lg">Your cart is empty.</p>
            ) : (
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 animate-[fadeIn_0.5s_ease]">
                    {/* Cart Items */}
                    <div className="md:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-[slideIn_0.4s_ease]"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-600 dark:text-gray-400">{item.price}</p>

                                        {/* Quantity Selector */}
                                        <div className="flex items-center mt-2 space-x-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, (item.quantity || 1) - 1)
                                                }
                                                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, (item.quantity || 1) + 1)
                                                }
                                                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary Box */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-fit space-y-4 animate-[fadeIn_0.6s_ease]">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                        <p className="text-lg font-medium">
                            Total Items: {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                        </p>

                        <p className="text-2xl font-bold">Total: ${total}</p>

                        {/* Clear Cart */}
                        <button
                            onClick={clearCart}
                            className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Clear Cart
                        </button>

                        {/* Checkout Placeholder */}
                        <button
                            onClick={() => alert("Checkout modal coming soon!")}
                            className="w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
