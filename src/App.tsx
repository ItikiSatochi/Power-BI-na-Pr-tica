/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * POWER BI INTERACTIVE PRESENTATION - SINGLE PAGE APPLICATION
 * Apresentação Interativa: "O que é o Power BI"
 * Guia completo e visual sobre a transformação de dados em decisões práticas.
 * 
 * Seções da Apresentação:
 * - Menu Fixo Superior com navegação suave, alternador de tema e modo projetor
 * - Sessão 1: O que é e o que transforma (Capa de Impacto)
 * - Sessão 2: A Transformação (De Planilha do Excel para Indicadores)
 * - Sessão 3: Extração de Banco de Dados (Do SQL Bruto aos Indicadores Vivos)
 * - Sessão 4: Showcase & Tomada de Decisão (Dashboard Interativo + 3 Cenários Práticos de Decisão)
 * - Sessão 5: Dúvidas Frequentes e Exemplos Práticos (Accordion Q&A com Regra de Ouro)
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { registerChartJS, getChartTheme } from './utils/chartConfig';
import {
  BarChart3,
  TrendingUp,
  ArrowRight,
  Database,
  ShieldCheck,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2,
  DollarSign,
  Award,
  Users,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  Filter,
  Lightbulb,
  Briefcase,
  Terminal,
  RefreshCw,
  AlertTriangle,
  Package,
  TrendingDown,
  Server,
  Play,
  HeartHandshake,
  Building2,
  UserCheck,
  Check
} from 'lucide-react';

// Registra módulos do Chart.js
registerChartJS();

type DbSourceKey = 'vendas' | 'rh' | 'estoque';

