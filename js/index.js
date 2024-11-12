document.addEventListener("DOMContentLoaded", function () {
  updateGrandTotal();
  clickOutsideBasket();
  imageHover();
});

function imageHover() {
  document.querySelectorAll("[data-hover-src]").forEach((image) => {
    const originalSrc = image.src;

    image.addEventListener("mouseover", () => {
      image.src = image.getAttribute("data-hover-src");
    });

    image.addEventListener("mouseout", () => {
      image.src = originalSrc;
    });
  });
}

function increaseQuantity(id, unitPrice) {
  const quantityInput = document.getElementById(`quantityInput_${id}`);
  let newQuantity = parseInt(quantityInput.value) + 1;

  quantityInput.value = newQuantity;
  updateTotalPrice(id, unitPrice);
  updateProductQuantity(id, newQuantity);
}

function decreaseQuantity(id, unitPrice) {
  const quantityInput = document.getElementById(`quantityInput_${id}`);
  let newQuantity = parseInt(quantityInput.value) - 1;

  if (newQuantity > 0) {
    quantityInput.value = newQuantity;
    updateTotalPrice(id, unitPrice);
    updateProductQuantity(id, newQuantity);
  }
}

function updateProductQuantity(id, newQuantity) {
  fetch(`actions/update_quantity.php?id=${id}&quantity=${newQuantity}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("Product quantity updated in session");
      } else {
        console.error("Error updating product quantity:", data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function updateTotalPrice(id, unitPrice) {
  const quantityInput = document.getElementById(`quantityInput_${id}`);
  const totalPrice = unitPrice * parseInt(quantityInput.value);
  const formattedTotalPrice = totalPrice.toFixed(2);
  document.getElementById(`totalPrice_${id}`).textContent = formattedTotalPrice;

  updateGrandTotal();
}

function updateGrandTotal() {
  let grandTotal = 0;
  const totalPrices = document.querySelectorAll("[data-total-price]");

  totalPrices.forEach((totalPriceElem) => {
    const price = parseFloat(totalPriceElem.textContent);
    grandTotal += price;
  });

  const grandTotalElem = document.getElementById("grandTotal");
  if (grandTotalElem) {
    grandTotalElem.textContent = grandTotal.toFixed(2) + " zł";
  }
}

function removeProduct(id) {
  fetch(`actions/remove_from_session.php?id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        const countProducts = document.querySelector("[data-count-products]");
        countProducts.setAttribute(
          "data-count-products",
          data["product-count"]
        );

        document.getElementById(`productRow_${id}`).remove();
        updateGrandTotal();
      } else {
        console.error("Failed to remove product");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function showBasket() {
  const basket = document.getElementById("basket");

  basket.style.transform = "translateX(0%)";

  const backdrop = document.querySelector("#backdrop");
  backdrop.style.display = "block";
}

function showBasketHeader() {
  const basket = document.getElementById("basket");
  basket.style.transform = "translateX(0%)";

  const backdrop = document.querySelector("#backdrop");
  backdrop.style.display = "block";
}

function hideBasket() {
  const basket = document.getElementById("basket");
  basket.style.transform = "translateX(110%)";

  const backdrop = document.querySelector("#backdrop");
  backdrop.style.display = "none";
}

function clickOutsideBasket() {
  document.addEventListener("click", (event) => {
    const basket = document.getElementById("basket");
    const basketButton = document.querySelector("button");
    if (
      basket &&
      !basket.contains(event.target) &&
      event.target !== basketButton
    ) {
      hideBasket();
    }
  });
}

function createProductRow(product) {
  const row = document.createElement("tr");
  row.id = `productRow_${product.produkt_id}`;

  const totalPrice = (product.cena * product.quantity).toFixed(2);

  row.innerHTML = `
    <td>
        <div class="image">
            <img loading="lazy" src="/images/${product.zdjecie}.jpg" alt="${product.nazwa}">
        </div>
        <h5>${product.nazwa}</h5>
    </td>
    <td>${product.cena}</td>
    <td>
        <button class="quantity-button" onclick="decreaseQuantity(${product.produkt_id}, ${product.cena})">-</button>
        <input type="text" disabled id="quantityInput_${product.produkt_id}" class="quantity-input" value="${product.quantity}" onchange="updateTotalPrice(${product.produkt_id}, ${product.cena})">
        <button class="quantity-button" onclick="increaseQuantity(${product.produkt_id}, ${product.cena})">+</button>
    </td>
    <td><span id="totalPrice_${product.produkt_id}" data-total-price>${totalPrice}</span></td>
    <td>
        <button onclick="removeProduct(${product.produkt_id})" class="remove">
              <svg
                width="64"
                height="73"
                viewBox="0 0 64 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.87986 5.35313H22.5892V3.6641V3.65642C22.5892 3.60027 22.5904 3.54649 22.5974 3.49153C22.6418 2.55069 23.0478 1.69671 23.6707 1.07677L23.6665 1.07264C24.319 0.42019 25.225 0.0147746 26.2225 0.00531885L26.2361 0.00650082V0H26.2545H38.0056H38.015C38.0777 0 38.1374 0.00531885 38.1976 0.0130016C39.1332 0.0626443 39.9818 0.462149 40.5994 1.08268C41.2507 1.73513 41.6549 2.63992 41.6649 3.63278L41.6632 3.64519H41.6715V3.6641V5.35254H61.1201H61.1302C61.2117 5.35254 61.2886 5.36081 61.3672 5.37263C62.0657 5.43528 62.6992 5.742 63.1602 6.20592L63.1626 6.21006L63.1655 6.20592C63.6685 6.71239 63.9846 7.41626 63.9935 8.19635L63.9923 8.21527H64.0006V8.23418V14.6339C64.0006 15.5039 63.2944 16.2089 62.4244 16.2089H62.3831H1.57615C0.706226 16.2083 0 15.5033 0 14.6339V14.5967V8.23418V8.2259C0 8.16326 0.00236393 8.10121 0.0106377 8.03974V8.02733C0.0632353 7.31402 0.379412 6.66571 0.851017 6.19647L0.84688 6.19528C1.35631 5.68645 2.06253 5.37027 2.84263 5.35963L2.86154 5.36081V5.35313H2.87986ZM45.9726 29.0155H42.4592V62.1656H45.9726V29.0155ZM34.5489 29.0155H31.0337V62.1656H34.5489V29.0155ZM23.1252 29.0155H19.6112V62.1656H23.1252V29.0155ZM6.40449 18.6568H58.0476L58.2125 18.6674L58.2876 18.6715L58.3667 18.678H58.3721L58.4684 18.6916C59.2739 18.788 60.0274 19.1579 60.5794 19.701C61.194 20.3068 61.587 21.1283 61.587 22.0437C61.587 22.1016 61.5817 22.1578 61.5758 22.2127L61.5746 22.2529L61.5663 22.3439L57.1972 69.2296L57.193 69.255H57.1972L57.1877 69.3372L57.1576 69.5044L57.1564 69.5074L57.1552 69.518C57.1227 69.7136 57.0843 69.8998 57.0317 70.0664L57.0276 70.0795L57.0264 70.0824L57.0211 70.093L57.0075 70.1297L57.0051 70.1421C56.9354 70.3513 56.8491 70.5546 56.7498 70.7384C56.1535 71.8494 55.0484 72.6219 53.6743 72.6219H10.7145L10.5686 72.6136V72.6154L10.5621 72.6136L10.5432 72.6112C10.2713 72.5976 10.0178 72.5574 9.78196 72.4918C9.53671 72.4233 9.29854 72.3228 9.07456 72.1993L9.06924 72.1981L9.06806 72.1993C8.01315 71.6219 7.30988 70.4961 7.19464 69.2314L2.884 22.3333L2.8775 22.2594L2.871 22.1134L2.86864 22.0449H2.86568C2.86568 21.1271 3.25809 20.3038 3.87449 19.6981C4.45129 19.1337 5.24557 18.7531 6.09423 18.678L6.16633 18.6757V18.6715L6.34362 18.6639L6.40508 18.665V18.6568H6.40449ZM58.0482 21.8091H6.40449V21.8049L6.33594 21.8073C6.23961 21.8203 6.14564 21.8699 6.07709 21.9385C6.03985 21.9757 6.01562 22.0165 6.01562 22.0443H6.01149L6.01562 22.114L10.3192 68.9459H10.318L10.3192 68.953C10.3381 69.1752 10.4385 69.3614 10.5833 69.4406L10.5822 69.443L10.6318 69.4619L10.669 69.469H10.7145H53.6761C53.7984 69.469 53.9119 69.3762 53.9822 69.2462L54.0319 69.1297L54.0638 69.0021L54.0721 68.9205H54.075L58.4388 22.1087L58.4371 22.0437C58.4371 22.0171 58.4128 21.9781 58.3762 21.942C58.3053 21.8723 58.2072 21.8227 58.1097 21.8079L58.0482 21.8091ZM24.1636 8.50367H3.15113V13.0578H60.8489V8.50367H40.1319H40.0947C39.2248 8.50367 38.5203 7.79921 38.5203 6.92929V3.6641V3.64519H38.5245C38.5203 3.51517 38.4618 3.38929 38.3714 3.29946C38.2904 3.21613 38.1799 3.16413 38.0635 3.15053H38.015H38.0056H26.2545H26.2361V3.14699C26.1103 3.15113 25.9867 3.20845 25.8957 3.30005L25.8934 3.29769L25.8892 3.30005C25.8118 3.37925 25.7527 3.48503 25.7362 3.59614L25.7403 3.65642V3.6641V6.92869C25.7397 7.79862 25.0335 8.50367 24.1636 8.50367Z"
                  fill="black"
                />
              </svg>
        </button>
    </td>
  `;

  return row;
}

function addProduct(productId) {
  fetch("actions/add_to_session.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({productId: productId}),
  })
    .then((response) => response.json())
    .then((data) => {
      const countProducts = document.querySelector("[data-count-products]");
      countProducts.setAttribute("data-count-products", data.length);

      const table = document.querySelector("#table-basket");
      const oldTbody = table.querySelector("tbody");

      if (oldTbody) {
        table.removeChild(oldTbody);
      }

      const newTbody = document.createElement("tbody");

      data.forEach((product) => {
        const productRow = createProductRow(product);
        newTbody.appendChild(productRow);
      });

      table.appendChild(newTbody);

      updateGrandTotal();
      showBasket();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buyProducts() {
  fetch("actions/place_order.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        alert(data.message);
        location.reload();
      }
    })
    .catch((error) => console.error("Error:", error));
}
