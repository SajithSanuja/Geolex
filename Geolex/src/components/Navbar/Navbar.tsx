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
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Navbar: React.FC<NavbarProps> = ({
  enableShrinking = true,
  shrinkThreshold = 50,
  size = "md",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTabletSize, setIsTabletSize] = useState(false);

  // Check if we're in tablet size range (768-1024px)
  useEffect(() => {
    const checkTabletSize = () => {
      const width = window.innerWidth;
      setIsTabletSize(width >= 768 && width <= 1024);
    };

    checkTabletSize();
    window.addEventListener('resize', checkTabletSize);
    return () => window.removeEventListener('resize', checkTabletSize);
  }, []);

  // Size configurations
  const sizeConfig = {
    xs: {
      height: "h-12",
      logoSize: "h-8",
      iconSize: "h-4 w-4",
      profileIconSize: "h-6 w-6",
      iconSizeShrunken: "h-3 w-3",
      profileIconSizeShrunken: "h-5 w-5",
      textSize: "text-sm",
      textSizeShrunken: "text-xs",
      searchWidth: "w-32 md:w-40",
      searchWidthShrunken: "w-28 md:w-32",
      spacing: "space-x-1 md:space-x-2",
      spacingShrunken: "space-x-1",
      padding: "px-1 py-1 md:px-2",
      inputPadding: "py-1",
      logoScale: "scale-75",
      logoScaleShrunken: "scale-60",
    },
    sm: {
      height: "h-14",
      logoSize: "h-10",
      iconSize: "h-5 w-5",
      profileIconSize: "h-8 w-8",
      iconSizeShrunken: "h-4 w-4",
      profileIconSizeShrunken: "h-6 w-6",
      textSize: "text-sm md:text-base",
      textSizeShrunken: "text-xs md:text-sm",
      searchWidth: "w-36 md:w-70",
      searchWidthShrunken: "w-32 md:w-44",
      spacing: "space-x-1 md:space-x-3",
      spacingShrunken: "space-x-1 md:space-x-2",
      padding: "px-1 py-1 md:px-2",
      inputPadding: "py-1.5",
      logoScale: "scale-85",
      logoScaleShrunken: "scale-70",
    },
    md: {
      height: "h-18",
      logoSize: "h-14",
      iconSize: "h-8 w-8",
      profileIconSize: "h-12 w-12",
      iconSizeShrunken: "h-6 w-6",
      profileIconSizeShrunken: "h-10 w-10",
      textSize: "text-base md:text-xl",
      textSizeShrunken: "text-sm md:text-base",
      searchWidth: "w-48 md:w-72",
      searchWidthShrunken: "w-40 md:w-56",
      spacing: "space-x-2 md:space-x-6",
      spacingShrunken: "space-x-1 md:space-x-3",
      padding: "px-2 py-2 md:px-3",
      inputPadding: "py-2",
      logoScale: "scale-100",
      logoScaleShrunken: "scale-90",
    },
    lg: {
      height: "h-20",
      logoSize: "h-16",
      iconSize: "h-9 w-9",
      profileIconSize: "h-14 w-14",
      iconSizeShrunken: "h-7 w-7",
      profileIconSizeShrunken: "h-11 w-11",
      textSize: "text-lg md:text-2xl",
      textSizeShrunken: "text-base md:text-lg",
      searchWidth: "w-56 md:w-80",
      searchWidthShrunken: "w-48 md:w-64",
      spacing: "space-x-3 md:space-x-8",
      spacingShrunken: "space-x-2 md:space-x-4",
      padding: "px-3 py-2 md:px-4",
      inputPadding: "py-2.5",
      logoScale: "scale-110",
      logoScaleShrunken: "scale-95",
    },
    xl: {
      height: "h-24",
      logoSize: "h-20",
      iconSize: "h-10 w-10",
      profileIconSize: "h-16 w-16",
      iconSizeShrunken: "h-8 w-8",
      profileIconSizeShrunken: "h-12 w-12",
      textSize: "text-xl md:text-3xl",
      textSizeShrunken: "text-lg md:text-xl",
      searchWidth: "w-64 md:w-96",
      searchWidthShrunken: "w-56 md:w-80",
      spacing: "space-x-4 md:space-x-10",
      spacingShrunken: "space-x-3 md:space-x-5",
      padding: "px-4 py-3 md:px-5",
      inputPadding: "py-3",
      logoScale: "scale-125",
      logoScaleShrunken: "scale-105",
    },
  };

  const currentSizeConfig = sizeConfig[size];

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
        <div className={`flex items-center ${currentSizeConfig.height}`}>
          {/* Left Section - Logo */}
          <div className="flex-1 flex justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                src={Images.NavbarLogo}
                alt="Geolex Logo"
                className={`
                  ${currentSizeConfig.logoSize} w-auto transition-all duration-700 ease-in-out
                  ${
                    shouldShrink
                      ? `opacity-100 ${currentSizeConfig.logoScaleShrunken}`
                      : `opacity-100 ${currentSizeConfig.logoScale}`
                  }
                `}
              />
            </div>
          </div>

          {/* Center Section - Navigation and Search Bar */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div
              className={`
              flex items-center transition-all duration-700 ease-in-out
              ${isTabletSize 
                ? (shouldShrink ? "space-x-1" : "space-x-2") 
                : (shouldShrink ? currentSizeConfig.spacingShrunken : currentSizeConfig.spacing)
              }
            `}
            >
              {/* Navigation Links */}
              <div
                className={`
                flex items-center transition-all duration-700 ease-in-out
                ${isTabletSize 
                  ? (shouldShrink ? "space-x-1" : "space-x-2") 
                  : (shouldShrink ? currentSizeConfig.spacingShrunken : currentSizeConfig.spacing)
                }
              `}
              >
                <a
                  href="/"
                  className={`
                    ${isTabletSize ? "px-1 py-1" : currentSizeConfig.padding} font-medium transition-all duration-700 whitespace-nowrap font-roboto
                    ${
                      shouldShrink
                        ? `${isTabletSize ? "text-xs" : currentSizeConfig.textSizeShrunken} text-white hover:text-[#13ee9e]`
                        : `${isTabletSize ? "text-sm" : currentSizeConfig.textSize} text-white hover:text-[#13ee9e]`
                    }
                  `}
                >
                  Home
                </a>
                <a
                  href="/about"
                  className={`
                    ${isTabletSize ? "px-1 py-1" : currentSizeConfig.padding} font-medium transition-all duration-700 whitespace-nowrap navbar-links
                    ${
                      shouldShrink
                        ? `${isTabletSize ? "text-xs" : currentSizeConfig.textSizeShrunken} text-white hover:text-[#13ee9e]`
                        : `${isTabletSize ? "text-sm" : currentSizeConfig.textSize} text-white hover:text-[#13ee9e]`
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
                ${isTabletSize 
                  ? (shouldShrink ? "w-24" : "w-32") 
                  : (shouldShrink ? currentSizeConfig.searchWidthShrunken : currentSizeConfig.searchWidth)
                }
              `}
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className={`text-gray-400 ${shouldShrink ? "h-4 w-4" : "h-5 w-5"}`} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`
                      text-white block w-full pl-10 pr-3 ${isTabletSize ? "py-1" : (shouldShrink ? currentSizeConfig.inputPadding : currentSizeConfig.inputPadding)} border rounded-lg leading-5 placeholder-gray-400 
                      focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-[#13ee9e] focus:border-[#13ee9e]
                      transition-all duration-700
                      ${
                        shouldBeTransparent
                          ? `${isTabletSize ? "text-xs" : (shouldShrink ? currentSizeConfig.textSizeShrunken : currentSizeConfig.textSize)} border-gray-600/20 bg-gray-800/10`
                          : shouldShrink
                          ? `${isTabletSize ? "text-xs" : currentSizeConfig.textSizeShrunken} border-gray-600/40 bg-gray-800/60 backdrop-blur-sm`
                          : `${isTabletSize ? "text-sm" : currentSizeConfig.textSize} border-gray-600 bg-gray-800`
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
              ${isTabletSize 
                ? (shouldShrink ? "space-x-1" : "space-x-2") 
                : (shouldShrink ? currentSizeConfig.spacingShrunken : currentSizeConfig.spacing)
              }
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
                  ${isTabletSize 
                    ? (shouldShrink ? "h-4 w-4" : "h-5 w-5") 
                    : (shouldShrink ? currentSizeConfig.iconSizeShrunken : currentSizeConfig.iconSize)
                  }
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
                  ${isTabletSize 
                    ? (shouldShrink ? "h-4 w-4" : "h-5 w-5") 
                    : (shouldShrink ? currentSizeConfig.iconSizeShrunken : currentSizeConfig.iconSize)
                  }
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
                  ${isTabletSize 
                    ? (shouldShrink ? "h-6 w-6" : "h-7 w-7") 
                    : (shouldShrink ? currentSizeConfig.profileIconSizeShrunken : currentSizeConfig.profileIconSize)
                  }
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
                      text-white block w-full pl-10 pr-3 ${currentSizeConfig.inputPadding} border rounded-lg leading-5 placeholder-gray-400 
                      focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-[#13ee9e] focus:border-[#13ee9e] ${currentSizeConfig.textSizeShrunken}
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
                  block ${currentSizeConfig.padding} ${currentSizeConfig.textSizeShrunken} font-medium whitespace-nowrap navbar-links transition-all duration-700
                  text-white hover:text-[#13ee9e]
                `}
              >
                Home
              </a>
              <a
                href="/about"
                className={`
                  block ${currentSizeConfig.padding} ${currentSizeConfig.textSizeShrunken} font-medium whitespace-nowrap navbar-links transition-all duration-700
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
