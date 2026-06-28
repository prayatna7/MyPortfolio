let goatsTurn = true;
let tigersTurn = false;
let tigerSelected = false;
let goatSelected = false;
let gameStarted = false;

let goatsRemaining = document.getElementById("goatsRemaining");

let cells = document.getElementsByClassName('childs');

let noOfGoats = 20;
let deadGoats = 0;

let previousIndex = -1;

let selectedRow = 0;
let selectedCol = 0;
let targetRow = 0;
let targetCol = 0;

const goat = "🐐";
const tiger = "🐯";

function move(n) {

    let deleted = document.getElementById(previousIndex);
    let box = document.getElementById(n);

    if (goatsTurn) {

        if (noOfGoats > 0) {

            if (box.innerHTML == "") {

                box.innerHTML = goat;

                goatIsPlaced();

                resetMessage.value = "Tiger's Turn.";

                goatsTurn = false;
                tigersTurn = true;

                checkGoatVictory();
            }

        }

        else if (noOfGoats == 0 && box.innerHTML == goat) {

            goatSelected = true;

            box.classList.add("isselected");

            previousIndex = n;

            goatsTurn = false;

            selectedRow = parseInt(n / 5);
            selectedCol = n % 5;
        }

    }

    else if (tigersTurn) {

        if (box.innerHTML == tiger) {

            tigerSelected = true;

            box.classList.add("isselected");

            previousIndex = n;

            tigersTurn = false;
        }
    }
    else if (tigerSelected===true && box.innerHTML== tiger) {

        if (box.innerHTML == tiger) {

            tigerSelected = true;

            box.classList.add("isselected");
            deleted.classList.remove("isselected");

            previousIndex = n;

            tigersTurn = false;
        }
    }

    else if (deleted && deleted.innerHTML == goat && goatSelected) {

        if (box.innerHTML == "") {

            let a = targetRow = parseInt(n / 5);
            let c = targetCol = n % 5;

            let b = selectedRow = parseInt(previousIndex / 5);
            let d = selectedCol = previousIndex % 5;

            let destination = targetRow + targetCol;
            let source = selectedRow + selectedCol;

            if (
                (source % 2 == 1 && destination % 2 == 1) != true &&
                Math.abs(a - b) <= 1 &&
                Math.abs(c - d) <= 1
            ) {

                box.innerHTML = goat;

                deleted.classList.remove("isselected");

                deleted.innerHTML = "";

                previousIndex = -1;

                goatSelected = false;

                goatsTurn = false;
                tigersTurn = true;

                checkGoatVictory();

            } else {

                resetMessage.value = "⚠️Invalid Move!";
            }
        }
    }

    else if (deleted && deleted.innerHTML == tiger && tigerSelected) {

        if (box.innerHTML == "") {

            let a = targetRow = parseInt(n / 5);
            let c = targetCol = n % 5;

            let b = selectedRow = parseInt(previousIndex / 5);
            let d = selectedCol = previousIndex % 5;

            let destination = targetRow + targetCol;
            let source = selectedRow + selectedCol;

            let midpoint = (Number(previousIndex) + Number(n)) / 2;

            if (
                (source % 2 == 1 && destination % 2 == 1) != true &&
                Math.abs(a - b) <= 1 &&
                Math.abs(c - d) <= 1
            ) {

                box.innerHTML = tiger;

                deleted.classList.remove("isselected");

                deleted.innerHTML = "";

                previousIndex = -1;

                tigerSelected = false;

                goatsTurn = true;

                resetMessage.value = "Goat's Turn!";

            }

            else if (

                (Math.abs(c - d) == 2 || Math.abs(a - b) == 2) &&
                document.getElementById(midpoint).innerHTML == goat

            ) {

                box.innerHTML = tiger;

                deleted.classList.remove("isselected");

                deleted.innerHTML = "";

                document.getElementById(midpoint).innerHTML = "";

                deadGoats++;

                tigerSelected = false;

                previousIndex = -1;

                goatsTurn = true;

                resetMessage.value =
                    deadGoats + " Goat Is Killed!";
            }

            else {

                resetMessage.value = "⚠️Invalid Move!";
            }
        }

        if (deadGoats >= 20) {

            // if (confirm("Tiger Won!\nStart New Game?")) {
            //     location.reload();
            // }
            resetMessage.value = "🐅Tiger Won!🐯";
            showVictory("tiger");
        }
    }
}

function isLegalMove(from, to) {

    let sr = parseInt(from / 5);
    let sc = from % 5;

    let tr = parseInt(to / 5);
    let tc = to % 5;

    if (
        tr < 0 ||
        tr > 4 ||
        tc < 0 ||
        tc > 4
    ) return false;

    let source = sr + sc;
    let destination = tr + tc;

    if (
        source % 2 == 1 &&
        destination % 2 == 1
    ) {
        return false;
    }

    return true;
}



function getTigerMoves() {

    let moves = 0;

    for (let i = 0; i < 25; i++) {

        let tigerCell =
            document.getElementById(i);

        if (
            tigerCell.innerHTML !== "🐯"
        )
            continue;

        let row =
            parseInt(i / 5);

        let col =
            i % 5;

        const directions = [

            [-1,0],
            [1,0],
            [0,-1],
            [0,1],

            [-1,-1],
            [-1,1],
            [1,-1],
            [1,1]

        ];


        for (let [dr, dc] of directions) {

            let nr = row + dr;

            let nc = col + dc;

            let next =
                nr * 5 + nc;

            if (
                nr >= 0 &&
                nr < 5 &&
                nc >= 0 &&
                nc < 5 &&
                isLegalMove(i, next)
            ) {

                let target =
                    document
                    .getElementById(next);

                if (
                    target.innerHTML === ""
                ) {

                    moves++;
                }
            }


            let jr = row + dr * 2;

            let jc = col + dc * 2;

            let jump =
                jr * 5 + jc;

            let mr =
                row + dr;

            let mc =
                col + dc;

            let middle =
                mr * 5 + mc;

            if (
                jr >= 0 &&
                jr < 5 &&
                jc >= 0 &&
                jc < 5 &&
                isLegalMove(i, jump)
            ) {

                let middleBox =
                    document
                    .getElementById(
                        middle
                    );

                let jumpBox =
                    document
                    .getElementById(
                        jump
                    );

                if (

                    middleBox &&
                    jumpBox &&

                    middleBox.innerHTML
                    === "🐐"

                    &&

                    jumpBox.innerHTML
                    === ""

                ) {

                    moves++;
                }
            }

        }

    }

    return moves;
}



function checkGoatVictory() {

    if (
        getTigerMoves() === 0
    ) {

        resetMessage.value =
            "🐐 GOAT WON!";
        showVictory("goat");

    }

}

function resetfn() {

    location.reload();
}



function goatIsPlaced() {

    gameStarted = true;

    noOfGoats--;

    goatsRemaining.value =
        noOfGoats +
        " Goats Remaining";
}



window.addEventListener(
    "beforeunload",
    function (event) {

        if (gameStarted) {

            event.preventDefault();

            event.returnValue = "";
        }
    }
);

