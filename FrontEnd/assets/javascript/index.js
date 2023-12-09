import {callCategory, callWorks} from "./api.js"

//----------------VARIABLES----------------------//
const galleryDom = document.querySelector("#portfolio .gallery");
const filterListDom = document.querySelector(".filters");
const logout = document.querySelector("nav li:nth-child(4)");
const login = document.querySelector("nav li:nth-child(3)");
const modeEdition = document.querySelector(".blackspace");
const modify = document.querySelector(".modifier");
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
  try {
    const categories = await callCategory();
    arrayCategories = categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories", error)
  }
  // console.log(categories);
};
elementCategories();

const recupWorks = async () => {
  try {
    const works = await callWorks();
      // console.log(works);
      arrayWorks = works;

  } catch (error) {
  console.error("Erreur lors de la récupération des travaux", error)
}

  // console.log(arrayWorks);
} 
recupWorks()

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
// console.log(arrayWorks);
//fonction filtres//
const filterDom = document.querySelectorAll(".filter");
const tous = document.querySelector("#portfolio span:nth-child(1)")
console.log(tous)
// console.log(filterDom);
filterDom.forEach((filtre, index) => {
  filtre.addEventListener("click", () => {
    filterDom.forEach((f) => f.classList.remove("active"));
    filtre.classList.add("active");



    const filtersWorks = arrayWorks.filter((cat) => {
      return cat.categoryId == index;
    });
    if (index == 0) {
      showWorks(arrayWorks);


    } else {
      showWorks(filtersWorks);
      tous.style.color = "#1D6154";
      tous.style.background = "#FFFEf8";
      tous.addEventListener('click', () => {
      tous.style.color = "#FFFEf8";
      tous.style.background = "#1D6154";
      })

      
      
    }
  });
});





//------------------------------------MODALE--------------------------//

const dataToken = localStorage.getItem("Token");
console.log(dataToken);
localStorage.setItem("Token", dataToken)
const shadow = document.querySelector(".shadow")
// console.log(shadow);

  // --modification de la page d'accueil après connexion--//
if (dataToken) {
  // console.log(login);
  logout.style.display = "block";
  logout.style.color = "black"
  login.style.display = "none";
  modeEdition.style.visibility = "visible";
  modify.style.visibility = "visible";
  filterListDom.style.display = "none";
}
  //--événement permettant d'ouvrir la modale--//
  modifyProject.addEventListener("click", () => {
    modale.style.display = "block";
    shadow.style.display = "block"; 
  })
  //--fonction pour générer la galerie dans la modale--//
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

      
    };
    modalWorks(arrayWorks);


    //**croix qui permet de fermer la modale */
    close.forEach((element) => {
      element.addEventListener("click", () => {
        modale.style.display = "none";
        modifyWork.style.display = "none";
        shadow.style.display = "none";
      });
      //**le click sur le fond sombre pour fermer la modale */
      shadow.addEventListener("click", () => {
        modale.style.display = "none";
        modifyWork.style.display = "none";
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
      resetForm()     
    });

    //------événement et fonction pour supprimer un projet----//
    const trash = document.querySelectorAll("#minPicture i");
    trash.forEach((e) => {
      e.addEventListener("click", (e) => {
        const workId = e.target.closest("#minPicture").dataset.workId;
        deleteProjectById(workId);
      });
    });


    // const token = localStorage.getItem("Token");
     
    const deleteProjectById = async (workId) => {
      try {
      const token = localStorage.getItem("Token")
      const userConfirmed = confirm("Etes-vous sûr de vouloir supprimer?");
      console.log(userConfirmed);

      if (userConfirmed) {
       const res = await fetch("http://localhost:5678/api/works/" + workId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          
            if (!res.ok) {
              console.error("Erreur lors de la suppression du projet");
            } else {
              newDataGallery()
               const workToDelete = document.querySelector(`figure[data-work-id="${workId}"]`);
               if (workToDelete) {
               workToDelete.remove();         
               }
              
            }
          }
        } catch (error) {
            console.error("Erreur:" + error);
          };
      }
    

  
    

//-----------fonction pour actualiser la modale---------//
const newDataGallery = async() =>{
  const newWork = await fetch("http://localhost:5678/api/works");

  const works = await newWork.json();
  console.log(works);
  if (works) {
    showWorks(works);   
  }
};


//----------fonction pour modifier l'apparence du formulaire une fois rempli-----------//
const btnAddPicture = document.getElementById("btnAddPicture");
const form = document.querySelector("#dataForm");
// const titre = document.getElementById("title").value;
const filePicture = document.getElementById("filePicture");
const previewPicture = document.querySelector("#previewPicture");

const formChange = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const image = formData.get("image");
  const title = formData.get("title");
  const category = formData.get("category");
  // const project = { image, title, category };

  // console.log(project);

  if ((image && title && category)) {
    btnSubmit.style.background = "#1D6154";
    btnSubmit.style.cursor = "pointer"
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

//---------------------------fonction pour envoyer un nouveau projet-------------------------------//
const sendProject = async () => {
const formData = new FormData(form);
console.log(formData);

  const token = localStorage.getItem("Token");
  // const dataToken = sessionStorage.getItem("isConnected", true);
// console.log(token);
  const callForSend = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      // accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
  })

  try {
    const res = await callForSend;
    if (res.ok) {
      location.reload();
      newDataGallery();
    } else if (res.status === 400) {
      const data = await res.json();
      alert("Un problème est survenu lors de l'ajout du projet");
      resetForm();
    } else {
      
      alert("Erreur : un problème est survenu lors de l'ajout du projet");
    }
  } catch (error) {
    alert("Erreur : un problème est survenu lors de l'ajout du projet");
  }
}

btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  await sendProject();

  
});

//-------------fonction pour vider le formulaire----------//
const resetForm = () => {
    form.reset()
    previewPicture.src ="";
    filePicture.style.visibility = "hidden"
    previewPicture.style.visibility = "hidden";
    btnAddPicture.style.visibility = "visible";
    document.querySelector(".ajouterPhoto p").style.visibility = "visible";
    btnSubmit.style.background = "#A7A7A7";
    btnSubmit.style.cursor = "not-allowed"

}



//-------déconnexion---------//

const deconnect = (e) => {
  e.preventDefault()
  sessionStorage.clear();
  localStorage.clear();
  document.location.href = "./index.html";
  logout.style.display = "none";
  logout.style.color = "black"
  login.style.display = "block";
  modeEdition.style.visibility = "hidden";
  modify.style.visibility = "hidden";
  filterListDom.style.display = "block";
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
// }
