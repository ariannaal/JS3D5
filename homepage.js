const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjJmMjdjMjM5YzAwMTUyZjRiMzgiLCJpYXQiOjE3MTgzNTA1NzgsImV4cCI6MTcxOTU2MDE3OH0.sTkh_qRF68FfTWzP6DnN2DnWtqILu6y_mu5Rv83gv6g";

window.addEventListener("DOMContentLoaded", function () {

 const cardContainer = document.getElementById("card-container");

    // funzione per creare le card
    function createCard(product) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-lg-3 col-md-4 col-sm-6 mb-4";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card h-100";
    

    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.className = "card-img-top";
    img.addEventListener('click', function () {
    window.location.href = `detail.html?id=${product._id}`;
    });

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.name;
    cardTitle.addEventListener('click', function () {
    window.location.href = `detail.html?id=${product._id}`;
    });

    const cardBrand = document.createElement("p");
    cardBrand.className = "card-text";
    const brandSmall = document.createElement("small");
    brandSmall.className = "text-muted";
    brandSmall.textContent = `Brand: ${product.brand}`;
    cardBrand.appendChild(brandSmall);
        
    const cardDescription = document.createElement("p");
    cardDescription.className = "card-text";
    cardDescription.textContent = `Descrizione: ${product.description}`;

    const cardPrice = document.createElement("p");
    cardPrice.className = "card-text";
    cardPrice.textContent = `Prezzo: ${product.price}€`;
        


    const modifyContainer = document.createElement("div");
    modifyContainer.classList.add("d-flex", "justify-content-between" )
        
    const modifyBtn = document.createElement("button");
    modifyBtn.innerText = "Modifica";
    modifyBtn.classList.add("btn", "btn-outline-success");
    modifyBtn.addEventListener('click', function () {
    window.location.href = `backoffice.html?id=${product._id}`;
    });

   const deleteBtn = document.createElement("button");
   deleteBtn.innerText = "Elimina";
   deleteBtn.classList.add("btn", "btn-outline-danger");

  deleteBtn.addEventListener('click', function () {
  const conferma = confirm(`Sei sicuro di voler eliminare "${product.name}"?`);

    if (conferma) {
        colDiv.remove();
    } else {
        
    }
});


        

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);

    colDiv.appendChild(cardDiv);
        
    cardBody.appendChild(modifyContainer)
    modifyContainer.appendChild(modifyBtn);
    modifyContainer.appendChild(deleteBtn);
    

    return colDiv;
    }
    
    // itero su ogni prodotto e per ogni oggetto prodotto chiamo la funzione createCard(product)
    function updateCards(products) {
    products.forEach(product => {
    const card = createCard(product);
    cardContainer.appendChild(card);
    });
  }

    //faccio richiesta all'api usando l'url, se la risposta è ok la converte in json, sennò mi da errrore. ottenuti i dati chiama la funzione updateCards 
    const getProducts = function () {
        fetch(url, {
        headers: {
         Authorization: "Bearer " + apiKey, 
        }
    })
             .then(response => {
                 if (response.ok) {
          return response.json();
        } else {
          throw new Error('Errore');
        }
      })
            .then(data => {
          console.log(data);
        updateCards(data);
      })
      .catch(error => {
        console.error("Errore", error);
      });
  };

  getProducts();
});

 

