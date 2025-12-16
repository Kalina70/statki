<?php
session_start();                     // ← koniecznie na początku!

// Jeśli nie ma sesji – nie pozwalamy zapisywać
if (!isset($_SESSION['nick'])) {
    echo "Nie jesteś zalogowany!";
    exit();
}

$nick = $_SESSION['nick'];           // ← tu jest Twoja nazwa gracza

$conn = new mysqli("localhost", "root", "", "statki");

if ($conn->connect_error) {
    die("Błąd połączenia z bazą!");
}

// Czyścimy stare statki TEGO gracza (po nicku!)
$conn->query("DELETE FROM statk WHERE nick='$nick'");

// Pobieramy listę pól (np. ?statki=12,23,45,)
$numery = $_GET["statki"] ?? "";
if ($numery === "") {
    echo "Brak statków do zapisania!";
    exit();
}

$tab = explode(",", $numery);
$zapisano = 0;

foreach ($tab as $n) {
    $n = trim($n);
    if ($n === "") continue;

    $wiersz = intdiv((int)$n, 10);   // wiersz
    $kolumna = (int)$n % 10;         // kolumna

    // Zapisujemy z nickiem zamiast gracz_id
    $sql = "INSERT INTO statk (nick, wiersz, kolumna) VALUES ('$nick', $wiersz, $kolumna)";
    if ($conn->query($sql) === TRUE) {
        $zapisano++;
    }
}

echo "Zapisano $zapisano statków dla gracza: <b>$nick</b>!";
$conn->close();
?>