import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { ArrowRight, ArrowLeft, Plus, CaretLeft, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ProjectsGallery = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const projects = [
    {
      id: 1,
      title: "Osobní web a E-shop pro lektorku mandarínštiny",
      image: "/projects/renca_web.png",
      description: "Komplexní e-commerce řešení s integrací platebního systému",
      detailp: "https://renatamirkova.com",
    },
    {
      id: 1,
      title: "Osobní portfólio",
      image: "/projects/oskar_web.png",
      description: "Statická stránka se systémem pro správu obsahu",
    
      detailp: "https://oskarpetr.com",
    },
    // Přidejte další projekty...
  ];

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "navigation") {
        setIframeUrl(event.data.url);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleNavigate = (direction: "next" | "prev") => {
    if (selectedProject === null) return;

    const newIndex =
      direction === "next"
        ? (selectedProject + 1) % projects.length
        : (selectedProject - 1 + projects.length) % projects.length;

    setSelectedProject(newIndex);
  };

  const handleProjectDetail = (url: string) => {
    setIsOpen(false);
    setShowProjectDetail(true);
    setIframeUrl(url);
  };

  const injectNavigationHandler = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "injectNavigationHandler",
          handler: `
            document.body.addEventListener('click', function(e) {
              if (e.target.tagName === 'A') {
                e.preventDefault();
                window.parent.postMessage({ type: 'navigation', url: e.target.href }, '*');
              }
            });
          `,
        },
        "*"
      );
    }
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Decorative background elements */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500 rounded-full filter blur-3xl opacity-5"></div>
      </div>
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300"
      >
        Naše projekty
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-500 hover:translate-y-[-8px]"
            onClick={() => {
              setSelectedProject(index);
              setIsOpen(true);
            }}
            style={{
              background: "rgba(24, 24, 74, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.18)"
            }}
          >
            <div className="aspect-square relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div 
                className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  <Plus size={32} weight="bold" className="text-white" />
                </div>
              </div>
            </div>

            <div 
              className="p-6 border-t border-white/10"
              style={{ background: "rgba(24, 24, 74, 0.7)" }}
            >
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 mb-2">
                {project.title}
              </h3>
              <p className="text-white/70 text-sm">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="outline-none max-w-5xl mx-auto my-12 w-11/12 relative bg-transparent"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
        ariaHideApp={false}
      >
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(24, 24, 74, 0.7)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/90 hover:bg-black/50 transition-all duration-300"
                aria-label="Zavřít"
              >
                <X size={20} weight="bold" />
              </button>
              
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square">
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#18184A]/80 via-transparent to-transparent md:bg-gradient-to-b" />
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 mb-4">
                    {projects[selectedProject].title}
                  </h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    {projects[selectedProject].description}
                  </p>
                  <button
                    onClick={() => handleProjectDetail(projects[selectedProject].detailp)}
                    className="self-start px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 group"
                  >
                    Detail projektu
                    <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
                <div className="w-full flex justify-between pointer-events-auto">
                  {selectedProject > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate("prev");
                      }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                      aria-label="Předchozí projekt"
                    >
                      <ArrowLeft size={24} weight="bold" />
                    </button>
                  )}
                  {selectedProject < projects.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate("next");
                      }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ml-auto"
                      aria-label="Další projekt"
                    >
                      <ArrowRight size={24} weight="bold" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>

      <AnimatePresence>
        {showProjectDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50 flex flex-col"
          >
            <div 
              className="p-4 border-b border-white/10"
              style={{
                background: "rgba(24, 24, 74, 0.8)",
                backdropFilter: "blur(12px)"
              }}
            >
              <button
                onClick={() => {
                  setShowProjectDetail(false);
                  setIsOpen(true);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 backdrop-blur-sm"
              >
                <CaretLeft size={20} weight="bold" />
                <span>Zpět na galerii projektů</span>
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              <iframe
                ref={iframeRef}
                src={iframeUrl}
                className="w-full h-full border-none bg-white"
                onLoad={injectNavigationHandler}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsGallery;
