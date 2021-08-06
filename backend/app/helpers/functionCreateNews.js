"use strict";

function getNewsElPais(dom) {
  const headlines = dom.window.document.querySelector(".a_t");
  const newsLead = dom.window.document.querySelectorAll("h2");
  const newsP = dom.window.document.querySelector(".a_b > p");
  const figure = dom.window.document.querySelectorAll(".lead_art > img");

  const title = headlines.textContent.trim();

  let lead;
  for (const l of newsLead) {
    lead = l.textContent.trim();
  }

  const text = newsP.textContent.trim();

  let src;
  for (const i of figure) {
    src = i.srcset;
  }

  const srcSplit = src.split(",");
  const srcSplit2 = srcSplit[3].split(" ");
  const image = srcSplit2[0];

  const noticia = { title, lead, text, image };
  console.log(noticia);
  return noticia;
}

function getNewsLaVozDeGalicia(dom) {
  const headlines = dom.window.document.querySelectorAll("h1");
  const newsLead = dom.window.document.querySelector(".subtitle");
  const newsP = dom.window.document.querySelector(".first-paragraph");
  const figure = dom.window.document.querySelector(".media > img");

  let title;
  for (const h of headlines) {
    title = h.textContent.trim();
  }

  const lead = newsLead.textContent.trim();

  const text = newsP.textContent.trim();

  const src = figure.srcset;
  const srcSplit = src.split(",");
  const srcSplit2 = srcSplit[1].split(" ");
  const image = srcSplit2[1];

  const noticia = { title, lead, text, image };
  return noticia;
}

function getNewsMArca(dom) {
  const headlines = dom.window.document.querySelectorAll("h1");
  const newsLead = dom.window.document.querySelector(
    ".ue-c-article__standfirst"
  );
  const newsP = dom.window.document.querySelector(
    ".ue-c-article--first-letter-highlighted"
  );
  const figure = dom.window.document.querySelector(
    "img.ue-c-article__media--image"
  );

  let title;
  for (const h of headlines) {
    title = h.textContent.trim();
  }

  const lead = newsLead.textContent.trim();

  const text = newsP.textContent.trim();

  const image = figure.src;

  const noticia = { title, lead, text, image };

  return noticia;
}
module.exports = {
  getNewsElPais,
  getNewsLaVozDeGalicia,
  getNewsMArca,
};
