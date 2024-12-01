import { Twitter, Github, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <header className="relative border-t border-purple-100/50 dark:border-purple-900/50 mt-auto">
      <div className="absolute inset-0  bg-gradient-to-b from-purple-50/30 via-blue-50/20 to-pink-50/30 mx-auto  dark:from-purple-900/30 dark:via-blue-900/20 dark:to-pink-900/30 px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="  border-purple-100/50  text-lg  bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 "
          >
            Done for Ackee
            by
            -_-
          </motion.div> 

          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href={
                "https://x.com/JeevanR43715457"
            }>
            <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer"  />
            </Link>
            <Link
            href={
                "https://github.com/jeevan4476"
            }>
            <Github className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />            
            </Link>
            <Globe className="h-5 w-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}