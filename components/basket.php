<?php include 'db.php'; ?>

<section id="basket" class="basket"
    style="<? (isset($_SESSION['product']) && count($_SESSION['product']) > 0) ? 'transform: translateX(0%);' : 'transform: translateX(110%);' ?>">
    <button onclick="hideBasket()" class="close-basket">X</button>


    <table id="table-basket" class="table">
        <thead>
            <tr>
                <th>Nazwa</th>
                <th>Cena (zł)</th>
                <th>Ilość</th>
                <th>Wartość (zł)</th>
                <th></th>
            </tr>
        </thead>

        <?php if (isset($_SESSION['product']) && count($_SESSION['product']) > 0): ?>
            <tbody>
                <?php foreach ($_SESSION['product'] as $index => $product): ?>
                    <tr id="productRow_<?= $product['produkt_id'] ?>">
                        <td class="nazwa">
                            <div class="image">
                                <img loading="lazy" src="/images/<?= $product['zdjecie'] ?>.jpg" alt="<?= $product["nazwa"] ?>">
                            </div>
                            <h5><?= $product["nazwa"] ?></h5>
                        </td>
                        <td><?= $product["cena"] ?></td>
                        <td>
                            <button class="quantity-button"
                                onclick="decreaseQuantity(<?= $product['produkt_id'] ?>, <?= $product['cena'] ?>)">-</button>
                            <input type="text" id="quantityInput_<?= $product['produkt_id'] ?>" class="quantity-input"
                                value=" <?= $product['quantity'] ?>"
                                onchange="updateTotalPrice(<?= $product['produkt_id'] ?>, <?= $product['cena'] ?>)" disabled>
                            <button class="quantity-button"
                                onclick="increaseQuantity(<?= $product['produkt_id'] ?>, <?= $product['cena'] ?>)">+</button>
                        </td>
                        <td><span id="totalPrice_<?= $product['produkt_id'] ?>"
                                data-total-price><?= $product["cena"] * $product['quantity'] ?></span>
                        </td>
                        <td>
                            <button onclick="removeProduct(<?= $product['produkt_id'] ?>)"
                                class="remove"><?php include 'svg/recycle.svg' ?></button>
                        </td>
                    </tr>

                <?php endforeach; ?>
            </tbody>

        <?php else: ?>
            <tr>
                <td>
                    <p>Twój koszyk jest pusty.</p>
                </td>
            </tr>
        <?php endif; ?>
    </table>
    <div class="bottom-group">
        <div class="total">
            <strong>Wartość koszyka:</strong>
            <span id="grandTotal">0</span>
        </div>
        <button onclick="buyProducts()" id="buy-products" class="buy-products">ZAMAWIAM</button>
    </div>
</section>