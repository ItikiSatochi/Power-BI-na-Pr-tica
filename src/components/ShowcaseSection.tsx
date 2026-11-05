import React, { useState, useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { registerChartJS, getChartTheme } from '../utils/chartConfig';
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Layers,
  Sparkles,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Globe
} from 'lucide-react';

registerChartJS();

type DashboardMode = 'sales' | 'hr';

interface ShowcaseSectionProps {
  isDark?: boolean;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ isDark = true }) => {
  const [activeDashboard, setActiveDashboard] = useState<DashboardMode>('sales');

  // Sales Dashboard Interactive Slicers
  const [salesRegion, setSalesRegion] = useState<string>('all');
  const [salesPeriod, setSalesPeriod] = useState<string>('ytd');
  const [salesSegment, setSalesSegment] = useState<string>('all');

  // HR Dashboard Interactive Slicers
  const [hrDept, setHrDept] = useState<string>('all');
  const [hrPeriod, setHrPeriod] = useState<string>('2026');

  // Chart theme colors
  const chartTheme = useMemo(() => getChartTheme(isDark), [isDark]);

  // Multiplier based on filters to simulate live recalculation
  const salesMultiplier = useMemo(() => {
    let m = 1.0;
    if (salesRegion === 'sudeste') m *= 1.25;
    if (salesRegion === 'sul') m *= 0.85;
    if (salesRegion === 'nordeste') m *= 0.65;
    if (salesPeriod === 'q1') m *= 0.32;
    if (salesPeriod === 'q2') m *= 0.38;
    if (salesSegment === 'enterprise') m *= 1.15;
    if (salesSegment === 'retail') m *= 0.78;
    return m;
  }, [salesRegion, salesPeriod, salesSegment]);

  // HR Multiplier
  const hrMultiplier = useMemo(() => {
    let m = 1.0;
    if (hrDept === 'tech') m *= 0.8;
    if (hrDept === 'ops') m *= 1.4;
    if (hrDept === 'sales') m *= 1.1;
    return m;
  }, [hrDept, hrPeriod]);

  // Sales Trend Chart Data
  const salesTrendData = useMemo(() => {
    const baseActual = [580, 620, 690, 710, 740, 790, 830, 810, 890, 940, 980, 1050];
    const baseTarget = [600, 610, 650, 700, 730, 760, 800, 820, 860, 900, 930, 980];

    const actual = baseActual.map((val) => Math.round(val * salesMultiplier));
    const target = baseTarget.map((val) => Math.round(val * salesMultiplier));

    return {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Faturamento Realizado (R$ mil)',
          data: actual,
          borderColor: isDark ? '#F2C811' : '#D97706',
          backgroundColor: isDark ? 'rgba(242, 200, 17, 0.12)' : 'rgba(217, 119, 6, 0.12)',
          fill: true,
          tension: 0.3,
          borderWidth: 2.5,
          pointBackgroundColor: isDark ? '#F2C811' : '#D97706',
          pointBorderColor: isDark ? '#0F1014' : '#FFFFFF',
          pointHoverRadius: 6,
        },
        {
          label: 'Meta Orçada (Budget)',
          data: target,
          borderColor: isDark ? '#64748B' : '#94A3B8',
          borderDash: [5, 5],
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.2,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    };
  }, [salesMultiplier, isDark]);

  // Sales Product Margin Horizontal Bar Data
  const productPerformanceData = useMemo(() => {
    const products = ['Cloud Enterprise', 'Hardware Pro', 'Consultoria BI', 'Suporte SLA 24/7', 'Licenças SaaS'];
    const margins = [44, 28, 52, 61, 68].map((v) => Math.min(85, Math.round(v * (salesMultiplier > 1 ? 1.05 : 0.95))));
    const revenues = [2800, 2100, 1450, 1200, 870].map((v) => Math.round(v * salesMultiplier));

    return {
      labels: products,
      datasets: [
        {
          label: 'Receita Total (R$ mil)',
          data: revenues,
          backgroundColor: isDark ? '#3B82F6' : '#2563EB',
          borderRadius: 4,
        },
        {
          label: 'Margem Bruta (%)',
          data: margins.map((m) => m * 30),
          backgroundColor: isDark ? '#F2C811' : '#EAB308',
          borderRadius: 4,
        },
      ],
    };
  }, [salesMultiplier, isDark]);

  // HR Headcount Distribution Bar Data
  const hrDistributionData = useMemo(() => {
    const depts = ['Tecnologia', 'Operações', 'Comercial', 'Financeiro', 'Logística', 'Atendimento'];
    const headcount = [340, 620, 290, 110, 260, 220].map((h) => Math.round(h * hrMultiplier));

    return {
      labels: depts,
      datasets: [
        {
          label: 'Colaboradores Ativos',
          data: headcount,
          backgroundColor: isDark ? '#F2C811' : '#D97706',
          borderRadius: 4,
        },
      ],
    };
  }, [hrMultiplier, isDark]);

  // HR Retention Line Data
  const hrRetentionData = useMemo(() => {
    return {
      labels: ['Q1/24', 'Q2/24', 'Q3/24', 'Q4/24', 'Q1/25', 'Q2/25', 'Q3/25', 'Q4/25'],
      datasets: [
        {
          label: 'e-NPS Clima (Score)',
          data: [64, 68, 71, 75, 74, 79, 82, 86],
          borderColor: isDark ? '#10B981' : '#059669',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.3,
          yAxisID: 'y',
        },
        {
          label: 'Turnover Anualizado (%)',
          data: [14.2, 13.5, 12.1, 11.0, 10.4, 9.1, 8.5, 7.8],
          borderColor: isDark ? '#EF4444' : '#DC2626',
          borderDash: [4, 4],
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          yAxisID: 'y1',
        },
      ],
    };
  }, [isDark]);

  // Waterfall Steps
  const waterfallSteps = useMemo(() => {
    const gross = Math.round(11200 * salesMultiplier);
    const taxes = Math.round(-1680 * salesMultiplier);
    const net = gross + taxes;
    const cmv = Math.round(-4200 * salesMultiplier);
    const grossProfit = net + cmv;
    const opex = Math.round(-2100 * salesMultiplier);
    const ebitda = grossProfit + opex;

    return [
      { label: 'Fat. Bruto', value: gross, type: 'base', desc: 'Total faturado no período' },
      { label: 'Impostos', value: taxes, type: 'negative', desc: 'PIS/COFINS/ICMS/ISS' },
      { label: 'Receita Líq.', value: net, type: 'subtotal', desc: 'Entrada operacional líquida' },
      { label: 'CMV / Custos', value: cmv, type: 'negative', desc: 'Custo de mercadorias e infra' },
      { label: 'Lucro Bruto', value: grossProfit, type: 'subtotal', desc: 'Margem de contribuição 1' },
      { label: 'Despesas Op.', value: opex, type: 'negative', desc: 'Vendas, marketing e G&A' },
      { label: 'EBITDA Final', value: ebitda, type: 'total', desc: 'Geração operacional de caixa' },
    ];
  }, [salesMultiplier]);

  return (
    <div className="space-y-8 transition-colors">
      {/* Header of Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#242731] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mb-1">
            <span className="text-[#B8860B] dark:text-[#F2C811] font-semibold">Módulo Prático</span>
            <span aria-hidden="true">·</span>
            <span>Simulação Interativa de Alta Fidelidade</span>
            <span aria-hidden="true">·</span>
            <span>Motor DAX e Slicers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Showcase Visual: O Poder do Power BI em Ação
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm mt-1 max-w-3xl">
            Experimente abaixo a navegação fluida, segmentadores de dados (slicers) e visuais executivos
            que substituem centenas de planilhas e reuniões improdutivas.
          </p>
        </div>

        {/* Dashboard Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#14161C] border border-slate-200 dark:border-[#2B2E36] rounded-lg shrink-0">
          <button
            onClick={() => setActiveDashboard('sales')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeDashboard === 'sales'
                ? 'bg-[#F2C811] text-neutral-950 shadow-sm'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Dashboard Comercial & Rentabilidade</span>
          </button>
          <button
            onClick={() => setActiveDashboard('hr')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeDashboard === 'hr'
                ? 'bg-[#F2C811] text-neutral-950 shadow-sm'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-800/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>People Analytics & RH</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD 1: COMMERCIAL & PROFITABILITY */}
      {activeDashboard === 'sales' && (
        <div className="space-y-6">
          {/* Simulated Power BI Canvas Top Toolbar / Slicers */}
          <div className="bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                  Segmentadores de Dados (Filtros Ativos)
                </span>
              </div>

              {/* Interactive Slicers */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Region Slicer */}
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] px-3 py-1.5 rounded-lg text-xs">
                  <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
                  <span className="text-slate-500 dark:text-neutral-400">Região:</span>
                  <select
                    value={salesRegion}
                    onChange={(e) => setSalesRegion(e.target.value)}
                    className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Todas as Regiões</option>
                    <option value="sudeste" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Sudeste (+25% vol.)</option>
                    <option value="sul" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Sul</option>
                    <option value="nordeste" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Nordeste</option>
                  </select>
                </div>

                {/* Period Slicer */}
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] px-3 py-1.5 rounded-lg text-xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
                  <span className="text-slate-500 dark:text-neutral-400">Período:</span>
                  <select
                    value={salesPeriod}
                    onChange={(e) => setSalesPeriod(e.target.value)}
                    className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="ytd" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">YTD 2026 (Ano Todo)</option>
                    <option value="q1" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">1º Trimestre (Q1)</option>
                    <option value="q2" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">2º Trimestre (Q2)</option>
                  </select>
                </div>

                {/* Channel Slicer */}
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] px-3 py-1.5 rounded-lg text-xs">
                  <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
                  <span className="text-slate-500 dark:text-neutral-400">Canal:</span>
                  <select
                    value={salesSegment}
                    onChange={(e) => setSalesSegment(e.target.value)}
                    className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Todos os Canais</option>
                    <option value="enterprise" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Enterprise B2B</option>
                    <option value="retail" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Varejo Direto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 relative overflow-hidden group hover:border-[#F2C811]/40 transition-colors shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Faturamento Líquido</span>
                <DollarSign className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                R$ {(9.52 * salesMultiplier).toFixed(2)}M
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 font-mono tabular-nums">
                  <TrendingUp className="w-3.5 h-3.5" /> +8.4%
                </span>
                <span className="text-slate-500 dark:text-neutral-400">vs orçado (Budget)</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>DAX: [Total Líquido]</span>
                <span className="text-[#B8860B] dark:text-[#F2C811] font-medium">Meta: R$ {(8.8 * salesMultiplier).toFixed(1)}M</span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 relative overflow-hidden group hover:border-[#F2C811]/40 transition-colors shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Margem EBITDA</span>
                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                {(25.1 + (salesMultiplier > 1 ? 1.8 : -1.2)).toFixed(1)}%
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 font-mono tabular-nums">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +2.3 p.p.
                </span>
                <span className="text-slate-500 dark:text-neutral-400">vs ano anterior (SPLY)</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Benchmark Setor: 22.0%</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Saudável</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 relative overflow-hidden group hover:border-[#F2C811]/40 transition-colors shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Ticket Médio B2B</span>
                <TrendingUp className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                R$ {Math.round(48200 * (salesMultiplier > 1 ? 1.08 : 0.94)).toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 font-mono tabular-nums">
                  +12.1%
                </span>
                <span className="text-slate-500 dark:text-neutral-400">mix de contratos</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>DAX: DIVIDE([Fat], [Pedidos])</span>
                <span className="text-slate-700 dark:text-neutral-300">184 pedidos/mês</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 relative overflow-hidden group hover:border-[#F2C811]/40 transition-colors shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Contas Ativas & Retenção</span>
                <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                {Math.round(1420 * (salesMultiplier > 1 ? 1.05 : 0.96))}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 font-mono tabular-nums">
                  94.8% Retenção
                </span>
                <span className="text-slate-500 dark:text-neutral-400">Churn residual 1.2%</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Carteira ativa auditada</span>
                <span className="text-sky-600 dark:text-sky-400 font-medium">+58 novos logos</span>
              </div>
            </div>
          </div>

          {/* Grid with Visuals: Real vs Budget Line Chart + Waterfall Margin Bridge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual 1: Chart.js Line Chart (Faturamento Real vs Orçado) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F2C811]" />
                    Evolução Mensal: Faturamento Real vs Orçado (Budget)
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 tabular-nums">Valores em R$ mil</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                  Visual com linha tracejada de meta e preenchimento de área para identificar sazonalidade e desvios de receita.
                </p>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <Line
                  data={salesTrendData}
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

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2B2E36] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-[#F2C811]" />
                  <span>Insight Automático: Melhor mês histórico registrado em Dezembro.</span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">+14.2% YoY</span>
              </div>
            </div>

            {/* Visual 2: Gráfico de Cascata Interativo (Waterfall Chart) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Gráfico de Cascata: Ponte de Margem DRE
                  </h3>
                  <span className="text-xs font-mono text-[#B8860B] dark:text-[#F2C811] tabular-nums font-semibold">DRE Gerencial</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                  Visual de Cascata (Waterfall) essencial para gestores explicarem como o Faturamento Bruto se transforma em EBITDA.
                </p>
              </div>

              {/* Waterfall Visualization Bars */}
              <div className="space-y-2.5 py-1">
                {waterfallSteps.map((step, idx) => {
                  const isNegative = step.value < 0;
                  const isTotal = step.type === 'total';
                  const isSubtotal = step.type === 'subtotal';
                  const maxRef = Math.max(...waterfallSteps.map((s) => Math.abs(s.value)));
                  const widthPercent = Math.max(12, Math.round((Math.abs(step.value) / maxRef) * 100));

                  return (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`font-medium ${isTotal ? 'text-amber-800 dark:text-[#F2C811] font-bold' : isSubtotal ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-neutral-300'}`}>
                          {step.label}
                        </span>
                        <span
                          className={`font-mono tabular-nums font-semibold ${
                            isNegative ? 'text-rose-600 dark:text-rose-400' : isTotal ? 'text-amber-800 dark:text-[#F2C811]' : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {isNegative ? '-' : '+'} R$ {Math.abs(step.value).toLocaleString('pt-BR')} mil
                        </span>
                      </div>
                      <div className="h-3 w-full bg-slate-100 dark:bg-[#121318] rounded-full overflow-hidden flex">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isTotal
                              ? 'bg-[#F2C811]'
                              : isNegative
                              ? 'bg-rose-500/80'
                              : 'bg-emerald-500/80'
                          }`}
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2B2E36] bg-slate-50 dark:bg-[#121318]/50 p-2.5 rounded-lg border border-slate-200 dark:border-[#242731]">
                <p className="text-[11px] text-slate-700 dark:text-neutral-300 leading-relaxed">
                  <strong className="text-slate-900 dark:text-white">Por que gestores amam esse visual?</strong> Porque substitui planilhas de 20 colunas. Qualquer conselheiro ou acionista entende a queima de margem em 5 segundos.
                </p>
              </div>
            </div>
          </div>

          {/* Visual 3: Horizontal Bar Chart + Data Matrix with Conditional Formatting */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Horizontal Bar Chart (Product Lines) */}
            <div className="lg:col-span-6 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Top Linhas de Produtos & Serviços</h3>
                <span className="text-xs text-slate-500 dark:text-neutral-400">Receita vs Margem</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                Identificação instantânea de quais produtos geram faturamento bruto vs quais geram margem líquida real.
              </p>

              <div className="h-60 w-full">
                <Bar
                  data={productPerformanceData}
                  options={{
                    indexAxis: 'y' as const,
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        align: 'end' as const,
                        labels: {
                          boxWidth: 10,
                          color: chartTheme.textColor,
                          font: { size: 10 },
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: { color: chartTheme.subtleGridColor },
                        ticks: { color: chartTheme.textColor },
                      },
                      y: {
                        grid: { display: false },
                        ticks: { color: chartTheme.textColor, font: { size: 11 } },
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Matrix with Conditional Formatting */}
            <div className="lg:col-span-6 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Matriz de Performance Regional (Com Barras de Dados)
                  </h3>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Status 100% Online</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mb-3">
                  Simulação do recurso de formatação condicional nativo do Power BI que alerta os gestores por cores.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-[#2B2E36] text-slate-500 dark:text-neutral-400 uppercase tracking-wider font-semibold text-[11px]">
                      <th className="pb-2.5">Filial / Polo</th>
                      <th className="pb-2.5 text-right">Faturamento</th>
                      <th className="pb-2.5 text-right">Atingimento Meta</th>
                      <th className="pb-2.5 text-right">Margem</th>
                      <th className="pb-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#242731]">
                    {[
                      { region: 'São Paulo - Matriz', rev: 'R$ 4.280k', metaPct: 108, margin: '31.2%', status: 'Superada' },
                      { region: 'Belo Horizonte - Polo MG', rev: 'R$ 2.150k', metaPct: 103, margin: '27.4%', status: 'Atingida' },
                      { region: 'Curitiba - Polo Sul', rev: 'R$ 1.620k', metaPct: 98, margin: '25.8%', status: 'Atingida' },
                      { region: 'Recife - Polo Nordeste', rev: 'R$ 980k', metaPct: 89, margin: '21.5%', status: 'Atenção' },
                      { region: 'Brasília - Centro-Oeste', rev: 'R$ 740k', metaPct: 94, margin: '24.1%', status: 'Atingida' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#1E212B] transition-colors">
                        <td className="py-2.5 font-medium text-slate-900 dark:text-white">{row.region}</td>
                        <td className="py-2.5 text-right font-mono tabular-nums text-slate-800 dark:text-neutral-200">{row.rev}</td>
                        <td className="py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1.5 font-mono tabular-nums">
                            <span className={row.metaPct >= 100 ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400'}>
                              {row.metaPct}%
                            </span>
                            <div className="w-12 h-1.5 bg-slate-200 dark:bg-[#121318] rounded-full overflow-hidden inline-flex">
                              <div
                                className={`h-full ${row.metaPct >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                style={{ width: `${Math.min(100, row.metaPct)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 text-right font-mono tabular-nums text-slate-700 dark:text-neutral-300">{row.margin}</td>
                        <td className="py-2.5 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                              row.status === 'Superada'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                                : row.status === 'Atingida'
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40'
                                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Total de 5 polos integrados via ERP</span>
                <span className="text-[#B8860B] dark:text-[#F2C811] font-medium">RLS ativo por matrícula de gestor</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 2: PEOPLE ANALYTICS & RH */}
      {activeDashboard === 'hr' && (
        <div className="space-y-6">
          {/* HR Slicers */}
          <div className="bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
                  Filtros de Pessoas & Operações
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] px-3 py-1.5 rounded-lg text-xs">
                  <span className="text-slate-500 dark:text-neutral-400">Departamento:</span>
                  <select
                    value={hrDept}
                    onChange={(e) => setHrDept(e.target.value)}
                    className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Todos os Departamentos</option>
                    <option value="tech" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Tecnologia & Produto</option>
                    <option value="ops" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Operações & Fábrica</option>
                    <option value="sales" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">Comercial & Vendas</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] px-3 py-1.5 rounded-lg text-xs">
                  <span className="text-slate-500 dark:text-neutral-400">Ano Base:</span>
                  <select
                    value={hrPeriod}
                    onChange={(e) => setHrPeriod(e.target.value)}
                    className="bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="2026" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">2026 (Atualizado)</option>
                    <option value="2025" className="bg-white dark:bg-[#18191D] text-slate-900 dark:text-white">2025 (Consolidado)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* HR Top 4 KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Headcount Total Ativo</span>
                <Users className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                {Math.round(1840 * hrMultiplier)}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono tabular-nums">+48 colaboradores</span>
                <span className="text-slate-500 dark:text-neutral-400">saldo líquido</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Fórmula: fAdmissao - fDesligamento</span>
                <span className="text-[#B8860B] dark:text-[#F2C811]">Taxa vaga: 91%</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Turnover Geral Anualizado</span>
                <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                {(7.8 * (hrMultiplier > 1 ? 1.05 : 0.95)).toFixed(1)}%
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono tabular-nums">-2.1 p.p.</span>
                <span className="text-slate-500 dark:text-neutral-400">abaixo do limite de 10%</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Voluntário: 5.1%</span>
                <span className="text-slate-700 dark:text-neutral-300">Involuntário: 2.7%</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>e-NPS / Clima Organizacional</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                +86
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono tabular-nums">+12 pts</span>
                <span className="text-slate-500 dark:text-neutral-400">Zona de Excelência (&gt;75)</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Pesquisa Pulso Mensal</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">92% aderência</span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400 text-xs mb-1">
                <span>Custo Médio por Colaborador</span>
                <DollarSign className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                R$ {Math.round(8950 * (hrMultiplier > 1 ? 1.02 : 0.98)).toLocaleString('pt-BR')}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-slate-600 dark:text-neutral-300 font-mono tabular-nums">Folha + Encargos + Benefícios</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60 text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                <span>Orçado: R$ 9.200</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Economia de 2.7%</span>
              </div>
            </div>
          </div>

          {/* HR Visuals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Headcount por Departamento</h3>
                <span className="text-xs text-slate-500 dark:text-neutral-400">Distribuição Ativa</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                Visão de alocação de capacidade produtiva para rebalanceamento de times e contratações.
              </p>
              <div className="h-64 w-full">
                <Bar
                  data={hrDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        grid: { display: false },
                        ticks: { color: chartTheme.textColor, font: { size: 11 } },
                      },
                      y: {
                        grid: { color: chartTheme.gridColor },
                        ticks: { color: chartTheme.textColor },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Correlação: Satisfação (e-NPS) vs Queda de Turnover</h3>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Tendência Comprovada</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mb-4">
                Demonstra como investimentos em liderança e clima impactam diretamente a redução de custos de rescisão.
              </p>
              <div className="h-64 w-full">
                <Line
                  data={hrRetentionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                        labels: { color: chartTheme.textColor, boxWidth: 12, font: { size: 10 } },
                      },
                    },
                    scales: {
                      y: {
                        type: 'linear' as const,
                        display: true,
                        position: 'left' as const,
                        title: { display: true, text: 'e-NPS (Pontos)', color: '#10B981', font: { size: 10 } },
                        ticks: { color: chartTheme.textColor },
                        grid: { color: chartTheme.gridColor },
                      },
                      y1: {
                        type: 'linear' as const,
                        display: true,
                        position: 'right' as const,
                        title: { display: true, text: 'Turnover (%)', color: '#EF4444', font: { size: 10 } },
                        ticks: { color: chartTheme.textColor },
                        grid: { drawOnChartArea: false },
                      },
                      x: {
                        ticks: { color: chartTheme.textColor },
                        grid: { display: false },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Architecture & Business Value Box for Executives */}
      <div className="bg-slate-50 dark:bg-[#12141A] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-[#F2C811]" />
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Anatomia de um Dashboard Corporativo de Sucesso
            </h4>
            <p className="text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
              Observe como os dois dashboards acima seguem as diretrizes dos mestres em Power BI:
              <strong> 4 KPIs principais no topo</strong> (visão executiva em 3 segundos),
              <strong> segmentadores de dados contextuais</strong> que recalculam as medidas em tempo real,
              e <strong>gráficos de apoio com propósitos definidos</strong> (Linhas para tendência histórica,
              Cascata para pontes de margem e Matrizes com formatação condicional para exceções).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-white dark:bg-[#181A22] p-3 rounded-lg border border-slate-200 dark:border-[#242731]">
                <div className="text-xs font-semibold text-amber-800 dark:text-[#F2C811] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1. Fonte Única da Verdade
                </div>
                <div className="text-xs text-slate-600 dark:text-neutral-400">
                  Dados integrados diretamente do ERP/CRM sem manipulação manual em planilhas dispersas.
                </div>
              </div>
              <div className="bg-white dark:bg-[#181A22] p-3 rounded-lg border border-slate-200 dark:border-[#242731]">
                <div className="text-xs font-semibold text-amber-800 dark:text-[#F2C811] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Automação Total
                </div>
                <div className="text-xs text-slate-600 dark:text-neutral-400">
                  Atualizações agendadas de madrugada via Gateway, sem ninguém precisar rodar rotinas às 7h.
                </div>
              </div>
              <div className="bg-white dark:bg-[#181A22] p-3 rounded-lg border border-slate-200 dark:border-[#242731]">
                <div className="text-xs font-semibold text-amber-800 dark:text-[#F2C811] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 3. Segurança RLS Nativa
                </div>
                <div className="text-xs text-slate-600 dark:text-neutral-400">
                  Cada gestor só acessa as linhas autorizadas da sua alçada com criptografia Microsoft.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
