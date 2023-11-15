const connect = () => {
  const formData = new FormData(formInfo);

  const dataUser = Object.fromEntries(formData);
  // console.log(dataUser);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataUser),
  })
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("Token", data.token);

      const redirect = () => {
        document.location.href = "./index.html";
      };

      if (data.message || data.error) {
        alert("Vérifier vos données de connexion");
      } else {
        sessionStorage.setItem("isConnected", JSON.stringify(true));
        redirect();
      }
    });
};


const formInfo = document.querySelector("#contact form");
// console.log(formInfo);
formInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  connect();

  
});
