const playerBoard = document.getElementById("player-board");
const enemyBoard = document.getElementById("enemy-board");
const SIZE = 10;

// Tworzymy plansze
function createBoard(board, isEnemy = false) {
    board.innerHTML = "";
    for (let i = 0; i < SIZE * SIZE; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;

        // Kliknięcie na własnej planszy – stawiamy/usuwa statki
        if (!isEnemy) {
            cell.onclick = () => cell.classList.toggle("ship");
        }

        board.appendChild(cell);
    }
}

// Przycisk "Statki ustawione" – wysyła WSZYSTKIE statki naraz
document.getElementById("gotowe").onclick = function() {
    let lista = "";
    document.querySelectorAll("#player-board .ship").forEach(cell => {
        lista += cell.dataset.index + ",";
    });

    if (lista === "") {
        document.getElementById("info").innerHTML = "Nie ustawiłeś żadnych statków!";
        return;
    }

    // Wysyłamy tylko raz – po kliknięciu przycisku
    fetch("zapisz.php?statki=" + lista)
        .then(response => response.text())
        .then(odp => {
            document.getElementById("info").innerHTML = odp;
            this.disabled = true;  // blokujemy przycisk
            this.textContent = "ZAPISANO!";
        })
        .catch(err => {
            document.getElementById("info").innerHTML = "Błąd wysyłania!";
            console.error(err);
        });
};

// Koniec gry – Twój efekt
document.getElementById("koniec-link").onclick = function(e) {
    e.preventDefault();
    document.body.innerHTML = "<h1 style='text-align:center; margin-top:200px; font-size:80px; color:red;'>KONIEC GRY</h1>";
    setTimeout(() => {
        window.location.href = "statki.php";
    }, 2000);
};

// Start – tworzymy plansze
createBoard(playerBoard, false);  // własna – można klikać
createBoard(enemyBoard, true);    // wroga – na razie pusta (można później dodać strzelanie)