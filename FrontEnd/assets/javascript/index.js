// import {connect} from "./login.js"

//----------------VARIABLES----------------------//
const galleryDom = document.querySelector("#portfolio .gallery");
const filterListDom = document.querySelector(".filters");

let arrayWorks = [];
let arrayCategories = [];

//---------RECUPERATION DES DONNEES------------------//
const elementCategories = async () => {
  const recupCategories = await fetch("http://localhost:5678/api/categories");
  const categories = await recupCategories.json();

  arrayCategories = categories;
  // console.log(categories);
};
elementCategories();

const recupWorks = async () => {
  const reponseWork = await fetch("http://localhost:5678/api/works");

  const works = await reponseWork.json();
  // console.log(works);
  arrayWorks = works;
console.log(arrayWorks);

};


//------générations des données dynamiquement----------------//

//fonction galerie//
const showWorks = (arrayOfWorks) => {
  let worksHtml = "";
  arrayOfWorks.map((work) => {
    worksHtml += `
  <figure>
  <img src="${work.imageUrl}" alt="${work.title}">
  <figcaption>${work.title}</figcaption>
  </figure>
  `;
  });
  galleryDom.innerHTML = worksHtml;
};
await recupWorks();

showWorks(arrayWorks);

const showCategories = (arrayOfCategories) => {
  let categoriesHtml = "";
  arrayOfCategories.map((cat) => {
    categoriesHtml += `<span class="filter">${cat.name}</span>`;
  });
  categoriesHtml = "<span class='filter'>Tous</span>" + categoriesHtml;
  filterListDom.innerHTML = categoriesHtml;
};
showCategories(arrayCategories);

//fonction filtres//
const filterDom = document.querySelectorAll(".filter");
filterDom.forEach((filtre, index) => {
  filtre.addEventListener("click", () => {
    const filtersWorks = arrayWorks.filter((cat) => {
      return cat.categoryId == index;
    });
    if (index == 0) {
      showWorks(arrayWorks);
    } else {
      showWorks(filtersWorks);
    }
  });
});

// --------modification de la page après connexion----------------//
//--récupérer les données dans localStorage
const dataToken = sessionStorage.getItem("isConnected", true);
// console.log(dataToken);

if (dataToken) {
  const logout = document.querySelector("nav li:nth-child(4)");
  // console.log(login);
  logout.style.display = "block";

  const login = document.querySelector("nav li:nth-child(3)");
  // console.log(login);
  login.style.display = "none";

  const modeEdition = document.querySelector(".blackspace")
// console.log(modeEdition);
modeEdition.style.visibility = "visible"

const modify = document.querySelector(".modifier")
modify.style.visibility = "visible"


const filterHidden = document.querySelector(".filters")
filterHidden.style.display = "none"

const modifyProject = document.querySelector(".modifier i")
modifyProject.addEventListener("click", () => {

const modale = document.querySelector(".modale")
modale.style.display = "block"

const galleryModal = document.querySelector(".galleryModal")
// console.log(galleryModal);

const modalWorks = (arrayOfWorks) => {
  let worksHtml = "";
  arrayOfWorks.map((work) => {
    worksHtml += `
  <div  class="trash">
  <figure>
  <img src="${work.imageUrl}" alt="${work.title}"><i class="fa-solid fa-trash-can"></i>
  </figure>
  </div>
  `;
  });
  galleryModal.innerHTML = worksHtml;
  galleryModal.classList.add("galleryModal")
};
modalWorks(arrayWorks)

const trash = document.querySelector("aside i")
trash.addEventListener("click", () => {
modale.style.display = "none"


})



})








  
}





















//-------------création des filtres-------//

// const filterTous = document.querySelector("#portfolio .filter");
// filterTous.addEventListener("click", () => {
//   elementWorks();
// });

// let displayAll = filterTous

// console.log(displayAll);

// const filterObjet = document.querySelector("#portfolio .filter");
// filterObjet.addEventListener("click", () => {
// //   elementWorks()
// //  gallery.innerHTML=""
//   const categorieFiltrée = arrayWorks.filter((cat) => {
//   return cat.category.name.includes("Objets")
// })
// console.log(categorieFiltrée);

// const listObjet = document.createElement("ul")

// for (let i = 0; i<categorieFiltrée.length; i++) {
//   const elementListObjet = document.createElement("li")
//   listObjet.appendChild(elementListObjet)

// }
// filterObjet.appendChild(listObjet)

// filterObjet.style.backgroundColor = " #1D6154"
// filterObjet.style.color = " white"
// filterTous.style.backgroundColor = "#FFFEF8"
// filterTous.style.color = " #1D6154"

// })

// console.log("cliqué")

// const filterAppart = document.querySelector("#portfolio .filterAppart")

// filterAppart.addEventListener("click", () => {
//   console.log("cliqué");
// })
// const filterHotel = document.querySelector("#portfolio .filterHotel")

// filterHotel.addEventListener("click", () => {
//   console.log("cliqué");
// })
