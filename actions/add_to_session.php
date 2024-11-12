<?php
include '../db.php';
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$productId = isset($data['productId']) ? $data['productId'] : null;

if ($productId) {
    $existingProductIndex = -1;
    if (isset($_SESSION['product'])) {
        foreach ($_SESSION['product'] as $index => $product) {
            if ($product['produkt_id'] === $productId) {
                $existingProductIndex = $index;
                break;
            }
        }
    }

    if ($existingProductIndex !== -1) {
        $_SESSION['product'][$existingProductIndex]['quantity'] += 1;
    } else {
        $query = "SELECT * FROM Sklep_produkty WHERE produkt_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $productId);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $product = $result->fetch_assoc();
            $product['quantity'] = 1;

            $_SESSION['product'][] = $product;
        } else {
            echo json_encode(["error" => "Product not found"]);
            exit;
        }

        $stmt->close();
    }

    echo json_encode($_SESSION['product']);
} else {
    echo json_encode(["error" => "Product ID is required"]);
}

$conn->close();
