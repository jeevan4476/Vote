"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" border-t border-purple-100/50 dark:border-purple-900  dark:shadow-orange-100  dark:bg-gray-900 ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm dark:text-gray-300">
            Vote  
          </div>
          
          <div className="flex space-x-6">
            <SocialLink href="https://github.com/jeevan4476" icon={<Github size={20} />} />
            <SocialLink href="https://x.com/JeevanR43715457" icon={<Twitter size={20} />} />          
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}