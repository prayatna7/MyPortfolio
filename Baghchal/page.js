let board= document.getElementById("board1");
let t=0;
let c=0;
function changeimg(){
    let n= 20;
    const now= new Date();
    t= String(now.getSeconds()).padStart(2, '0');
    t= parseInt(t/n);
    if(c!=t){
    if(t==0){
        board.style.backgroundImage= "url(lines.png), url(BG1.webp)";
    }
    else if(t==1){
        board.style.backgroundImage= "url(lines.png), url(BG2.webp)";
    }
    else{
       board.style.backgroundImage= "url(lines.png), url(BG3.webp)"; 
    }
    c=t;
}
}
setInterval(changeimg, 1000);
// ------------------------------
// Victory System
// ------------------------------


function showVictory(winner){


    let popup =
    document.getElementById("victoryPopup");


    let emoji =
    document.getElementById("victoryEmoji");


    let title =
    document.getElementById("victoryTitle");


    let message =
    document.getElementById("victoryMessage");



    popup.style.display="flex";



    if(winner==="tiger"){


        emoji.innerHTML="🐅🔥";


        title.innerHTML=
        "TIGERS WIN!";


        message.innerHTML=
        "The mighty tiger has defeated the goat army! ROAAAR 🐅";


        playTigerRoar();


    }



    else if(winner==="goat"){


        emoji.innerHTML="🐐🎉";


        title.innerHTML=
        "GOATS WIN!";


        message.innerHTML=
        "The goats trapped the tiger! Myaa Myaa 🐐";


        playGoatSound();


    }


}




function closeVictoryPopup(){


    document
    .getElementById("victoryPopup")
    .style.display="none";


}




function newGame(){


    location.reload();


}







// Tiger roar sound generator

function playTigerRoar(){


    let audio =
    new AudioContext();


    let oscillator =
    audio.createOscillator();


    let gain =
    audio.createGain();



    oscillator.type="sawtooth";


    oscillator.frequency.value=120;


    gain.gain.value=.4;



    oscillator.connect(gain);

    gain.connect(audio.destination);



    oscillator.start();


    oscillator.frequency.exponentialRampToValueAtTime(
        40,
        audio.currentTime+1
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        audio.currentTime+1
    );


    oscillator.stop(
        audio.currentTime+1
    );


}






// Goat "Myaa Myaa" sound generator


function playGoatSound(){


    let audio =
    new AudioContext();



    let oscillator =
    audio.createOscillator();



    let gain =
    audio.createGain();



    oscillator.type="triangle";


    oscillator.frequency.value=700;


    gain.gain.value=.3;



    oscillator.connect(gain);

    gain.connect(audio.destination);



    oscillator.start();



    oscillator.frequency.setValueAtTime(
        900,
        audio.currentTime+.2
    );


    oscillator.frequency.setValueAtTime(
        600,
        audio.currentTime+.4
    );



    oscillator.stop(
        audio.currentTime+.7
    );


}