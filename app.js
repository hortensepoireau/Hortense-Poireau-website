function safeSrc(p){ return encodeURI(p); }

/* fallback extension (utile si .JPG/.jpg/.png mélangés) */
function attachImgFallback(img, originalSrc){
  const tries = [
    originalSrc,
    originalSrc.replace(/\.png$/i, ".jpg"),
    originalSrc.replace(/\.png$/i, ".JPG"),
    originalSrc.replace(/\.png$/i, ".jpeg"),
    originalSrc.replace(/\.jpg$/i, ".png"),
    originalSrc.replace(/\.JPG$/i, ".png"),
    originalSrc.replace(/\.jpeg$/i, ".png"),
  ];
  let n = 0;
  img.onerror = () => {
    n++;
    if(n < tries.length) img.src = tries[n];
  };
}

/* ---------------- HOMEPAGE TEXT ---------------- */
const HOMEPAGE_INFO = {
  leftHtml: `
<a href="mailto:poireau.hortense@gmail.com?subject=Collaboration">CONTACT</a>
Hortense Poireau
<a href="mailto:poireau.hortense@gmail.com?subject=Collaboration">poireau.hortense@gmail.com</a>
<a href="https://www.instagram.com/hrtnspr/" target="_blank" rel="noreferrer">@hrtnspr</a>
`.trim(),

  mid: `Graphiste et Directrice Artistique, je développe des identités
visuelles, des projets éditoriaux et des systèmes graphiques
où la typographie joue un rôle central. Mon travail s’étend
du print au digital, de la conception à la production,
avec une attention particulière portée aux détails, aux usages
et à la cohérence des formes.`,

  right: `L’humour et la fantaisie nourrissent ma manière de concevoir :
Ils m’aident à aborder les projets avec légèreté, à trouver des
angles inattendus et à rendre les idées plus directes. J’aime
travailler la matière, expérimenter le fait-main et explorer les
techniques d’impression, de reliure et de façonnage, que
j’intègre ensuite dans mes projets.`
};

/* ---------------- Bandeau noir ---------------- */
const BAND = {
  exp: `2025 — YOYAKU — label de musique / Disquaire, CDD
2024–2025 — MELCHIOR — agence de presse, CDI
2023 — ARNO DESIGN — studio créatif, CDD
2021 — Atelier MAREL — studio créatif, stage
2020 — Bubble T Cosmetics, stage
2019 — N3D — entreprise financière, stage`,
  free: `2022 — AUJOURD’HUI`,
  edu: `2023–2024 — MASTER Typographie & Design — ECV Paris
2022 — ERASMUS — Iceland University of the Arts — Reykjavik, Islande
2020–2022 — Bachelor en Design Graphique — ECV Paris
2018–2020 — International Global Communication — ISCOM Paris`
};

/* ---------------- liens fournis ---------------- */
const LINKS = {
  interwave: "https://www.interwave.live/",
  lbitf_listen: "https://tr.ee/qlvSwKhTgq",
  lbitf_buy: "https://tr.ee/krT6nTET3r",
  yiyi_ig: "https://www.instagram.com/yiyi.collectif/",
  paperboy_app: "https://apps.apple.com/us/app/paperboy-news-podcast/id6751813731",
  filmkid_scribble: "https://filmkid.com/pages/scribble",
  o2zone_post: "https://www.instagram.com/p/DLF1BOXocUo/"
};

