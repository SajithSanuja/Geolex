import React from "react";
import { Icons } from "../../assets/assets";

interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
}

// ===== SINGLE PLACE TO CUSTOMIZE ALL STYLING =====
const CATEGORY_STYLES = {
  // Rectangle dimensions
  rectangle: {
    height: "min-h-[80px]",
    width: "flex-1",
    padding: "p-2",
  },

  // Content positioning
  layout: {
    direction: "flex-row",
    alignment: "items-center",
    justification: "justify-center",
    spacing: "space-x-2",
  },

  // Icon styling
  icon: {
    containerSize: "w-10 h-10",
    imageSize: "w-10 h-10",
    hoverEffect: "group-hover:scale-110",
  },

  // Text styling
  text: {
    fontSize: "text-base",
    fontWeight: "font-medium",
    fontFamily: "font-poppins",
    textAlign: "text-center",
    lineHeight: "leading-tight",
  },

  // Colors and effects - Using CSS Variables (HOVER COLORS REMOVED)
  colors: {
    background: "bg-[var(--category-bg)]", // #353535
    hoverBackground: "hover:bg-[var(--category-hover-bg)]", // #4a4a4a
    textColor: "text-[var(--category-text)]", // Pure white
    border: "border border-[var(--category-border)]", // #424242
    transition: "transition-all duration-200",
  },

  // Title styling
  title: {
    show: false,
    text: "Shop by Category",
    fontSize: "text-3xl",
    fontWeight: "font-bold",
    color: "text-[var(--category-text)]", // Pure white
    spacing: "py-8",
    alignment: "text-center",
  },
};

const categories: Category[] = [
  {
    id: "laptops",
    name: "Laptops",
    icon: Icons.desktop,
    href: "/categories/laptops",
  },
  {
    id: "used-desktop",
    name: "Used Desktop",
    icon: Icons.desktop,
    href: "/categories/used-desktop",
  },
  {
    id: "brand-new-desktop",
    name: "Brand New Desktop",
    icon: Icons.desktop,
    href: "/categories/brand-new-desktop",
  },
  {
    id: "processors",
    name: "Processors",
    icon: Icons.processor,
    href: "/categories/processors",
  },
  {
    id: "motherboards",
    name: "Motherboards",
    icon: Icons.motherboard,
    href: "/categories/motherboards",
  },
  {
    id: "memory",
    name: "Memory",
    icon: Icons.ram,
    href: "/categories/memory",
  },
  {
    id: "casing",
    name: "Casing",
    icon: Icons.casing,
    href: "/categories/casing",
  },
  {
    id: "monitors",
    name: "Monitors",
    icon: Icons.monitor,
    href: "/categories/monitors",
  },
  {
    id: "storage-odd",
    name: "Storage & ODD",
    icon: Icons.storage,
    href: "/categories/storage-odd",
  },
  {
    id: "ssd",
    name: "SSD",
    icon: Icons.ssd,
    href: "/categories/ssd",
  },
  {
    id: "power-supply",
    name: "Power Supply",
    icon: Icons.accessories,
    href: "/categories/power-supply",
  },
  {
    id: "graphics-card",
    name: "Graphics Card",
    icon: Icons.gpu,
    href: "/categories/graphics-card",
  },
  {
    id: "cooling",
    name: "Cooling",
    icon: Icons.cooling,
    href: "/categories/cooling",
  },
  {
    id: "speaker-headphone",
    name: "Speaker & Headphone",
    icon: Icons.sounds,
    href: "/categories/speaker-headphone",
  },
  {
    id: "laptop-accessories",
    name: "Laptop Accessories",
    icon: Icons.laptopAccessories,
    href: "/categories/laptop-accessories",
  },
  {
    id: "printers-accessories",
    name: "Printers & Accessories",
    icon: Icons.printer,
    href: "/categories/printers-accessories",
  },
  {
    id: "network-accessories",
    name: "Network & Accessories",
    icon: Icons.networking,
    href: "/categories/network-accessories",
  },
  {
    id: "pen-drive-sd-card",
    name: "Pen Drive & SD Card",
    icon: Icons.penSd,
    href: "/categories/pen-drive-sd-card",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Icons.accessories,
    href: "/categories/accessories",
  },
  {
    id: "pcie-adapters-cables",
    name: "PCIe|Adapters & Cables",
    icon: Icons.nic,
    href: "/categories/pcie-adapters-cables",
  },
  {
    id: "keyboard-mouse",
    name: "Keyboard & Mouse",
    icon: Icons.keyboardMouse,
    href: "/categories/keyboard-mouse",
  },
];

