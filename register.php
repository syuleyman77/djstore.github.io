<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'dj_store'); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $conn->real_escape_string($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 

    
    $query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
    if ($conn->query($query) === TRUE) {
        echo "Регистрирането е успешно.Върни се за да влезеш.";
    } else {
        echo "Грешка: " . $conn->error;
    }

    $conn->close();
}
?>
