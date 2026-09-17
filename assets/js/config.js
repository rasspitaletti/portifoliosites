/* =====================================================================
   CONFIGURAÇÃO DO PORTFÓLIO — Raul Spitaletti
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar no dia a dia.
   Regra: só coloque aqui informação real e autorizada pelo cliente.
   ===================================================================== */

const SITE_CONFIG = {
  /* WhatsApp: apenas números, com DDI + DDD. Ex.: "5511912345678" */
  whatsappNumber: "",

  /* Mensagem padrão do WhatsApp. Nas páginas de case, o site
     acrescenta automaticamente: (Vi o case "Nome do projeto") */
  whatsappMessage:
    "Olá, Raul! Vi seu portfólio e gostaria de conversar sobre um site para a minha clínica.",

  email: "ras.andraade@gmail.com",

  /* Google Analytics 4 — ex.: "G-XXXXXXXXXX". Vazio = desativado.
     Eventos enviados: click_whatsapp, click_email, view_live_site, open_case */
  gaMeasurementId: "",

  /* Faixa de investimento exibida no FAQ. Vazio = mostra "orçamento sob medida". */
  priceFrom: "",
};

/* =====================================================================
   DEPOIMENTOS (home)
   ---------------------------------------------------------------------
   A seção fica OCULTA enquanto esta lista estiver vazia.
   Adicione apenas depoimentos reais, com autorização por escrito.
   Exemplo de item (copie, preencha e tire as barras //):
   // {
   //   quote: "Texto do cliente, nas palavras dele.",
   //   name: "Nome Sobrenome",
   //   role: "Proprietária",
   //   clinic: "Nome da Clínica",
   //   city: "Cidade/UF",
   //   photo: "assets/img/depoimentos/nome.webp",
   //   video: "",               // opcional: "assets/video/depoimento.mp4"
   //   caseSlug: "slug-do-case" // opcional: liga o depoimento ao case
   // },
   ===================================================================== */

const TESTIMONIALS = [];

/* =====================================================================
   PROJETOS / CASES
   ---------------------------------------------------------------------
   O PRIMEIRO projeto da lista com featured: true vira o destaque da home.
   Cada projeto pronto (nome preenchido + slug) ganha página própria:
   case.html?slug=SEU-SLUG

   Campos (PROJECT_* = ainda não preenchido → o site mostra espaço reservado):

   slug        identificador da URL, sem espaços. Ex.: "clinica-aurora"
   type        "estetica" | "massoterapia" | "lojas" | "outros"   (usado no filtro)
   isConcept   true se for projeto conceito (marca inventada) → exibe selo
   featured    true para aparecer como destaque na home
   image       screenshot desktop (página inteira fica ótimo)
   imageMobile screenshot mobile (opcional, usado em "Ver no celular")
   video       vídeo/demo vertical .mp4 (opcional)
   name, category, description, url
   location    cidade/UF (opcional)
   tech        ["HTML", "CSS", ...] (opcional)
   duration    prazo real de entrega. Ex.: "3 semanas" (opcional)
   pages       páginas entregues. Ex.: ["Home", "Procedimentos", "Contato"]

   context     2–3 frases: como a clínica atendia antes
   problems    ["Perdia pacientes que mandavam mensagem fora do horário", ...]
   solutions   [{ title, text, image }]   image opcional
   beforeAfter { before: "img do site antigo", after: "img do site novo" } (opcional)
   results     [{ value: "1,8 s", label: "Carregamento (LCP)", source: "PageSpeed Insights", period: "mar/2027" }]
               → só números medidos, sempre com fonte e período
   lighthouse  { performance: 98, accessibility: 100, bestPractices: 100, seo: 100, date: "2027-03-10" }
   testimonial { quote, name, role, photo, video }  (opcional, autorizado)
   gallery     [{ src, caption }] — galeria de telas na página do case
   ===================================================================== */

const PROJECT_TEMPLATE = {
  slug: "",
  type: "estetica",
  isConcept: false,
  featured: false,
  image: "PROJECT_IMAGE",
  imageMobile: "",
  video: "",
  name: "PROJECT_NAME",
  category: "PROJECT_CATEGORY",
  description: "PROJECT_DESCRIPTION",
  url: "PROJECT_URL",
  location: "",
  tech: [],
  duration: "",
  pages: [],
  context: "",
  problems: [],
  solutions: [],
  beforeAfter: null,
  results: [],
  lighthouse: null,
  testimonial: null,
  gallery: [],        // [{ src, caption }] — telas extras mostradas na página do case
  displayUrl: "",     // texto da barra do navegador quando ainda não há URL
};

