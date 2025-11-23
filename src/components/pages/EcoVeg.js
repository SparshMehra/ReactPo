// Authors: Sadikshya Oli (Integration), Kunal Singla (A00461346), Cole Turner (A00469026), Bahnu Prakash (A00468530)
// Purpose: Combined Ecosystem and Flora/Fauna/Fungi interactive page

import React, { useState } from "react";
import redMaple from "../../assets/download-4.jpg";
import mole from "../../assets/download-5.jpg";
import mushroom from "../../assets/download-6.jpg";
import birchImage from "../../assets/download-7.jpg";
import chipmunk from "../../assets/download-8.jpg";

// ✅ correct relative path

// 🌿 Sample data for Flora, Fauna, and Fungi
const data = [
    {
        name: "Red Maple",
        category: "Flora",
        description: "A majestic tree known for its vibrant red leaves.",
        image: redMaple,
    },
    {
        name: "Star-nosed Mole",
        category: "Fauna",
        description:
            "An extraordinary mammal known for its unique star-shaped nose.",
        image: mole,
    },
    {
        name: "Golden Oyster Mushroom",
        category: "Fungi",
        description: "A bright yellow mushroom often found on decaying wood.",
        image: mushroom,
    },
    {
        name: "Birch Tree",
        category: "Flora",
        description: "A tree with striking white bark and vibrant leaves.",
        image: birchImage,
    },
    {
        name: "Eastern Chipmunk",
        category: "Fauna",
        description: "A small mammal with stripes and an energetic personality.",
        image: chipmunk,
    },
];

const EcoVeg = () => {
    // State to manage filter and modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState("All");

    const closeModal = () => setSelectedItem(null);

    const filteredData =
        filter === "All" ? data : data.filter((item) => item.category === filter);

    return (
        <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen space-y-10">
            {/* 🏞️ Page Title */}
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                Ecosystem & Vegetation
            </h1>

            {/* 🌍 Ecosystem Section */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-green-700">🌍 Ecosystem</h2>
                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                    Ecosystems are interconnected communities of organisms that depend on
                    one another and their environments. They regulate energy flow,
                    biodiversity, and nutrient cycles — helping sustain life on Earth.
                </p>
                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                    Protecting ecosystems is essential for maintaining climate stability,
                    preserving natural habitats, and ensuring the balance of nature.
                </p>
            </section>
            {/* 🌿 Vegetation Section */}
            <section className="pt-8 border-t border-gray-300 space-y-4">
                <h2 className="text-2xl font-semibold text-green-700">🌿 Vegetation</h2>

                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                    Vegetation forms the foundation of healthy ecosystems by providing food,
                    shelter, and oxygen for countless species. Plants help regulate climate,
                    stabilize soil, and filter the air we breathe.
                </p>

                <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
                    Protecting vegetation is essential for preventing soil erosion,
                    maintaining water quality, and preserving habitat for wildlife. By
                    conserving plant life, we help sustain the natural balance that all
                    living beings depend on.
                </p>
            </section>


            {/* 🌿 Flora, Fauna, and Fungi Section */}
            <section className="pt-8 border-t border-gray-300">
                <h2 className="text-3xl font-semibold text-center mb-6 text-green-700">
                    Explore Flora, Fauna, and Fungi
                </h2>

                {/* Filter Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                    {["All", "Flora", "Fauna", "Fungi"].map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-lg font-bold ${filter === category
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                                }`}
                            onClick={() => setFilter(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            onClick={() => setSelectedItem(item)}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <h2 className="text-xl font-bold text-white">{item.name}</h2>
                                <p className="text-sm text-gray-300">{item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative max-w-lg w-full">
                            <button
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                                {selectedItem.name}
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                {selectedItem.description}
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default EcoVeg;