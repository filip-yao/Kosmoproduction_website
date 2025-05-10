"use client";

import React, { useEffect, useState, useRef } from 'react';
import Layout from '@/app/components/Layout';
import TeamContacts from '@/app/components/TeamContacts';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Steps from '@/app/components/Steps';
import ScrollArrow from '@/app/components/ScrollArrow';
import { Camera, Image, PencilSimple, ShareNetwork, ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const photoProjects = [
  { id: 1, image: '/photo_slide/vanda1.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 2, image: '/photo_slide/vanda2.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 3, image: '/photo_slide/motorka1.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 4, image: '/photo_slide/vanda3.PNG', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 5, image: '/photo_slide/trumpeta1.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 6, image: '/photo_slide/salina.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 7, image: '/photo_slide/trumpeta2.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
  { id: 8, image: '/photo_slide/motorka2.jpg', title: 'Portrétní fotografie', description: 'Zachycení osobnosti a emocí v každém snímku' },
];

const Photography: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const slideTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setProgress(0);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 100 * 50ms = 5000ms (5 sekund)

    slideTimeout.current = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % photoProjects.length);
    }, 5000);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (slideTimeout.current) clearTimeout(slideTimeout.current);
    };
  }, [activeSlide]);

  return (
    <Layout>
      <ScrollArrow />
      <section className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-900 to-gray-900">
        {/* Fialový progress bar nahoře */}
        <div className="absolute top-0 left-0 w-full z-20">
          <div className="w-full h-3 bg-purple-200">
            <div
              className="h-3 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-75"
              style={{
                width: `${progress}%`,
                transition: 'width 0.05s linear'
              }}
            />
          </div>
        </div>
        <div className="absolute inset-0">
          {photoProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter flex items-center justify-center">
                <div className="text-center text-white p-8 rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                  <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
                  <p className="text-xl">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* ...zbytek stránky beze změny */}
      {/* ... */}
      <TeamContacts />
    </Layout>
  );
};

export default Photography;