const AURORA = "assets/img/projetos/aurora/";
const NEIDE = "assets/img/projetos/neide/";
const MARY = "assets/img/projetos/loja-da-mary/";
const JOANA = "assets/img/projetos/joana-darc/";

const PROJECTS = [
  /* ---------- 1. Aurora Prime Integrativa (projeto real) ---------- */
  {
    ...PROJECT_TEMPLATE,
    slug: "aurora-prime-integrativa",
    type: "estetica",
    featured: true,
    image: AURORA + "01-inicio.webp",
    name: "Aurora Prime Integrativa",
    category: "Clínica de estética, harmonização e bem-estar",
    description:
      "Site institucional com apresentação da clínica, tratamentos, Instagram, localização e uma página própria de agendamento.",
    url: "PROJECT_URL",          // ← coloque aqui o link do site publicado
    displayUrl: "Aurora Prime Integrativa",
    location: "Centro, Itapevi/SP",
    pages: ["Início", "Agendamento"],
    context:
      "Site para uma clínica de estética, harmonização e terapias integrativas no Centro de Itapevi/SP, pensado para apresentar os tratamentos com calma e levar a visitante até o agendamento.",
    solutions: [
      { title: "Primeira dobra com posicionamento claro", text: "Título forte, localização visível e dois caminhos imediatos: agendar atendimento ou conhecer os tratamentos.", image: AURORA + "01-inicio.webp" },
      { title: "A clínica apresentada pelo ambiente", text: "Foto real da sala e texto sobre a visão integrativa, para gerar confiança antes do primeiro contato.", image: AURORA + "02-a-clinica.webp" },
      { title: "Tratamentos em cards com imagem", text: "Cada tratamento tem foto, descrição curta e um link para conhecer mais.", image: AURORA + "05-tratamentos-cards.webp" },
      { title: "Dois caminhos para agendar", text: "Agenda online para quem já sabe o que quer e WhatsApp para quem prefere tirar dúvidas antes.", image: AURORA + "07-agendamento.webp" },
      { title: "Página de agendamento com consentimento", text: "Formulário por etapas (dados, atendimento, data e observações) com autorização para contato e aviso de que a data é uma preferência.", image: AURORA + "11-pagina-agendar-form.webp" },
    ],
    gallery: [
      { src: AURORA + "01-inicio.webp", caption: "Início" },
      { src: AURORA + "02-a-clinica.webp", caption: "A clínica" },
      { src: AURORA + "03-diferenciais.webp", caption: "Diferenciais" },
      { src: AURORA + "04-tratamentos.webp", caption: "Tratamentos" },
      { src: AURORA + "05-tratamentos-cards.webp", caption: "Cards de tratamentos" },
      { src: AURORA + "06-instagram.webp", caption: "Instagram" },
      { src: AURORA + "07-agendamento.webp", caption: "Agendamento" },
      { src: AURORA + "08-localizacao.webp", caption: "Localização" },
      { src: AURORA + "09-chamada-final.webp", caption: "Chamada final" },
      { src: AURORA + "10-pagina-agendar.webp", caption: "Página de agendamento" },
      { src: AURORA + "11-pagina-agendar-form.webp", caption: "Formulário de agendamento" },
    ],
  },

  /* ---------- 2. Neide Estética (projeto real) ---------- */
  {
    ...PROJECT_TEMPLATE,
    slug: "neide-estetica",
    type: "estetica",
    image: NEIDE + "01-inicio.webp",
    name: "Neide Estética",
    category: "Estética facial e corporal · duas unidades",
    description:
      "Site escuro e sofisticado para harmonização facial e corporal, com tratamentos, apresentação da responsável e duas unidades em Osasco.",
    url: "PROJECT_URL",          // ← coloque aqui o link do site publicado
    displayUrl: "Neide Estética",
    location: "Osasco/SP",
    pages: ["Início"],
    context:
      "Site para uma clínica de estética facial e corporal com duas unidades em Osasco/SP, focado em transmitir cuidado individualizado e levar a visitante a agendar a avaliação pelo WhatsApp.",
    solutions: [
      { title: "Primeira dobra com identidade forte", text: "Visual escuro com tipografia serifada, destaque para as duas unidades, botão de agendar pelo WhatsApp e a responsável, avaliação e horário logo no topo.", image: NEIDE + "01-inicio.webp" },
      { title: "Diferenciais em cards com imagem", text: "Planejamento personalizado e harmonização corporal apresentados em blocos visuais.", image: NEIDE + "02-diferenciais.webp" },
      { title: "A responsável em primeiro plano", text: "Seção sobre a clínica com foto do ambiente, cartão da Neide e o Instagram, para gerar confiança.", image: NEIDE + "03-sobre.webp" },
      { title: "Tratamentos com fotos", text: "Cards com imagem e descrição curta de cada tratamento, sempre indicando que o protocolo é definido na avaliação.", image: NEIDE + "04-tratamentos.webp" },
      { title: "Duas unidades e contato", text: "Cada unidade com endereço e botão para agendar nela, telefone único, horário, redes sociais e mapa.", image: NEIDE + "05-unidades.webp" },
    ],
    gallery: [
      { src: NEIDE + "01-inicio.webp", caption: "Início" },
      { src: NEIDE + "02-diferenciais.webp", caption: "Diferenciais" },
      { src: NEIDE + "03-sobre.webp", caption: "Sobre" },
      { src: NEIDE + "04-tratamentos.webp", caption: "Tratamentos" },
      { src: NEIDE + "05-unidades.webp", caption: "Unidades e contato" },
      { src: NEIDE + "06-chamada-final.webp", caption: "Chamada final" },
    ],
  },

  /* ---------- 3. Loja da Mary (projeto real, publicado) ---------- */
  {
    ...PROJECT_TEMPLATE,
    slug: "loja-da-mary",
    type: "lojas",
    image: MARY + "01-inicio.webp",
    name: "Loja da Mary",
    category: "Brechó · garimpo de moda",
    description:
      "Site para brechó com categorias, vitrine de achados da semana com preço e tamanho, botão de interesse pelo WhatsApp e localização da loja.",
    url: "https://lojadamary.com.br/",
    location: "Barueri/SP",
    pages: ["Início"],
    context:
      "Site para um brechó em Barueri/SP, pensado para mostrar as peças únicas da semana e levar a cliente direto a uma conversa com a Marlene pelo WhatsApp.",
    solutions: [
      { title: "Topo com contato imediato", text: "Barra com WhatsApp e e-mail, chamada clara e botão \"Chamar a Marlene\" já na primeira tela.", image: MARY + "01-inicio.webp" },
      { title: "Categorias com fotos", text: "Vestidos, jaquetas, camisetas, calças, calçados e acessórios em cards grandes para começar a navegar.", image: MARY + "02-categorias.webp" },
      { title: "Vitrine de achados da semana", text: "Cada peça com selo de peça única, tamanho, estado, preço (com valor anterior quando há desconto) e botão \"Tenho interesse\" pelo WhatsApp.", image: MARY + "04-achados-da-semana.webp" },
      { title: "Confiança no garimpo", text: "História da loja e cards sobre peça única, higienização, medidas reais e moda circular.", image: MARY + "07-cuidado.webp" },
      { title: "Contato e localização", text: "Cards de WhatsApp, e-mail e endereço, mapa incorporado e botões para traçar a rota.", image: MARY + "10-onde-estamos.webp" },
    ],
    gallery: [
      { src: MARY + "01-inicio.webp", caption: "Início" },
      { src: MARY + "02-categorias.webp", caption: "Categorias" },
      { src: MARY + "03-categorias-2.webp", caption: "Categorias (continuação)" },
      { src: MARY + "04-achados-da-semana.webp", caption: "Achados da semana" },
      { src: MARY + "05-achados-2.webp", caption: "Peças com preço e WhatsApp" },
      { src: MARY + "06-historia.webp", caption: "A loja" },
      { src: MARY + "07-cuidado.webp", caption: "Cuidado em cada peça" },
      { src: MARY + "08-dentro-da-loja.webp", caption: "Dentro da loja" },
      { src: MARY + "09-contato.webp", caption: "Fale com a Marlene" },
      { src: MARY + "10-onde-estamos.webp", caption: "Onde estamos" },
      { src: MARY + "11-chamada-rodape.webp", caption: "Chamada final e rodapé" },
    ],
  },

  /* ---------- 4. Joana D'arc Massoterapia (projeto real) ---------- */
  {
    ...PROJECT_TEMPLATE,
    slug: "joana-darc-massoterapia",
    type: "massoterapia",
    image: JOANA + "01-inicio.webp",
    name: "Joana D'arc Massoterapia",
    category: "Massoterapia · bem-estar",
    description:
      "Site escuro e acolhedor para massoterapeuta, com categorias de massagem, 17 modalidades, avaliações do Google, localização e agendamento pelo WhatsApp.",
    url: "PROJECT_URL",          // ← coloque aqui o link quando o site da Joana for publicado
    displayUrl: "Joana D'arc Massoterapia",
    location: "Itapevi/SP",
    pages: ["Início"],
    context:
      "Site para uma massoterapeuta que atua desde 2001 em Itapevi/SP, pensado para transmitir calma, apresentar as técnicas por intenção e levar a visitante a agendar pelo WhatsApp.",
    solutions: [
      { title: "Primeira dobra imersiva", text: "Foto em tela cheia, título com destaque em itálico, nota das avaliações do Google, tempo de experiência, horário e dois botões: agendar e conhecer massagens.", image: JOANA + "01-inicio.webp" },
      { title: "Experiência em destaque", text: "Bloco editorial com o ano de início da profissional em tipografia grande, para gerar confiança.", image: JOANA + "03-experiencia.webp" },
      { title: "Massagens organizadas pela intenção", text: "Relaxamento, terapias corporais, técnicas especiais e atendimento personalizado, cada categoria com as técnicas e o botão \"Tenho interesse\".", image: JOANA + "05-massagens-2.webp" },
      { title: "Lista completa de modalidades", text: "As 17 modalidades numeradas, cada uma com descrição curta e link direto para o WhatsApp.", image: JOANA + "07-modalidades.webp" },
      { title: "Prova social e contato", text: "Avaliações reais do Google, seção sobre a profissional, endereço, telefone, horário, mapa e botões de rota e WhatsApp.", image: JOANA + "09-avaliacoes.webp" },
    ],
    gallery: [
      { src: JOANA + "01-inicio.webp", caption: "Início" },
      { src: JOANA + "02-cuidado.webp", caption: "Cuidado" },
      { src: JOANA + "03-experiencia.webp", caption: "Experiência desde 2001" },
      { src: JOANA + "04-massagens.webp", caption: "Massagens" },
      { src: JOANA + "05-massagens-2.webp", caption: "Categorias de massagem" },
      { src: JOANA + "06-atendimento-personalizado.webp", caption: "Atendimento personalizado" },
      { src: JOANA + "07-modalidades.webp", caption: "Todas as modalidades" },
      { src: JOANA + "08-galeria.webp", caption: "Galeria da experiência" },
      { src: JOANA + "09-avaliacoes.webp", caption: "Avaliações do Google" },
      { src: JOANA + "10-sobre.webp", caption: "Sobre" },
      { src: JOANA + "11-localizacao.webp", caption: "Localização e contato" },
    ],
  },
];

