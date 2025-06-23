import React from "react";
import { NavLink } from "react-router";
import { AnimatePresence, motion, useCycle } from "motion/react";
import ThemeToggle from "./ThemeToggle";
type NavbarProps = {
  title: string;
};

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [isMenuOpen, toggleOpen] = useCycle(false, true);
  const commonProps = {
    strokeWidth: 2,
    strokeLinecap: "round" as const,
  };

  const handleMenuToggle = () => {
    toggleOpen();
  };

  const handleNavlinkClick = () => {
    toggleOpen(1);
  };
  return (
    <>
      <nav className=" flex justify-between px-2 py-4 dark:bg-gray-950/40 shadow-md relative z-10">
        <h1 className="title">{title}</h1>
        <ul
          className="hidden sm:flex space-x-7 mx-2"
          onClick={handleNavlinkClick}
        >
          <li>
            <NavLink onClick={handleNavlinkClick} className="link" to="/">
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleNavlinkClick} className="link" to="/about">
              <span>About</span>
            </NavLink>
          </li>
        </ul>
        <div className="flex space-x-1">
          <ThemeToggle />
          <motion.svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" // 🔥 Key line
            strokeWidth={2} // Add this if missing
            strokeLinecap="round" // Optional: nicer look
            strokeLinejoin="round" // Optional: smoother corners
            className="cursor-pointer sm:hidden text-black dark:text-white"
            onClick={handleMenuToggle}
          >
            {/* Top Line */}
            <motion.line
              x1="3"
              x2="21"
              y1="6"
              y2="6"
              {...commonProps}
              animate={{
                y1: isMenuOpen ? 12 : 6,
                y2: isMenuOpen ? 12 : 6,
                rotate: isMenuOpen ? 45 : 0,
                vertOriginX: "12",
                vertOriginY: "12",
              }}
            />

            {/* Middle Line */}
            <motion.line
              x1="3"
              x2="21"
              y1="12"
              y2="12"
              {...commonProps}
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
            />

            {/* Bottom Line */}
            <motion.line
              x1="3"
              x2="21"
              y1="18"
              y2="18"
              {...commonProps}
              animate={{
                y1: isMenuOpen ? 12 : 18,
                y2: isMenuOpen ? 12 : 18,
                rotate: isMenuOpen ? -45 : 0,
                vertOriginX: "12",
                vertOriginY: "12",
              }}
            />
          </motion.svg>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            className="sm:hidden space-y-4 mx-2"
            initial={{ transform: "translateY(-200px)", height: 0 }}
            animate={{ transform: "translateY(-0px)", height: "auto" }}
            exit={{ transform: "translateY(-300px)", height: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleNavlinkClick}
          >
            <li>
              <NavLink
                onClick={handleNavlinkClick}
                className="border-1 block text-center rounded-md p-1"
                to="/"
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleNavlinkClick}
                className="border-1 block text-center rounded-md p-1"
                to="/about"
              >
                <span>About</span>
              </NavLink>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
