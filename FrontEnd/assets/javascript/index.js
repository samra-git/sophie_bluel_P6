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
const btnSubmit = document.getElementById("btnSubmit");

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
// console.log(arrayWorks);

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


//------------------------------------MODALE--------------------------//

const dataToken = sessionStorage.getItem("isConnected", true);
console.log(dataToken);
const shadow = document.querySelector(".shadow")
console.log(shadow);

// --modification de la page d'accueil après connexion--//


if (dataToken) {
  // console.log(login);
  logout.style.display = "block";
  logout.style.color = "black"
  login.style.display = "none";
  modeEdition.style.visibility = "visible";
  modify.style.visibility = "visible";
  filterHidden.style.display = "none";

// document.body.addEventListener("click", )

  modifyProject.addEventListener("click", () => {
    modale.style.display = "block";
    shadow.style.display = "block";
    
    


    //----fonction pour générer la gallerie dans la modale------//

    const modalWorks = (arrayOfWorks) => {
      let worksHtml = "";
      arrayOfWorks.map((work) => {
        worksHtml += `
    
    <figure data-work-id="${work.id}"  id="minPicture">
    <img src="${work.imageUrl}" alt="${work.title}"><i class="fa-solid fa-trash-can #trash"></i>
    </figure>
    
    `;
      });
      galleryModal.innerHTML = worksHtml;
      galleryModal.classList.add("galleryModal");

      // console.log(galleryModal);

      // deleteProjectById()
    };
    modalWorks(arrayWorks);


    //**croix qui permet de fermer la modale */
    close.forEach((element) => {
      element.addEventListener("click", () => {
        modale.style.display = "none";
        modifyWork.style.display = "none";
        shadow.style.display = "none";
      });

      shadow.addEventListener("click", () => {
        modale.style.display = "none";
        shadow.style.display = "none";


      })


    });


//--bouton qui permet d'accéder à la modale pour ajouter un projet--//
    btnAdd.addEventListener("click", () => {
      modale.style.display = "none";
      modifyWork.style.display = "block";
    });
  //--flèche de retour à la modale supprimer projet--//
    arrowReturn.addEventListener("click", () => {
      modale.style.display = "block";
      modifyWork.style.display = "none";
      form.reset()
      previewPicture.src ="";
      previewPicture.style.visibility = "hidden";
      btnAddPicture.style.visibility = "visible";
      document.querySelector(".ajouterPhoto p").style.visibility = "visible";
      

    });

  //------fonction pour supprimer un projet----//

    const trash = document.querySelectorAll("#minPicture i");
    trash.forEach((e) => {
      e.addEventListener("click", (e) => {
        const workId = e.target.closest("#minPicture").dataset.workId;
        deleteProjectById(workId);
        // newFetch()
        // recupWorks()
        // showWorks(arrayWorks)
        
      });
    });

    
    const deleteProjectById = async (workId) => {
      const token = sessionStorage.getItem("Token");
      const userConfirmed = confirm("Etes-vous sûr de vouloir supprimer?");
      console.log(userConfirmed);

      if (userConfirmed) {
        fetch("http://localhost:5678/api/works/" + workId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            if (!res.ok) {
              console.error("Erreur lors de la suppression du projet");
            } else {
              newDataGallery()
               const workToDelete = document.querySelector(`figure[data-work-id="${workId}"]`);
               if (workToDelete) {
               workToDelete.remove();         
               }
              
            }
          })
          .catch((error) => {
            console.error("Erreur:", error);
          });
      }
    };
  });
    
}

const newDataGallery = async() =>{

  const newWork = await fetch("http://localhost:5678/api/works");

  const works = await newWork.json();
  console.log(works);
  if (works) {
    showWorks(works)
  }
  
};

//----------fonction pour ajouter un projet-----------//
const btnAddPicture = document.getElementById("btnAddPicture");
const form = document.querySelector("#dataForm");
const titre = document.getElementById("title").value;
const filePicture = document.getElementById("filePicture");
const previewPicture = document.querySelector("#previewPicture");

//***écouteur d'événement à l'ajout de la photo */


const formChange = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const image = formData.get("image");
  const title = formData.get("title");
  const category = formData.get("category");
  const project = { image, title, category };

  // console.log(project);

  if ((image, title, category)) {
    btnSubmit.style.background = "#1D6154";
  }

  if (image) {
    previewPicture.src = URL.createObjectURL(image);
    
    if (previewPicture) {
      previewPicture.style.visibility = "visible";
      btnAddPicture.style.visibility = "hidden";
      document.querySelector(".ajouterPhoto p").style.visibility = "hidden";
    }
  }

  btnAddPicture.addEventListener("click", (e) => {
    e.preventDefault();
    if (filePicture) {
      filePicture.click();
    }
  });
};

dataForm.addEventListener("change",  formChange);


const sendProject = async () => {
const formData = new FormData(form);
console.log(formData);

  const token = sessionStorage.getItem("Token");
  const dataToken = sessionStorage.getItem("isConnected", true);
// console.log(token);
  const callForSend = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      // accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
  }).then((res) =>  {
     if (res.ok) {
    form.reset()
    previewPicture.src ="";
    filePicture.style.visibility = "hidden"
    location.reload();
  }
}).catch((error) => {
  alert("Erreur:", error);
});
};

btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  await sendProject();
  
});




//-------déconnexion---------//

const deconnect = (e) => {
  e.preventDefault()
  sessionStorage.clear();
  document.location.href = "./index.html";
};
logout.addEventListener("click", deconnect);











//--------------------------------------brouillon----------------------------------//
//--écouteur d'événement permet de détecter les changements dans le formulaire lors chargement de type file
//

// btnSubmit.addEventListener("submit", (e) => {
//   e.preventDefault();

//   console.log(titre.value);
//   console.log(categorieStyle.value);

// //   const formData = new FormData(form)
// // console.log(formData);
// })
