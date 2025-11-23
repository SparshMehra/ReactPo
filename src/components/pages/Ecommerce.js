// Author: Sadikshya Oli
// Purpose: eCommerce page for Woodland Conservation merchandise.

import React from "react";
import GridContainer from "../UI/GridContainer";
import tshirt from "../../assets/eco_tshirt.jpeg";
import tote from "../../assets/eco_bag.jpeg";
import bottle from "../../assets/eco_bottle.jpeg";
import cap from "../../assets/eco_cap.jpeg";

const products = [
    {
        id: 1,
        name: "Eco-Friendly T-Shirt",
        price: "$25",
        image: tshirt,
        description: "Soft organic cotton T-shirt with Woodland Conservation logo.",
    },
    {
        id: 2,
        name: "Reusable Tote Bag",
        price: "$15",
        image: tote,
        description: "Durable eco tote for everyday use — reduce plastic waste.",
    },
    {
        id: 3,
        name: "Bamboo Water Bottle",
        price: "$30",
        image: bottle,
        description: "Sustainable bottle made from bamboo and stainless steel.",
    },
    {
        id: 4,
        name: "Conservation Cap",
        price: "$20",
        image: cap,
        description: "Breathable cap to show your support for the environment.",
    },
];

const Ecommerce = ({ cart, setCart }) => {
    // ✅ Adds product to cart
    const addToCart = (product) => {
        if (!cart.find((item) => item.id === product.id)) {
            setCart([...cart, product]);
            alert(`${product.name} added to cart!`);
        } else {
            alert(`${product.name} is already in the cart.`);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-4xl font-bold text-center mb-10">
                Woodland Conservation Merchandise
            </h1>
            <p className="text-center mb-12 text-lg">
                Support conservation by purchasing eco-friendly merchandise.
            </p>

            {/* 🛍️ Product Grid */}
            <GridContainer gridCols="2" gap="8" maxWidth="6xl">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center transition-transform transform hover:scale-105"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-64 object-contain bg-white p-4"
                        />
                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {product.description}
                            </p>
                            <p className="text-xl font-bold mb-4">{product.price}</p>

                            {/* 🛒 Add to Cart Button */}
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </GridContainer>
        </div>
    );
};

export default Ecommerce;