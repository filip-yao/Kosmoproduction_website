import { Aperture, Globe, PenNib, Phone, ShareNetwork, X, List, House } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav 
      className="sticky top-0 z-50 w-full px-5 py-4 sm:px-8 md:px-10"
      style={{
        background: "rgba(10, 10, 30, 0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="shrink-0 relative group">
          <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100"></div>
          <Image
            src="/Logo.png"
            alt="Kosmo Production logo"
            height={40}
            width={160}
            className="w-32 md:w-40 relative"
          />
        </Link>

        {/* Desktop navigation */}
        <div 
          className="hidden items-center gap-6 md:flex md:gap-8 px-6 py-2 rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}
        >
          <GlassNavLink href="/" icon={House} label="Domov" />
          {/* <GlassNavLink href="/Services/social-media" icon={ShareNetwork} label="Sociální sítě" /> */}
         
          <GlassNavLink href="/Services/web-development" icon={Globe} label="Webové stránky" />
          <GlassNavLink href="/Services/photography" icon={Aperture} label="Fotografie" />
          <GlassNavLink href="/Services/graphic" icon={PenNib} label="Grafika" />
          <GlassNavLink href="/contacts" icon={Phone} label="Kontakty" />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full p-3 text-white transition-all duration-300 hover:bg-white/10 md:hidden"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)"
          }}
          aria-label="Otevřít menu"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-[72px] w-full md:hidden overflow-hidden"
            style={{
              background: "rgba(10, 10, 40, 0.85)",
              backdropFilter: "blur(15px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
            }}
          >
            <div className="flex h-full flex-col items-center gap-4 overflow-y-auto p-6 pt-8">
              <GlassMobileNavLink href="/" icon={House} label="Domov" delay={0.1} />
              {/*<GlassMobileNavLink href="../Services/social-media" icon={ShareNetwork} label="Sociální sítě" delay={0.2} />*/}
              <GlassMobileNavLink href="../Services/web-development" icon={Globe} label="Webové stránky" delay={0.3} />
              <GlassMobileNavLink href="../Services/photography" icon={Aperture} label="Fotografie" delay={0.4} />
              <GlassMobileNavLink href="../Services/graphic" icon={PenNib} label="Grafika" delay={0.5} />
              <GlassMobileNavLink href="/contacts" icon={Phone} label="Kontakty" delay={0.6} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Glassmorphism desktopové odkazy
function GlassNavLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 opacity-90 transition-all duration-300 hover:opacity-100 px-3 py-1 rounded-full relative"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 to-blue-500/0 opacity-0 group-hover:from-purple-500/20 group-hover:to-blue-500/20 group-hover:opacity-100 transition-all duration-300"></div>
      <Icon size={18} weight="bold" className="mb-0.5 text-blue-300" />
      <div className="relative">
        <span className="text-sm font-medium">{label}</span>
        <div className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full" />
      </div>
    </Link>
  );
}

// Glassmorphism mobilní odkazy
function GlassMobileNavLink({ href, icon: Icon, label, delay }: { href: string; icon: any; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="w-full max-w-xs"
    >
      <Link
        href={href}
        className="flex items-center gap-4 rounded-xl px-6 py-4 text-lg transition-all duration-300 hover:scale-105"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="p-2 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
          <Icon size={24} weight="bold" className="text-blue-300" />
        </div>
        <span className="font-medium">{label}</span>
      </Link>
    </motion.div>
  );
}