function escapeHtml(s){
  return s
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function linkifyDesc(raw){
  const lines = raw.split("\n").map(l => l.trimEnd());
  const out = [];

  for(const line of lines){
    const clean = escapeHtml(line);

    // Interwave site
    if(clean.includes("www.interwave.live")){
      out.push(
        clean.replace(
          "www.interwave.live",
          `<a href="${LINKS.interwave}" target="_blank" rel="noreferrer">www.interwave.live</a>`
        )
      );
      continue;
    }

    // Instagram YIYI
    if(clean.includes("@yiyi.collectif")){
      out.push(
        clean.replace(
          "@yiyi.collectif",
          `<a href="${LINKS.yiyi_ig}" target="_blank" rel="noreferrer">@yiyi.collectif</a>`
        )
      );
      continue;
    }

// Instagram Atelier Fulgurance
if(clean.includes("@atelierfulgurance")){
  out.push(
    clean.replace(
      "@atelierfulgurance",
      `<a href="https://www.instagram.com/atelierfulgurance/" target="_blank" rel="noreferrer">@atelierfulgurance</a>`
    )
  );
  continue;
}

    // MDF / o2zone (lien vers ton post)
    if(clean.toLowerCase().includes("instagram : o2zone")){
      out.push(
        clean.replace(
          "o2zone",
          `<a href="${LINKS.o2zone_post}" target="_blank" rel="noreferrer">o2zone</a>`
        )
      );
      continue;
    }

    // LBITF listen / buy
    if(clean.startsWith("Pour écouter Lost Berries in the fields")){
      out.push(`<a href="${LINKS.lbitf_listen}" target="_blank" rel="noreferrer">${clean}</a>`);
      continue;
    }
    if(clean.startsWith("Pour acheter le vinyle Lost berries in the fields")){
      out.push(`<a href="${LINKS.lbitf_buy}" target="_blank" rel="noreferrer">${clean}</a>`);
      continue;
    }

    // Paperboy app store
    if(clean.startsWith("Télécharger l’application")){
      out.push(`<a href="${LINKS.paperboy_app}" target="_blank" rel="noreferrer">${clean}</a>`);
      continue;
    }

    // Filmkid
    if(clean.startsWith("Acheter le pack")){
      out.push(`<a href="${LINKS.filmkid_scribble}" target="_blank" rel="noreferrer">${clean}</a>`);
      continue;
    }

    out.push(clean);
  }

  return out.join("<br>");
}

/* ---------------- PROJECT TEXT (verbatim) ---------------- */
const PROJECT_TEXT = {
  "INTERWAVE": {
    title: "INTERWAVES",
    meta: "IDENTITÉ VISUELLE, 2025",
    desc: `Création de dessins de caractères, développement d’un système 
de glyphes modulaires, ainsi que refonte complète du site internet 
de l’agence de booking INTERWAVE.
Site internet : www.interwave.live`
  },
  "LBITF": {
    title: "LOST BERRIES IN THE FIELDS\nMMMH AKA CHEVAL DETROIT",
    meta: "GRAPHISME, 2025",
    desc: `Graphisme et composition typographique pour la sortie de MMMH AKA Cheval Detroit. CHXIV021 sur CHAPELLE XIV, distribué par YOYAKU.  Photographie réalisée par l’artiste.
Pour écouter Lost Berries in the fields
Pour acheter le vinyle Lost berries in the fields`
  },
  "YIYI": {
    title: "YIYI",
    meta: "IDENTITÉ VISUELLE, 2026",
    desc: `Le collectif YIYI est un projet événementiel et artistique pour lequel j’ai conçu la direction artistique globale. Du logo à ses déclinaisons, l’identité visuelle a été pensée pour accompagner leur premier événement 
et traduire l’énergie collective, festive et plurielle du projet.
Instragram : @yiyi.collectif`
  },
  "PAPERBOY": {
    title: "PAPERBOY",
    meta: "LOGOTYPE, 2025",
    desc: `Conception du logo Paperboy, une application de podcast d’actualité qui propose une synthèse quotidienne de l’information, pensée pour une écoute rapide et personnalisée.
Télécharger l’application`
  },
  "FAKEBOOK": {
    title: "FAKEBOOK",
    meta: "CRÉATION DIGITALE, 2023",
    desc: `Conception et développement d’un nouveau média numérique consacré au jazz. Création de l’identité visuelle et déclinaison sur l’ensemble des supports digitaux.`
  },
  "FILMKID": {
    title: "SCRIBBLE, FILMKID",
    meta: "POLICES DE CARACTÈRE, 2025",
    desc: `Conception des trois polices Scribble et de leurs neuf variations.
Scribble est une collection typographique proposée par Filmkid, pensée pour enrichir montages, titres et éléments graphiques à travers 
une esthétique manuscrite et expressive.
Acheter le pack`
  },
  "MDF": {
    title: "MARCHE DES FIERTÉS,\nLESS DRAMA MORE TECHNO\nTECHNORIDE\nO2ZONE",
    meta: "IDENTITIÉ VISUELLE, 2025",
    desc: `Direction artistique de la collaboration entre Technoride, Less Drama More Techno et o2zone à l’occasion de la Marche des Fiertés. 
Le projet comprend la conception de l’identité visuelle de l’événement, pensée pour assurer cohérence graphique, lisibilité des messages et valorisation des engagements des partenaires.
Instagram : o2zone`
  },
  "PARISBRULE": {
    title: "PARIS BRÛLÉ",
    meta: "CONCEPTUALISATION // ÉDITION, 2024",
    desc: `Où s’asseoir pour capter le plus de soleil à Paris ?
Ce livre propose un itinéraire à travers les terrasses parisiennes les plus ensoleillées. Pensé comme un guide sensible, il recense des adresses en fonction de l’orientation, des horaires et de l’intensité du soleil, arrondissement par arrondissement.`
  },
  "TDC": {
    title: "TYPE DIRECTORS CLUB 69",
    meta: "POLICE DE CARACTÈRE, 2024",
    desc: `Dessin de caractères crée pour l’évènement typographique Type Directors Club qui s’est déroulé à l’ECV Paris en mai 2024.
Le projet d’exposition a été pensé et réalisé avec l’ensemble des étudiants du Mastère Typographie. Projet supervisé par Benoît Canaud, Morgane Vantorre et Olivier Nineuil.`
  },
  "FULGU PHOTOS": {
    title: "FULGURANCE",
    meta: "PHOTOGRAPHIE / ÉDITION, 2024",
    desc: `Fulgurance est une série photographique dédiée à la nuit. Réalisés au flash avec des plexiglas colorés, les clichés sont présentés sans retouche, laissant émerger une esthétique brute et mystérieuse.`
  },
  "STITCH TYPEFACE": {
    title: "STITCH TYPEFACE",
    meta: "POLICE DE CARACTÈRE, 2024",
    desc: `Influencée par les typographies présentes sur les étiquettes de vêtements anciens brodés, cette police s’ancre dans un héritage artisanal pour dialoguer avec le présent. Le projet donne naissance à une typographie pensée à la fois comme objet matériel et outil numérique. Sous la direction de Benoît Canaud, Stitch Typeface explore la mémoire de la broderie entre tradition et renouveau, en capturant l’essence d’un geste artisanal transposé dans le champ typographique.`
  },
  "tchernobyl": {
    title: "SOS À TCHERNOBYL",
    meta: "CONCEPTUALISATION // ÉDITION, 2024",
    desc: `Création d’un livre escape game sur la catastrophe nucléaire de Tchernobyl. Destiné aux adolescents et aux jeunes adultes, ce fanzine est composé de plusieurs tests et énigmes à résoudre pour atteindre la fin. 
Il fait partie d’une collection de livres escape game intitulée “SOS”.`
  },
  "MARIAGE": {
    title: "MANUEL ORGANISATION DU MARIAGE",
    meta: "EDITION, 2024",
    desc: `Conceptualisation et création d'un manuel dédié à l’organisation d’un mariage en deux semaines, avec un budget de 1 000 euros. Il propose une feuille de route structurée, étape par étape, mobilisant l’ensemble des codes traditionnels du mariage, jusqu’au kitsch, des thèmes convenus aux gâteaux emblématiques, en passant par la décoration des salles de fête. Une approche volontairement frontale mais avec humour des clichés, utilisée comme matière pour interroger et détourner les rituels établis.`
  },
  "baguetterie": {
    title: "LA BAGUETTERIE",
    meta: "IDENTITÉ VISUELLE, 2022",
    desc: `Conception d’une nouvelle identité visuelle pour La Baguetterie, magasin emblématique de la scène musicale parisienne. Le logotype s’inspire directement des formes, des tensions et des mécaniques propres aux instruments de musique. L’identité est déclinée sur l’ensemble des supports imprimés et digitaux, dans une recherche de rythme, de matière et de résonance visuelle.`
  },
  "ARCANES": {
    title: "ARCANES DE L’ESSENCE",
    meta: "PROJET ÉDITORIAL, 2024",
    desc: `Arcanes de l’Essence est un jeu de cartes de tarot introspectif conçu dans le cadre de mon manifeste créatif. Composé des 22 arcanes majeurs, le projet propose un outil de questionnement destiné à accompagner la réflexion en amont d’un projet, afin d’évaluer sa cohérence avec ses intentions, ses valeurs et son positionnement créatif.`
  },
  "CROSO": {
    title: "CROSO",
    meta: "POLICE DE CARACTÈRE, 2025",
    desc: `Création d’une police de caractères dans le cadre d’un projet de recherche typographique visant à sensibiliser à la disparition des récifs coralliens. Dessin des glyphes, développement du set de caractères et mise en application éditoriale.`
  },
  "FAST FASHION": {
    title: "AGAISNT FAST FASHION LABEL",
    meta: "CONCEPTUALISATION // ÉDITION, 2024",
    desc: `Ce projet prend la forme d’une étiquette textile cousue sur un t-shirt, conçue comme un support de sensibilisation à la fast fashion. 
Elle révèle, de manière concise, les impacts moraux et environnementaux de cette industrie, puis propose des pistes simples pour adopter une consommation vestimentaire plus responsable. Pensée sans ton moralisateur, l’initiative se veut un guide accessible vers des choix plus éthiques et durables.`
  },
  "EDITION CANAILLE": {
    title: "EDITIONS CANAILLE",
    meta: "ÉDITION, 2024",
    desc: `Conceptualisation et édition du premier livre de recette d’Éditions Canaille. Pensé comme un bel objet, un livre que l’on offre, que l’on expose , le projet joue sur l’ambiguïté du cadeau. À l’image d’un Kinder Surprise dont la surprise serait déceptive, il détourne les codes de l’édition culinaire. Un ouvrage à offrir sans que l’on soupçonne que l’ensemble des recettes proposées… sont irréalisables.`
  },
  "théière": {
    title: "THÉIÈRE",
    meta: "ÉDITION, 2024",
    desc: `Création d’un catalogue éditorial répertoriant une sélection de théières à partir des collections Design. Le projet vise à organiser un volume complexe d’informations au sein d’un objet clair et lisible, tout en affirmant une écriture graphique distinctive.`
  },

  "ATELIER FULGURANCE": {
    title: "ATELIER FULGURANCE",
    meta: "ATELIER DE LINOGRAVURE / PROJET COLLECTIF, 2024–NOW",
    desc: `Atelier Fulgurance est un projet de linogravure co-fondé avec Carmen Chisvert. À travers des ateliers organisés dans des contextes variés, le projet propose de revenir à l’essentiel en se retrouvant autour d’une pratique manuelle encore peu connue du grand public.

Dans un contexte dominé par le numérique et l’IA, ces ateliers invitent à ralentir, à se concentrer sur le geste et sur l’impression papier, comme temps de partage et d’attention.

Instagram : @atelierfulgurance`
  },
};

/* ordre homepage */
const PROJECT_ORDER = [
  "INTERWAVE","LBITF","YIYI","PAPERBOY","FAKEBOOK","FILMKID","MDF",
  "PARISBRULE","TDC","FULGU PHOTOS","STITCH TYPEFACE","tchernobyl",
  "MARIAGE","baguetterie","ARCANES","CROSO","FAST FASHION","EDITION CANAILLE","théière",
  "ATELIER FULGURANCE"
];

/* ⚠️ Il faut que HOMEPAGE/20.png existe */
const HOME_COVERS = PROJECT_ORDER.map((_, i) => `./HOMEPAGE/${i+1}.png`);

const PROJECT_MEDIA = {
  "INTERWAVE": ["./PROJETS/INTERWAVE/IW1.png","./PROJETS/INTERWAVE/IW2.png","./PROJETS/INTERWAVE/IW3.mp4","./PROJETS/INTERWAVE/IW4.mp4","./PROJETS/INTERWAVE/IW5.mp4"],
  "LBITF": ["./PROJETS/LBITF/LBITF1.png","./PROJETS/LBITF/LBITF2.png","./PROJETS/LBITF/LBITF3.jpg"],
  "YIYI": ["./PROJETS/YIYI/YY1.png","./PROJETS/YIYI/YY2.png","./PROJETS/YIYI/YY3.png"],
  "PAPERBOY": ["./PROJETS/PAPERBOY/PB1.png","./PROJETS/PAPERBOY/PB2.png"],
  "FAKEBOOK": ["./PROJETS/FAKEBOOK/FB1.png","./PROJETS/FAKEBOOK/FB2.png","./PROJETS/FAKEBOOK/FB3.png"],
  "FILMKID": ["./PROJETS/FILMKID/FK1.png","./PROJETS/FILMKID/FK2.mp4","./PROJETS/FILMKID/FK3.mp4","./PROJETS/FILMKID/FK4.mp4"],
  "MDF": ["./PROJETS/MDF/MDF1.png","./PROJETS/MDF/MDF2.png"],
  "PARISBRULE": ["./PROJETS/PARISBRULE/PARISB1.jpg","./PROJETS/PARISBRULE/PARISB2.jpg","./PROJETS/PARISBRULE/PARISB3.jpg","./PROJETS/PARISBRULE/PARISB4.jpg"],
  "TDC": ["./PROJETS/TDC/TDC1.png","./PROJETS/TDC/TDC2.png","./PROJETS/TDC/TDC3.png","./PROJETS/TDC/TDC4.jpg"],
  "FULGU PHOTOS": ["./PROJETS/FULGU PHOTOS/FULGU1.png","./PROJETS/FULGU PHOTOS/FULGU2.png","./PROJETS/FULGU PHOTOS/FULGU3.png"],
  "STITCH TYPEFACE": ["./PROJETS/STITCH TYPEFACE/ST1.png","./PROJETS/STITCH TYPEFACE/ST2.png","./PROJETS/STITCH TYPEFACE/ST3.png","./PROJETS/STITCH TYPEFACE/ST4.png","./PROJETS/STITCH TYPEFACE/ST5.png"],
  "tchernobyl": ["./PROJETS/tchernobyl/TCHERNOBYL1.png","./PROJETS/tchernobyl/TCHERNOBYL2.png","./PROJETS/tchernobyl/TCHERNOBYL3.png","./PROJETS/tchernobyl/TCHERNOBYL4.png"],
  "MARIAGE": ["./PROJETS/MARIAGE/MARIAGE1.JPG","./PROJETS/MARIAGE/MARIAGE2.png","./PROJETS/MARIAGE/MARIAGE3.gif"],
  "baguetterie": ["./PROJETS/baguetterie/BAGUETTERIE1.png","./PROJETS/baguetterie/BAGUETTERIE2.png","./PROJETS/baguetterie/BAGUETTERIE4.png","./PROJETS/baguetterie/BAGUETTERIE13.png"],
  "ARCANES": ["./PROJETS/ARCANES/ARCANES1.png","./PROJETS/ARCANES/ARCANES2.png"],
  "CROSO": ["./PROJETS/CROSO/CROSO1.png","./PROJETS/CROSO/CROSO2.png","./PROJETS/CROSO/CROSO3.png"],
  "FAST FASHION": ["./PROJETS/FAST FASHION/FF1.png","./PROJETS/FAST FASHION/FF2.JPG","./PROJETS/FAST FASHION/FF3.JPG"],
  "EDITION CANAILLE": ["./PROJETS/EDITION CANAILLE/EC1.png","./PROJETS/EDITION CANAILLE/EC2.png","./PROJETS/EDITION CANAILLE/EC3.png","./PROJETS/EDITION CANAILLE/EC4.png"],
  "théière": ["./PROJETS/théière/TH1.png","./PROJETS/théière/TH2.png","./PROJETS/théière/TH3.png","./PROJETS/théière/TH4.png"],

  "ATELIER FULGURANCE": [
    "./PROJETS/ATELIER FULGURANCE/AF1.png",
    "./PROJETS/ATELIER FULGURANCE/AF2.png",
    "./PROJETS/ATELIER FULGURANCE/AF3.png",
    "./PROJETS/ATELIER FULGURANCE/AF4.png",
    "./PROJETS/ATELIER FULGURANCE/AF5.png",
  ],
};

const projects = PROJECT_ORDER.map((id, i) => ({
  id,
  cover: HOME_COVERS[i],
  text: PROJECT_TEXT[id],
  gallery: PROJECT_MEDIA[id] || []
}));

/* inject homepage texts */
document.getElementById("infoLeft").innerHTML = HOMEPAGE_INFO.leftHtml;
document.getElementById("infoMid").textContent  = HOMEPAGE_INFO.mid;
document.getElementById("infoRight").textContent= HOMEPAGE_INFO.right;

/* bottom band texts */
document.getElementById("bandExp").textContent  = BAND.exp;
document.getElementById("bandFree").textContent = BAND.free;
document.getElementById("bandEdu").textContent  = BAND.edu;

/* DOM */
const track = document.getElementById("track");
const loop  = document.getElementById("loop");
const drawer = document.getElementById("drawer");
const drawerList = document.getElementById("drawerList");
const bottomBand = document.getElementById("bottomBand");
const projectEl = document.getElementById("project");
const projectInner = document.getElementById("projectInner");
const projectScroll = document.getElementById("projectScroll");

/* loop params */
let posX = 0;
let vel = -1.4;
let base = -1.4;
let savedPosX = 0;
let isPaused = false;

/* alternance : 1 sur 2 (grand/petit) */
function sizeClassFor(i){
  return (i % 2 === 0) ? "isBig" : "isSmall";
}

function buildTrack(){
  track.innerHTML = "";
  [...projects, ...projects].forEach((p, i) => {
    const realIndex = i % projects.length;

    const item = document.createElement("div");
    item.className = "item";
    item.classList.add(sizeClassFor(realIndex));

    const img = document.createElement("img");
    img.src = safeSrc(p.cover);
    img.alt = p.id;

    item.appendChild(img);
    item.addEventListener("click", () => openProject(realIndex));
    track.appendChild(item);
  });
}
buildTrack();

function halfWidth(){ return track.scrollWidth / 2; }

function tick(){
  if(!isPaused){
    vel += (base - vel) * 0.02;
    posX += vel;

    const half = halfWidth();
    if(posX <= -half) posX += half;
    if(posX >= 0) posX -= half;

    track.style.transform = `translate3d(${posX}px,0,0)`;
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

/* Scroll = accélération */
loop.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY)) ? e.deltaX : e.deltaY;
  vel += -delta * 0.012;
  vel = Math.max(Math.min(vel, 14), -14);
}, { passive:false });

