import React, { useState, useMemo } from 'react';
import { QA_ITEMS } from '../data/qaData';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Briefcase,
  Lightbulb,
  Copy,
  Check,
  Code2,
  ShieldAlert
} from 'lucide-react';

export const QASection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'dax-fundamentals': true,
    'desktop-vs-service': true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    QA_ITEMS.forEach((q) => (all[q.id] = true));
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const handleCopyDAX = (id: string, formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = useMemo(() => {
    return QA_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.simpleConcept.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.businessExample.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.businessExample.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 transition-colors">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#242731] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mb-1">
            <span className="text-[#B8860B] dark:text-[#F2C811] font-semibold">Base de Conhecimento Executiva</span>
            <span aria-hidden="true">·</span>
            <span>Conceito Direto + Aplicação de Negócio</span>
            <span aria-hidden="true">·</span>
            <span>{QA_ITEMS.length} Tópicos Fundamentais</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Perguntas & Respostas Estratégicas sobre Power BI
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm mt-1 max-w-3xl">
            Sem jargões técnicos vazios: entenda cada recurso da plataforma através do seu conceito simples
            e como ele gera valor real em vendas, finanças, controladoria e RH.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 text-xs text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-md transition-colors"
          >
            Expandir Todos
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 text-xs text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-md transition-colors"
          >
            Recolher Todos
          </button>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] p-3 rounded-xl shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por termo (ex: DAX, Star Schema, RLS, Vendas, RH, Licença)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#F2C811] transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'fundamentos', label: 'Fundamentos' },
            { id: 'dax', label: 'DAX & Métricas' },
            { id: 'infra', label: 'Conexão & Nuvem' },
            { id: 'governanca', label: 'Governança & RLS' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#F2C811] text-neutral-950 font-semibold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-8 text-center space-y-3 shadow-sm">
            <p className="text-slate-700 dark:text-neutral-300 font-medium">Nenhuma dúvida encontrada com o termo "{searchTerm}"</p>
            <p className="text-xs text-slate-500 dark:text-neutral-500">Tente buscar por "DAX", "RLS", "Import" ou "Vendas".</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-[#F2C811] hover:bg-[#FFDC33] rounded-md transition-colors"
            >
              Redefinir Filtros
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = !!expandedIds[item.id];
            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-[#181A22] border rounded-xl overflow-hidden transition-all duration-200 shadow-sm ${
                  isExpanded ? 'border-amber-400 dark:border-[#F2C811]/40' : 'border-slate-200 dark:border-[#2B2E36] hover:border-slate-300 dark:hover:border-neutral-600'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C811]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
                      <span className="text-[#B8860B] dark:text-[#F2C811] font-medium">{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500 dark:text-neutral-500">{item.tags.join(' / ')}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.question}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] flex items-center justify-center shrink-0 text-slate-600 dark:text-neutral-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#B8860B] dark:text-[#F2C811]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#242731] space-y-4">
                    {/* 1. Conceito Simples */}
                    <div className="bg-slate-50 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-[#F2C811]">
                        <Lightbulb className="w-4 h-4" />
                        <span>Conceito Direto (O que é):</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-neutral-200 leading-relaxed pl-6">
                        {item.simpleConcept}
                      </p>
                    </div>

                    {/* 2. Exemplo Prático e Tangível focado em Negócios */}
                    <div className="bg-sky-50/50 dark:bg-[#151821] border border-sky-200 dark:border-blue-900/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-400">
                          <Briefcase className="w-4 h-4" />
                          <span>Aplicação Prática em Negócios:</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-600 dark:text-neutral-400">
                          {item.businessExample.title}
                        </span>
                      </div>

                      {/* Scenario */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white dark:bg-[#0F1014] p-3 rounded-lg border border-slate-200 dark:border-[#242731] space-y-1">
                          <span className="font-semibold text-rose-600 dark:text-rose-400 block">O Cenário / O Problema:</span>
                          <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">{item.businessExample.scenario}</p>
                        </div>
                        <div className="bg-white dark:bg-[#0F1014] p-3 rounded-lg border border-slate-200 dark:border-[#242731] space-y-1">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">A Solução com Power BI:</span>
                          <p className="text-slate-700 dark:text-neutral-300 leading-relaxed">{item.businessExample.practicalSolution}</p>
                        </div>
                      </div>

                      {/* DAX Formula Box if available */}
                      {item.businessExample.daxFormula && (
                        <div className="bg-slate-900 dark:bg-[#0A0B0E] p-3 rounded-lg border border-slate-800 dark:border-[#242731] space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 flex items-center gap-1.5 font-mono text-[11px]">
                              <Code2 className="w-3.5 h-3.5 text-[#F2C811]" />
                              Lógica DAX Implementada:
                            </span>
                            <button
                              onClick={() => handleCopyDAX(item.id, item.businessExample.daxFormula!)}
                              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 bg-slate-800 dark:bg-[#1A1D25] rounded transition-colors"
                            >
                              {copiedId === item.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copiar DAX</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-xs font-mono text-amber-200/90 bg-slate-950 dark:bg-[#121318] p-2.5 rounded overflow-x-auto leading-relaxed border border-slate-800 dark:border-[#1E212B]">
                            {item.businessExample.daxFormula}
                          </pre>
                        </div>
                      )}

                      {/* Business Impact Box */}
                      <div className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-3 rounded-lg">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-slate-800 dark:text-neutral-200 leading-relaxed">
                          <strong className="text-emerald-700 dark:text-emerald-400">Impacto Mensurável de Negócio: </strong>
                          {item.businessExample.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Callout */}
      <div className="bg-amber-50 dark:bg-[#17181F] border border-amber-200 dark:border-amber-900/40 rounded-xl p-5 flex items-start gap-3.5 shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs leading-relaxed">
          <strong className="text-sm font-bold text-slate-900 dark:text-white block">
            Dica de Ouro para a Liderança: O Princípio do Relatório de 3 Segundos
          </strong>
          <p className="text-slate-700 dark:text-neutral-300">
            Se um Diretor ou Gerente precisa de mais de 3 segundos para identificar se o setor está no vermelho ou no azul,
            o dashboard tem excesso de ruído visual. Priorize sempre cartões KPI concisos no topo e utilize a navegação por
            drill-through para permitir que quem precisar de detalhes navegue a fundo sem poluir a visão executiva.
          </p>
        </div>
      </div>
    </div>
  );
};
