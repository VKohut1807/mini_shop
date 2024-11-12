<?php
session_start();

if (isset($_GET['id']) && isset($_GET['quantity'])) {
    $productId = $_GET['id'];
    $newQuantity = $_GET['quantity'];

    if (isset($_SESSION['product'])) {
        foreach ($_SESSION['product'] as &$product) {
            if ($product['produkt_id'] == $productId) {
                $product['quantity'] = $newQuantity;
                break;
            }
        }

        echo json_encode([
            'status' => 'success',
            'message' => 'Product quantity updated in session',
            'newQuantity' => $newQuantity,
            'productId' => $productId
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Basket is empty'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing product ID or quantity'
    ]);
}
