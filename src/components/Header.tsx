import React, { useState } from 'react';
import { NavigationTab } from '../types/pbi';
import { BookOpen, Menu, X, BarChart3, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenGlossary: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenGlossary,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'showcase', label: 'Showcase Visual' },
    { id: 'qa', label: 'Perguntas & Respostas' },
    { id: 'track', label: 'Trilha do Gestor' },
    { id: 'calculator', label: 'Simulador de Licenças' },
  ];

  const handleNavClick = (id: NavigationTab) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0F1014]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#242731] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C811] rounded-md"
          >
            <div className="w-8 h-8 rounded-md bg-[#F2C811] flex items-center justify-center shadow-sm shadow-[#F2C811]/20">
              <BarChart3 className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#D4A000] dark:group-hover:text-[#F2C811] transition-colors whitespace-nowrap">
                Power BI Executive Hub
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md whitespace-nowrap transition-colors relative ${
                    isActive
                      ? 'text-amber-800 dark:text-[#F2C811] bg-amber-50 dark:bg-[#1E212B]'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F2C811] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Theme Toggle + Glossary Button) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-[#181A22] border-slate-300 dark:border-[#2B2E36] hover:bg-slate-200 dark:hover:bg-[#22242E] active:scale-95 whitespace-nowrap shrink-0"
              title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
              aria-label={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F2C811]" />
                  <span>Tema Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Tema Escuro</span>
                </>
              )}
            </button>

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-neutral-900 bg-[#F2C811] hover:bg-[#FFDC33] rounded-md transition-colors shadow-sm shadow-[#F2C811]/10 whitespace-nowrap shrink-0 active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Glossário Express</span>
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Theme Toggle on Mobile */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-[#F2C811] rounded-lg"
              title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-[#F2C811]" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button
              onClick={onOpenGlossary}
              className="p-2 text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-[#F2C811] rounded-lg"
              title="Glossário"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-[#242731] bg-white dark:bg-[#121318] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-800 dark:text-[#F2C811] bg-amber-50 dark:bg-[#1A1D25]'
                    : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