/* INDEX (noir) : tri chronologique (dernier en haut) */
function yearFromMeta(meta=""){
  const m = meta.match(/(19|20)\d{2}/);
  return m ? parseInt(m[0], 10) : 0;
}

function buildDrawerList(){
  drawerList.innerHTML = "";

  const sorted = [...projects].sort((a,b) => {
    const ya = yearFromMeta(a.text?.meta || "");
    const yb = yearFromMeta(b.text?.meta || "");
    if(yb !== ya) return yb - ya;
    return (a.text?.title || a.id).localeCompare((b.text?.title || b.id), "fr");
  });

  sorted.forEach((p) => {
    const i = projects.findIndex(x => x.id === p.id);

    const row = document.createElement("div");
    row.className = "drawerItem";
    row.innerHTML = `
      <div class="diTitle">${escapeHtml(p.text?.title || p.id).replaceAll("\n","<br>")}</div>
      <div class="diMeta">${escapeHtml(p.text?.meta || "")}</div>
    `;
    row.addEventListener("click", () => {
      closeDrawer();
      openProject(i);
    });
    drawerList.appendChild(row);
  });
}
buildDrawerList();

/* RÉFÉRENCES (bandeau noir uniquement) */
function isBandOpen(){
  return bottomBand.classList.contains("isOpen");
}
function openBand(){
  bottomBand.classList.add("isOpen");
  bottomBand.setAttribute("aria-hidden","false");
}
function closeBand(){
  bottomBand.classList.remove("isOpen");
  bottomBand.setAttribute("aria-hidden","true");
}

