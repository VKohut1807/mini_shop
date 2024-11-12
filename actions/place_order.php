<?php
include '../db.php';
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['product']) && count($_SESSION['product']) > 0) {
    $query = "INSERT INTO sklep_koszyk (produkt_id, nazwa, cena, ilosc) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    foreach ($_SESSION['product'] as $product) {
        $produkt_id = $product['produkt_id'];
        $nazwa = $product['nazwa'];
        $cena = $product['cena'];
        $ilosc = $product['quantity'];

        $stmt->bind_param('isdi', $produkt_id, $nazwa, $cena, $ilosc);
        $stmt->execute();
    }

    $stmt->close();

    unset($_SESSION['product']);

    echo json_encode([
        'status' => 'success',
        'message' => 'Order placed successfully'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No products in basket'
    ]);
}

$conn->close();
