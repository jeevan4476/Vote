import { Facebook, Instagram, Twitter, Github, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <header className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            Done for Ackee
          </div>
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