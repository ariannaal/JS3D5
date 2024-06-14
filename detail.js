const url = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjJmMjdjMjM5YzAwMTUyZjRiMzgiLCJpYXQiOjE3MTgzNTA1NzgsImV4cCI6MTcxOTU2MDE3OH0.sTkh_qRF68FfTWzP6DnN2DnWtqILu6y_mu5Rv83gv6g";

document.addEventListener('DOMContentLoaded', function () {
    const clickedProduct = new URLSearchParams(window.location.search).get("id")

    fetch(url + clickedProduct, {
        headers: {
            Authorization: "Bearer " + apiKey,
        }
    })

        .then(response => response.json())
        .then(product => {

            console.log(product);
            // per visualizzare foto 
            const imgContainer = document.getElementById("image-container");
            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.style.width = '30%'; // Imposta la larghezza al 100% del contenitore
            img.style.height = 'auto';
            imgContainer.appendChild(img);
            

            // per visualizzare prezzo
            const priceInfo = document.getElementById("price-info");
            priceInfo.textContent = `Price: €${product.price}`;

            // per visualizzare nome prodotto come titolo
            const titleProduct = document.getElementById("nome-prodotto");
            titleProduct.textContent = product.name;
            
            // per visualizzare marca
            const brandInfo = document.getElementById("brand-info");
            brandInfo.textContent = `Brand: ${product.brand}`;
        })
        .catch(error => {
            console.error("Errore", error);
        });
});

