import React from 'react';
import Masonry from 'react-masonry-css';

const GraphicGallery: React.FC = () => {
  const graphicGalleryImages = [
    { src: '/graphic_slide/design1.jpg', alt: 'Design 1' },
    { src: '/graphic_slide/design2.jpg', alt: 'Design 2' },
    { src: '/graphic_slide/design3.jpg', alt: 'Design 3' },
    { src: '/graphic_slide/design4.jpg', alt: 'Design 4' },
  ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Galerie</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {graphicGalleryImages.map((image, index) => (
            <div key={index} className="mb-4">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default GraphicGallery;