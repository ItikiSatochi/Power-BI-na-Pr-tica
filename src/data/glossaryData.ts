export interface GlossaryTerm {
  term: string;
  tag: string;
  definition: string;
  businessAnalogy: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'DAX (Data Analysis Expressions)',
    tag: 'Fórmulas',
    definition: 'Linguagem funcional de cálculo do Power BI que calcula métricas sob demanda com base no contexto de filtros ativos.',
    businessAnalogy: 'É como o cérebro matemático de um analista sênior calculando margens e projeções personalizadas instantaneamente a cada clique do mouse.',
  },
  {
    term: 'Power Query & Linguagem M',
    tag: 'ETL / Dados',
    definition: 'Mecanismo de extração, tratamento e transformação de dados antes de serem carregados no modelo relacional.',
    businessAnalogy: 'É a "cozinha" do restaurante: limpa, corta, higieniza e prepara os ingredientes crus (planilhas, SQL, APIs) antes de servir no prato do cliente (relatório).',
  },
  {
    term: 'Tabela Fato vs Tabela Dimensão',
    tag: 'Modelagem',
    definition: 'Tabela Fato registra eventos numéricos quantitativos (vendas, sinistros, ponto); Tabela Dimensão contextualiza os eventos (quem, onde, quando, categoria).',
    businessAnalogy: 'A Fato é o cupom fiscal com os valores das compras; as Dimensões são o cadastro do cliente, o catálogo de produtos e o calendário da empresa.',
  },
  {
    term: 'Motor VertiPaq',
    tag: 'Performance',
    definition: 'Motor colunar em memória do Power BI que compacta gigabytes de dados em frações de megabytes usando algoritmos de codificação de dicionário.',
    businessAnalogy: 'Como um arquivo zip inteligente que permite pesquisar 10 milhões de linhas em milissegundos sem travar o computador do gestor.',
  },
  {
    term: 'RLS (Row-Level Security)',
    tag: 'Segurança',
    definition: 'Filtragem dinâmica no servidor que restringe as linhas de dados conforme o papel ou e-mail do usuário autenticado no Microsoft Entra.',
    businessAnalogy: 'Um crachá de segurança biométrico: todos entram no mesmo prédio, mas cada diretor só tem a chave da sua própria sala.',
  },
  {
    term: 'Drill-Through (Detalhamento)',
    tag: 'UX / Navegação',
    definition: 'Recurso que permite clicar com o botão direito em um dado sintetizado e navegar para uma página exclusiva com o detalhamento daquela entidade.',
    businessAnalogy: 'Em vez de poluir a tela inicial, você clica sobre uma filial com margem baixa e cai direto na lista de faturas e pedidos problemáticos daquela filial.',
  },
  {
    term: 'Página de Dica de Ferramenta (Tooltip Page)',
    tag: 'UX / Visuais',
    definition: 'Um mini-relatório dinâmico que se abre ao passar o mouse sobre uma barra ou ponto de dados de um gráfico.',
    businessAnalogy: 'Uma lupa contextual: você repousa o cursor sobre o faturamento de um vendedor e vê instantaneamente o Top 3 produtos vendidos por ele.',
  },
  {
    term: 'Workspace (Espaço de Trabalho) & Apps',
    tag: 'Distribuição',
    definition: 'Workspace é o ambiente de desenvolvimento e governança para a equipe de BI; o App é a experiência empacotada e limpa entregue aos tomadores de decisão.',
    businessAnalogy: 'Workspace é os bastidores do teatro com cabos e refletores; o App é a cortina aberta e o palco perfeito para o público espectador.',
  },
];
