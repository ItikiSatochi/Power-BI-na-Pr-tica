import React, { useState, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export const LicenseCalculator: React.FC = () => {
  const [creatorsCount, setCreatorsCount] = useState<number>(5);
  const [viewersCount, setViewersCount] = useState<number>(120);
  const [exchangeRate, setExchangeRate] = useState<number>(5.6);
  const [needAIOrPaginated, setNeedAIOrPaginated] = useState<boolean>(false);

  // Pricing definitions (approx standard Microsoft official pricing)
  const PRO_PRICE = 10;
  const PPU_PRICE = 20;
  const FABRIC_F64_PRICE = 4995;

  const calculations = useMemo(() => {
    // Option 1: All Pro
    const totalUsersPro = creatorsCount + viewersCount;
    const proMonthlyUSD = totalUsersPro * PRO_PRICE;
    const proAnnualUSD = proMonthlyUSD * 12;
    const proMonthlyBRL = proMonthlyUSD * exchangeRate;

    // Option 2: All PPU
    const ppuMonthlyUSD = totalUsersPro * PPU_PRICE;
    const ppuMonthlyBRL = ppuMonthlyUSD * exchangeRate;

    // Option 3: Fabric Capacity F64 / P1
    const fabricMonthlyUSD = FABRIC_F64_PRICE + creatorsCount * PRO_PRICE;
    const fabricAnnualUSD = fabricMonthlyUSD * 12;
    const fabricMonthlyBRL = fabricMonthlyUSD * exchangeRate;

    let bestOption: 'pro' | 'ppu' | 'fabric' = 'pro';
    let rationale = '';

    if (viewersCount >= 500 || (needAIOrPaginated && viewersCount >= 250)) {
      bestOption = 'fabric';
      rationale =
        'Com mais de 500 usuários consumidores, a Capacidade Fabric F64 torna-se financeiramente mais vantajosa do que pagar licenças individuais Pro, com o bônus de liberar relatórios ilimitados para qualquer funcionário sem custo adicional por leitor e motor Fabric integrado.';
    } else if (needAIOrPaginated) {
      bestOption = 'ppu';
      rationale =
        'Para equipes menores que necessitam de modelos de dados pesados (> 1GB), taxas de atualização de até 48x ao dia e relatórios paginados sem o custo fixo de uma capacidade dedicada F64.';
    } else {
      bestOption = 'pro';
      rationale =
        'Para a maioria das organizações de médio porte (até ~450 usuários), o modelo Power BI Pro individual oferece a melhor relação custo-benefício e menor barreira de entrada.';
    }

    const hoursSavedPerMonth = totalUsersPro * 6;
    const avgHourlyCostBRL = 65;
    const monthlyFinancialReturnBRL = hoursSavedPerMonth * avgHourlyCostBRL;
    const monthlyNetGainBRL = monthlyFinancialReturnBRL - proMonthlyBRL;

    return {
      proMonthlyUSD,
      proAnnualUSD,
      proMonthlyBRL,
      ppuMonthlyUSD,
      ppuMonthlyBRL,
      fabricMonthlyUSD,
      fabricAnnualUSD,
      fabricMonthlyBRL,
      bestOption,
      rationale,
      hoursSavedPerMonth,
      monthlyFinancialReturnBRL,
      monthlyNetGainBRL,
    };
  }, [creatorsCount, viewersCount, exchangeRate, needAIOrPaginated]);

  return (
    <div className="space-y-8 transition-colors">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-[#242731] pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mb-1">
          <span className="text-[#B8860B] dark:text-[#F2C811] font-semibold">Decisão Financeira</span>
          <span aria-hidden="true">·</span>
          <span>Simulador de Licenciamento & ROI</span>
          <span aria-hidden="true">·</span>
          <span>Pro vs PPU vs Fabric F64</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Simulador Interativo de Licenças e Retorno sobre Investimento (ROI)
        </h2>
        <p className="text-slate-600 dark:text-neutral-400 text-sm mt-1 max-w-3xl">
          Descubra a arquitetura de licenciamento ideal para sua organização e entenda o ponto de equilíbrio
          entre licenças individuais por usuário e capacidade corporativa dedicada.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 shadow-sm">
        {/* Creators Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="creators-input" className="text-slate-700 dark:text-neutral-300 font-semibold flex items-center gap-1.5 cursor-pointer">
              <Users className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
              <span>Criadores / Autores (Analistas):</span>
            </label>
            <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums text-sm bg-slate-100 dark:bg-[#0F1014] px-2 py-0.5 rounded border border-slate-200 dark:border-[#2B2E36]">
              {creatorsCount}
            </span>
          </div>
          <input
            id="creators-input"
            type="range"
            min="1"
            max="50"
            value={creatorsCount}
            onChange={(e) => setCreatorsCount(Number(e.target.value))}
            className="w-full accent-[#F2C811] cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">
            Usuários que modelam no Desktop e publicam no Serviço.
          </span>
        </div>

        {/* Viewers Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="viewers-input" className="text-slate-700 dark:text-neutral-300 font-semibold flex items-center gap-1.5 cursor-pointer">
              <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Consumidores (Leitores / Gestores):</span>
            </label>
            <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums text-sm bg-slate-100 dark:bg-[#0F1014] px-2 py-0.5 rounded border border-slate-200 dark:border-[#2B2E36]">
              {viewersCount}
            </span>
          </div>
          <input
            id="viewers-input"
            type="range"
            min="5"
            max="1200"
            step="5"
            value={viewersCount}
            onChange={(e) => setViewersCount(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 dark:text-neutral-400 block">
            Liderança, diretores, vendedores e supervisores que apenas leem.
          </span>
        </div>

        {/* Exchange Rate & Advanced Toggle */}
        <div className="space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label htmlFor="exchange-rate-input" className="text-slate-700 dark:text-neutral-300 font-semibold cursor-pointer">Câmbio USD / BRL:</label>
              <span className="font-mono text-slate-900 dark:text-white text-xs tabular-nums">R$ {exchangeRate.toFixed(2)}</span>
            </div>
            <input
              id="exchange-rate-input"
              type="number"
              step="0.1"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] rounded px-3 py-1 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#F2C811] tabular-nums"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={needAIOrPaginated}
              onChange={(e) => setNeedAIOrPaginated(e.target.checked)}
              className="accent-[#F2C811] rounded w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-slate-700 dark:text-neutral-300">Necessita IA Copilot / Relatórios Paginados</span>
          </label>
        </div>
      </div>

      {/* 3 Tier Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Power BI Pro */}
        <div
          className={`bg-white dark:bg-[#181A22] border rounded-xl p-5 flex flex-col justify-between relative transition-all shadow-sm ${
            calculations.bestOption === 'pro'
              ? 'border-amber-400 dark:border-[#F2C811] ring-1 ring-amber-400 dark:ring-[#F2C811]'
              : 'border-slate-200 dark:border-[#2B2E36]'
          }`}
        >
          {calculations.bestOption === 'pro' && (
            <div className="absolute -top-3 left-4 bg-[#F2C811] text-neutral-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
              <Award className="w-3 h-3" /> Recomendado para seu cenário
            </div>
          )}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                Modelo Individual
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Power BI Pro</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Cada usuário (criador ou leitor) necessita de 1 licença Pro individual.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2B2E36]">
              <div className="text-xs text-slate-500 dark:text-neutral-400">Investimento Mensal Estimado:</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                US$ {calculations.proMonthlyUSD.toLocaleString('en-US')}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 tabular-nums">
                ~ R$ {Math.round(calculations.proMonthlyBRL).toLocaleString('pt-BR')} / mês
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Até 8 atualizações agendadas por dia</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Limite de 1 GB por conjunto de dados (dataset)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Colaboração completa em Workspaces e Teams</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2B2E36] text-[11px] text-slate-500 dark:text-neutral-400">
            Total de {creatorsCount + viewersCount} licenças Pro necessárias.
          </div>
        </div>

        {/* Tier 2: Premium por Usuário (PPU) */}
        <div
          className={`bg-white dark:bg-[#181A22] border rounded-xl p-5 flex flex-col justify-between relative transition-all shadow-sm ${
            calculations.bestOption === 'ppu'
              ? 'border-amber-400 dark:border-[#F2C811] ring-1 ring-amber-400 dark:ring-[#F2C811]'
              : 'border-slate-200 dark:border-[#2B2E36]'
          }`}
        >
          {calculations.bestOption === 'ppu' && (
            <div className="absolute -top-3 left-4 bg-[#F2C811] text-neutral-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
              <Award className="w-3 h-3" /> Recomendado para seu cenário
            </div>
          )}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                Modelos Avançados
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Premium por Usuário (PPU)</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Para quem precisa de datasets pesados e atualização frequente sem capacidade F64.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2B2E36]">
              <div className="text-xs text-slate-500 dark:text-neutral-400">Investimento Mensal Estimado:</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                US$ {calculations.ppuMonthlyUSD.toLocaleString('en-US')}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 tabular-nums">
                ~ R$ {Math.round(calculations.ppuMonthlyBRL).toLocaleString('pt-BR')} / mês
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Até 48 atualizações agendadas por dia</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Modelos de até 100 GB por dataset</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Relatórios Paginados (Pixel-perfect)</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2B2E36] text-[11px] text-slate-500 dark:text-neutral-400">
            Atenção: Leitores também precisam ter licença PPU para abrir o relatório.
          </div>
        </div>

        {/* Tier 3: Fabric Capacidade F64 / P1 */}
        <div
          className={`bg-white dark:bg-[#181A22] border rounded-xl p-5 flex flex-col justify-between relative transition-all shadow-sm ${
            calculations.bestOption === 'fabric'
              ? 'border-amber-400 dark:border-[#F2C811] ring-1 ring-amber-400 dark:ring-[#F2C811]'
              : 'border-slate-200 dark:border-[#2B2E36]'
          }`}
        >
          {calculations.bestOption === 'fabric' && (
            <div className="absolute -top-3 left-4 bg-[#F2C811] text-neutral-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
              <Award className="w-3 h-3" /> Ponto de Equilíbrio Alcançado!
            </div>
          )}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                Capacidade Organizacional
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Microsoft Fabric F64</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Capacidade dedicada: leitores consom <strong>gratuitamente (Free)</strong> sem licença paga!
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2B2E36]">
              <div className="text-xs text-slate-500 dark:text-neutral-400">Investimento Mensal Fixo:</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                US$ {calculations.fabricMonthlyUSD.toLocaleString('en-US')}
              </div>
              <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 tabular-nums">
                ~ R$ {Math.round(calculations.fabricMonthlyBRL).toLocaleString('pt-BR')} / mês
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-neutral-300 pt-2 border-t border-slate-100 dark:border-[#2B2E36]/60">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Leitores ilimitados com licença Free</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Copilot de IA nativo habilitado</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>OneLake, Data Factory e Engenharia inclusos</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#2B2E36] text-[11px] text-slate-500 dark:text-neutral-400">
            Apenas os {creatorsCount} criadores precisam de Pro (US$ 10).
          </div>
        </div>
      </div>

      {/* Strategic Rationale & ROI Return Box */}
      <div className="bg-slate-50 dark:bg-[#12141A] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-[#F2C811]">
            <Sparkles className="w-4 h-4" />
            <span>Diagnóstico Automatizado da Arquitetura:</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Por que recomendamos o modelo{' '}
            <span className="text-amber-700 dark:text-[#F2C811]">
              {calculations.bestOption === 'pro'
                ? 'Power BI Pro'
                : calculations.bestOption === 'ppu'
                ? 'Premium por Usuário'
                : 'Microsoft Fabric F64'}
            </span>
            ?
          </h4>
          <p className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
            {calculations.rationale}
          </p>
        </div>

        {/* ROI Metrics Pill */}
        <div className="lg:col-span-5 bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-neutral-400 font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Retorno Estimado em Produtividade:
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">ROI Positivo</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 dark:bg-[#0F1014] p-2.5 rounded border border-slate-200 dark:border-[#242731]">
              <span className="text-slate-500 dark:text-neutral-400 text-[11px] block">Horas Poupadas / Mês:</span>
              <span className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {calculations.hoursSavedPerMonth}h
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-[#0F1014] p-2.5 rounded border border-slate-200 dark:border-[#242731]">
              <span className="text-slate-500 dark:text-neutral-400 text-[11px] block">Economia Operacional:</span>
              <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                R$ {Math.round(calculations.monthlyNetGainBRL).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed">
            *Considerando economia conservadora de 6h/mês por gestor em extrações manuais de planilhas e conferência de relatórios.
          </p>
        </div>
      </div>
    </div>
  );
};
