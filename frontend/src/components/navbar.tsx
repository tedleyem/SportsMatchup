import { useState } from "react";

// Define NAV_LINKS with proper typing
interface NavLink {
  title: string;
  link: string;
}

const NAV_LINKS: NavLink[] = [
  {
    title: "About",
    link: "https://github.com/gitforfabianv/SportsMatchup/blob/main/README.md",
  },
  {
    title: "Feature Requests",
    link: "https://github.com/gitforfabianv/SportsMatchup/issues",
  },
  { title: "Donate", link: "#donate" },
  { title: "API", link: "/test" },
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
    <div className="w-full h-[65px] sticky top-0 shadow-lg shadow-orange-light/50 bg-black backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <a href="#about-me" className="flex items-center">
          <img
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
        </a>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto bg-gray-dark px-4 py-2 rounded-full">
            {NAV_LINKS.map((link) =>
              link.title === "API Viewer" ? (
                <button
                  key={link.title}
                  onClick={() => {
                    setShowApi((prev) => !prev); // Wrap in block to return void
                  }}
                  className="cursor-pointer text-white hover:text-orange-light transition"
                >
                  {showApi ? "Hide API" : "Show API"}
                </button>
              ) : (
                <a
                  key={link.title}
                  href={link.link}
                  className="cursor-pointer text-white hover:text-orange-light transition"
                >
                  {link.title}
                </a>
              )
            )}
          </div>
        </div>
        <div>SOCIAL LINKS</div>
      </div>
    </div>
  );
};
