import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { X, Search, BookOpen, Sparkles } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [termSearch, setTermSearch] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.definition.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.tag.toLowerCase().includes(termSearch.toLowerCase()) ||
      t.businessAnalogy.toLowerCase().includes(termSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-[#242731] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-800 dark:text-[#F2C811] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Glossário Express para Gestores</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Termos técnicos traduzidos em linguagem de negócios e analogias práticas.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-[#242731] bg-slate-50 dark:bg-[#101116]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={termSearch}
              onChange={(e) => setTermSearch(e.target.value)}
              placeholder="Buscar termo no glossário (ex: DAX, Star Schema, VertiPaq, RLS)..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#F2C811]"
            />
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-neutral-400 text-xs">
              Nenhum termo encontrado para "{termSearch}".
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.term}</h4>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-800 dark:text-[#F2C811] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                  {item.definition}
                </p>
                <div className="bg-white dark:bg-[#121318] p-2.5 rounded-lg border border-slate-200 dark:border-[#242731] flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-[#F2C811] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Analogia de Negócios: </strong>
                    <span className="text-slate-600 dark:text-neutral-400">{item.businessAnalogy}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-[#242731] bg-slate-50 dark:bg-[#121318] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
          <span>{GLOSSARY_TERMS.length} termos catalogados</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-[#1F222C] text-slate-800 dark:text-white dark:hover:bg-[#2B2F3D] rounded-md font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
