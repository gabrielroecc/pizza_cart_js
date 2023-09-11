let qtdPizza = 1;
let qtdPizzaCart = 0;
let cartBg = document.querySelector(".background_cart");
let cart = document.querySelector(".cart");
let cartQtd = 0;
let totalPayment = 0;

pizzaJson.map((item) => {
  let pizzaCard = document.querySelector(".pizza_card").cloneNode(true);
  pizzaCard.querySelector(".pizza_img").src = item.img;
  pizzaCard.querySelector(".pizza_name").innerHTML = item.name;
  pizzaCard.querySelector(".pizza_price").innerHTML = item.price;
  pizzaCard.querySelector(".pizza_description").innerHTML = item.description;

  document.querySelector(".pizza_area").append(pizzaCard);

  pizzaCard.addEventListener("click", (e) => {
    document.querySelectorAll(".pizza_card").forEach((item) => {
      item.style.pointerEvents = "none";
    });

    let modalImg = document.createElement("img");
    modalImg.src = item.img;
    let modalPizzaInfo = document.createElement("div");
    modalPizzaInfo.innerHTML = `<div class="modalTitleAndDescription">
			<h1 class="modalTitle">${item.name}</h1>
			<p class="modalDescription">${item.description}</p>
		</div>
		
		<div class="modalSize">
			<h1 class="sizeText">TAMANHO</h1>
				<div class="sizes">
					<div data-key="P" class="pizzaInfo_size">
						Pequena <span>6 fatias</span>
					</div>

					<div data-key="M" class="pizzaInfo_size">
						Média <span>8 fatias</span>
					</div>

					<div data-key="G" class="pizzaInfo_size selected">
						Grande <span>12 fatias</span>
					</div>
				</div>	
		</div>
		
		<div class="modalPrice">
			<h1 class="priceText">Preço</h1>
			<div class="pizzaPrice">
			<p class="pizzaPriceActual">R$${item.price.toFixed(2)}</p>
				<div class="modalPrice_qtd">
					<button class="qtd_increase">+</button>
					<div class="qtd_actual">${qtdPizza}</div>
					<button class="qtd_decrease">-</button>
				</div>
						
			</div>	
		</div>
		
		<div class="modalBtns">
			<div class="buy">COMPRAR</div>
			<div class="cancel">Cancelar</div>
		</div>`;

    document.querySelector(".modal_pizza").style.opacity = "1";
    document.querySelector(".modal_pizza").style.pointerEvents = "all";
    document.querySelector(".background").style.opacity = "1";
    document.querySelector(".background").style.pointerEvents = "all";
    document.querySelector(".modal_pizza").appendChild(modalImg);
    document.querySelector(".modal_pizza").appendChild(modalPizzaInfo);

    const sizes = document.querySelectorAll(".pizzaInfo_size");
    let pizzaSize = "Grande";
    pizzaPriceActual = document.querySelector(".pizzaPriceActual");

    pizzaPriceInitial = parseFloat(
      pizzaPriceActual.textContent.match(/\d+/)[0]
    );

    sizes.forEach((sizeElement) => {
      sizeElement.addEventListener("click", (e) => {
        const target = e.target;
        const dataKey = target.dataset.key;

        if (target.classList.contains("pizzaInfo_size")) {
          qtdPizza = 1;

          document.querySelector(".qtd_actual").innerHTML = qtdPizza;
          sizes.forEach((element) => {
            element.classList.remove("selected");
          });
          target.classList.add("selected");
        }
        if (dataKey === "P") {
          pizzaPriceActual.innerHTML = `R$${(item.price - 10).toFixed(2)}`;
          pizzaSize = "Pequena";
          pizzaPriceInitial = parseFloat(
            pizzaPriceActual.textContent.match(/\d+/)[0]
          );
        } else if (dataKey === "M") {
          pizzaPriceActual.innerHTML = `R$${(item.price - 5).toFixed(2)}`;
          pizzaSize = "Média";
          pizzaPriceInitial = parseFloat(
            pizzaPriceActual.textContent.match(/\d+/)[0]
          );
        } else {
          pizzaPriceActual.innerHTML = `R$${item.price.toFixed(2)}`;
          pizzaSize = "Grande";
          pizzaPriceInitial = parseFloat(
            pizzaPriceActual.textContent.match(/\d+/)[0]
          );
        }
      });
    });

    document.querySelector(".qtd_increase").addEventListener("click", () => {
      qtdPizza++;
      document.querySelector(".qtd_actual").innerHTML = qtdPizza;

      let newPrice = pizzaPriceInitial * qtdPizza;
      pizzaPriceActual.innerHTML = `R$${newPrice.toFixed(2)}`;
    });

    document.querySelector(".qtd_decrease").addEventListener("click", (e) => {
      if (qtdPizza > 1) {
        qtdPizza--;
        document.querySelector(".qtd_actual").innerHTML = qtdPizza;

        let newPrice = pizzaPriceInitial * qtdPizza;
        pizzaPriceActual.innerHTML = `R$${newPrice.toFixed(2)}`;
      }
    });

    document.querySelector(".cancel").addEventListener("click", (e) => {
      modalImg.remove();
      modalPizzaInfo.remove();
      document.querySelector(".modal_pizza").style.opacity = "0";
      document.querySelector(".modal_pizza").style.pointerEvents = "none";
      document.querySelector(".background").style.opacity = "0";
      document.querySelector(".background").style.pointerEvents = "none";
      document.querySelectorAll(".pizza_card").forEach((item) => {
        item.style.pointerEvents = "all";
      });
    });
    document.querySelector(".buy").addEventListener("click", (e) => {
      document.querySelector(".pizza_cart_qtd").innerHTML = ++cartQtd;
      const selectedPizzaImg = item.img;
      const selectedPizzaQuantity = qtdPizza;
      const selectedPizzaName = item.name;
      const selectedPizzaSize = pizzaSize;
      const selectedPizzaPrice = pizzaPriceInitial * qtdPizza;
      totalPayment += selectedPizzaPrice;

      document.querySelector(
        ".subtotal_value"
      ).innerHTML = `R$${totalPayment.toFixed(2)}`;
      document.querySelector(
        ".total_value"
      ).innerHTML = `R$${totalPayment.toFixed(2)}`;

      const pizzaCartItem = document.createElement("div");
      pizzaCartItem.classList.add("pizza_item_wrapper");
      pizzaCartItem.innerHTML = `
				<div class="pizza_item_cart">
				<img src=${selectedPizzaImg}/>
					<div class="pizza_name_cart">
						<div class="pizza_name_size_wrapper"> 
							<div class="pizzaNameSelected">${selectedPizzaName}</div>
							<div class="pizzaSizzeSelected">${selectedPizzaSize}</div>
						</div>
						<div class="pizza_qtd_cart">${selectedPizzaQuantity}</div>
						<div class="removePizza">Remover</div>
					</div>
				</div>`;

      const cartElement = document.querySelector(".cart");

      cartElement.insertBefore(
        pizzaCartItem,
        cartElement.querySelector(".subtotal_wrapper")
      );

      const removeButton = pizzaCartItem.querySelector(".removePizza");
      removeButton.addEventListener("click", () => {
        totalPayment -= selectedPizzaPrice;

        document.querySelector(
          ".subtotal_value"
        ).innerHTML = `R$${totalPayment.toFixed(2)}`;
        document.querySelector(
          ".total_value"
        ).innerHTML = `R$${totalPayment.toFixed(2)}`;

        pizzaCartItem.remove();
        document.querySelector(".pizza_cart_qtd").innerHTML = --cartQtd;
      });
    });

    document.querySelector(".buy").addEventListener("click", (e) => {
      document.querySelector(".cart").classList.add("active");
      document.querySelector(".background_cart").style.opacity = "1";
      document.querySelector(".background_cart").style.pointerEvents = "all";
      modalImg.remove();
      modalPizzaInfo.remove();
      document.querySelector(".modal_pizza").style.opacity = "0";
      document.querySelector(".modal_pizza").style.pointerEvents = "none";
      document.querySelector(".background").style.opacity = "0";
      document.querySelector(".background").style.pointerEvents = "none";
      document.querySelectorAll(".pizza_card").forEach((item) => {
        item.style.pointerEvents = "all";
      });
      document
        .querySelector(".background_cart")
        .addEventListener("click", (e) => {
          document.querySelector(".cart").classList.remove("active");
          cartBg.style.opacity = "0";
          cartBg.style.pointerEvents = "none";
        });
    });
  });

  document.querySelector(".menu_btn").addEventListener("click", (e) => {
    cart.classList.add("active");
    cartBg.style.opacity = "1";
    cartBg.style.pointerEvents = "all";

    cartBg.addEventListener("click", (e) => {
      document.querySelector(".cart").classList.remove("active");
      cartBg.style.opacity = "0";
      cartBg.style.pointerEvents = "none";
    });
  });
});
