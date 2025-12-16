const playerBoard = document.getElementById("player-board");
const enemyBoard = document.getElementById("enemy-board");
const SIZE = 10;
const NICK = "<?= $_SESSION['nick'] ?>";

function createBoard(board, isEnemy = false) {
    board.innerHTML = "";
    for (let i = 0; i < SIZE * SIZE; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.innerHTML = `<div class="name"></div>`;

        if (isEnemy) {
            cell.onclick = () => {
                if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;
                fetch("zapisz.php", {method:"POST", body: "co=strzal&nr="+i});
            };
        } else {
            cell.onclick = () => {
                cell.classList.toggle("ship");
                fetch("zapisz.php", {method:"POST", body: "co=statek&nr="+i});
            };
        }
        board.appendChild(cell);
    }
}

// Co sekundę odczytujemy dane z tego samego pliku zapisz.php
setInterval(() => {
    fetch("zapisz.php?t=" + Date.now())
    .then(r => r.text())
    .then(data => {
        document.querySelectorAll(".cell").forEach(c => {
            c.className = "cell";
            c.querySelector(".name").textContent = "";
        });

        data.split("\n").forEach(line => {
            if (!line.trim()) return;
            const [nick, typ, nr] = line.split("|");
            const p = playerBoard.children[nr];
            const e = enemyBoard.children[nr];

            // Nicki
            if (p) p.querySelector(".name").textContent += (p.querySelector(".name").textContent ? ", " : "") + nick;
            if (e) e.querySelector(".name").textContent += (e.querySelector(".name").textContent ? ", " : "") + nick;

            // Moje statki
            if (typ === "statek" && nick === NICK) p.classList.add("ship");

            // Strzały
            if (typ === "strzal") {
                const traf = p.classList.contains("ship");
                if (nick === NICK) {
                    e.classList.add(traf ? "hit" : "miss");
                } else {
                    p.classList.add(traf ? "hit" : "miss");
                }
            }
        });
    });
}, 1000);

createBoard(playerBoard, false);
createBoard(enemyBoard, true);

// Gotowe i koniec gry – zostawiam Twoje
document.getElementById("gotowe") && (document.getElementById("gotowe").onclick = () => {
    document.getElementById("info").innerHTML = "Statki ustawione!";
    document.getElementById("gotowe").disabled = true;
});

document.getElementById("koniec-link").onclick = function(e) {
    e.preventDefault();
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:200px;font-size:80px;color:red;'>KONIEC GRY</h1>";
    setTimeout(() => location.href = "statki.php", 2000);
};