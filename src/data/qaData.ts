import { QAItem } from '../types/pbi';

export const QA_ITEMS: QAItem[] = [
  {
    id: 'dax-fundamentals',
    category: 'dax',
    categoryLabel: 'Lógica DAX & Métricas',
    question: 'O que é DAX (Data Analysis Expressions) e por que ele é indispensável para gestores?',
    simpleConcept:
      'DAX é a linguagem de fórmulas analíticas do Power BI. Ao contrário do Excel onde calculamos célula a célula, o DAX calcula métricas dinâmicas respeitando o contexto de filtros (ex: ano, filial, vendedor ou produto selecionado no momento).',
    businessExample: {
      title: 'Análise de Crescimento Homólogo (SPLY) em Vendas Corporativas',
      scenario:
        'A Diretoria Comercial faturou R$ 1,4 milhão em Outubro e precisa saber se o resultado representa ganho real de mercado ou apenas sazonalidade histórica do setor.',
      practicalSolution:
        'Criamos uma Medida DAX usando CALCULATE e SAMEPERIODLASTYEAR. O visual compara automaticamente as vendas deste mês com o mesmo mês do ano anterior.',
      impact:
        'O gestor descobre em 1 segundo se a meta anual está no ritmo certo sem precisar cruzar manualmente dezenas de planilhas de 2024 e 2025.',
      daxFormula:
        'Vendas SPLY = CALCULATE([Total Vendas], SAMEPERIODLASTYEAR(dCalendario[Data]))\nVar % YoY = DIVIDE([Total Vendas] - [Vendas SPLY], [Vendas SPLY], 0)',
    },
    tags: ['DAX', 'Cálculo Dinâmico', 'Vendas', 'SAMEPERIODLASTYEAR'],
  },
  {
    id: 'desktop-vs-service',
    category: 'fundamentos',
    categoryLabel: 'Fundamentos da Plataforma',
    question: 'Qual a diferença entre Power BI Desktop, Power BI Serviço (Web/Nuvem) e Mobile?',
    simpleConcept:
      'O Desktop é a oficina de desenvolvimento (gratuita, instalada no computador do analista para modelar e criar visuais). O Serviço é a nuvem colaborativa da Microsoft (onde relatórios são publicados, agendados e compartilhados com segurança). O Mobile é o app para consumo na ponta em smartphones e tablets.',
    businessExample: {
      title: 'Rotina de Decisão Operacional em Logística e Supply Chain',
      scenario:
        'Um Diretor de Operações visita um centro de distribuição e precisa aprovar liberações ou auditar o nível de atrasos de entregas sem abrir um computador.',
      practicalSolution:
        'O analista desenvolve o dashboard no Desktop e publica na nuvem (Serviço). O Diretor abre o aplicativo do celular (Power BI Mobile), visualiza os KPIs de SLA em tempo real e recebe um alerta push se o percentual de atraso ultrapassar 5%.',
      impact:
        'Elimina a dependência de e-mails diários de status em PDF e acelera o tempo de resposta a gargalos logísticos em mais de 70%.',
    },
    tags: ['Arquitetura', 'Mobile', 'Nuvem', 'Colaboração'],
  },
  {
    id: 'connect-modes',
    category: 'infra',
    categoryLabel: 'Conexão & Performance',
    question: 'Como conectar dados e qual a diferença prática entre Import, DirectQuery e Live Connection?',
    simpleConcept:
      'Import traz os dados para a memória RAM ultra-rápida do Power BI (máxima velocidade de cálculo). DirectQuery deixa os dados no banco de origem e faz consultas SQL sob demanda (ideal para volumes gigantescos ou auditoria instantânea). Live Connection conecta a modelos corporativos já unificados (SSAS ou Datamarts Fabric).',
    businessExample: {
      title: 'Fechamento Contábil vs Monitoramento de Linha de Produção',
      scenario:
        'A Controladoria precisa fechar DRE mensal com 120.000 lançamentos com agilidade, enquanto a Engenharia da Fábrica monitora paradas de máquinas a cada 30 segundos.',
      practicalSolution:
        'Para a Controladoria, adota-se o modo Import (o relatório abre em menos de 1 segundo e permite DAX complexo). Para a Fábrica, utiliza-se DirectQuery no banco do IoT industrial para refletir paradas de esteira imediatamente na tela da supervisão.',
      impact:
        'Reduz custos de infraestrutura de servidores em até 40% ao escolher a estratégia certa para cada necessidade de negócio.',
    },
    tags: ['Import', 'DirectQuery', 'Conexão', 'Performance'],
  },
  {
    id: 'star-schema-vs-excel',
    category: 'fundamentos',
    categoryLabel: 'Modelagem de Dados',
    question: 'O que é Esquema Estrela (Star Schema) e por que transformar o "Planilhão do Excel" é vital?',
    simpleConcept:
      'No Excel, costuma-se colocar tudo numa tabela única com 80 colunas (onde o nome do cliente e a filial se repetem 50.000 vezes). No Power BI, o padrão ouro é o Esquema Estrela: uma tabela Fato central (onde ficam os números e eventos: vendas, horas trabalhadas) cercada por tabelas Dimensão (quem, quando, onde, qual produto).',
    businessExample: {
      title: 'Dashboard de People Analytics / RH Corporativo',
      scenario:
        'Uma empresa de 4.000 funcionários tentava cruzar folha de pagamento, ponto eletrônico e avaliações de desempenho numa planilha única que travava e continha dados divergentes.',
      practicalSolution:
        'Modelou-se a tabela Fato de Transações (fAdmissoes, fDesligamentos) conectada às dimensões dColaborador, dCargo, dCentroCusto e dCalendario.',
      impact:
        'O arquivo reduziu de 280 MB para 14 MB (graças ao motor colunar VertiPaq do Power BI) e a análise de turnover por senioridade passou a carregar instantaneamente.',
    },
    tags: ['Star Schema', 'Modelagem', 'Boas Práticas', 'VertiPaq'],
  },
  {
    id: 'rls-security',
    category: 'governanca',
    categoryLabel: 'Segurança & Governança',
    question: 'O que é RLS (Row-Level Security / Segurança por Nível de Linha) e como protege dados confidenciais?',
    simpleConcept:
      'RLS é uma política de segurança que restringe as linhas de dados que cada usuário pode visualizar no mesmo relatório, com base no login corporativo do Microsoft Entra ID (antigo Azure AD). Um único dashboard atende do estagiário ao CEO com total confidencialidade.',
    businessExample: {
      title: 'Remuneração Variável e Metas da Força de Vendas Nacional',
      scenario:
        'A empresa tem 35 gerentes regionais. Antes, o time de BI gastava 2 dias por mês gerando 35 relatórios em PDF separados para garantir que o gerente de São Paulo não visse o salário e comissões do gerente de Curitiba.',
      practicalSolution:
        'Foi configurado 1 único relatório central com RLS configurado via USERPRINCIPALNAME(). Quando o gerente de São Paulo faz login, o Power BI filtra automaticamente apenas os dados autorizados para a sua matrícula.',
      impact:
        'Economia de mais de 30 horas mensais de trabalho manual do time de BI e risco zero de vazamento de dados sensíveis da folha.',
      daxFormula:
        'dFilial[GerenteEmail] = USERPRINCIPALNAME()\n-- Ou via tabela de permissões: dAcesso[UsuarioEmail] = USERPRINCIPALNAME()',
    },
    tags: ['RLS', 'Segurança', 'Governança', 'LGPD'],
  },
  {
    id: 'data-gateway',
    category: 'infra',
    categoryLabel: 'Infraestrutura & Nuvem',
    question: 'Para que serve o On-Premises Data Gateway e como ele viabiliza relatórios 100% atualizados?',
    simpleConcept:
      'O Gateway é um túnel seguro de comunicação criptografada instalado nos servidores internos da empresa. Ele permite que o Power BI na nuvem acesse bancos de dados locais (SQL Server, Oracle, SAP, pastas de rede) para atualizar os painéis de madrugada sem abrir portas vulneráveis na internet.',
    businessExample: {
      title: 'Atualização Automática do ERP SAP para a Reunião Diária das 8h',
      scenario:
        'O Diretor Financeiro exige que o fluxo de caixa esteja consolidado na tela às 8h da manhã com as baixas bancárias do dia anterior gravadas no servidor físico interno.',
      practicalSolution:
        'Configura-se o Gateway Corporativo em um servidor dedicado. No Power BI Serviço, agenda-se a atualização diária para as 06h30 da manhã.',
      impact:
        'A liderança toma decisões baseada em dados frescos sem necessidade de nenhum operador humano enviar arquivos ou rodar extrações manuais de manhã cedo.',
    },
    tags: ['Gateway', 'Automação', 'ERP', 'Segurança de Rede'],
  },
  {
    id: 'anti-excel-generator',
    category: 'governanca',
    categoryLabel: 'Cultura Data-Driven',
    question: 'Como evitar o erro comum de transformar o Power BI em um mero "extrator de tabelas para o Excel"?',
    simpleConcept:
      'Se o usuário final usa o Power BI apenas para clicar em "Exportar dados para Excel", o projeto falhou em UX e resposta de negócio. O Power BI deve responder diretamente "o que aconteceu", "por que aconteceu" e "o que fazer a seguir" através de hierarquias visuais e drill-through.',
    businessExample: {
      title: 'Painel de Identificação de Inadimplência e Risco de Crédito',
      scenario:
        'A equipe de Cobrança gastava horas exportando uma tabela de 40.000 faturas em aberto para criar filtros manuais no Excel e descobrir clientes críticos.',
      practicalSolution:
        'Criou-se um gráfico de dispersão (Valor em Atraso vs Dias de Atraso) com um visual de Cartões de Exceção destacando os 5 clientes de maior risco no topo, acompanhado de página de Detalhamento (Drill-Through) com plano de ação sugerido.',
      impact:
        'O tempo de triagem de cobrança caiu de 3 horas diárias para 5 minutos, e a taxa de recuperação de dívidas cresceu 18% no primeiro trimestre.',
    },
    tags: ['Adoção', 'UX/UI', 'Cultura Analítica', 'Drill-through'],
  },
];
