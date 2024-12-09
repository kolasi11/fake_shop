let porductsWrapper = document.getElementById("productsWrapper")
let cart = document.getElementById("cart")
let cartItems = []
let cartItemsCount = document.querySelector(".cartItemCount")
let totalCartPrice = 0

window.addEventListener("load", displayCartItems)

async function fetchProducts() {
    try {
        let response = await fetch("https://fakestoreapi.com/products")
        let data = await response.json();
        displayProducts(data)
        console.log(data)
    } catch (error) {
        console.log(error)
        porductsWrapper.write("<h1>Somethng went wrong</h1>")
    }
}

fetchProducts()

function displayProducts(allproducts) {
    allproducts.map((product) => {
        // Creating elements dynamically
        let card = document.createElement("article")
        let productImage = document.createElement("img")
        let productTitle = document.createElement("h3")
        let btn = document.createElement("button");
        let productPrice = document.createElement("p");


        productTitle.textContent = product.title
        productPrice.textContent = `Rs.${product.price}`;
        btn.textContent = "add to cart"



        // Setting attribute dynamically
        card.setAttribute("class", "productCard")
        card.setAttribute("data-aos", "fade-up")
        card.setAttribute("data-aos-duration", "3000")
        productImage.setAttribute("src", product.image)
        productTitle.setAttribute("class", "title")

        btn.addEventListener("click", _ => {
            console.log("Added to cart")

            let existingProduct = cartItems.find((ele) => {
                return ele.id === product.id;
            })

            if (existingProduct) {
                existingProduct.quantity+=1
            } else {
                cartItems.push({...product, quantity: 1})
            }
            
            console.log(cartItems)
            localStorage.setItem("cart", JSON.stringify(cartItems))
            
            totalCartPrice += product.price
            console.log(product.price)
            cartItemsCount.textContent++
            displayCartItems()
        })

        // Appending elements
        porductsWrapper.append(card);
        card.append(productImage, productTitle, btn, productPrice)
    })
};


function displayCartItems() {
    cart.innerHTML = ""

    let cartProducts = JSON.parse(localStorage.getItem("cart"))
    console.log(cartProducts);
    cartProducts?.map((item) => {
        // Creating element
        let cartCard = document.createElement("article")
        let cartImg = document.createElement("img")
        let cartTitle = document.createElement("h3")
        let cartQunatity = document.createElement("p")
        let cartPrice = document.createElement("p")
        let removeBtn = document.createElement("button")


        removeBtn.addEventListener("click", () => {
            let index = cartItems.findIndex((ele) => ele.id === item.id)
            console.log(index)
            if (index > -1) {
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else {
                    cartItems.splice(index, 1)
                }
                
                localStorage.setItem("cart", JSON.stringify(cartItems))
                totalCartPrice -= item.price
                cartItemsCount.textContent--
                displayCartItems()
            }
        })


        // Setting attribute
        cartCard.setAttribute("class", "cartCard")
        cartTitle.textContent = item.title
        cartImg.setAttribute("src", item.image)
        cartQunatity.textContent = item.quantity
        cartPrice.textContent = `Rs. ${item.price * item.quantity}`
        removeBtn.textContent = "remove"


        // Appending to parent
        cartCard.append(cartImg, cartTitle, cartQunatity, cartPrice, removeBtn)
        cart.append(cartCard)
    })
    
    // Total Item Section
    let cartTotal = document.createElement("article")
    let cartTotalTitle = document.createElement("h3")
    let cartTotalQunatity = document.createElement("p")
    let cartTotalPrice = document.createElement("p")
    
    
    // Setting attribute total item
    cartTotal.setAttribute("class", "cartTotal")
    cartTotalTitle.textContent = "Total"
    cartTotalQunatity.textContent = cartItemsCount.textContent
    cartTotalPrice.textContent = `Rs. ${totalCartPrice}`


    // Appending to parent
    cartTotal.append(cartTotalTitle, cartTotalQunatity, cartTotalPrice)
    cart.append(cartTotal)
}