<!DOCTYPE html>
<?php session_start(); ?>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="style.css">
  <title>Statki</title>
</head>
<body>
<?php
if (isset($_SESSION['nick'])) {
    echo "<h2>Witaj w grze, <span style='color: green; font-weight: bold;'>" . $_SESSION['nick'] . "</span>!</h2>";
} else {
    echo "<h2 style='color: red;'>Nie jesteś zalogowany!</h2>";
    echo "<a href='logowanie.html'>Zaloguj się</a>";
    exit(); // blokuje grę bez logowania
}
?>
  <h1>Gra w Statki</h1>
    <div id="wraper">
        <div id="nav">
        <a href="statki.php" id="koniec-link">Koniec gry</a>
            <!-- <a href="rejestracja.php" target="_blank">Rejestruj gracza</a> -->
        </div>
        <div id="plansza">
  <div class="boards">
    <div>
      <h2>Twoja plansza</h2>
      <div id="player-board" class="board"></div>
    </div>
    <div>
      <h2>Plansza przeciwnika</h2>
      <div id="enemy-board" class="board"></div>
    </div>
  </div>

  <div id="przycisk">
    <button id="gotowe">Statki ustawione</button>
  <div id="info"></div>
  
  <script src="script2.js"></script>
</body>
</html>