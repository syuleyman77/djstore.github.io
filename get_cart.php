<?php
session_start();
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'dj_store');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Свързването на база данни е неуспешно: ' . $conn->connect_error]);
    exit();
}

if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'Моля първо влезте.']);
    exit();
}

$username = $_SESSION['username'];


$user_query = "SELECT id FROM users WHERE username = '$username'";
$user_result = $conn->query($user_query);

if ($user_result->num_rows > 0) {
    $user = $user_result->fetch_assoc();
    $user_id = $user['id'];

    
    $cart_query = "SELECT product_name, quantity, price FROM cart WHERE user_id = $user_id";
    $cart_result = $conn->query($cart_query);

    $cart_items = [];
    if ($cart_result->num_rows > 0) {
        while ($row = $cart_result->fetch_assoc()) {
            $cart_items[] = $row;
        }
    }

    echo json_encode(['success' => true, 'cart_items' => $cart_items]);
} else {
    echo json_encode(['success' => false, 'message' => 'Няма намерен потребител.']);
}

$conn->close();
?>