const Categories: React.FC = () => {
  // Split categories into exactly 3 rows of 7 items each
  const row1 = categories.slice(0, 7);
  const row2 = categories.slice(7, 14);
  const row3 = categories.slice(14, 21);

  // Build className strings from configuration
  const rectangleClasses = `
    ${CATEGORY_STYLES.rectangle.width} 
    group 
    flex 
    ${CATEGORY_STYLES.layout.direction} 
    ${CATEGORY_STYLES.layout.alignment} 
    ${CATEGORY_STYLES.layout.justification} 
    ${CATEGORY_STYLES.rectangle.padding} 
    ${CATEGORY_STYLES.colors.background} 
    ${CATEGORY_STYLES.colors.hoverBackground} 
    ${CATEGORY_STYLES.colors.transition} 
    ${CATEGORY_STYLES.colors.border} 
    ${CATEGORY_STYLES.rectangle.height} 
    ${CATEGORY_STYLES.layout.spacing}
  `
    .replace(/\s+/g, " ")
    .trim();

  // Icon classes without hover color changes
  const iconClasses = `
    ${CATEGORY_STYLES.icon.imageSize} 
    object-contain 
    ${CATEGORY_STYLES.icon.hoverEffect} 
    transition-transform
    category-icon
  `
    .replace(/\s+/g, " ")
    .trim();

  // Text classes without hover color changes
  const textClasses = `
    ${CATEGORY_STYLES.text.fontSize} 
    ${CATEGORY_STYLES.text.fontWeight} 
    ${CATEGORY_STYLES.colors.textColor} 
    ${CATEGORY_STYLES.text.textAlign} 
    ${CATEGORY_STYLES.text.lineHeight} 
    ${CATEGORY_STYLES.text.fontFamily}
  `
    .replace(/\s+/g, " ")
    .trim();

  const titleClasses = `
    ${CATEGORY_STYLES.title.fontSize} 
    ${CATEGORY_STYLES.title.fontWeight} 
    ${CATEGORY_STYLES.title.color} 
    ${CATEGORY_STYLES.title.alignment} 
    ${CATEGORY_STYLES.title.spacing}
    ${CATEGORY_STYLES.text.fontFamily}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <section className="w-full bg-[var(--category-bg)]/80 border-y border-gray-600/30">
      <div className="w-full">
        {/* Title */}
        {CATEGORY_STYLES.title.show && (
          <h2 className={titleClasses}>{CATEGORY_STYLES.title.text}</h2>
        )}

        {/* Row 1 */}
        <div className="flex w-full">
          {row1.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={rectangleClasses}
            >
              <div
                className={`${CATEGORY_STYLES.icon.containerSize} flex items-center justify-center flex-shrink-0`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className={iconClasses}
                />
              </div>
              <span className={textClasses}>{category.name}</span>
            </a>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex w-full">
          {row2.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={rectangleClasses}
            >
              <div
                className={`${CATEGORY_STYLES.icon.containerSize} flex items-center justify-center flex-shrink-0`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className={iconClasses}
                />
              </div>
              <span className={textClasses}>{category.name}</span>
            </a>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex w-full">
          {row3.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={rectangleClasses}
            >
              <div
                className={`${CATEGORY_STYLES.icon.containerSize} flex items-center justify-center flex-shrink-0`}
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className={iconClasses}
                />
              </div>
              <span className={textClasses}>{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
