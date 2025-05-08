"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/app/components/Layout';
import TeamContacts from '@/app/components/TeamContacts';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Steps from '@/app/components/Steps';
import ScrollArrow from '@/app/components/ScrollArrow';
import { Aperture, Camera, PenNib, ShareNetwork, ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, image: '/Slidshow_web/Renata.png', title: 'Osobní web a E-shop pro lektorku mandarínštiny', description: 'Komplexní e-commerce řešení s integrací platebního systému' },
  { id: 2, image: '/Slidshow_web/Oskar.png', title: 'Osobní web a portfólio', description: 'Statická stránka s technologií React' },
];

const technologies = ['React', 'Next.js', 'Tailwind CSS', 'WordPress'];

const Home: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      
    
      <ScrollArrow />
      
      <section className="relative h-screen overflow-hidden bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="absolute inset-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white p-8 rounded-xl" style={{
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

      <Steps />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Naše projekty</h2>
          <div className="relative h-64 sm:h-96 overflow-hidden rounded-2xl">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeSlide ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center rounded-2xl">
                  <div className="text-center text-white p-8 rounded-xl" style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Prohlédněte si naši galerii</h2>
          <p className="text-lg mb-8 text-white/80">
            Objevte více z naší práce v naší galerii, kde najdete ukázky našich projektů.
          </p>
          <a 
            href="/Services/photography/gallery" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-purple-600 hover:to-blue-600 transition duration-300"
          >
            Zobrazit celou galerii
          </a>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Spolupráce s našimi experty</h2>
          <p className="text-lg mb-12 text-center">
            Naši weboví vývojáři úzce spolupracují s našimi experty na grafiku, fotografii, video a sociální sítě, aby zajistili, že všechny prvky vašeho projektu budou dokonale sladěny.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: PenNib, title: "Grafika", description: "Vytváříme vizuálně atraktivní grafiku, která zaujme vaše publikum." },
              { icon: Aperture, title: "Fotografie", description: "Profesionální fotografie, které dodají vašemu projektu autenticitu." },
              { icon: Camera, title: "Video", description: "Kreativní videa, která vyprávějí váš příběh a zaujmou diváky." },
              { icon: ShareNetwork, title: "Sociální sítě", description: "Efektivní strategie pro správu vašich sociálních sítí a zvýšení dosahu." }
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

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Pojďme spolupracovat</h2>
          <p className="text-xl mb-10 text-white/80">Připraveni posunout váš projekt na další úroveň?</p>
          <motion.a 
            href="/contacts" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-purple-600 hover:to-blue-600 transition duration-300"
          >
            Napište nám
            <ArrowRight size={20} weight="bold" />
          </motion.a>
        </div>
      </section>

      <TeamContacts />
      
    </Layout>
  );
};

export default Home;
