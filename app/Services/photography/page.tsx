"use client";

import React, { useEffect, useState } from 'react';
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

const photoStyles = ['Portrét', 'Krajina', 'Architektura', 'Reportáž', 'Produktová'];

const Photography: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % photoProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <ScrollArrow />
      
      <section className="relative h-screen overflow-hidden bg-gradient-to-b from-blue-900 to-gray-900">
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

      <section className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300"
        >
          Profesionální fotografické služby
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl mb-10"
        >
          Zachytíme vaše okamžiky s dokonalou precizností
        </motion.p>
        <motion.a 
          href="/contacts" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-blue-600 hover:to-teal-600 transition duration-300"
        >
          Rezervovat focení
          <ArrowRight size={20} weight="bold" />
        </motion.a>
      </section>

      <Steps />

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Naše fotografické portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-2xl relative group"
              >
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-white/80">{project.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <motion.a 
              href="photography/gallery" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-blue-600 hover:to-teal-600 transition duration-300"
            >
              Zobrazit celou galerii
              <ArrowRight size={20} weight="bold" />
            </motion.a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Naše fotografické služby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Camera, title: "Portrétní", description: "Zachytíme vaši osobnost a emoce v každém snímku." },
              { icon: Image, title: "Produktová", description: "Prezentujte své produkty v tom nejlepším světle." },
              { icon: PencilSimple, title: "Retušování", description: "Profesionální úpravy a retušování vašich fotografií." },
              { icon: ShareNetwork, title: "Sociální média", description: "Obsah optimalizovaný pro vaše sociální sítě." }
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
                <item.icon size={60} className="text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Cenová nabídka</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Základní", price: "2 500 Kč", features: ["1 hodina focení", "10 upravených fotografií", "Online galerie"] },
              { title: "Standard", price: "4 500 Kč", features: ["2 hodiny focení", "20 upravených fotografií", "Online galerie", "Tisk 5 fotografií"] },
              { title: "Premium", price: "8 000 Kč", features: ["4 hodiny focení", "40 upravených fotografií", "Online galerie", "Tisk 10 fotografií", "Fotoalbum"] }
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
                <p className="text-3xl font-bold mb-6 text-teal-400">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-white/80">{feature}</li>
                  ))}
                </ul>
                <motion.a 
                  href="/contacts" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-6 rounded-full text-lg font-medium hover:from-blue-600 hover:to-teal-600 transition duration-300"
                >
                  Objednat
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Rezervujte si termín focení</h2>
          <p className="text-xl mb-10 text-white/80">Připraveni zachytit vaše jedinečné okamžiky?</p>
          <motion.a 
            href="/contacts" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-8 rounded-full text-lg font-medium hover:from-blue-600 hover:to-teal-600 transition duration-300"
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

export default Photography;