export default function App() {
  // Controle de Tema (Claro / Escuro)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('pbi-pres-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Modo Apresentação / Tela Cheia
  const [presentationMode, setPresentationMode] = useState<boolean>(false);

  // Seção ativa para destaque no menu
  const [activeSection, setActiveSection] = useState<string>('sessao-1');

  // Filtro interativo para o Dashboard Simulado na Sessão 4
  const [chartFilter, setChartFilter] = useState<'all' | 's1' | 's2'>('all');

  // Seleção de Fonte no Simulador de Banco de Dados (Sessão 3)
  const [selectedDb, setSelectedDb] = useState<DbSourceKey>('vendas');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractedSuccess, setExtractedSuccess] = useState<boolean>(false);

  // Cenário de Tomada de Decisão selecionado (Sessão 4)
  const [decisionScenario, setDecisionScenario] = useState<'comercial' | 'rh' | 'estoque'>('comercial');

  // Estado do Accordion de Perguntas na Sessão 5 (Sanfona)
  const [expandedQA, setExpandedQA] = useState<Record<string, boolean>>({
    'excel-vs-pbi': true,
    'desktop-vs-online': true,
    'dax': false,
    'conexoes': false,
    'seguranca': false,
  });

  // Atualiza classe .dark no HTML
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pbi-pres-theme', theme);
  }, [theme]);

  // Observer para destacar o link ativo no menu durante o scroll
  useEffect(() => {
    const sections = ['capa', 'sessao-1', 'sessao-2', 'sessao-3', 'sessao-4', 'sessao-5', 'sessao-6'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';
  const chartTheme = useMemo(() => getChartTheme(isDark), [isDark]);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleQA = (id: string) => {
    setExpandedQA((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Simular processo de extração do banco
  const handleSimulateExtraction = () => {
    setIsExtracting(true);
    setExtractedSuccess(false);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedSuccess(true);
    }, 1200);
  };

  // ==========================================
  // DADOS DO BANCO FICTÍCIO (SESSÃO 3)
  // ==========================================
  const dbData = {
    vendas: {
      title: 'ERP SAP / TOTVS Protheus - Módulo Faturamento',
      tableName: 'public.tb_faturamento_transacoes',
      sqlQuery: `SELECT 
  id_pedido, cod_filial, dt_emissao, vl_bruto,
  vl_desconto, vl_custo_cmv, st_pedido
FROM public.tb_faturamento_transacoes
WHERE dt_emissao >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY id_pedido DESC LIMIT 5;`,
      recordsCount: '1.482.910 linhas no banco relacional',
      rawRows: [
        { c1: '#98421', c2: 'SP_MATRIZ', c3: '2026-11-04', c4: 'R$ 142.000', c5: 'R$ 12.000', c6: 'R$ 78.000', c7: 'APROVADO' },
        { c1: '#98422', c2: 'PR_CURITIBA', c3: '2026-11-04', c4: 'R$ 38.500', c5: 'R$ 1.500', c6: 'R$ 21.000', c7: 'APROVADO' },
        { c1: '#98423', c2: 'MG_BH', c3: '2026-11-03', c4: 'R$ 94.000', c5: 'R$ 18.000', c6: 'R$ 62.000', c7: 'ALERTA_MARGEM' },
        { c1: '#98424', c2: 'PE_RECIFE', c3: '2026-11-03', c4: 'R$ 51.200', c5: 'R$ 3.000', c6: 'R$ 29.000', c7: 'APROVADO' },
        { c1: '#98425', c2: 'SP_MATRIZ', c3: '2026-11-02', c4: 'R$ 210.000', c5: 'R$ 15.000', c6: 'R$ 115.000', c7: 'APROVADO' },
      ],
      kpi1Label: 'Faturamento Líquido',
      kpi1Value: 'R$ 8,94M',
      kpi1Trend: '+14.2% vs Meta',
      kpi2Label: 'Margem EBITDA Real',
      kpi2Value: '28,4%',
      kpi2Trend: '+2.8 p.p. vs SPLY',
      daxSnippet: `Margem Líquida % = 
DIVIDE(
  SUM(tb_faturamento[vl_bruto]) - SUM(tb_faturamento[vl_custo_cmv]) - SUM(tb_faturamento[vl_desconto]),
  SUM(tb_faturamento[vl_bruto]),
  0
)`,
      decisionResult:
        'A análise identificou que a filial MG concedeu R$ 18.000 em descontos fora da política (abaixo da margem mínima de 22%). Com o alerta visual imediato, pedidos deficitários foram travados antes do faturamento, preservando R$ 380 mil de margem no mês.',
    },
    rh: {
      title: 'Sistema de RH / Folha de Pagamento Corporativo',
      tableName: 'rh.tb_colaboradores_movimentacao',
      sqlQuery: `SELECT 
  matricula_id, cod_depto, dt_admissao, dt_desligamento,
  motivo_saida, salario_base, vl_beneficios
FROM rh.tb_colaboradores_movimentacao
WHERE ativo = true OR dt_desligamento >= '2026-01-01'
LIMIT 5;`,
      recordsCount: '18.420 colaboradores históricos',
      rawRows: [
        { c1: 'COL_4821', c2: 'TECNOLOGIA', c3: '2024-03-15', c4: '2026-10-31', c5: 'PEDIDO_DEMISSAO', c6: 'R$ 12.500', c7: 'R$ 2.400' },
        { c1: 'COL_4822', c2: 'OPERACOES', c3: '2023-01-10', c4: '—', c5: 'ATIVO', c6: 'R$ 4.800', c7: 'R$ 1.800' },
        { c1: 'COL_4823', c2: 'COMERCIAL', c3: '2025-06-01', c4: '—', c5: 'ATIVO', c6: 'R$ 8.900', c7: 'R$ 2.100' },
        { c1: 'COL_4824', c2: 'TECNOLOGIA', c3: '2024-02-20', c4: '2026-10-15', c5: 'PEDIDO_DEMISSAO', c6: 'R$ 13.200', c7: 'R$ 2.400' },
        { c1: 'COL_4825', c2: 'FINANCEIRO', c3: '2022-08-12', c4: '—', c5: 'ATIVO', c6: 'R$ 9.100', c7: 'R$ 2.200' },
      ],
      kpi1Label: 'Turnover Anualizado',
      kpi1Value: '7,8%',
      kpi1Trend: '-2.1 p.p. (Excelente)',
      kpi2Label: 'Headcount Ativo',
      kpi2Value: '1.840',
      kpi2Trend: '+48 saldo no ano',
      daxSnippet: `Turnover % = 
VAR Admissoes = COUNTROWS(FILTER(fRH, NOT(ISBLANK(fRH[dt_admissao]))))
VAR Desligamentos = COUNTROWS(FILTER(fRH, NOT(ISBLANK(fRH[dt_desligamento]))))
VAR MediaHeadcount = DIVIDE([Headcount Inicio] + [Headcount Fim], 2)
RETURN DIVIDE(DIVIDE(Admissoes + Desligamentos, 2), MediaHeadcount, 0) * 12`,
      decisionResult:
        'Ao cruzar tempo de casa com desligamentos, a equipe identificou perda de talentos técnicos na faixa de 18 meses de empresa. Uma adequação preventiva na progressão salarial estancou a rotatividade, poupando R$ 680 mil em custos de reposição.',
    },
    estoque: {
      title: 'Sistema de Logística WMS / Controle de Estoque',
      tableName: 'wms.tb_posicao_estoque_diaria',
      sqlQuery: `SELECT 
  cod_sku, cod_cd, qtd_disponivel, qtd_minima_seguranca,
  tempo_reposicao_dias, vl_custo_medio
FROM wms.tb_posicao_estoque_diaria
WHERE qtd_disponivel <= qtd_minima_seguranca * 1.2
LIMIT 5;`,
      recordsCount: '340.500 registros de estoque diário',
      rawRows: [
        { c1: 'SKU_8490', c2: 'CD_RECIFE', c3: '140 un', c4: '500 un', c5: '12 dias', c6: 'R$ 280,00', c7: 'RUPTURA_IMINENTE' },
        { c1: 'SKU_8491', c2: 'CD_SP', c3: '12.400 un', c4: '3.000 un', c5: '3 dias', c6: 'R$ 145,00', c7: 'SOBRA_ESTOQUE' },
        { c1: 'SKU_8492', c2: 'CD_CURITIBA', c3: '980 un', c4: '800 un', c5: '5 dias', c6: 'R$ 310,00', c7: 'REGULAR' },
        { c1: 'SKU_8493', c2: 'CD_RECIFE', c3: '85 un', c4: '450 un', c5: '14 dias', c6: 'R$ 520,00', c7: 'RUPTURA_IMINENTE' },
        { c1: 'SKU_8494', c2: 'CD_BH', c3: '1.200 un', c4: '1.000 un', c5: '4 dias', c6: 'R$ 190,00', c7: 'REGULAR' },
      ],
      kpi1Label: 'Ruptura Prevista',
      kpi1Value: '1,2%',
      kpi1Trend: '-4.8 p.p. vs Ano Anterior',
      kpi2Label: 'Giro de Estoque Médio',
      kpi2Value: '18,4 dias',
      kpi2Trend: 'Capital de Giro Otimizado',
      daxSnippet: `Cobertura Dias = 
DIVIDE(
  SUM(fEstoque[qtd_disponivel]),
  AVERAGEX(DATESINPERIOD(dCalendario[Data], LASTDATE(dCalendario[Data]), -30, DAY), [Qtd Vendas Diaria]),
  0
)`,
      decisionResult:
        'O mapa de calor de suprimentos alertou que o polo Recife ficaria sem 2 produtos campeões em 3 dias, enquanto a unidade SP acumulava excesso. Uma transferência ágil entre centros evitou a perda estimada de R$ 1,2 milhão em vendas.',
    },
  };

  const currentDb = dbData[selectedDb];

  // ==========================================
  // DADOS DO DASHBOARD SIMULADO (SESSÃO 4)
  // ==========================================
  const filterMultiplier = chartFilter === 's1' ? 0.92 : chartFilter === 's2' ? 1.08 : 1.0;

  const barChartData = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const baseActual = [640, 710, 780, 810, 860, 920, 950, 930, 990, 1040, 1120, 1280];
    const baseTarget = [620, 680, 720, 790, 830, 880, 910, 920, 950, 1000, 1060, 1180];

    const actual = baseActual.map((v) => Math.round(v * filterMultiplier));
    const target = baseTarget.map((v) => Math.round(v * filterMultiplier));

    return {
      labels: months,
      datasets: [
        {
          label: 'Receita Realizada (R$ mil)',
          data: actual,
          backgroundColor: isDark ? '#F2C811' : '#EAB308',
          borderRadius: 6,
          hoverBackgroundColor: '#FFDC33',
        },
        {
          label: 'Meta Orçada (Budget)',
          data: target,
          backgroundColor: isDark ? '#334155' : '#CBD5E1',
          borderRadius: 6,
          hoverBackgroundColor: isDark ? '#475569' : '#94A3B8',
        },
      ],
    };
  }, [filterMultiplier, isDark]);

  const donutChartData = useMemo(() => {
    const baseValues = [4280, 2150, 1620, 980];
    const values = baseValues.map((v) => Math.round(v * filterMultiplier));

    return {
      labels: ['Sudeste (SP/RJ/MG)', 'Sul (PR/SC/RS)', 'Nordeste (BA/PE/CE)', 'Centro-Oeste & Norte'],
      datasets: [
        {
          data: values,
          backgroundColor: ['#F2C811', '#3B82F6', '#10B981', '#8B5CF6'],
          hoverOffset: 8,
          borderWidth: 2,
          borderColor: isDark ? '#181A22' : '#FFFFFF',
        },
      ],
    };
  }, [filterMultiplier, isDark]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0D0E11] text-slate-900 dark:text-neutral-100 font-sans antialiased transition-colors duration-200">
      
      {/* ========================================================
          MENU FIXO SUPERIOR DE NAVEGAÇÃO EXECUTIVA
          ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0F1014]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#242731] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Marca / Logo Empresa Cimental Fermaflex + Power BI */}
          <button
            onClick={() => scrollTo('capa')}
            className="flex items-center gap-2 sm:gap-3 focus:outline-none group text-left cursor-pointer"
          >
            {/* Logo Cimental FERMAFLEX */}
            <div className="bg-white px-2 py-1 rounded-md border border-slate-200 dark:border-neutral-700 shadow-xs flex items-center h-8">
              <img
                src="/assets/aistudio/Rectangle_1fb498c1.png"
                alt="Cimental Fermaflex"
                className="h-5 sm:h-5.5 object-contain"
              />
            </div>

            <div className="h-4 w-[1px] bg-slate-300 dark:bg-neutral-700 hidden sm:block" />

            {/* Ícone Power BI */}
            <div className="w-8 h-8 rounded-md bg-[#F2C811] flex items-center justify-center shadow-sm shadow-[#F2C811]/30 shrink-0">
              <BarChart3 className="w-4.5 h-4.5 text-neutral-950 stroke-[2.5]" />
            </div>

            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#F2C811] transition-colors leading-tight">
                Power BI <span className="font-light text-slate-500 dark:text-neutral-400 hidden lg:inline">| Cimental Fermaflex</span>
              </span>
              <span className="text-[10px] text-amber-700 dark:text-[#F2C811] font-semibold leading-tight hidden md:inline">
                TI · Inteligência de Dados
              </span>
            </div>
          </button>

          {/* 7 Itens de Navegação Rápida com Rolagem Suave */}
          <nav className="hidden xl:flex items-center gap-1">
            {[
              { id: 'capa', label: 'Capa' },
              { id: 'sessao-1', label: '1. O que é' },
              { id: 'sessao-2', label: '2. De Planilha a KPI' },
              { id: 'sessao-3', label: '3. Extração SQL' },
              { id: 'sessao-4', label: '4. Decisão em Ação' },
              { id: 'sessao-5', label: '5. Dúvidas Frequentes' },
              { id: 'sessao-6', label: '6. Agradecimento' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-amber-800 dark:text-[#F2C811] bg-amber-500/15 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Ações: Alternar Tema Claro/Escuro & Modo Projetor */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-[#181A22] border-slate-300 dark:border-[#2B2E36] hover:bg-slate-200 dark:hover:bg-[#22242E] transition-all active:scale-95 cursor-pointer"
              title={isDark ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F2C811]" />
                  <span className="hidden sm:inline">Tema Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="hidden sm:inline">Tema Escuro</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                  setPresentationMode(true);
                } else {
                  document.exitFullscreen().catch(() => {});
                  setPresentationMode(false);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md text-neutral-950 bg-[#F2C811] hover:bg-[#FFDC33] transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Ativar modo tela cheia para projetar"
            >
              {presentationMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">Modo Projetor</span>
            </button>
          </div>
        </div>

        {/* Barra de Navegação Rápida para Celulares e Telas Menores */}
        <div className="xl:hidden flex items-center justify-around border-t border-slate-200 dark:border-[#242731] bg-slate-50 dark:bg-[#121318] py-2 px-1 text-[11px] overflow-x-auto gap-1">
          <button onClick={() => scrollTo('capa')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'capa' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>Capa</button>
          <button onClick={() => scrollTo('sessao-1')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'sessao-1' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>1. O que é</button>
          <button onClick={() => scrollTo('sessao-2')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'sessao-2' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>2. Planilha vs KPI</button>
          <button onClick={() => scrollTo('sessao-3')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'sessao-3' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>3. Banco SQL</button>
          <button onClick={() => scrollTo('sessao-4')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'sessao-4' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>4. Decisão</button>
          <button onClick={() => scrollTo('sessao-5')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'sessao-5' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>5. Q&A</button>
          <button onClick={() => scrollTo('sessao-6')} className={`px-2 py-1 rounded whitespace-nowrap ${activeSection === 'sessao-6' ? 'font-bold text-[#F2C811]' : 'text-slate-700 dark:text-neutral-300'}`}>6. Agradecimento</button>
        </div>
      </header>

      {/* ========================================================
          CONTEÚDO PRINCIPAL (SPA COM ROLAGEM)
          ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-28">

        {/* ======================================================
            CAPA DE ABERTURA: APRESENTAÇÃO INSTITUCIONAL
            ====================================================== */}
        <section id="capa" className="min-h-[85vh] flex flex-col justify-center relative pt-4 pb-12 border-b border-slate-200 dark:border-[#242731]">
          {/* Efeitos de Iluminação de Fundo */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F2C811]/15 dark:bg-[#F2C811]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-8">
            
            {/* Logos em Destaque: Cimental FERMAFLEX & Power BI */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-neutral-700 shadow-md flex items-center h-16 sm:h-20 transition-transform hover:scale-105">
                <img
                  src="/assets/aistudio/Rectangle_1fb498c1.png"
                  alt="Cimental Fermaflex"
                  className="h-10 sm:h-12 object-contain"
                />
              </div>

              <span className="text-slate-300 dark:text-neutral-600 text-2xl font-light">×</span>

              <div className="bg-white dark:bg-[#181A22] px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-neutral-700 shadow-md flex items-center gap-3 h-16 sm:h-20 transition-transform hover:scale-105">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2C811] flex items-center justify-center shadow-md shadow-[#F2C811]/40 shrink-0">
                  <BarChart3 className="w-6 h-6 text-neutral-950 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    Microsoft
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-amber-600 dark:text-[#F2C811] leading-tight">
                    Power BI
                  </div>
                </div>
              </div>
            </div>

            {/* Kicker Institucional */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#181A24] border border-slate-200 dark:border-[#2C3040] text-xs font-bold text-amber-700 dark:text-[#F2C811] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Departamento de TI · Setor de Inteligência de Dados</span>
            </div>

            {/* Título Principal de Impacto */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Transformação Digital & Inteligência de Dados com
                <span className="block text-[#C99700] dark:text-[#F2C811] mt-2">
                  Power BI
                </span>
              </h1>

              <p className="text-base sm:text-xl text-slate-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed font-normal">
                Apresentação e Capacitação: Da extração automática dos sistemas operacionais à tomada de decisão ágil na <strong>Cimental Fermaflex</strong>.
              </p>
            </div>

            {/* Cards dos Responsáveis com Fotos Reais */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
              {/* Diego */}
              <div className="flex items-center gap-3.5 p-3 sm:px-5 sm:py-3 rounded-2xl bg-white dark:bg-[#161822] border border-slate-200 dark:border-[#2B2F3D] shadow-sm text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F2C811] shadow-xs shrink-0 bg-slate-100 dark:bg-neutral-800">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-05-22_at_15.38.17_7b9d065d.jpeg"
                    alt="Diego"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Diego
                  </div>
                  <div className="text-xs font-semibold text-amber-700 dark:text-[#F2C811] leading-tight">
                    Assistente de Power BI
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-neutral-400">
                    Setor: Inteligência de Dados
                  </div>
                </div>
              </div>

              {/* Alan Sales */}
              <div className="flex items-center gap-3.5 p-3 sm:px-5 sm:py-3 rounded-2xl bg-white dark:bg-[#161822] border border-slate-200 dark:border-[#2B2F3D] shadow-sm text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-300 dark:border-neutral-600 shadow-xs shrink-0 bg-white">
                  <img
                    src="/assets/aistudio/alan_sales_clean.png"
                    alt="Alan Sales"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Alan Sales
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-neutral-200 leading-tight">
                    Gestor
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-neutral-400">
                    Departamento: TI
                  </div>
                </div>
              </div>
            </div>

            {/* Pauta Rápida / Roteiro da Apresentação */}
            <div className="max-w-3xl mx-auto pt-2">
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-[#12141C] border border-slate-200 dark:border-[#242731]">
                <div className="text-xs font-bold text-slate-500 dark:text-neutral-400 mb-2 uppercase tracking-wider">
                  Roteiro da Apresentação:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 dark:text-neutral-300 font-medium text-left">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F2C811]" /> 1. O que é o Power BI</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 2. De Planilha a KPI</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> 3. Extração SQL / ERP</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> 4. Decisão em Ação</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> 5. Dúvidas Frequentes</div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> 6. Encerramento</div>
                </div>
              </div>
            </div>

            {/* Botão de Iniciar Apresentação */}
            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => scrollTo('sessao-1')}
                className="flex items-center gap-3 px-8 py-4 bg-[#F2C811] hover:bg-[#FFDC33] text-neutral-950 font-extrabold text-base rounded-xl shadow-lg shadow-[#F2C811]/25 hover:shadow-xl transition-all active:scale-95 cursor-pointer group"
              >
                <span>Iniciar Apresentação</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </section>

        {/* ======================================================
            SESSÃO 1: O QUE É O POWER BI E COMO FUNCIONA
            ====================================================== */}
        <section id="sessao-1" className="pt-6 space-y-8">
          <div className="border-b border-slate-200 dark:border-[#242731] pb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811] mb-1">
              Sessão 01 · Fundamentos da Plataforma
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              O que é o Power BI e como ele transforma o dia a dia na Cimental Fermaflex?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-1 max-w-4xl">
              O <strong>Power BI</strong> é a plataforma corporativa de Business Intelligence (BI) da Microsoft que funciona como a <strong>ponte tecnológica</strong> da Cimental Fermaflex: ele se conecta diretamente aos nossos bancos de dados e sistemas operacionais, eliminando o retrabalho de planilhas manuais e transformando dados brutos em <strong>painéis visuais interativos que apoiam decisões rápidas e assertivas</strong>.
            </p>
          </div>

          <div className="relative z-10 max-w-5xl space-y-8">
            {/* 3 BENEFÍCIOS TANGÍVEIS PARA A CIMENTAL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 dark:text-[#F2C811] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Fonte Única da Verdade</h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Acabaram as versões conflitantes de planilhas de Excel. Todos os setores consultam as mesmas métricas calculadas com regras de negócio oficiais.
                </p>
              </div>

              <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Automação com Zero Retrabalho</h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  As rotinas de atualização acontecem de madrugada via On-Premises Data Gateway. No início da manhã, o relatório já está 100% atualizado.
                </p>
              </div>

              <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ação Preventiva e Visual</h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                  Alertas de ruptura de estoque, variações de margem e desvios de metas identificados na hora pelo computador ou aplicativo no celular.
                </p>
              </div>
            </div>

            {/* OS 4 PILARES DA ARQUITETURA DO POWER BI */}
            <div className="bg-slate-50 dark:bg-[#14161D] border border-slate-200 dark:border-[#242731] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F2C811]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200">
                  Os 4 Pilares da Jornada do Dado no Power BI
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-lg bg-white dark:bg-[#191B24] border border-slate-200 dark:border-[#2B2E36]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <Database className="w-3.5 h-3.5 text-amber-500" />
                    <span>1. Conectar</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Conexão a bancos SQL Server, ERPs (SAP, TOTVS) e planilhas sem precisar exportar CSVs.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#191B24] border border-slate-200 dark:border-[#2B2E36]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>2. Modelar (DAX)</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Fórmulas inteligentes e relacionamentos que recalculam métricas na hora segundo os filtros.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#191B24] border border-slate-200 dark:border-[#2B2E36]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                    <span>3. Visualizar</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Gráficos modernos, mapas e cartões com filtros cruzados que respondem a cada clique.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#191B24] border border-slate-200 dark:border-[#2B2E36]">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>4. Distribuir</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Publicação na nuvem Microsoft com segurança por alçada (RLS) e consulta em qualquer dispositivo.
                  </p>
                </div>
              </div>
            </div>

            {/* BOTÃO DE AVANÇO PARA A PRÓXIMA SESSÃO NA ORDEM LÓGICA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('sessao-2')}
                className="flex items-center gap-2 px-6 py-3 bg-[#F2C811] hover:bg-[#FFDC33] text-neutral-950 font-bold text-sm rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Avançar para a Prática: 2. De Planilha a Indicador</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => scrollTo('sessao-3')}
                className="px-4 py-3 rounded-lg text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] hover:bg-slate-100 dark:hover:bg-[#20222D] transition-colors cursor-pointer"
              >
                Ver Extração de Banco de Dados
              </button>
            </div>
          </div>
        </section>

        {/* ======================================================
            SESSÃO 2: A TRANSFORMAÇÃO (DE PLANILHA PARA INDICADOR)
            ====================================================== */}
        <section id="sessao-2" className="pt-6 space-y-8">
          <div className="border-b border-slate-200 dark:border-[#242731] pb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811] mb-1">
              Sessão 02 · Caso Prático de Negócios
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              A Transformação: De Planilha Caótica para Indicador Claro e Direto
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-1 max-w-3xl">
              Como sair de 50.000 linhas ilegíveis no Excel e passar a enxergar instantaneamente
              os números vitais da operação com zero retrabalho manual.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* LADO ESQUERDO: O "ANTES" (Simulação de Planilha do Excel Crua) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#16171E] border border-slate-300 dark:border-[#2B2E36] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#107C41] px-4 py-2 flex items-center justify-between text-white text-xs font-medium">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Fechamento_Faturamento_Final_v14_corrigido.xlsx</span>
                </div>
                <span className="bg-emerald-900/60 text-[10px] px-2 py-0.5 rounded font-mono">52.418 linhas</span>
              </div>

              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border-b border-rose-200 dark:border-rose-900/40 text-rose-800 dark:text-rose-400 text-xs font-bold flex items-center justify-between">
                <span>❌ ANTES: Planilha Manual do Excel</span>
                <span className="font-normal text-[11px] text-rose-700 dark:text-rose-300">Tempo de análise: 3 a 5 horas</span>
              </div>

              <div className="overflow-x-auto text-[11px] font-mono">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-[#1A1D26] text-slate-600 dark:text-neutral-400 border-b border-slate-300 dark:border-[#2B2E36]">
                      <th className="p-2 border-r border-slate-200 dark:border-[#2B2E36] text-left">A: ID Ped</th>
                      <th className="p-2 border-r border-slate-200 dark:border-[#2B2E36] text-left">B: Filial</th>
                      <th className="p-2 border-r border-slate-200 dark:border-[#2B2E36] text-left">C: Canal</th>
                      <th className="p-2 text-right">D: Valor R$</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-[#242731] text-slate-700 dark:text-neutral-300">
                    <tr>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">#84920</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">SP_MATRIZ</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">B2B_ENT</td>
                      <td className="p-2 text-right font-semibold">R$ 142.500</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">#84921</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">PR_CURITIBA</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">VAREJO</td>
                      <td className="p-2 text-right font-semibold">R$ 18.200</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">#84922</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">MG_BH</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">B2B_ENT</td>
                      <td className="p-2 text-right font-semibold">R$ 89.400</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">#84923</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">PE_RECIFE</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">DISTRIB</td>
                      <td className="p-2 text-right font-semibold">R$ 34.100</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">#84924</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">SP_MATRIZ</td>
                      <td className="p-2 border-r border-slate-200 dark:border-[#2B2E36]">B2B_ENT</td>
                      <td className="p-2 text-right font-semibold">R$ 210.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-[#121318] border-t border-slate-200 dark:border-[#242731] text-[11px] text-slate-500 dark:text-neutral-400 space-y-1">
                <div>⚠️ Fórmulas PROCV lentas e propensas a erro humano</div>
                <div>⚠️ Dificuldade de auditar se os descontos foram autorizados</div>
              </div>
            </div>

            {/* CENTRO: O MOTOR DE TRANSFORMAÇÃO */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 space-y-2 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F2C811] text-neutral-950 flex items-center justify-center shadow-lg shadow-[#F2C811]/30 animate-pulse">
                <Zap className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Power Query + DAX
              </div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400 max-w-[140px] leading-tight">
                Limpeza, modelagem e cálculo em <strong>0 segundos</strong>
              </div>
              <div className="hidden lg:block text-[#F2C811] text-2xl font-bold">➔</div>
            </div>

            {/* LADO DIREITO: O "DEPOIS" (Cards de Indicadores KPIs Modernos) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between">
                <span>✅ DEPOIS: Indicadores Vivos no Power BI</span>
                <span className="font-normal text-[11px]">Tempo de resposta: Instantâneo</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                    <span>Faturamento Total</span>
                    <DollarSign className="w-3.5 h-3.5 text-amber-600 dark:text-[#F2C811]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    R$ 8,94M
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                    <TrendingUp className="w-3 h-3" /> +14.2% vs Meta
                  </div>
                </div>

                <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                    <span>Filial Destaque</span>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
                    São Paulo
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-neutral-400 mt-1 font-mono">
                    R$ 4,28M (48% do total)
                  </div>
                </div>

                <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                    <span>Margem EBITDA</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    28,4%
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                    <ArrowUpRight className="w-3 h-3" /> +3.1 p.p. vs SPLY
                  </div>
                </div>

                <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                    <span>Ticket Médio</span>
                    <Users className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    R$ 48,6k
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                    184 contratos ativos
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 dark:bg-[#121318] p-3 rounded-lg border border-slate-200 dark:border-[#242731] text-xs text-slate-700 dark:text-neutral-300">
                <strong className="text-slate-900 dark:text-white block">Visão de Eficiência:</strong>
                "O tempo não deve ser gasto caçando números em células de planilhas, mas sim tomando decisões assertivas com os indicadores certos."
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================
            SESSÃO 3: SIMULADOR DE EXTRAÇÃO DE BANCO DE DADOS
            (DO SQL BRUTO AOS INDICADORES VIVOS)
            ====================================================== */}
        <section id="sessao-3" className="pt-6 space-y-8">
          
          <div className="border-b border-slate-200 dark:border-[#242731] pb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811] mb-1">
              Sessão 03 · Arquitetura de Dados em Ação
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Extração de Banco de Dados: Como Dados Brutos Viram Indicadores
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-1 max-w-3xl">
              Veja na prática como o Power BI se conecta diretamente aos bancos de dados relacionais
              (SQL Server, Oracle, SAP, TOTVS), extrai registros brutos automaticamente e os transforma
              em inteligência visual para qualquer decisão.
            </p>
          </div>

          {/* Seletor de Banco de Dados Fictício */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#16171E] border border-slate-200 dark:border-[#2B2E36] p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-amber-600 dark:text-[#F2C811]" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                  Selecione o Banco de Dados para Simular a Extração:
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {currentDb.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSelectedDb('vendas'); setExtractedSuccess(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedDb === 'vendas'
                    ? 'bg-[#F2C811] text-neutral-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-[#0F1014] text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#2B2E36]'
                }`}
              >
                1. Faturamento ERP (Vendas)
              </button>
              <button
                onClick={() => { setSelectedDb('rh'); setExtractedSuccess(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedDb === 'rh'
                    ? 'bg-[#F2C811] text-neutral-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-[#0F1014] text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#2B2E36]'
                }`}
              >
                2. Banco de RH (Folha)
              </button>
              <button
                onClick={() => { setSelectedDb('estoque'); setExtractedSuccess(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedDb === 'estoque'
                    ? 'bg-[#F2C811] text-neutral-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-[#0F1014] text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#2B2E36]'
                }`}
              >
                3. Logística (WMS Estoque)
              </button>
            </div>
          </div>

          {/* Painel de Extração: SQL Bruto -> Pipeline -> Indicadores Finais */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 1. Terminal / Banco de Dados Relacional (Origem Bruta) */}
            <div className="lg:col-span-5 bg-slate-900 dark:bg-[#0B0C10] border border-slate-700 dark:border-[#242731] rounded-xl overflow-hidden shadow-md flex flex-col justify-between">
              <div>
                {/* Cabeçalho do Terminal SQL */}
                <div className="bg-slate-800 dark:bg-[#14161F] px-4 py-2.5 border-b border-slate-700 dark:border-[#242731] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-300 ml-2">Console SQL · {currentDb.tableName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Porta 5432 / TCP
                  </span>
                </div>

                {/* Código SQL Real da Consulta de Extração */}
                <div className="p-3 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                  <pre>{currentDb.sqlQuery}</pre>
                </div>

                {/* Amostra dos Dados Brutos do Banco */}
                <div className="p-3 overflow-x-auto text-[10px] font-mono text-slate-300">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 pb-1">
                        <th className="pb-1">ID</th>
                        <th className="pb-1">Filial/Dep</th>
                        <th className="pb-1">Data</th>
                        <th className="pb-1 text-right">Bruto</th>
                        <th className="pb-1 text-right">Desc/CMV</th>
                        <th className="pb-1 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {currentDb.rawRows.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-800/30">
                          <td className="py-1 font-semibold text-amber-300">{r.c1}</td>
                          <td className="py-1">{r.c2}</td>
                          <td className="py-1 text-slate-400">{r.c3}</td>
                          <td className="py-1 text-right text-emerald-300">{r.c4}</td>
                          <td className="py-1 text-right text-rose-300">{r.c5}</td>
                          <td className="py-1 text-center">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                              r.c7.includes('ALERTA') || r.c7.includes('RUPTURA')
                                ? 'bg-rose-900/60 text-rose-300'
                                : 'bg-emerald-900/60 text-emerald-300'
                            }`}>
                              {r.c7}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status do Banco */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{currentDb.recordsCount}</span>
                <span className="text-emerald-400">Banco Online</span>
              </div>
            </div>

            {/* 2. O Processamento Central (Gateway + ETL + Medida DAX) */}
            <div className="lg:col-span-3 flex flex-col justify-between bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811]">
                  <RefreshCw className={`w-4 h-4 ${isExtracting ? 'animate-spin text-[#F2C811]' : ''}`} />
                  <span>Pipeline Power BI</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-50 dark:bg-[#121318] p-2.5 rounded-lg border border-slate-200 dark:border-[#242731]">
                    <span className="font-bold text-slate-900 dark:text-white block mb-0.5">1. Extração via Gateway:</span>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                      Criptografia TLS 1.3 conecta ao servidor local sem abrir brechas na rede corporativa.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#121318] p-2.5 rounded-lg border border-slate-200 dark:border-[#242731]">
                    <span className="font-bold text-slate-900 dark:text-white block mb-0.5">2. Compressão VertiPaq:</span>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                      180 MB de dados brutos são compactados em 12 MB de memória ultra-rápida.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#121318] p-2.5 rounded-lg border border-slate-200 dark:border-[#242731]">
                    <span className="font-bold text-slate-900 dark:text-white block mb-0.5">3. Medida DAX Calculada:</span>
                    <pre className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1 overflow-x-auto p-1.5 bg-slate-100 dark:bg-[#0B0C10] rounded">
                      {currentDb.daxSnippet}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Botão Interativo de Extração para Apresentar */}
              <div className="pt-3">
                <button
                  onClick={handleSimulateExtraction}
                  disabled={isExtracting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F2C811] hover:bg-[#FFDC33] text-neutral-950 font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  {isExtracting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Extraindo do Banco...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simular Extração & Cálculo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3. O Indicador Final & Tomada de Decisão (Destino) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Indicador no Painel Interativo</span>
                  </div>
                  {extractedSuccess && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded animate-fade-in">
                      Recalculado!
                    </span>
                  )}
                </div>

                {/* 2 KPIs Resultantes */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 dark:bg-[#121318] p-3 rounded-lg border border-slate-200 dark:border-[#242731]">
                    <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">{currentDb.kpi1Label}</span>
                    <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums block mt-0.5">
                      {currentDb.kpi1Value}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                      {currentDb.kpi1Trend}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#121318] p-3 rounded-lg border border-slate-200 dark:border-[#242731]">
                    <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">{currentDb.kpi2Label}</span>
                    <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums block mt-0.5">
                      {currentDb.kpi2Value}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                      {currentDb.kpi2Trend}
                    </span>
                  </div>
                </div>

                {/* O RESULTADO REAL: TOMADA DE DECISÃO */}
                <div className="bg-amber-50/80 dark:bg-[#1C1A14] border border-amber-300 dark:border-amber-900/50 p-3.5 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-[#F2C811]">
                    <Briefcase className="w-4 h-4" />
                    <span>Como a Decisão foi Tomada na Prática:</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-neutral-200 leading-relaxed">
                    {currentDb.decisionResult}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 text-[11px] text-slate-500 dark:text-neutral-400 border-t border-slate-100 dark:border-[#242731] flex items-center justify-between">
                <span>Atualização automática diária</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Zero esforço de analistas</span>
              </div>
            </div>

          </div>

        </section>

        {/* ======================================================
            SESSÃO 4: SHOWCASE & TOMADA DE DECISÃO
            (GRÁFICOS REAIS + 3 CASOS EXECUTIVOS DE SUCESSO)
            ====================================================== */}
        <section id="sessao-4" className="pt-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#242731] pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811] mb-1">
                Sessão 04 · Showcase & Tomada de Decisão
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Como o Power BI Traz Resultados para Tomada de Decisão
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-1 max-w-2xl">
                O gráfico bonito é apenas o meio. O fim é a <strong>decisão ágil</strong> que protege a receita da sua empresa.
              </p>
            </div>

            {/* Segmentador de Dados Simulado (Filtro ao Vivo) */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#16171E] border border-slate-200 dark:border-[#2B2E36] rounded-lg shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-600 dark:text-[#F2C811] ml-2" />
              <button
                onClick={() => setChartFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  chartFilter === 'all'
                    ? 'bg-[#F2C811] text-neutral-950 shadow-xs'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Ano Completo
              </button>
              <button
                onClick={() => setChartFilter('s1')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  chartFilter === 's1'
                    ? 'bg-[#F2C811] text-neutral-950 shadow-xs'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1º Semestre
              </button>
              <button
                onClick={() => setChartFilter('s2')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  chartFilter === 's2'
                    ? 'bg-[#F2C811] text-neutral-950 shadow-xs'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2º Semestre
              </button>
            </div>
          </div>

          {/* Grid com os 2 Gráficos Interativos Solicitados */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* GRÁFICO 1: Barras de "Receita Realizada vs Meta (Budget)" */}
            <div className="lg:col-span-7 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F2C811]" />
                    Receita Realizada vs Meta Orçada (Budget)
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Valores em R$ mil</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                  Passe o cursor sobre as barras para ver a comparação mensal exata e o atingimento de meta.
                </p>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        align: 'end' as const,
                        labels: {
                          boxWidth: 12,
                          color: chartTheme.textColor,
                          font: { size: 11 },
                        },
                      },
                      tooltip: {
                        backgroundColor: chartTheme.tooltipBg,
                        borderColor: chartTheme.tooltipBorder,
                        borderWidth: 1,
                        padding: 10,
                        titleColor: chartTheme.tooltipTitle,
                        bodyColor: chartTheme.tooltipBody,
                        callbacks: {
                          label: (context) => ` ${context.dataset.label}: R$ ${context.parsed.y} mil`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: { color: chartTheme.subtleGridColor },
                        ticks: { color: chartTheme.textColor },
                      },
                      y: {
                        grid: { color: chartTheme.gridColor },
                        ticks: {
                          color: chartTheme.textColor,
                          callback: (val) => `R$ ${val}`,
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#242731] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Meta superada em 9 dos 12 meses
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+12.8% YTD</span>
              </div>
            </div>

            {/* GRÁFICO 2: Rosca de "Vendas por Região" */}
            <div className="lg:col-span-5 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    Distribuição de Vendas por Região
                  </h3>
                  <span className="text-xs font-mono text-amber-700 dark:text-[#F2C811] font-semibold">Mix Regional</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                  Gráfico de Rosca interativo demonstrando a representatividade de cada polo.
                </p>
              </div>

              <div className="h-60 sm:h-64 w-full flex items-center justify-center">
                <Doughnut
                  data={donutChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                        labels: {
                          boxWidth: 10,
                          color: chartTheme.textColor,
                          font: { size: 10 },
                          padding: 12,
                        },
                      },
                      tooltip: {
                        backgroundColor: chartTheme.tooltipBg,
                        borderColor: chartTheme.tooltipBorder,
                        borderWidth: 1,
                        padding: 10,
                        titleColor: chartTheme.tooltipTitle,
                        bodyColor: chartTheme.tooltipBody,
                        callbacks: {
                          label: (context) => ` ${context.label}: R$ ${context.parsed.toLocaleString('pt-BR')} mil`,
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#242731] bg-slate-50 dark:bg-[#121318] p-2.5 rounded-lg text-xs text-slate-600 dark:text-neutral-300">
                <strong className="text-slate-900 dark:text-white">Ponto-chave da Análise:</strong>
                "O Sudeste representa quase metade do volume, mas o Centro-Oeste é a região que mais cresce em margem."
              </div>
            </div>

          </div>

          {/* 3 CASOS REAIS DE TOMADA DE DECISÃO COM RESULTADOS TANGÍVEIS */}
          <div className="bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811]">
                  Exemplos Práticos de Aplicação
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  3 Decisões Reais Tomadas com o Power BI (Com Impacto Financeiro)
                </h3>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] rounded-lg">
                <button
                  onClick={() => setDecisionScenario('comercial')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    decisionScenario === 'comercial'
                      ? 'bg-[#F2C811] text-neutral-950 font-bold'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  1. Comercial & Margem
                </button>
                <button
                  onClick={() => setDecisionScenario('rh')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    decisionScenario === 'rh'
                      ? 'bg-[#F2C811] text-neutral-950 font-bold'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  2. RH & Retenção
                </button>
                <button
                  onClick={() => setDecisionScenario('estoque')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    decisionScenario === 'estoque'
                      ? 'bg-[#F2C811] text-neutral-950 font-bold'
                      : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  3. Supply & Estoque
                </button>
              </div>
            </div>

            {/* Conteúdo Dinâmico do Caso Selecionado */}
            {decisionScenario === 'comercial' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> 1. O Problema Oculto
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    Vendedores concediam descontos agressivos de até 22% para bater meta de faturamento bruto, sem perceber que o frete e custos deixavam a margem líquida negativa.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" /> 2. O que o Power BI Mostrou
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    Um gráfico de dispersão com linha de corte: 42 pedidos da semana apareceram no quadrante vermelho de margem abaixo do piso aceitável (15%).
                  </p>
                </div>

                <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3. A Decisão & O Resultado
                  </div>
                  <p className="text-xs text-slate-800 dark:text-neutral-200 leading-relaxed">
                    Foi instituída uma trava automática de alçada de desconto. <strong>Resultado: Economia de R$ 420 mil em margem preservada no primeiro mês.</strong>
                  </p>
                </div>
              </div>
            )}

            {decisionScenario === 'rh' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> 1. O Problema Oculto
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    A empresa perdia desenvolvedores sêniores e analistas críticos sem aviso prévio, sobrecarregando os times e atrasando projetos estratégicos.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" /> 2. O que o Power BI Mostrou
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    A correlação de turnover revelou que 80% das saídas ocorriam exatamente entre 14 e 18 meses de empresa por defasagem na progressão salarial.
                  </p>
                </div>

                <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3. A Decisão & O Resultado
                  </div>
                  <p className="text-xs text-slate-800 dark:text-neutral-200 leading-relaxed">
                    O RH criou um plano de retenção preventiva aos 12 meses. <strong>Resultado: Queda de 34% no turnover técnico e economia de R$ 680 mil em contratações.</strong>
                  </p>
                </div>
              </div>
            )}

            {decisionScenario === 'estoque' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> 1. O Problema Oculto
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    O Centro de Distribuição Nordeste ficava sem produtos campeões de venda no fim de semana, enquanto o Centro de SP acumulava estoque parado.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731] rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" /> 2. O que o Power BI Mostrou
                  </div>
                  <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                    Um mapa de cobertura em dias de estoque que acendeu um alerta amarelo 5 dias antes da ruptura acontecer no Recife.
                  </p>
                </div>

                <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3. A Decisão & O Resultado
                  </div>
                  <p className="text-xs text-slate-800 dark:text-neutral-200 leading-relaxed">
                    Transferência de caminhões dedicada entre centros antes do desabastecimento. <strong>Resultado: Zero perda de pedidos e +R$ 1,2 milhão faturado.</strong>
                  </p>
                </div>
              </div>
            )}
          </div>

        </section>

        {/* ======================================================
            SESSÃO 5: DÚVIDAS FREQUENTES E EXEMPLOS (Q&A SANFONA)
            ====================================================== */}
        <section id="sessao-5" className="pt-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#242731] pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811] mb-1">
                Sessão 05 · Desmistificando a Plataforma
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Dúvidas Frequentes sobre o Power BI (Q&A Prático)
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-1 max-w-3xl">
                As 5 perguntas essenciais respondidas com <strong>conceito simples</strong> e
                um <strong>exemplo prático de negócio</strong> destacado para cada uma.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setExpandedQA({
                    'excel-vs-pbi': true,
                    'desktop-vs-online': true,
                    'dax': true,
                    'conexoes': true,
                    'seguranca': true,
                  });
                }}
                className="px-3 py-1.5 text-xs text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#16171E] border border-slate-200 dark:border-[#2B2E36] rounded-md transition-colors cursor-pointer"
              >
                Expandir Todas
              </button>
              <button
                onClick={() => setExpandedQA({})}
                className="px-3 py-1.5 text-xs text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-[#16171E] border border-slate-200 dark:border-[#2B2E36] rounded-md transition-colors cursor-pointer"
              >
                Recolher Todas
              </button>
            </div>
          </div>

          {/* Lista de Perguntas no Estilo Sanfona (Accordion) */}
          <div className="space-y-4">
            
            {/* PERGUNTA 1: Diferença entre Excel e Power BI */}
            <div className={`bg-white dark:bg-[#181A22] border rounded-xl overflow-hidden transition-all shadow-sm ${
              expandedQA['excel-vs-pbi'] ? 'border-amber-400 dark:border-[#F2C811]/40' : 'border-slate-200 dark:border-[#2B2E36]'
            }`}>
              <button
                onClick={() => toggleQA('excel-vs-pbi')}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold font-mono text-amber-700 dark:text-[#F2C811] uppercase tracking-wider">
                    Dúvida 01 · Fundamentos
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Qual a diferença prática entre Excel e Power BI?
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] flex items-center justify-center shrink-0">
                  {expandedQA['excel-vs-pbi'] ? <ChevronUp className="w-4 h-4 text-[#F2C811]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {expandedQA['excel-vs-pbi'] && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#242731] space-y-3">
                  <div className="bg-slate-50 dark:bg-[#121318] p-3.5 rounded-lg border border-slate-200 dark:border-[#2B2E36]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Explicação Técnica Simples:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                      O <strong>Excel</strong> calcula célula por célula e é ideal para rascunhos, simulações pontuais e listas pequenas. Já o <strong>Power BI</strong> possui um banco colunar em memória (VertiPaq) projetado para comprimir milhões de linhas, conectando sistemas automaticamente e calculando métricas sob demanda com base no filtro que o usuário clica.
                    </p>
                  </div>

                  <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-[#F2C811] mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Exemplo Prático em Negócios (Faturamento e Vendas):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 leading-relaxed">
                      Uma rede varejista com <strong>500.000 notas fiscais por mês</strong> tenta consolidar vendas em uma planilha: o Excel trava, gera erros de PROCV e demora 40 minutos para recalcular. No Power BI, o mesmo volume carrega em <strong>menos de 1 segundo</strong>, permitindo filtrar vendas por vendedor, cidade ou desconto instantaneamente sem perigo de corromper os dados.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PERGUNTA 2: O que é o Power BI Desktop vs Online */}
            <div className={`bg-white dark:bg-[#181A22] border rounded-xl overflow-hidden transition-all shadow-sm ${
              expandedQA['desktop-vs-online'] ? 'border-amber-400 dark:border-[#F2C811]/40' : 'border-slate-200 dark:border-[#2B2E36]'
            }`}>
              <button
                onClick={() => toggleQA('desktop-vs-online')}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold font-mono text-amber-700 dark:text-[#F2C811] uppercase tracking-wider">
                    Dúvida 02 · Arquitetura
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Qual a diferença entre Power BI Desktop e Power BI Online (Serviço)?
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] flex items-center justify-center shrink-0">
                  {expandedQA['desktop-vs-online'] ? <ChevronUp className="w-4 h-4 text-[#F2C811]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {expandedQA['desktop-vs-online'] && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#242731] space-y-3">
                  <div className="bg-slate-50 dark:bg-[#121318] p-3.5 rounded-lg border border-slate-200 dark:border-[#2B2E36]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Explicação Técnica Simples:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                      O <strong>Desktop</strong> é a bancada de trabalho (gratuita, instalada no computador para construir cálculos e desenhar gráficos). O <strong>Online (Power BI Service)</strong> é o portal seguro na nuvem da Microsoft onde os relatórios são publicados, agendados para atualizar sozinhos de madrugada e consumidos por qualquer pessoa no navegador ou aplicativo do celular.
                    </p>
                  </div>

                  <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-[#F2C811] mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Exemplo Prático em Negócios (Operações & Monitoramento):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 leading-relaxed">
                      O time constrói o painel de produção no Desktop e publica no Serviço Online. Quem acompanha a operação abre o relatório no celular, recebe um <strong>alerta automático se a linha de montagem parar por mais de 10 minutos</strong> e toma a decisão sem precisar pedir para ninguém rodar uma extração manual.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PERGUNTA 3: O que é DAX */}
            <div className={`bg-white dark:bg-[#181A22] border rounded-xl overflow-hidden transition-all shadow-sm ${
              expandedQA['dax'] ? 'border-amber-400 dark:border-[#F2C811]/40' : 'border-slate-200 dark:border-[#2B2E36]'
            }`}>
              <button
                onClick={() => toggleQA('dax')}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold font-mono text-amber-700 dark:text-[#F2C811] uppercase tracking-wider">
                    Dúvida 03 · Inteligência Analítica
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    O que é DAX e por que ele é crucial para o negócio?
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] flex items-center justify-center shrink-0">
                  {expandedQA['dax'] ? <ChevronUp className="w-4 h-4 text-[#F2C811]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {expandedQA['dax'] && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#242731] space-y-3">
                  <div className="bg-slate-50 dark:bg-[#121318] p-3.5 rounded-lg border border-slate-200 dark:border-[#2B2E36]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Explicação Técnica Simples:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                      <strong>DAX (Data Analysis Expressions)</strong> é a linguagem de fórmulas do Power BI. Ao contrário de fórmulas do Excel que ocupam espaço físico nas células, o DAX cria <em>Medidas</em> que são calculadas sob demanda, adaptando-se instantaneamente ao contexto de filtros (ex: ano, mês, cliente ou produto selecionado).
                    </p>
                  </div>

                  <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-[#F2C811] mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Exemplo Prático em Negócios (Análise Financeira YoY):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 leading-relaxed">
                      Para saber se as vendas de R$ 2 milhões em Março foram realmente boas, o DAX calcula automaticamente o <strong>"Mesmo Período do Ano Anterior" (SAMEPERIODLASTYEAR)</strong> e o <strong>Atingimento YTD</strong>. Ao clicar em uma filial, o cálculo de crescimento percentual (+8,4%) é refeito na hora, sem ninguém precisar criar novas colunas na base.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PERGUNTA 4: Como conectamos nossos dados */}
            <div className={`bg-white dark:bg-[#181A22] border rounded-xl overflow-hidden transition-all shadow-sm ${
              expandedQA['conexoes'] ? 'border-amber-400 dark:border-[#F2C811]/40' : 'border-slate-200 dark:border-[#2B2E36]'
            }`}>
              <button
                onClick={() => toggleQA('conexoes')}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold font-mono text-amber-700 dark:text-[#F2C811] uppercase tracking-wider">
                    Dúvida 04 · Integração & Automação
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Como conectamos nossos dados e eliminamos o trabalho manual?
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] flex items-center justify-center shrink-0">
                  {expandedQA['conexoes'] ? <ChevronUp className="w-4 h-4 text-[#F2C811]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {expandedQA['conexoes'] && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#242731] space-y-3">
                  <div className="bg-slate-50 dark:bg-[#121318] p-3.5 rounded-lg border border-slate-200 dark:border-[#2B2E36]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Explicação Técnica Simples:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                      O Power BI possui centenas de conectores nativos (bancos SQL, SAP, Oracle, Totvs, APIs Web, pastas de rede e arquivos no SharePoint). Com a instalação do <strong>On-Premises Data Gateway</strong>, cria-se um túnel seguro e criptografado que atualiza os dados na nuvem automaticamente de acordo com o cronograma agendado (ex: diariamente às 6h da manhã).
                    </p>
                  </div>

                  <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-[#F2C811] mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Exemplo Prático em Negócios (Rotina de Atualização Automática):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 leading-relaxed">
                      Antes, alguém precisava chegar cedo para exportar relatórios manuais do ERP, colar em uma planilha pesada e disparar e-mails. Com a conexão direta agendada pelo Gateway, <strong>no início do dia toda a equipe já abre o painel 100% atualizado</strong> sem que ninguém precise ter apertado nenhum botão manual.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PERGUNTA 5: Como funciona a segurança dos dados */}
            <div className={`bg-white dark:bg-[#181A22] border rounded-xl overflow-hidden transition-all shadow-sm ${
              expandedQA['seguranca'] ? 'border-amber-400 dark:border-[#F2C811]/40' : 'border-slate-200 dark:border-[#2B2E36]'
            }`}>
              <button
                onClick={() => toggleQA('seguranca')}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold font-mono text-amber-700 dark:text-[#F2C811] uppercase tracking-wider">
                    Dúvida 05 · Governança & LGPD
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Como funciona a segurança e privacidade dos dados da empresa?
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#121318] border border-slate-200 dark:border-[#2B2E36] flex items-center justify-center shrink-0">
                  {expandedQA['seguranca'] ? <ChevronUp className="w-4 h-4 text-[#F2C811]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
              </button>

              {expandedQA['seguranca'] && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-[#242731] space-y-3">
                  <div className="bg-slate-50 dark:bg-[#121318] p-3.5 rounded-lg border border-slate-200 dark:border-[#2B2E36]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white mb-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Explicação Técnica Simples:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                      A segurança do Power BI é integrada ao ecossistema corporativo Microsoft Entra ID (antigo Azure AD) com criptografia ponta a ponta e total conformidade com a LGPD. O grande destaque é o <strong>RLS (Row-Level Security / Segurança por Nível de Linha)</strong>, onde um único relatório publicado filtra automaticamente os dados visíveis com base na alçada ou cargo de quem fez login.
                    </p>
                  </div>

                  <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-[#F2C811] mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span>Exemplo Prático em Negócios (Folha de Pagamento & RH):</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 leading-relaxed">
                      Em um dashboard de People Analytics, o responsável pelo time comercial <strong>só enxerga os dados da sua respectiva equipe</strong>. O responsável de produção acessa o mesmo link e só enxerga a equipe operacional. A coordenação geral visualiza os dados consolidados de todas as filiais. Risco zero de vazamento de salários e sem precisar criar 20 arquivos diferentes!
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </section>

        {/* ======================================================
            SESSÃO 6: ENCERRAMENTO & AGRADECIMENTO
            ====================================================== */}
        <section id="sessao-6" className="pt-6 space-y-8">
          
          <div className="border-b border-slate-200 dark:border-[#242731] pb-5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811] mb-1">
              Sessão 06 · Encerramento & Próximos Passos
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Agradecimento & Construção da Cultura Data-Driven
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 mt-1 max-w-3xl">
              Agradecemos a atenção e participação de todos. A transformação digital e o sucesso do Power BI acontecem com a colaboração ativa entre a TI e cada setor da Cimental Fermaflex.
            </p>
          </div>

          {/* CARD PRINCIPAL DE AGRADECIMENTO COM LOGO */}
          <div className="bg-white dark:bg-[#15171F] border border-slate-200 dark:border-[#2B2E36] rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-[#242731]">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-xs flex items-center justify-center shrink-0">
                  <img
                    src="/assets/aistudio/Rectangle_1fb498c1.png"
                    alt="Cimental Fermaflex"
                    className="h-10 sm:h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-[#F2C811]">
                    Cimental Fermaflex
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    Departamento de TI · Setor de Inteligência de Dados
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Projeto de Capacitação Concluído</span>
              </div>
            </div>

            {/* MENSAGEM DE AGRADECIMENTO EM DESTAQUE */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-[#F2C811] p-5 rounded-r-xl space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#F2C811]" />
                Muito obrigado pela presença e colaboração de todos!
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
                Este guia e apresentação foram preparados para demonstrar como o <strong>Power BI</strong> é muito mais do que relatórios bonitos: é a ferramenta que economiza tempo operacional, protege a rentabilidade dos nossos produtos e dá clareza total para cada decisão do dia a dia.
              </p>
            </div>

            {/* QUADRO DOS RESPONSÁVEIS */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                Equipe Responsável pela Apresentação e Projeto:
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Diego */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1A1D27] border border-slate-200 dark:border-[#2B2F3D] flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#F2C811] shadow-xs shrink-0 bg-slate-200 dark:bg-neutral-800">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-05-22_at_15.38.17_7b9d065d.jpeg"
                      alt="Diego"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">Diego</h5>
                    <div className="text-xs font-semibold text-amber-700 dark:text-[#F2C811]">
                      Assistente de Power BI
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                      Setor: Inteligência de Dados · Departamento de TI
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-300 pt-1 leading-relaxed">
                      Modelagem de dados relacionais, criação de medidas e regras em DAX, arquitetura de visuais interativos e automação de fluxos de atualização.
                    </p>
                  </div>
                </div>

                {/* Alan Sales */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#1A1D27] border border-slate-200 dark:border-[#2B2F3D] flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-slate-300 dark:border-neutral-600 shadow-xs shrink-0 bg-white">
                    <img
                      src="/assets/aistudio/alan_sales_clean.png"
                      alt="Alan Sales"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">Alan Sales</h5>
                    <div className="text-xs font-semibold text-slate-800 dark:text-neutral-200">
                      Gestor
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                      Departamento: TI (Tecnologia da Informação)
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-neutral-300 pt-1 leading-relaxed">
                      Governança e segurança dos dados, infraestrutura de conexões e Gateway corporativo, alinhamento estratégico com as lideranças e suporte aos projetos.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* PRÓXIMOS PASSOS NA CIMENTAL FERMAFLEX */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 block">
                Próximos Passos & Suporte Contínuo:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731]">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mapeamento de Demandas</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Se sua área possui planilhas lentas ou controles manuais, agende com a TI para construirmos o painel no Power BI.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731]">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Treinamento e Autonomia</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Oferecemos capacitação para uso dos filtros, exportações pontuais e acesso móvel no celular de forma rápida.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#242731]">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                    <span>Segurança & Permissões</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-neutral-400">
                    Garantia de que dados estratégicos de custos e salários só fiquem visíveis para quem realmente tem a devida alçada.
                  </p>
                </div>
              </div>
            </div>

            {/* BOTÕES FINAIS DE NAVEGAÇÃO */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-[#242731]">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
                <Sparkles className="w-4 h-4 text-[#F2C811]" />
                <span>Espaço aberto para dúvidas, perguntas e sugestões.</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollTo('sessao-5')}
                  className="px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#181A22] border border-slate-300 dark:border-[#2B2E36] hover:bg-slate-200 dark:hover:bg-[#22242E] transition-all cursor-pointer"
                >
                  Revisar Perguntas (Q&A)
                </button>

                <button
                  onClick={() => scrollTo('sessao-1')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-neutral-950 bg-[#F2C811] hover:bg-[#FFDC33] transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Voltar ao Início da Apresentação</span>
                  <ArrowRight className="w-3.5 h-3.5 -rotate-90" />
                </button>
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* ========================================================
          RODAPÉ CORPORATIVO
          ======================================================== */}
      <footer className="border-t border-slate-200 dark:border-[#242731] bg-white dark:bg-[#0C0D11] text-slate-600 dark:text-neutral-400 text-xs py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded-md border border-slate-200 dark:border-neutral-700 shadow-xs flex items-center h-8">
              <img
                src="/assets/aistudio/Rectangle_1fb498c1.png"
                alt="Cimental Fermaflex"
                className="h-5 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 dark:text-white">
                Cimental Fermaflex · Power BI Interactive Presentation
              </span>
              <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                Departamento de TI · Setor de Inteligência de Dados
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 dark:text-neutral-400">
            <div>
              <strong className="text-slate-800 dark:text-neutral-200">Responsável:</strong> Diego (Assistente de Power BI)
            </div>
            <span aria-hidden="true">·</span>
            <div>
              <strong className="text-slate-800 dark:text-neutral-200">Responsável Departamento:</strong> Alan Sales (Gestor)
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
