<header class="header">
    <div class="wrapper">
        <div class="header-box">
            <a class="logo" href="#">
                <?php include 'svg/windows-logo.svg' ?>
                <span class="shop-name">OknoPlus</span>
            </a>
            <nav class="nav">
                <ul class="group">
                    <li class="element">
                        <a href="#" class="link">Home</a>
                    </li>
                    <li class="element">
                        <a href="#" class="link active">Okna</a>
                    </li>
                    <li class="element">
                        <a href="#" class="link">O nas</a>
                    </li>
                    <li class="element">
                        <a href="#" class="link">Kontakt</a>
                    </li>
                    <li class="element">
                        <button onclick="showBasketHeader()" data-count-products="<?= isset($_SESSION['product']) && is_array($_SESSION['product']) ? count($_SESSION['product']) : 0 ?>
" class="basket-icon"><?php include 'svg/bag-icon.svg' ?></button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>