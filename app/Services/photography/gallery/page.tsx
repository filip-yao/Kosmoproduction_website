"use client";

import React, { useState } from 'react';
import Layout from '@/app/components/Layout';
import { motion } from 'framer-motion';

const galleryImages = [
  '/photo_slide/vanda1.jpg',
  '/photo_slide/vanda2.jpg',
  '/photo_slide/motorka1.jpg',
  '/photo_slide/vanda3.PNG',
  '/photo_slide/trumpeta1.jpg',
  '/photo_slide/salina.jpg',
  '/photo_slide/trumpeta2.jpg',
  '/photo_slide/motorka2.jpg',
];

const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const closeModal = () => setSelectedImageIndex(null);
  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };
  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  return (
    <Layout>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Galerie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-2xl relative group"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-white/80">Fotografie {index + 1}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {selectedImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-full max-h-full p-8 rounded-lg">
              <img
                src={galleryImages[selectedImageIndex]}
                alt="Selected"
                className="max-w-screen max-h-screen object-contain rounded-lg"
              />
              <button
                onClick={closeModal}
                className="fixed top-4 right-4 text-white bg-black bg-opacity-75 rounded-full p-3 hover:bg-opacity-90 z-50"
              >
                ✕
              </button>
              <button
                onClick={prevImage}
                className="fixed left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-75 rounded-full p-3 hover:bg-opacity-90 z-50"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="fixed right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-75 rounded-full p-3 hover:bg-opacity-90 z-50"
              >
                ▶
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-75 rounded-full px-4 py-2">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Gallery;