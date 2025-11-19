// Author: Kunal Singla(A00461346)
// Purpose: This file represents the gallery component.

import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Button from "@mui/material/Button";
import CreateGalleryForm from "../features/gallery/CreateGalleryForm";
import useGallery from "../features/gallery/useGallery";
const Gallery = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  console.log(isFormOpen);
  const { isLoading, galleries, error } = useGallery();
  if (isLoading) return <div className="h-screen text-center">Loading...</div>;

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Enchanting Forest Gallery
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-8">
        Discover the breathtaking beauty of forests and serene landscapes. Feel
        free to add your favorite photos to enrich this gallery!
      </p>

      {/* Gallery Grid */}
      <div
        id="gallery"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {galleries.map((gallery, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            {/* Image */}
            <img
              src={gallery.imageUrl}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay with name */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white text-lg font-base">
                {gallery.imageDescription || ""}
              </p>
              <p className="text-white text-right text-lg font-semibold mt-1">
                <i className="font-medium">Photographer: </i>{" "}
                {gallery.photographer || ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Button
          variant="contained"
          onClick={() => setFormOpen((prev) => !prev)}
          endIcon={isFormOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        >
          Upload Image
        </Button>
        {isFormOpen && <CreateGalleryForm></CreateGalleryForm>}
      </div>
    </div>
  );
};

export default Gallery;
