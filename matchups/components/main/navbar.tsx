import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define NAV_LINKS with proper typing
interface NavLink {
  title: string;
  link: string;
}

const NAV_LINKS: NavLink[] = [
  { title: 'About', link: '#about-me' },
  { title: 'Features', link: '#features' },
  { title: 'API Viewer', link: '#api' },
];

// Navbar props interface
interface NavbarProps {
  showApi: boolean;
  setShowApi: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({ showApi, setShowApi }: NavbarProps) => {
  const [showNavMenu, setShowNavMenu] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link href="#about-me" className="flex items-center">
          <Image
            src="/basketball.jpg"
            alt="Logo"
            width={70}
            height={70}
            draggable={false}
            className="cursor-pointer"
          />
          <div className="hidden md:flex md:font-bold ml-[10px] text-gray-300">
            NBA Matchups
          </div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) =>
              link.title === 'API Viewer' ? (
                <button
                  key={link.title}
                  onClick={() => {
                    setShowApi((prev) => !prev); // Wrap in block to return void
                  }}
                  className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-gray-200"
                >
                  {showApi ? 'Hide API' : 'Show API'}
                </button>
              ) : (
                <Link
                  key={link.title}
                  href={link.link}
                  className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
                >
                  {link.title}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};