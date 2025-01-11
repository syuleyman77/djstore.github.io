<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'dj_store');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Veritabanı bağlantısı başarısız: ' . $conn->connect_error]);
    exit();
}

if (!isset($_SESSION['username'])) {
    echo json_encode(['success' => false, 'message' => 'Lütfen önce giriş yapın.']);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$product_name = $conn->real_escape_string($data['product_name']);
$new_quantity = isset($data['new_quantity']) ? (int)$data['new_quantity'] : null;

$username = $_SESSION['username'];
$user_query = "SELECT id FROM users WHERE username = '$username'";
$user_result = $conn->query($user_query);

if ($user_result->num_rows > 0) {
    $user = $user_result->fetch_assoc();
    $user_id = $user['id'];

    
    if ($new_quantity !== null) {
        if ($new_quantity > 0) {
            
            $update_query = "UPDATE cart SET quantity = $new_quantity WHERE user_id = $user_id AND product_name = '$product_name'";
            if ($conn->query($update_query) === TRUE) {
                echo json_encode(['success' => true, 'message' => 'Количество на продукта е актулизиран.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Актуализацията е неуспешна : ' . $conn->error]);
            }
        } else {
            
            $delete_query = "DELETE FROM cart WHERE user_id = $user_id AND product_name = '$product_name'";
            if ($conn->query($delete_query) === TRUE) {
                echo json_encode(['success' => true, 'message' => 'Продуктът е премахнат от кошницата.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Премахването е неуспешно: ' . $conn->error]);
            }
        }
    } elseif (isset($data['remove']) && $data['remove'] === true) {
        
        $delete_query = "DELETE FROM cart WHERE user_id = $user_id AND product_name = '$product_name'";
        if ($conn->query($delete_query) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Продуктът е премахнат от кошницата.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Премахването е неуспешно: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Невалидно действие.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Потребителят не е намерен.']);
}

$conn->close();
?>
