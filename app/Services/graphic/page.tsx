"use client";

import React, { useEffect, useState, useRef } from 'react';
import Layout from '@/app/components/Layout';
import TeamContacts from '@/app/components/TeamContacts';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Steps from '@/app/components/Steps';
import ScrollArrow from '@/app/components/ScrollArrow';
import { PenNib, Palette, FileSvg, Cube, ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';

const graphicProjects = [
  { id: 1, image: '/graphic_slide/REHA.png', title: 'Logo Design', description: 'Logo pro rehabilitační centrum zaměřené na zdraví a pohyb.' },
  { id: 2, image: '/graphic_slide/plakat.png', title: 'Plakát', description: 'Soutěžní plakát na téma umělecké fotografie s důrazem na vizuální přitažlivost.' },
  { id: 3, image: '/graphic_slide/poster1.webp', title: 'Grafický Plakát', description: 'Kreativní plakát s výrazným vizuálem pro kulturní akci nebo událost.' },
  { id: 4, image: '/graphic_slide/poster2.webp', title: 'Promo Design', description: 'Reklamní plakát ideální pro propagaci produktů či služeb.' },
  { id: 5, image: '/graphic_slide/poster3.webp', title: 'Event Plakát', description: 'Moderní design plakátu vhodný pro festivaly, koncerty nebo workshopy.' },
  { id: 7, image: '/graphic_slide/poster5.webp', title: 'Reklamní Grafika', description: 'Dynamický grafický návrh plakátu pro komerční využití.' },
];

interface GraphicProject {
  id: number;
  image: string;
  title: string;
  description: string;
}

const renderGraphicSlideContent = (project: GraphicProject): JSX.Element => (
  <div className="absolute top-20 left-0 max-w-md bg-black bg-opacity-70 flex items-start justify-start p-6 rounded-r-lg">
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
      <p className="text-sm">{project.description}</p>
    </div>
  </div>
);

const Graphic: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const slideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2; // 2% každých 100ms = 5s na 100%
      });
    }, 5000 / 50);

    slideRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % graphicProjects.length);
    }, 5000);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (slideRef.current) clearTimeout(slideRef.current);
    };
  }, [activeSlide]);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <Layout>
      <ScrollArrow />

      <section className="relative h-screen overflow-hidden bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 z-20 flex justify-center pt-5">
          <div className="flex gap-2 w-full">
            {graphicProjects.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-2 rounded-full bg-purple-300 cursor-pointer overflow-hidden transition-all"
                style={{
                  minWidth: '40px',
                  maxWidth: '120px',
                  boxShadow: idx === activeSlide ? '0 0 0 2px #a21caf' : undefined,
                }}
                onClick={() => handleDotClick(idx)}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width:
                      idx < activeSlide
                        ? '100%'
                        : idx === activeSlide
                        ? `${progress}%`
                        : '0%',
                    background: idx === activeSlide
                      ? 'linear-gradient(90deg,#a21caf,#c084fc)'
                      : idx < activeSlide
                      ? 'linear-gradient(90deg,#a21caf,#c084fc)'
                      : 'transparent',
                    transition: idx === activeSlide
                      ? 'width 0.1s linear'
                      : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0">
          {graphicProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-full object-contain"
              />
              {renderGraphicSlideContent(project)}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
        >
          Kreativní grafické služby
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl mb-10"
        >
          Vytváříme vizuální identitu, která zaujme a inspiruje
        </motion.p>
        <motion.a 
          href="/contacts" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-purple-600 hover:to-blue-600 transition duration-300"
        >
          Kontaktujte nás
          <ArrowRight size={20} weight="bold" />
        </motion.a>
      </section>

      <Steps />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Naše grafické projekty</h2>
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
              700: 1,
            }}
            className="flex -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {graphicProjects.map((project) => (
              <div key={project.id} className="mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="mt-2 text-white">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.description}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Naše grafické služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: PenNib, title: "Logo design", description: "Vytvoření jedinečné vizuální identity pro vaši značku." },
              { icon: Palette, title: "Branding", description: "Komplexní řešení vizuální komunikace vaší společnosti." },
              { icon: FileSvg, title: "Ilustrace", description: "Originální ilustrace pro vaše projekty a publikace." },
              { icon: Cube, title: "3D grafika", description: "Tvorba poutavých 3D vizualizací a modelů." }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              >
                <item.icon size={60} className="text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Cenová nabídka</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Základní", price: "5 000 Kč", features: ["Logo design", "Základní branding", "2 revize"] },
              { title: "Standard", price: "15 000 Kč", features: ["Logo design", "Kompletní branding", "Tiskoviny", "5 revizí"] },
              { title: "Premium", price: "30 000 Kč", features: ["Logo design", "Kompletní branding", "Tiskoviny", "Web design", "Neomezené revize"] }
            ].map((plan, index) => (
              <motion.div 
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              >
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.title}</h3>
                <p className="text-3xl font-bold mb-6 text-blue-400">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-white/80">{feature}</li>
                  ))}
                </ul>
                <motion.a 
                  href="/contacts" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-6 rounded-full text-lg font-medium hover:from-purple-600 hover:to-blue-600 transition duration-300"
                >
                  Objednat
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Začněme tvořit</h2>
          <p className="text-xl mb-10 text-white/80">Připraveni dát vaší značce nový vizuální rozměr?</p>
          <motion.a 
            href="/contacts" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-purple-600 hover:to-blue-600 transition duration-300"
          >
            Kontaktujte nás
            <ArrowRight size={20} weight="bold" />
          </motion.a>
        </div>
      </section>

      <TeamContacts />
      
    </Layout>
  );
};

export default Graphic;