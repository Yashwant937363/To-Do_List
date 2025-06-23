import type React from "react";
import { motion, useCycle } from "motion/react";
import { useEffect } from "react";

const ThemeToggle: React.FC = () => {
  const [isDark, toggleDark] = useCycle(false, true);

  // Apply dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const sunRays = [
    [12, 2, 12, 4],
    [12, 20, 12, 22],
    [4.93, 4.93, 6.34, 6.34],
    [17.66, 17.66, 19.07, 19.07],
    [2, 12, 4, 12],
    [20, 12, 22, 12],
    [6.34, 17.66, 4.93, 19.07],
    [19.07, 4.93, 17.66, 6.34],
  ];
  const sunIcon = (
    <>
      {/* Sun center circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Rays as animated paths */}
      {sunRays.map(([x1, y1, x2, y2], i) => (
        <motion.path
          key={i}
          d={`M${x1} ${y1} L${x2} ${y2}`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.1, delay: 0.1 * i }}
        />
      ))}
    </>
  );

  const moonIcon = (
    <motion.path
      d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4 }}
    />
  );

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={25}
      height={25}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="cursor-pointer "
      onClick={() => toggleDark()}
    >
      {isDark ? moonIcon : sunIcon}
    </motion.svg>
  );
};

export default ThemeToggle;
