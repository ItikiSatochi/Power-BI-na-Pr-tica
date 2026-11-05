import React, { useState } from 'react';
import { NavigationTab } from '../types/pbi';
import {
  BarChart3,
  Sparkles,
  Zap,
  ArrowRight,
  Lock,
  Layers,
  Award
} from 'lucide-react';

interface OverviewSectionProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenGlossary: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate, onOpenGlossary }) => {
  // Interactive Maturity Assessment
  const [maturityLevel, setMaturityLevel] = useState<number>(2);

  const maturityLevels = [
    {
      level: 1,
      title: 'Nível 1: Excel Caótico & Relatórios Soltos',
      badge: 'Básico',
      description: 'Cada gerente tem sua planilha própria; dados divergem nas reuniões de diretoria; muito tempo gasto em consolidar e pouco em decidir.',
      symptom: 'Sintoma: 15 horas semanais gastas só limpando dados no Excel.',
      recommendation: 'Prioridade: Padronizar fonte única de dados e adotar Power Query.',
    },
    {
      level: 2,
      title: 'Nível 2: Primeiros Dashboards & BI Operacional',
      badge: 'Intermediário',
      description: 'Dashboards criados em Power BI Desktop, mas ainda alimentados por planilhas locais; falta atualização agendada e segurança RLS.',
      symptom: 'Sintoma: O relatório só atualiza se o analista abrir e clicar em "Atualizar".',
      recommendation: 'Prioridade: Implementar Gateway corporativo e publicação no Serviço em nuvem.',
    },
    {
      level: 3,
      title: 'Nível 3: Governança, Star Schema & Métricas DAX Homologadas',
      badge: 'Avançado',
      description: 'Conexão direta no ERP/CRM via Gateway; modelo estrela normalizado; RLS por alçada de gestor e KPIs com conceito único para a empresa.',
      symptom: 'Sintoma: Decisões tomadas na reunião olhando o mesmo dashboard em tempo real.',
      recommendation: 'Prioridade: Criar cultura de autosserviço (Self-service BI) para outras áreas.',
    },
    {
      level: 4,
      title: 'Nível 4: Cultura Data-Driven & Inteligência Artificial (Fabric)',
      badge: 'Líder de Mercado',
      description: 'Modelos semânticos unificados corporativos; capacidade Fabric com leitura ilimitada; alertas preditivos de anomalias no celular e Copilot de IA.',
      symptom: 'Sintoma: Os gestores recebem alertas antes dos problemas financeiros estourarem.',
      recommendation: 'Prioridade: Modelagem preditiva e expansão contínua de ROI.',
    },
  ];

  return (
    <div className="space-y-12 transition-colors">
      {/* Hero Banner Section */}
      <div className="relative bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-2xl p-6 sm:p-10 overflow-hidden shadow-sm">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2C811]/10 dark:bg-[#F2C811]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400">
            <span className="text-[#B8860B] dark:text-[#F2C811] font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Hub Estratégico Corporativo
            </span>
            <span aria-hidden="true">·</span>
            <span>Para Gestores, Diretores e Usuários de Negócio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Transforme dados dispersos em <span className="text-[#C99700] dark:text-[#F2C811]">decisões executivas</span> em tempo real.
          </h1>

          <p className="text-slate-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            O Power BI não é apenas um substituto moderno para gráficos do Excel. É uma plataforma integrada
            de governança, automação e inteligência de negócios que garante uma
            <strong> Fonte Única da Verdade (Single Source of Truth)</strong> para toda a sua organização.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('showcase')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#F2C811] hover:bg-[#FFDC33] text-neutral-950 font-bold text-sm rounded-lg transition-all shadow-md shadow-[#F2C811]/15 active:scale-95"
            >
              <span>Explorar Dashboards Práticos</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => onNavigate('qa')}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#1C1F28] dark:hover:bg-[#252834] text-slate-800 dark:text-white font-medium text-sm rounded-lg border border-slate-300 dark:border-[#2B2E36] transition-all"
            >
              <span>Dúvidas & Respostas (Q&A)</span>
            </button>

            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-2 px-4 py-2.5 text-xs text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>Ver Glossário para Líderes →</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Strip at Bottom of Hero */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#2B2E36]/80 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">-85%</div>
            <div className="text-xs text-slate-500 dark:text-neutral-400">Tempo gasto consolidando planilhas</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#B8860B] dark:text-[#F2C811] tabular-nums">100%</div>
            <div className="text-xs text-slate-500 dark:text-neutral-400">Auditoria & RLS por alçada</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">24/7</div>
            <div className="text-xs text-slate-500 dark:text-neutral-400">Atualização agendada via Gateway</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">1 Fonte</div>
            <div className="text-xs text-slate-500 dark:text-neutral-400">Alinhamento de diretoria e filiais</div>
          </div>
        </div>
      </div>