document.getElementById("openBottomBand").addEventListener("click", openBand);
document.getElementById("closeBottomBand").addEventListener("click", closeBand);

/* Ferme le bandeau si clic ailleurs */
document.addEventListener("pointerdown", (e) => {
  if(!isBandOpen()) return;

  const clickedInsideBand = bottomBand.contains(e.target);
  const clickedBandButton = e.target.closest("#openBottomBand");

  if(!clickedInsideBand && !clickedBandButton){
    closeBand();
  }
});

/* Drawer open/close (ferme le bandeau au passage) */
function openDrawer(){
  closeBand();
  drawer.classList.add("isOpen");
  drawer.setAttribute("aria-hidden","false");
}
function closeDrawer(){
  drawer.classList.remove("isOpen");
  drawer.setAttribute("aria-hidden","true");
}
document.getElementById("openTopRefs").addEventListener("click", openDrawer);
document.getElementById("closeTopRefs").addEventListener("click", closeDrawer);

/* Project open/close */
function renderProject(idx){
  const p = projects[idx];
  projectInner.innerHTML = "";

  p.gallery.forEach((src, k) => {
    const s = safeSrc(src);

    if(s.toLowerCase().endsWith(".mp4")){
      const v = document.createElement("video");
      v.src = s;
      v.controls = true;
      v.playsInline = true;
      v.preload = "metadata";
      v.muted = true;
      v.autoplay = true;
      v.loop = true;

      v.className = "media " + (k % 2 === 0 ? "isBig" : "isSmall");
      projectInner.appendChild(v);

      setTimeout(() => { v.play().catch(()=>{}); }, 0);
    } else {
      const img = document.createElement("img");
      img.alt = p.id;
      img.className = "media " + (k % 2 === 0 ? "isBig" : "isSmall");

      img.src = s;
      attachImgFallback(img, s);

      projectInner.appendChild(img);
    }

    /* Texte juste sous la première image */
    if(k === 0){
      const t = document.createElement("div");
      t.className = "projectText";
      t.innerHTML = `
        <div class="ptLeft">
          <div class="ptTitle">${escapeHtml(p.text.title).replaceAll("\n","<br>")}</div>
          <div class="ptMeta">${escapeHtml(p.text.meta)}</div>
        </div>
        <div class="ptRight">${linkifyDesc(p.text.desc)}</div>
      `;
      projectInner.appendChild(t);
    }
  });

  projectScroll.scrollTop = 0;
}

function openProject(idx){
  closeBand(); // ✅ ferme Références si ouvert
  savedPosX = posX;
  isPaused = true;
  renderProject(idx);
  projectEl.classList.add("isOpen");
  projectEl.setAttribute("aria-hidden","false");
}

function closeProject(){
  projectEl.classList.remove("isOpen");
  projectEl.setAttribute("aria-hidden","true");
  posX = savedPosX;
  track.style.transform = `translate3d(${posX}px,0,0)`;
  isPaused = false;
}
document.getElementById("closeProject").addEventListener("click", closeProject);

/* ESC */
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    closeBand();
    closeDrawer();
    if(projectEl.classList.contains("isOpen")) closeProject();
  }
});
