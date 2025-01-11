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


$data = json_decode(file_get_contents("php://input"), true);
$product_name = $conn->real_escape_string($data['product_name']);
$quantity = (int)$data['quantity'];
$price = (float)$data['price'];

$username = $_SESSION['username'];
$user_query = "SELECT id FROM users WHERE username = '$username'";
$user_result = $conn->query($user_query);

if ($user_result->num_rows > 0) {
    $user = $user_result->fetch_assoc();
    $user_id = $user['id'];

    
    $check_query = "SELECT quantity FROM cart WHERE user_id = $user_id AND product_name = '$product_name'";
    $check_result = $conn->query($check_query);

    if ($check_result->num_rows > 0) {
        
        $row = $check_result->fetch_assoc();
        $new_quantity = $row['quantity'] + $quantity;
        $update_query = "UPDATE cart SET quantity = $new_quantity WHERE user_id = $user_id AND product_name = '$product_name'";
        $conn->query($update_query);
        echo json_encode(['success' => true, 'message' => 'Количеството на продукта е увеличено.']);
    } else {
        
        $insert_query = "INSERT INTO cart (user_id, product_name, quantity, price) VALUES ($user_id, '$product_name', $quantity, $price)";
        $conn->query($insert_query);
        echo json_encode(['success' => true, 'message' => 'Продуктът е преместен в кошницата.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Няма намерен потребител.']);
}

$conn->close();
?>
