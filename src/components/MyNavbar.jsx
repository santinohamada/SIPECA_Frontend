import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from '@/assets/utn-2.svg';
import { NavLink } from "react-router";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 px-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to={'/'} className="text-xl font-medium">
          <img className="h-8 w-8" src={Logo} alt="Logo de la UTN" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => `text-gray-600 hover:text-black transition-colors ${isActive ? 'text-black font-semibold' : ''}`}
          >
            Simulador
          </NavLink>
          <NavLink 
            to="/info" 
            className={({ isActive }) => `text-gray-600 hover:text-black transition-colors ${isActive ? 'text-black font-semibold' : ''}`}
          >
            Información
          </NavLink>
          
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 border-b border-gray-100 shadow-sm">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <NavLink
              to="/"
              className={({ isActive }) => `text-gray-600 hover:text-black transition-colors py-2 ${isActive ? 'text-black font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Simulador
            </NavLink>
            
            <NavLink
              to="/info"
              className={({ isActive }) => `text-gray-600 hover:text-black transition-colors py-2 ${isActive ? 'text-black font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Información
            </NavLink>
            
          </div>
        </div>
      )}
    </nav>
  );
}
