import React, { useState } from 'react';
import {
  TrendingUp,
  Layout,
  Database,
  Lock,
  ClipboardCheck,
  Check
} from 'lucide-react';

export const ManagerTrackSection: React.FC = () => {
  // Interactive audit checklist for managers to validate dashboards before approval
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'c1': true,
    'c2': true,
    'c3': false,
    'c4': true,
    'c5': false,
    'c6': true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = Object.keys(checkedItems).length;
  const readinessPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 transition-colors">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-[#242731] pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-neutral-400 mb-1">
          <span className="text-[#B8860B] dark:text-[#F2C811] font-semibold">Framework de Gestão</span>
          <span aria-hidden="true">·</span>
          <span>Do Planejamento à Governança</span>
          <span aria-hidden="true">·</span>
          <span>Cultura Data-Driven</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Trilha do Gestor: Como Liderar Projetos de Power BI com Sucesso
        </h2>
        <p className="text-slate-600 dark:text-neutral-400 text-sm mt-1 max-w-3xl">
          90% dos projetos de BI que falham não têm problemas de software, e sim de comunicação entre
          o negócio e a TI. Veja o roteiro estruturado para garantir adoção e decisões rápidas.
        </p>
      </div>

      {/* 4 Steps Journey */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Step 1 */}
        <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 relative flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#F2C811]">ETAPA 01</span>
              <Database className="w-4 h-4 text-amber-600 dark:text-[#F2C811]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Planejamento das Perguntas de Negócio</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Nunca comece abrindo o Power BI. Comece no bloco de notas listando as 3 a 5 perguntas
              que a liderança precisa responder toda segunda-feira.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#242731] text-[11px] text-slate-500 dark:text-neutral-400">
            <strong className="text-slate-900 dark:text-white block mb-0.5">Entregável do Gestor:</strong>
            Dicionário de KPIs com fórmulas aprovadas pelas áreas.
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 relative flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#F2C811]">ETAPA 02</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Modelagem Star Schema & Fonte Única</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Garanta que o time crie um modelo relacional (Fato e Dimensões) e uma tabela calendário
              única (dCalendario). Proíba planilhões planos não normalizados.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#242731] text-[11px] text-slate-500 dark:text-neutral-400">
            <strong className="text-slate-900 dark:text-white block mb-0.5">Entregável Técnico:</strong>
            Modelo em estrela rápido e escalável no VertiPaq.
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 relative flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#F2C811]">ETAPA 03</span>
              <Layout className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Design Cognitivo & UX Executiva</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Menos é mais. Um relatório executivo deve ter fundo sóbrio, cores reservadas para alertas,
              e permitir a visualização de anomalias sem esforço cognitivo.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#242731] text-[11px] text-slate-500 dark:text-neutral-400">
            <strong className="text-slate-900 dark:text-white block mb-0.5">Regra de Ouro:</strong>
            Máximo de 4 cartões de KPI no topo e 3 visuais de apoio.
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-5 relative flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-[#F2C811]">ETAPA 04</span>
              <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Governança, RLS & Sustentação</h3>
            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              Implemente Segurança por Nível de Linha (RLS), atualizações automáticas via Gateway corporativo
              e separe workspaces em Desenvolvimento, Homologação e Produção.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#242731] text-[11px] text-slate-500 dark:text-neutral-400">
            <strong className="text-slate-900 dark:text-white block mb-0.5">Resultado Final:</strong>
            Auditoria LGPD e confiança cega nos números apresentados.
          </div>
        </div>
      </div>

      {/* Comparison: Armadilhas vs Práticas Recomendadas */}
      <div className="bg-white dark:bg-[#181A22] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-6 space-y-4 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Armadilhas Clássicas no Power BI vs Como Gestores Sêniores Agem
          </h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Compare o padrão amador que sobrecarrega a equipe com o padrão corporativo de alto impacto.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2B2E36] text-slate-500 dark:text-neutral-400 uppercase tracking-wider text-[11px]">
                <th className="pb-3 w-1/4">Aspecto do Projeto</th>
                <th className="pb-3 w-3/8 text-rose-600 dark:text-rose-400">❌ Armadilha Clássica (Evite)</th>
                <th className="pb-3 w-3/8 text-emerald-600 dark:text-emerald-400">✅ Prática Recomendada de Gestão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#242731]">
              {[
                {
                  area: 'Uso das Cores',
                  bad: 'Dashboard "árvore de natal" com 10 cores diferentes em cada gráfico, causando cansaço visual e dispersão.',
                  good: 'Paleta sóbria (cinzas e neutros) onde o Amarelo/Azul guia o olhar e Vermelho/Verde sinaliza metas estritamente.',
                },
                {
                  area: 'Escolha de Gráficos',
                  bad: 'Gráficos de Pizza com 15 fatias ou velocímetros gigantescos que ocupam espaço sem agregar comparativo histórico.',
                  good: 'Gráficos de Linha para tendências mensais, Barras horizontais para rankings e Cascata (Waterfall) para margens.',
                },
                {
                  area: 'Conexão de Dados',
                  bad: 'Analistas baixando planilhas manuais na sua máquina local e alimentando relatórios por arquivos soltos.',
                  good: 'Conexão direta no Banco de Dados/ERP via Gateway corporativo com atualização agendada e zero intervenção humana.',
                },
                {
                  area: 'Regras de Cálculo',
                  bad: 'Criar colunas calculadas no Power Query para tudo, inchando a memória e deixando o arquivo pesado.',
                  good: 'Uso de Medidas DAX dinâmicas calculadas sob demanda, mantendo o arquivo leve e super veloz.',
                },
                {
                  area: 'Segurança e Acesso',
                  bad: 'Salvar arquivos .pbix em pendrives ou enviar por e-mail com dados sigilosos da empresa desprotegidos.',
                  good: 'Publicação no Power BI Serviço com RLS por matrícula e distribuição via Aplicativo (App) com login corporativo.',
                },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#1E212B] transition-colors">
                  <td className="py-3 font-semibold text-slate-900 dark:text-white">{row.area}</td>
                  <td className="py-3 text-slate-700 dark:text-neutral-300 pr-4 leading-relaxed">{row.bad}</td>
                  <td className="py-3 text-slate-800 dark:text-neutral-200 pr-2 leading-relaxed">{row.good}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Audit Checklist for Managers */}
      <div className="bg-slate-50 dark:bg-[#14161C] border border-slate-200 dark:border-[#2B2E36] rounded-xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5 text-amber-700 dark:text-[#F2C811]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Checklist Interativo de Homologação Executiva
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Teste seu relatório antes de liberar para o comitê executivo ou diretoria.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-[#0F1014] px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#2B2E36] text-xs">
            <span className="text-slate-600 dark:text-neutral-400">Prontidão para Produção:</span>
            <span className="font-mono font-bold text-amber-700 dark:text-[#F2C811] tabular-nums text-sm">
              {readinessPercent}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-[#0F1014] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              readinessPercent === 100
                ? 'bg-emerald-500'
                : readinessPercent >= 60
                ? 'bg-[#F2C811]'
                : 'bg-amber-500'
            }`}
            style={{ width: `${readinessPercent}%` }}
          />
        </div>

        {/* Checkable Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {[
            { id: 'c1', title: 'Validação de Números com o ERP', desc: 'Os totais de faturamento e impostos batem com a contabilidade oficial.' },
            { id: 'c2', title: 'Responsividade e Legibilidade', desc: 'Fontes legíveis em notebooks e projetores de sala de reunião sem sobreposição.' },
            { id: 'c3', title: 'Segurança RLS Testada', desc: 'Simulado o acesso como Gerente Regional e confirmado que dados de outras filiais estão ocultos.' },
            { id: 'c4', title: 'Atualização Automática Agendada', desc: 'Gateway configurado para rodar às 06h com alerta caso ocorra falha de carga.' },
            { id: 'c5', title: 'Dica de Ferramenta (Tooltip) Útil', desc: 'Ao passar o mouse nos números principais, abre-se contexto adicional em vez de dados crus.' },
            { id: 'c6', title: 'Sem Gráficos Poluídos ou Redundantes', desc: 'Nenhum gráfico de pizza com mais de 3 fatias ou eixos ilegíveis.' },
          ].map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 rounded-lg border text-left flex items-start gap-3 transition-colors ${
                  isChecked
                    ? 'bg-amber-50/60 dark:bg-[#181D26] border-amber-400 dark:border-[#F2C811]/40 text-slate-900 dark:text-white'
                    : 'bg-white dark:bg-[#101116] border-slate-200 dark:border-[#242731] text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-[#F2C811] text-neutral-950 font-bold' : 'border border-slate-300 dark:border-neutral-600 bg-slate-100 dark:bg-neutral-900'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="space-y-0.5">
                  <div className={`text-xs font-semibold ${isChecked ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-neutral-300'}`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
