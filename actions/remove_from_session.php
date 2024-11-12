<?php
session_start();

if (isset($_GET['id'])) {
    $productId = $_GET['id'];

    if (isset($_SESSION['product'])) {
        $filteredProducts = array_filter($_SESSION['product'], function ($product) use ($productId) {
            return $product['produkt_id'] != $productId;
        });

        if (count($filteredProducts) !== count($_SESSION['product'])) {
            $_SESSION['product'] = array_values($filteredProducts);
            echo json_encode([
                'status' => 'success',
                'message' => 'Product removed',
                'product-count' => count($_SESSION['product'])
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Product not found'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Basket is empty'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'No product ID provided'
    ]);
}
