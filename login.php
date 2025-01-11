<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'dj_store');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $conn->real_escape_string($_POST['username']);
    $password = $_POST['password'];

    
    $query = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $username; 
            $_SESSION['user_id'] = $user['id']; 

            
            $user_id = $user['id'];
            $cart_query = "SELECT * FROM cart WHERE user_id = $user_id";
            $cart_result = $conn->query($cart_query);

            $cart_data = [];
            if ($cart_result->num_rows > 0) {
                while ($row = $cart_result->fetch_assoc()) {
                    $cart_data[] = $row;
                }
            }

            
            echo "<script>window.cartData = " . json_encode($cart_data) . ";</script>";

            header("Location: index.html"); 
            exit();
        } else {
            echo "Грешна парола.";
        }
    } else {
        echo "Няма намерен потребител.";
    }

    $conn->close();
}
?>