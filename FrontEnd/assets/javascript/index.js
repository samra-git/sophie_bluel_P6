// import { elementWorks } from "./fonctions.js";

//---------RECUPERATION DES DONNEES------------------//
const elementCategories = async () => {
  const recupCategories = await fetch("http://localhost:5678/api/categories");
  const categories = await recupCategories.json();
  let arrayCategories = [];
  arrayCategories = categories;
};
elementCategories();
let arrayWorks = [];

const recupWorks = async () => {
  const reponseWork = await fetch("http://localhost:5678/api/works");

  const works = await reponseWork.json();
  arrayWorks = works;
};

//------création des données dynamiquement----------------//

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
  console.log(arrayWorks);

  // console.log(gallery);
};

elementWorks();

//-------------création des filtres-------//

const filterTous = document.querySelector("#portfolio .filterTous");
filterTous.addEventListener("click", () => {
  elementWorks();
});

const filterObjet = document.querySelector("#portfolio .filterObject");
filterObjet.addEventListener("click", () => {
  const categorieFiltrée = arrayWorks.filter((cat) => {
  return cat.category.name.includes("Objets")
})


const listObjet = document.createElement("ul")
for (let i =0; i<categorieFiltrée.length; i++) {
  const elementListObjet = document.createElement("li")


listObjet.appendChild(elementListObjet)

listObjet = categorieFiltrée
}
})



  // console.log("cliqué")









// const filterAppart = document.querySelector("#portfolio .filterAppart")

// filterAppart.addEventListener("click", () => {
//   console.log("cliqué");
// })
// const filterHotel = document.querySelector("#portfolio .filterHotel")

// filterHotel.addEventListener("click", () => {
//   console.log("cliqué");
// })