      {/* The 4 Architectural Pillars of Power BI */}
      <div className="space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#B8860B] dark:text-[#F2C811] mb-1">
            Fundamentos de Engenharia & Negócio
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Os 4 Pilares que Sustentam um Projeto Corporativo
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm max-w-2xl mt-1">
            Entenda como cada camada do ecossistema Microsoft atua para transformar dados brutos em decisões seguras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 space-y-3 relative group hover:border-[#F2C811]/40 transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 dark:text-[#F2C811]">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#F2C811]">PILAR 01</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Extração & Power Query</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              O motor ETL que limpa, descompacta e harmoniza dados de ERPs (SAP, TOTVS), bancos SQL,
              APIs e planilhas sem alterar as bases originais.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-neutral-400 border-t border-slate-100 dark:border-[#242731]">
              <strong className="text-slate-900 dark:text-white block">Benefício de Negócio:</strong>
              Fim dos erros de digitação e inconsistências de formatos de datas.
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 space-y-3 relative group hover:border-[#F2C811]/40 transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">PILAR 02</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Modelagem & Fórmulas DAX</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Cálculo dinâmico sob demanda baseado no Modelo Estrela (Star Schema). Medidas DAX
              recalculam margens, projeções e médias instantaneamente ao clicar no gráfico.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-neutral-400 border-t border-slate-100 dark:border-[#242731]">
              <strong className="text-slate-900 dark:text-white block">Benefício de Negócio:</strong>
              Métricas auditadas com regras acordadas formalmente pela empresa.
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 space-y-3 relative group hover:border-[#F2C811]/40 transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">PILAR 03</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Visual Storytelling & UX</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Gráficos de Cascata, Linhas comparativas com orçado, matrizes com barras de dados e dicas de
              ferramenta (tooltips) que respondem o "porquê" do desvio de meta em 3 segundos.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-neutral-400 border-t border-slate-100 dark:border-[#242731]">
              <strong className="text-slate-900 dark:text-white block">Benefício de Negócio:</strong>
              Reuniões de diretoria focadas em planos de ação em vez de disputas de números.
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 space-y-3 relative group hover:border-[#F2C811]/40 transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Lock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">PILAR 04</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Governança & Segurança (RLS)</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Distribuição segura via nuvem (Power BI Serviço), criptografia, políticas de conformidade
              LGPD e Segurança por Nível de Linha que restringe o acesso de cada gerente à sua filial.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 dark:text-neutral-400 border-t border-slate-100 dark:border-[#242731]">
              <strong className="text-slate-900 dark:text-white block">Benefício de Negócio:</strong>
              Risco zero de vazamento de dados confidenciais de clientes e salários.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Maturity Assessment for Leaders */}
      <div className="bg-white dark:bg-[#15171D] border border-slate-200 dark:border-[#2B2E36] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B8860B] dark:text-[#F2C811] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Autoavaliação Rápida</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Em qual estágio de maturidade analítica sua equipe está hoje?
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Clique nos níveis abaixo para ver o diagnóstico típico e a melhor recomendação para sua liderança.
            </p>
          </div>

          {/* Level Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#0F1014] border border-slate-200 dark:border-[#2B2E36] rounded-lg shrink-0">
            {[1, 2, 3, 4].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setMaturityLevel(lvl)}
                className={`w-9 h-9 rounded-md text-xs font-bold font-mono transition-all ${
                  maturityLevel === lvl
                    ? 'bg-[#F2C811] text-neutral-950 shadow-sm'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800'
                }`}
              >
                N{lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Level Card Details */}
        {(() => {
          const current = maturityLevels[maturityLevel - 1];
          return (
            <div className="bg-slate-50 dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{current.title}</h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-[#F2C811] border border-amber-500/30">
                  {current.badge}
                </span>
              </div>

              <p className="text-sm text-slate-700 dark:text-neutral-200 leading-relaxed">
                {current.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-rose-50 dark:bg-[#121318] p-3 rounded-lg border border-rose-200 dark:border-rose-900/30 text-rose-800 dark:text-rose-300">
                  <strong>O Alerta:</strong> {current.symptom}
                </div>
                <div className="bg-emerald-50 dark:bg-[#121318] p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                  <strong>O Próximo Passo:</strong> {current.recommendation}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
