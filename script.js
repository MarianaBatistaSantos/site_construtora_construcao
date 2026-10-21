/*
  PERSONALIZAÇÃO RÁPIDA:
  1) Edite os projetos no array "projects" abaixo.
  2) Troque os exemplos de imagem pelas fotos reais da obra.
  3) Atualize whatsappNumber, phoneDisplay, emailDisplay e serviceArea.
  As imagens de exemplo são ilustrativas. Não as apresente como obras reais.
*/
const whatsappNumber = "55DDDNUMEROAQUI"; // Ex.: 5541999999999 (somente números, com DDI 55)
const phoneDisplay = "[INSERIR TELEFONE]";
const emailDisplay = "[INSERIR E-MAIL, SE HOUVER]";
const serviceArea = "[CIDADE / REGIÃO]";

const projects = [
  {
    title: "Residência — do alicerce ao acabamento",
    category: "RESIDENCIAL",
    location: "[Cidade / Bairro]",
    year: "[Ano]",
    status: "Obra concluída",
    description: "Conte aqui a história desta obra: o que foi executado, quais etapas ficaram sob responsabilidade da equipe e quais detalhes merecem destaque. Seja específico e use somente informações reais.",
    scope: "Construção / alvenaria",
    photos: [
      { src: "https://images.unsplash.com/photo-1503387762-592dee58c266?auto=format&fit=crop&w=1400&q=80", alt: "Imagem ilustrativa de arquitetura e construção", caption: "01 — Visão geral (trocar pela foto real)" },
      { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80", alt: "Imagem ilustrativa de trabalho em obra", caption: "02 — Etapa de execução (trocar pela foto real)" },
      { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80", alt: "Imagem ilustrativa de ambiente finalizado", caption: "03 — Resultado final (trocar pela foto real)" }
    ]
  },
  {
    title: "Reforma e renovação de ambiente",
    category: "REFORMA",
    location: "[Cidade / Bairro]",
    year: "[Ano]",
    status: "Projeto demonstrativo",
    description: "Substitua por uma descrição real da reforma: condições iniciais, serviços executados, materiais ou soluções importantes e resultado alcançado.",
    scope: "Reforma / acabamento",
    photos: [
      { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80", alt: "Imagem ilustrativa de reforma residencial", caption: "01 — Antes / preparação (trocar pela foto real)" },
      { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80", alt: "Imagem ilustrativa de ambiente interno", caption: "02 — Execução (trocar pela foto real)" },
      { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80", alt: "Imagem ilustrativa de acabamento final", caption: "03 — Finalização (trocar pela foto real)" }
    ]
  }
];

const projectList = document.querySelector("#project-list");

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "project-card";
  const gallery = document.createElement("div");
  gallery.className = "project-gallery";
  gallery.setAttribute("aria-label", `Galeria de fotos: ${project.title}`);
  const stage = document.createElement("div");
  stage.className = "gallery-stage";
  const image = document.createElement("img");
  image.src = project.photos[0].src;
  image.alt = project.photos[0].alt;
  image.loading = "lazy";
  image.decoding = "async";
  stage.appendChild(image);

  const caption = document.createElement("span");
  caption.className = "gallery-caption";
  caption.textContent = project.photos[0].caption;
  stage.appendChild(caption);

  const count = document.createElement("span");
  count.className = "gallery-count";
  count.textContent = `01 / ${String(project.photos.length).padStart(2, "0")}`;
  stage.appendChild(count);

  const prev = document.createElement("button");
  prev.className = "gallery-arrow prev";
  prev.type = "button";
  prev.setAttribute("aria-label", `Foto anterior do projeto ${project.title}`);
  prev.textContent = "←";
  const next = document.createElement("button");
  next.className = "gallery-arrow next";
  next.type = "button";
  next.setAttribute("aria-label", `Próxima foto do projeto ${project.title}`);
  next.textContent = "→";
  stage.append(prev, next);

  const dots = document.createElement("div");
  dots.className = "gallery-dots";
  dots.setAttribute("aria-label", "Escolher foto");
  gallery.append(stage, dots);

  const info = document.createElement("div");
  info.className = "project-info";
  const meta = document.createElement("div");
  meta.className = "project-meta";
  [project.category, project.status].forEach(text => {
    const span = document.createElement("span");
    span.textContent = text;
    meta.appendChild(span);
  });
  const title = document.createElement("h3");
  title.textContent = project.title;
  const location = document.createElement("p");
  location.className = "project-location";
  location.textContent = `⌖  ${project.location}  ·  ${project.year}`;
  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description;
  const facts = document.createElement("div");
  facts.className = "project-facts";
  facts.innerHTML = `<div><small>TIPO DE SERVIÇO</small><strong></strong></div><div><small>REGISTRO FOTOGRÁFICO</small><strong></strong></div>`;
  facts.children[0].querySelector("strong").textContent = project.scope;
  facts.children[1].querySelector("strong").textContent = `${project.photos.length} fotos`;
  const contact = document.createElement("a");
  contact.className = "project-link";
  contact.href = "#contato";
  contact.textContent = "CONVERSAR SOBRE UM PROJETO SEMELHANTE ↗";
  info.append(meta, title, location, description, facts, contact);
  card.append(gallery, info);
  projectList.appendChild(card);

  let current = 0;
  const dotButtons = project.photos.map((photo, photoIndex) => {
    const dot = document.createElement("button");
    dot.className = `gallery-dot${photoIndex === 0 ? " active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver foto ${photoIndex + 1}`);
    dot.addEventListener("click", () => showPhoto(photoIndex));
    dots.appendChild(dot);
    return dot;
  });

  function showPhoto(newIndex) {
    current = (newIndex + project.photos.length) % project.photos.length;
    const photo = project.photos[current];
    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = photo.caption;
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(project.photos.length).padStart(2, "0")}`;
    dotButtons.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }
  prev.addEventListener("click", () => showPhoto(current - 1));
  next.addEventListener("click", () => showPhoto(current + 1));
}

projects.forEach(createProjectCard);

// Menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");
menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = open ? "×" : "☰";
});
navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.textContent = "☰";
}));

// Dados de contato e região
document.querySelector("#phone-display").textContent = phoneDisplay;
document.querySelector("#email-display").textContent = emailDisplay;
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#map-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(serviceArea)}`;
if (/^\d{12,13}$/.test(whatsappNumber)) {
  document.querySelector("#phone-link").href = `https://wa.me/${whatsappNumber}`;
  document.querySelector("#email-link").style.display = emailDisplay.includes("@") ? "flex" : "none";
}

// O formulário abre o WhatsApp com a mensagem preenchida; não envia nada automaticamente.
document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const feedback = document.querySelector("#form-feedback");
  if (!/^\d{12,13}$/.test(whatsappNumber)) {
    feedback.textContent = "Antes de publicar, configure o número de WhatsApp no início do arquivo script.js.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const message = [
    "Olá! Gostaria de conversar sobre uma obra.",
    `Nome: ${data.get("name")}`,
    `Telefone: ${data.get("phone")}`,
    `Serviço: ${data.get("service")}`,
    `Local: ${data.get("location") || "Não informado"}`,
    `Detalhes: ${data.get("message") || "Ainda vou explicar melhor."}`
  ].join("\n");
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
