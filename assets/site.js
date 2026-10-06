/* ==========================================================
   Trabalho de NFV · menu, mapa da rede e links de anterior/próxima

   PARA ADICIONAR, REMOVER OU REORDENAR PÁGINAS, MEXA SÓ NA LISTA ABAIXO.
   tipo "secao" recebe número automático. tipo "extra" usa o campo sinal.
   "curto" é o nome que aparece no mapa da página inicial.
   ========================================================== */

const PAGINAS = [
  { arquivo: "index.html",                  titulo: "Início",                    tipo: "inicio" },
  { arquivo: "problema.html",               titulo: "Problema",                  curto: "Problema",     tipo: "secao" },
  { arquivo: "historia.html",               titulo: "História",                  curto: "História",     tipo: "secao" },
  { arquivo: "definicao.html",              titulo: "Definição",                 curto: "Definição",    tipo: "secao" },
  { arquivo: "arquitetura.html",            titulo: "Arquitetura",               curto: "Arquitetura",  tipo: "secao" },
  { arquivo: "vantagens-desvantagens.html", titulo: "Vantagens e desvantagens",  curto: "Vantagens",    tipo: "secao" },
  { arquivo: "projetos.html",               titulo: "Projetos atuais",           curto: "Projetos",     tipo: "secao" },
  { arquivo: "sdn.html",                    titulo: "NFV e SDN",                 curto: "NFV e SDN",    tipo: "secao" },
  { arquivo: "questoes.html",               titulo: "Questões",                  curto: "Questões",     tipo: "extra", sinal: "?" },
  { arquivo: "bibliografia.html",           titulo: "Bibliografia",              curto: "Bibliografia", tipo: "extra", sinal: "§" }
];

(function () {
  const atual = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const indiceAtual = Math.max(0, PAGINAS.findIndex(p => p.arquivo === atual));
  const totalSecoes = PAGINAS.filter(p => p.tipo === "secao").length;

  // numera as seções na ordem da lista
  let contador = 0;
  PAGINAS.forEach(p => {
    if (p.tipo === "secao") { contador += 1; p.numero = contador; }
    p.marca = p.tipo === "secao" ? String(p.numero) : (p.tipo === "inicio" ? "⌂" : p.sinal || "•");
  });

  /* ---------- menu lateral ---------- */
  const menu = document.getElementById("menu");
  if (menu) {
    const itens = PAGINAS.map((p, i) => `
      <li>
        <a href="${p.arquivo}"${i === indiceAtual ? ' aria-current="page"' : ""}>
          <span class="no${p.tipo === "secao" ? "" : " no--extra"}" aria-hidden="true">${p.marca}</span>
          <span>${p.titulo}</span>
        </a>
      </li>`).join("");

    menu.className = "menu";
    menu.setAttribute("aria-label", "Páginas do trabalho");
    menu.innerHTML = `
      <div class="menu__topo">
        <a class="menu__marca" href="index.html">
          <span class="menu__sigla">NFV</span>
          <span class="menu__nome">Virtualização de Funções de Rede</span>
        </a>
        <button class="menu__botao" type="button" aria-expanded="false" aria-controls="rota">Páginas</button>
      </div>
      <ol class="menu__rota" id="rota">${itens}</ol>`;

    const botao = menu.querySelector(".menu__botao");
    botao.addEventListener("click", () => {
      const aberto = menu.classList.toggle("menu--aberto");
      botao.setAttribute("aria-expanded", String(aberto));
    });
  }

  /* ---------- "Seção 2 de 7" acima do título ---------- */
  const posicao = document.getElementById("posicao");
  const pagina = PAGINAS[indiceAtual];
  if (posicao && pagina.tipo === "secao") {
    posicao.textContent = `Seção ${pagina.numero} de ${totalSecoes}`;
  }

  /* ---------- anterior e próxima ---------- */
  const passos = document.getElementById("passos");
  if (passos) {
    const anterior = PAGINAS[indiceAtual - 1];
    const proxima = PAGINAS[indiceAtual + 1];
    passos.className = "passos";
    passos.setAttribute("aria-label", "Página anterior e próxima");
    passos.innerHTML =
      (anterior ? `<a href="${anterior.arquivo}"><small>Anterior</small>${anterior.titulo}</a>` : "") +
      (proxima ? `<a class="passos__proxima" href="${proxima.arquivo}"><small>Próxima</small>${proxima.titulo}</a>` : "");
  }

  /* ---------- mapa da rede na página inicial ---------- */
  const mapa = document.getElementById("mapa");
  if (mapa) {
    const nos = PAGINAS.filter(p => p.tipo !== "inicio");
    const L = 780, A = 300, margem = 60;
    const passo = nos.length > 1 ? (L - 2 * margem) / (nos.length - 1) : 0;
    nos.forEach((p, i) => { p.x = margem + i * passo; p.y = i % 2 === 0 ? 100 : 200; });

    const rota = nos.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");

    const malha = nos.slice(0, -2).map((p, i) =>
      `<line class="mapa__malha" x1="${p.x}" y1="${p.y}" x2="${nos[i + 2].x}" y2="${nos[i + 2].y}"/>`).join("");

    const parado = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pacotes = parado ? "" : [0, 4, 8].map(inicio => `
      <circle class="mapa__pacote" r="5">
        <animateMotion dur="12s" begin="-${inicio}s" repeatCount="indefinite" path="${rota}"/>
      </circle>`).join("");

    const desenhoNos = nos.map((p, i) => {
      const acima = i % 2 === 0;
      const forma = p.tipo === "secao"
        ? `<circle class="mapa__forma" cx="${p.x}" cy="${p.y}" r="18"/>`
        : `<rect class="mapa__forma" x="${p.x - 17}" y="${p.y - 17}" width="34" height="34" rx="8"/>`;
      return `
        <a href="${p.arquivo}" aria-label="${p.titulo}">
          ${forma}
          <text class="mapa__numero" x="${p.x}" y="${p.y + 5}" text-anchor="middle">${p.marca}</text>
          <text class="mapa__rotulo" x="${p.x}" y="${acima ? p.y - 32 : p.y + 44}" text-anchor="middle">${p.curto || p.titulo}</text>
        </a>`;
    }).join("");

    mapa.innerHTML = `
      <svg viewBox="0 0 ${L} ${A}" role="group" aria-label="Mapa do trabalho. Cada nó leva a uma página.">
        ${malha}
        <path class="mapa__rota" d="${rota}"/>
        ${pacotes}
        ${desenhoNos}
      </svg>`;
  }
})();
