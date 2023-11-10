//---------RECUPERATION DES DONNEES------------------//
const elementCategories = async () => {
  const recupCategories = await fetch("http://localhost:5678/api/categories");
  const categories = await recupCategories.json();
  let arrayCategories = [];
  arrayCategories = categories;

  console.log(categories);
};

elementCategories();

//---------------------------------------------------------------//
let arrayWorks = [];
const recupWorks = async () => {
  const reponseWork = await fetch("http://localhost:5678/api/works");

  const works = await reponseWork.json();

  arrayWorks = works;
  console.log(arrayWorks);
};

const elementWorks = async () => {
  await recupWorks();

  let worksHtml = "";

  arrayWorks.map((work) => {
    worksHtml += `
  <figure>
  <img src="${work.imageUrl}" alt="${work.title}">
  <figcaption>${work.title}</figcaption>
  </figure>
  `;
  });

  const gallery = document.querySelector("#portfolio .gallery");
  gallery.innerHTML = worksHtml;
  // console.log(worksHtml);
  console.log(gallery);
};

elementWorks();

//-------------test injection dynamique-------//
