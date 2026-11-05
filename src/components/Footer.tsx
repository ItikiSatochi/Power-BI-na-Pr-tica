import React from 'react';
import { BarChart3, ArrowUp, BookOpen, Layers } from 'lucide-react';
import { NavigationTab } from '../types/pbi';

interface FooterProps {
  onTabChange: (tab: NavigationTab) => void;
  onOpenGlossary: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onOpenGlossary }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-[#242731] bg-slate-100 dark:bg-[#0C0D11] text-slate-600 dark:text-neutral-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#F2C811] flex items-center justify-center text-neutral-950 font-bold">
                <BarChart3 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Power BI Executive Hub
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Guia de capacitação e governança de Power BI focado na tomada de decisão de gestores,
              diretores e líderes de negócios. Do modelo de dados à cultura analítica sustentável.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Navegação do Hub
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onTabChange('overview')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Visão Geral & Pilares
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('showcase')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Showcase de Dashboards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('qa')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Dúvidas Frequentes (Q&A)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('track')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Trilha do Gestor & Auditoria
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('calculator')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Simulador de Licenças & ROI
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Recursos Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenGlossary}
                  className="hover:text-amber-800 dark:hover:text-[#F2C811] transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Glossário Executivo</span>
                </button>
              </li>
              <li>
                <a
                  href="#top"
                  onClick={(e) => {
                    e.preventDefault();
                    window.print();
                  }}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Imprimir / Salvar em PDF</span>
                </a>
              </li>
              <li className="text-slate-500 dark:text-neutral-500 pt-2 text-[11px]">
                Inspirado nas diretrizes oficiais da Microsoft para Business Intelligence corporativo.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-[#1C1F28] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 dark:text-neutral-500 text-[11px]">
            © {new Date().getFullYear()} Power BI Executive Hub · Capacitação e Tomada de Decisão em Negócios.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white text-xs px-3 py-1.5 bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-md transition-colors shadow-sm"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
