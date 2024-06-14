const id = new URLSearchParams(window.location.search).get("id");
const url = id ? `https://striveschool-api.herokuapp.com/api/product/${id}` : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjJmMjdjMjM5YzAwMTUyZjRiMzgiLCJpYXQiOjE3MTgzNTA1NzgsImV4cCI6MTcxOTU2MDE3OH0.sTkh_qRF68FfTWzP6DnN2DnWtqILu6y_mu5Rv83gv6g";




window.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.onsubmit = modificaProdotto;
     
 
    
     
})

    const modifyBtn = document.querySelector("button[type='submit']"); 
     const deleteBtn = document.querySelector("button[type='button'].btn-danger");
     
     // se id c'è modifyBtn mostra modifica, sennò mostra crea
     if (id) {
                modifyBtn.innerText = "Modifica";
                modifyBtn.classList.add("btn-success");
         
         
         fetch(url, {
                    headers: { Authorization: `Bearer ${apiKey}` }
         })
         
          .then(response => response.json())
                .then(product => {
                    const { name, brand, price, description, imageUrl } = product;
                    document.getElementById("edit-name").value = name;
                    document.getElementById("edit-brand").value = brand;
                    document.getElementById("edit-price").value = price;
                    document.getElementById("edit-description").value = description;
                    document.getElementById("edit-image").value = imageUrl;

                })
         
          .catch(error => console.log(error));
            } else {
                modifyBtn.innerText = "Crea";
                modifyBtn.classList.add("btn-info");
    
}
        

     // funzione che gestisce l'invio del form   
 const modificaProdotto = event => {
            event.preventDefault();
            let updatedProduct = { //raccolgo i valori inseriti nel form
                name: event.target.elements["edit-name"].value,
                brand: event.target.elements["edit-brand"].value,
                price: event.target.elements["edit-price"].value,
                description: event.target.elements["edit-description"].value,
                imageUrl: event.target.elements["image-product"].value,
     };
     
     
     console.log(updatedProduct);

            fetch(url, {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify(updatedProduct)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Errore");
                }
            })
            .then(updatedProduct => {
                alert(`Prodotto ${updatedProduct.name} ${id ? 'modificato' : 'creato'} con successo!`);
                
                    event.target.reset();
                    window.location.href = "/homepage.html"; //reindirizza alla homepage
                

            })
            .catch(error => console.log(error));
};
        
const cancelButton = document.getElementById("cancel-btn");
const editForm = document.querySelector("form");
cancelButton.addEventListener("click", function () {
    editForm.reset(); 
});