// import {connect} from "./login.js"

//----------------VARIABLES----------------------//
const galleryDom = document.querySelector("#portfolio .gallery");
const filterListDom = document.querySelector(".filters");
const logout = document.querySelector("nav li:nth-child(4)");
const login = document.querySelector("nav li:nth-child(3)");
const modeEdition = document.querySelector(".blackspace");
const modify = document.querySelector(".modifier");
const filterHidden = document.querySelector(".filters");
const modifyProject = document.querySelector(".modifier i");
const modale = document.querySelector(".modale");
const galleryModal = document.querySelector(".galleryModal");
const close = document.querySelectorAll(".close");
const modifyWork = document.querySelector(".modifyWork");
const arrowReturn = document.querySelector(".arrowReturn");

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
  // console.log(arrayWorks);
};

//------générations des données dynamiquement----------------//

//******fonction qui affiche la galerie de la page d'accueil******//
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
console.log(arrayWorks);

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
//--récupérer les données dans SessionStorage
const dataToken = sessionStorage.getItem("isConnected", true);
console.log(dataToken);

if (dataToken) {
  // console.log(login);
  logout.style.display = "block";

  // console.log(login);
  login.style.display = "none";

  // console.log(modeEdition);
  modeEdition.style.visibility = "visible";

  modify.style.visibility = "visible";

  filterHidden.style.display = "none";

  modifyProject.addEventListener("click", () => {
    modale.style.display = "block";

  
//----fonction pour générer la gallerie dans la modale------//

  const modalWorks = (arrayOfWorks) => {
    let worksHtml = "";
    arrayOfWorks.map((work) => {
      worksHtml += `
    <div data-work-id="${work.id}"  id="minPicture">
    <figure>
    <img src="${work.imageUrl}" alt="${work.title}"><i class="fa-solid fa-trash-can #trash"></i>
    </figure>
    </div>
    `;
    });
    galleryModal.innerHTML = worksHtml;
    galleryModal.classList.add("galleryModal");

    // console.log(galleryModal);
  };
  modalWorks(arrayWorks);

  close.forEach((element) => {
    element.addEventListener("click", () => {
      modale.style.display = "none";
      modifyWork.style.display = "none";
    });
  });

  btnAdd.addEventListener("click", () => {
    modale.style.display = "none";
    modifyWork.style.display = "block";
  });

  arrowReturn.addEventListener("click", () => {
    modale.style.display = "block";
    modifyWork.style.display = "none";
  });
  const trash = document.querySelectorAll("#minPicture i");
  trash.forEach((e) => {
    e.addEventListener("click", (e) => {
      const workId = e.target.closest("#minPicture").dataset.workId
      deleteProjectById(workId)
    })
  });




//------fonction pour supprimer un projet----//


  const deleteProjectById = (workId) => {
    const token = sessionStorage.getItem("Token");
    const userConfirmed = confirm("Etes-vous sûr de vouloir supprimer?")
  console.log(userConfirmed);

    if (userConfirmed) {
    fetch("http://localhost:5678/api/works/" + workId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (!res.ok) {
        console.error("Erreur lors de la suppression du projet")
      } else {
        recupWorks()
        const workToDelete = document.querySelector("#minPicture");

        if (workToDelete) {
          workToDelete.remove()
        }
      }
    })
    .catch((error) => {console.error("Erreur:", error)
  })
  };
}


    
})
}

//-------fonction pour ajouter un projet----//





//-------déconnexion---------//

const deconnect = () => {
  sessionStorage.clear();
  document.location.href = "./index.html";
};
logout.addEventListener("click", () => {
  deconnect();
});