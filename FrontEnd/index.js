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

const elementWorks = async () => {
  const recupWorks = await fetch("http://localhost:5678/api/works");

  const works = await recupWorks.json();
  let arrayWorks = [];
  arrayWorks = works;

  const gallery = document.querySelector(".gallery");
  let worksHtml = "";
  arrayWorks.map((work) => {
    worksHtml += `
  <figure>
  <img src="${work.imageUrl}" alt="${work.title}">
  <figcaption>${work.title}</figcaption>
  </figure>
  `;
  });
  gallery.innerHTML = worksHtml
  console.log(works);
  console.log(gallery);
};

elementWorks();
