"use client";

import React, { useEffect, useState, useRef } from 'react';
import Layout from '@/app/components/Layout';
import TeamContacts from '@/app/components/TeamContacts';
import ScrollArrow from '@/app/components/ScrollArrow';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { ArrowRight } from '@phosphor-icons/react';

const webProjects = [
  { id: 1, image: '/Slidshow_web/Renata.png', title: 'Osobní web a E-shop pro lektorku mandarínštiny', description: 'Komplexní e-commerce řešení s integrací platebního systému.' },
  { id: 2, image: '/Slidshow_web/Oskar.png', title: 'Osobní web a portfólio', description: 'Statická stránka s technologií React.' },
];

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
}

const renderSlideContent = (project: Project) => (
  <div className="absolute top-20 left-0 max-w-md bg-black bg-opacity-70 flex items-start justify-start p-6 rounded-r-lg">
    <div className="text-white">
      <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
      <p className="text-sm">{project.description}</p>
    </div>
  </div>
);

const WebDevelopment: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const slideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setProgress(0);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 5000 / 50);

    slideRef.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % webProjects.length);
    }, 5000);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (slideRef.current) clearTimeout(slideRef.current);
    };
  }, [activeSlide]);

  return (
    <Layout>
      <ScrollArrow />

      {/* Slideshow Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="absolute top-0 left-0 w-full z-20 flex justify-center pt-5">
          <div className="flex gap-2 w-3/4">
            {webProjects.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-2 rounded-full bg-purple-300 cursor-pointer overflow-hidden transition-all"
                style={{
                  minWidth: '40px',
                  maxWidth: '120px',
                  boxShadow: idx === activeSlide ? '0 0 0 2px #a21caf' : undefined,
                }}
                onClick={() => setActiveSlide(idx)}
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
          {webProjects.map((project, index) => (
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
              {renderSlideContent(project)}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Naše webové projekty</h2>
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
              700: 1,
            }}
            className="flex -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {webProjects.map((project) => (
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

      <section className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
        >
          Moderní webová řešení
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl mb-10"
        >
          Vytváříme inovativní digitální zážitky
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

      <TeamContacts />
    </Layout>
  );
};

export default WebDevelopment;