/* Exemplo de projeto preenchido (substitua um dos itens acima):

  {
    ...PROJECT_TEMPLATE,
    slug: "nome-da-clinica",
    type: "estetica",
    featured: true,
    image: "assets/img/projetos/nome-da-clinica.webp",
    imageMobile: "assets/img/projetos/nome-da-clinica-mobile.webp",
    video: "assets/video/nome-da-clinica.mp4",
    name: "Nome da Clínica",
    category: "Clínica de estética facial",
    description: "Site institucional com páginas por procedimento e agendamento pelo WhatsApp.",
    url: "https://www.nomedaclinica.com.br",
    location: "São Paulo/SP",
    tech: ["HTML", "CSS", "JavaScript"],
    duration: "3 semanas",
    pages: ["Home", "Procedimentos", "Equipe", "Contato"],
    context: "A clínica divulgava apenas pelo Instagram e agendava tudo manualmente pelo WhatsApp.",
    problems: ["Pacientes não entendiam a diferença entre os procedimentos"],
    solutions: [{ title: "Página por procedimento", text: "Indicação, duração, cuidados e FAQ.", image: "" }],
    results: [{ value: "1,8 s", label: "Carregamento (LCP)", source: "PageSpeed Insights", period: "mar/2027" }],
    lighthouse: { performance: 98, accessibility: 100, bestPractices: 100, seo: 100, date: "2027-03-10" },
  },
*/
