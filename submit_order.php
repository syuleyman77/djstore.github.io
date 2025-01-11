<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dj_store";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$name = $_POST['name'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$cart_items = $_POST['cart_items'];
$total_price = $_POST['total_price'];


$sql = "INSERT INTO orders (name, address, phone, email, cart_items, total_price)
        VALUES ('$name', '$address', '$phone', '$email', '$cart_items', '$total_price')";

$response = array();
if ($conn->query($sql) === TRUE) {
    $response["success"] = true;
} else {
    $response["success"] = false;
    $response["message"] = "Error: " . $sql . "<br>" . $conn->error;
}


function clearCart($conn) {
    $username = $_SESSION['username'];
    $user_query = "SELECT id FROM users WHERE username = '$username'";
    $user_result = $conn->query($user_query);

    if ($user_result->num_rows > 0) {
        $user = $user_result->fetch_assoc();
        $user_id = $user['id'];

        $clear_cart_query = "DELETE FROM cart WHERE user_id = $user_id";
        if ($conn->query($clear_cart_query) === TRUE) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


if (clearCart($conn)) {
    $response = array('success' => true);
} else {
    $response = array('success' => false, 'message' => 'Кошницата не можа да бъде изчистена.');
}

$conn->close();
echo json_encode($response);
?>