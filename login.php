<?php
session_start();
$conn = new mysqli("localhost","root","","statki");

$nick = $_POST['nick'] ?? '';
$pass = $_POST['pass'] ?? '';

$sql = "SELECT * FROM login WHERE username='$nick' AND password='$pass'";
$wynik = $conn->query($sql);

if ($wynik->num_rows == 1) {
    $_SESSION['nick'] = $nick;
    header("Location: statki.php");
    exit();
} else {
    echo "ZŁY LOGIN LUB HASŁO!<br>";
    echo "<a href='logowanie.html'>Wróć</a>";
}
?>