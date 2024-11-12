<?php
include 'db.php';
session_start();

$sql = "SELECT * FROM Sklep_produkty";
$result = mysqli_query($conn, $sql);
$products = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href="favicon.ico" type="image/ico" />
    <title>Sklep Internetowy</title>
    <meta name="description" content="Odwiedź nasz sklep internetowy!">
    <meta name="robots" content="noindex" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet" />

    <link rel="stylesheet" href="scss/global/global.css" />
    <link rel="stylesheet" href="scss/sections/section.css" />
</head>

<body>
    <?php include 'components/header.php' ?>

    <main class="main">
        <div class="wrapper">
            <?php if (!empty($products)): ?>
                <ul class="products-box">
                    <?php foreach ($products  as $row): ?>
                        <li class="product-box">
                            <div class="image">
                                <img loading="lazy" src="/images/<?= $row['zdjecie'] ?>.jpg" alt="<?= $row["nazwa"] ?>">
                                <img loading="lazy" data-hover-image src="/images/<?= $row['zdjecie'] ?>-rt.jpg"
                                    alt="<?= $row["nazwa"] ?>">
                            </div>
                            <div class="description">
                                <h3><?= $row["nazwa"] ?></h3>
                                <div class="footer-card">
                                    <div class="price"><?= $row["cena"] ?> zł</div>
                                    <button onclick="addProduct(<?= $row['produkt_id'] ?>)"
                                        data-product-id="<?= $row['produkt_id'] ?>" class="add-to-basket">
                                        <?php include 'svg/basket.svg' ?>
                                    </button>
                                </div>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>

            <?php else: ?>
                <p>Produkty nie zostały znalezione.</p>
            <?php endif; ?>
        </div>
    </main>

    <div id="backdrop" class="backdrop"></div>
    <?php include 'components/basket.php' ?>


    <?php include 'components/footer.php' ?>
    <script src="js/index.js">
    </script>
</body>

</html>