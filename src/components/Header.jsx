// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const NAV_LINKS = [
//   { href: "#models", label: "Models" },
//   { href: "#fusion", label: "Fusion" },
//   { href: "/chat", label: "Chat" },
//   { href: "/findself", label: "FindSelf" },
//   { href: "#apps", label: "Apps" },
//   { href: "#docs", label: "Docs" },
// ];

// function Header({ darkMode, setDarkMode }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="flex justify-between items-center px-6 py-4 bg-white text-black dark:bg-black dark:text-white shadow-md">
//       {/* Logo */}
//       <div className="text-xl font-bold">MyLogo</div>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex">
//         <ul className="flex gap-6">
//           {NAV_LINKS.map(({ href, label }) => (
//             <li key={href}>
//               <a href={href} className="hover:text-green-400 transition-colors">
//                 {label}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Actions */}
//       <div className="flex items-center gap-4">
//         {/* Dark Mode Toggle */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="px-3 py-1 rounded border hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//           aria-label="Toggle dark mode"
//         >
//           {darkMode ? "Light" : "Dark"}
//         </button>

//         {/* Sign Up */}
//         <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded transition-colors">
//           Sign Up
//         </button>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden flex flex-col gap-1"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle navigation menu"
//           aria-expanded={isOpen}
//         >
//           <span className="w-6 h-0.5 bg-current"></span>
//           <span className="w-6 h-0.5 bg-current"></span>
//           <span className="w-6 h-0.5 bg-current"></span>
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <nav className="absolute top-16 right-6 bg-gray-100 dark:bg-gray-800 p-4 rounded md:hidden shadow-lg">
//           <ul className="flex flex-col gap-4">
//             {NAV_LINKS.map(({ href, label }) => (
//               <li key={href}>
//                 <a
//                   href={href}
//                   className="hover:text-green-400 transition-colors"
//                 >
//                   {label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }

// Header.propTypes = {
//   darkMode: PropTypes.bool.isRequired,
//   setDarkMode: PropTypes.func.isRequired,
// };

// export default Header;
