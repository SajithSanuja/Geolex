import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Images } from "../../assets/assets";

interface NavbarProps {
  enableShrinking?: boolean;
  shrinkThreshold?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  enableShrinking = true,
  shrinkThreshold = 50,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Throttle scroll events for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > shrinkThreshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shrinkThreshold]);

  const shouldShrink = enableShrinking && isScrolled;
  const shouldBeTransparent = !enableShrinking && isScrolled; // Full transparent when shrinking disabled

  return (
    <nav
      className={`
        w-full sticky top-0 z-50 navbar-container transition-all duration-700 ease-in-out flex justify-center
        ${
          shouldBeTransparent
            ? "bg-transparent"
            : shouldShrink
            ? "bg-transparent"
            : "bg-[#151b25] shadow-md"
        }
      `}
    >
      <div
        className={`
          px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out
          ${
            shouldBeTransparent
              ? "w-full bg-transparent" // Full transparent when shrinking disabled
              : shouldShrink
              ? "w-1/2 bg-[#151b25]/20 backdrop-blur-md rounded-b-2xl mx-auto shadow-lg border border-white/10"
              : "w-full"
          }
        `}
      >
        <div className="flex items-center h-18">
          {/* Left Section - Logo */}
          <div className="flex-1 flex justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                src={Images.NavbarLogo}
                alt="Geolex Logo"
                className={`
                  h-14 w-auto transition-all duration-700 ease-in-out
                  ${
                    shouldShrink
                      ? "opacity-100 scale-90"
                      : "opacity-100 scale-100"
                  }
                `}
              />
            </div>
          </div>

          {/* Center Section - Navigation and Search Bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <div
              className={`
              flex items-center transition-all duration-700 ease-in-out
              ${shouldShrink ? "space-x-4" : "space-x-8"}
            `}
            >
              {/* Navigation Links */}
              <div
                className={`
                flex transition-all duration-700 ease-in-out
                ${shouldShrink ? "space-x-3" : "space-x-6"}
              `}
              >
                <a
                  href="/"
                  className={`
                    px-3 py-2 font-medium transition-all duration-700 whitespace-nowrap font-roboto
                    ${
                      shouldShrink
                        ? "text-base text-white hover:text-[#13ee9e]"
                        : "text-xl text-white hover:text-[#13ee9e]"
                    }
                  `}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className={`
                    px-3 py-2 font-medium transition-all duration-700 whitespace-nowrap navbar-links
                    ${
                      shouldShrink
                        ? "text-base text-white hover:text-[#13ee9e]"
                        : "text-xl text-white hover:text-[#13ee9e]"
                    }
                  `}
                >
                  About Us
                </a>
              </div>

              {/* Search Bar */}
              <div
                className={`
                transition-all duration-700 ease-in-out
                ${shouldShrink ? "w-48" : "w-64"}
              `}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                      text-white block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 placeholder-gray-400 
                      focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-[#13ee9e] focus:border-[#13ee9e]
                      transition-all duration-700
                      ${
                        shouldBeTransparent
                          ? "text-base border-gray-600/20 bg-gray-800/10" // Very transparent when shrinking disabled
                          : shouldShrink
                          ? "text-sm border-gray-600/40 bg-gray-800/60 backdrop-blur-sm"
                          : "text-base border-gray-600 bg-gray-800"
                      }
                    `}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Icons */}
          <div className="flex-1 flex justify-end">
            <div
              className={`
              flex items-center transition-all duration-700 ease-in-out
              ${shouldShrink ? "space-x-2" : "space-x-4"}
            `}
            >
              {/* Wishlist Icon */}
              <button
                className={`
                  p-2 transition-all duration-700 relative
                  text-white hover:text-[#13ee9e]
                `}
              >
                <HeartIcon
                  className={`
                  transition-all duration-700 ease-in-out
                  ${shouldShrink ? "h-6 w-6" : "h-8 w-8"}
                `}
                />
                <span className="absolute -top-1 -right-1 bg-[#13ee9e] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Cart Icon */}
              <button
                className={`
                  p-2 transition-all duration-700 relative
                  text-white hover:text-[#13ee9e]
                `}
              >
                <ShoppingCartIcon
                  className={`
                  transition-all duration-700 ease-in-out
                  ${shouldShrink ? "h-6 w-6" : "h-8 w-8"}
                `}
                />
                <span className="absolute -top-1 -right-1 bg-[#13ee9e] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Profile Icon */}
              <button
                className={`
                  p-2 transition-all duration-700
                  text-white hover:text-[#13ee9e]
                `}
              >
                <UserCircleIcon
                  className={`
                  transition-all duration-700 ease-in-out
                  ${shouldShrink ? "h-10 w-10" : "h-12 w-12"}
                `}
                />
              </button>

              {/* Mobile Menu Button */}
              <button
                className={`
                  md:hidden p-2 transition-all duration-700
                  text-white hover:text-[#13ee9e]
                `}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`
              md:hidden transition-all duration-700
              ${
                shouldBeTransparent
                  ? "bg-transparent"
                  : shouldShrink
                  ? "bg-[#151b25]/20 backdrop-blur-sm border-t border-white/10"
                  : "border-t border-gray-600"
              }
            `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                      text-white block w-full pl-10 pr-3 py-2 border rounded-lg leading-5 placeholder-gray-400 
                      focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-[#13ee9e] focus:border-[#13ee9e] text-sm
                      transition-all duration-700
                      ${
                        shouldBeTransparent
                          ? "border-gray-600/20 bg-gray-800/10"
                          : shouldShrink
                          ? "border-gray-600/40 bg-gray-800/60"
                          : "border-gray-600 bg-gray-800"
                      }
                    `}
                  />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <a
                href="/"
                className={`
                  block px-3 py-2 text-base font-medium whitespace-nowrap navbar-links transition-all duration-700
                  text-white hover:text-[#13ee9e]
                `}
              >
                Home
              </a>
              <a
                href="/about"
                className={`
                  block px-3 py-2 text-base font-medium whitespace-nowrap navbar-links transition-all duration-700
                  text-white hover:text-[#13ee9e]
                `}
              >
                About Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
