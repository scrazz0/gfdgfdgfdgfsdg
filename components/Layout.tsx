
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../contexts.tsx';
import { useLocalization } from '../contexts.tsx';
import { useAuth } from '../AuthContext.tsx'; // Импортируем useAuth
import { NAV_LINKS, LANGUAGES } from '../constants.tsx';
import { Language, Theme } from '../types.ts';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
    </svg>
);


const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLocalization();
  const { user } = useAuth(); // Получаем пользователя из AuthContext
  const isAuthenticated = !!user;
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold font-serif text-primary dark:text-primary-dark">
          Elysian Estates
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(link => (
              <NavLink
                key={link.key}
                to={link.path}
                className={({ isActive }) => `font-medium transition-colors duration-200 hover:text-primary dark:hover:text-primary-dark ${isActive ? 'text-primary dark:text-primary-dark' : 'text-text-light dark:text-text-dark'}`}
              >
                {t(link.key)}
              </NavLink>
            )
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={langRef}>
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <GlobeIcon />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-surface-light dark:bg-surface-dark rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsLangOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${language === lang.code ? 'bg-primary/20 text-primary dark:text-primary-dark' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
          </button>
          
          <Link to={isAuthenticated ? "/dashboard" : "/login"} className="bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-full transition-transform duration-200 ease-in-out hover:scale-105">
            {t(isAuthenticated ? 'dashboard' : 'login')}
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700">
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-2xl font-bold font-serif text-primary dark:text-primary-dark">Elysian Estates</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition-colors">Facebook</a>
          <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary dark:hover:text-primary-dark transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}