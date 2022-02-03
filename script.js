
//MODEL

//Til statistikk
var vunnet = 0;
var tapt = 0;
var uavgjort = 0;

// Pokemonbilder
var charmander = '<img class="char" src="char.gif"/>';
var squirtle = '<img class="squi" src="squirtle.gif"/>';
var bulba = '<img class="bulb" src="bulba.gif"/>';
var qm = '<img class="qm" src="qm.png"/>'

//Vår og motstanders pokemon
var pokemon = '';
var pokemonMotstand = qm;

//Tall til nedtellingen og Resultatet
var one = '<img class="tall" src="1.png"/>'
var two = '<img class="tall" src="2.png"/>'
var three = '<img class="tall" src="3.png"/>'
var win = '<img class="tall" src="youwin.png"/>'
var lose = '<img class="tall" src="youlose.png"/>'
var draw = '<img class="tall" src="draw.png"/>'

//Diverse
var nedtelling = 3;
var tallene = '';
var hasChoosen = false;

//VIEW

showApp();
function showApp() {
    let resultatDiv = document.getElementById('output');
    resultatDiv.innerHTML = /*html*/ ` <header class="header"><img src="pickyourpokemon.png" ondblclick="hemmelig()"> </header>
        <div class="buttons">
        <br>
            <img src='grass.png' class='buttonG' onmouseover='hover(bulba)' onmouseout="hoverOut()" onclick="velg(bulba)">
            <br>
            <img src='water.png' class='buttonW' onmouseover='hover(squirtle)' onmouseout="hoverOut()" onclick="velg(squirtle)">
            <br>
            <img src='fire.png'  class='buttonF' onmouseover='hover(charmander)' onmouseout="hoverOut()" onclick="velg(charmander)">
        </div>

        <div class="pokemon">
            <div class="pokemonFlip">${pokemon}</div>
            <div class="pokemonMotstand">${pokemonMotstand}</div>
        </div>
            
            <div class="count">${tallene}</div>
        <br>
        <h1 class='stats'> Win: ${vunnet} Draw: ${uavgjort} Lose: ${tapt}</h1> 
    `}




//CONTROLLER

function velg(element) {
    pokemon = element;
    tallene = '';
    pokemonMotstand = qm;
    hasChoosen = true;
    showApp();
    kampStart();
}

//Funksjon for hover event til img buttons. Vis pokemon variabel er tom så setter den pokemon til bilde.
function hover(type) {
    if (pokemon == "") {
        pokemon = type;
        showApp();
    }
}

//Fjerner pokemon hvis valg ikke er tatt
function hoverOut() {
    if (!hasChoosen) {
        pokemon = "";
        showApp(); 
    }
}

//Tilfeldig tall fra 1 - 3  
function randomNumber() {
    let number = Math.round(Math.random() * (3 - 1) + 1);
    return number;
}
//Gjør det tilfeldige tallet om til en av tre pokemon
function randomPokemon() {
    let rng = randomNumber();
    if (rng == 1) {
        return bulba;
    } else if (rng == 2) {
        return squirtle;
    } else if (rng == 3) {
        return charmander;
    }
}


//Når man har gjort et valg starter denne en nedtelling, kaller på avgjørelsen og setter alt klart til neste runde
function kampStart() {
    //setInterval kjører funksjonen etter => hvert 1000ms.
    let countdown = setInterval(() => {
        console.log("Current nedtelling: ", nedtelling);
        if (nedtelling == 3) {
            tallene = three;
        }
        if (nedtelling == 2) {
            tallene = two;
        }
        if (nedtelling == 1) {
            tallene = one;
        }
        if (nedtelling == 0) {
            //clearInterval stopper intervallet som den ikke kjører evig.
            clearInterval(countdown)
            nedtelling = 4;
            tallene = '';
            kamp();
        }

        if (nedtelling > 0) {
            nedtelling--;
        }
        showApp()
    }, 1000);
}
//Setter motstanderens pokemon og kaller på funksjonen som finner vinner
function kamp() {
    pokemonMotstand = randomPokemon()
    let result = checkWinner(pokemon, pokemonMotstand)

    //Timeout, kjører funksjonen etter => etter 2000ms 
    setTimeout(() => {
        //Tar resultat fra checkWinner() og oppdaterer moddellen hvis man vant, tapte eller ble uavgjort.
        if (result == "draw") {
            tallene = draw;
            uavgjort++;
        } else if (result) {
            tallene = win;
            vunnet++;
        } else {
            tallene = lose;
            tapt++;
        }
        showApp();
        hasChoosen = false;
    }, 2000);

}

//Returner true vis spiller vinner mot motstand. Eller så returner den false. Vis det er en draw returner en stringen "draw"
function checkWinner(poke1, poke2) {
    if (poke1 == poke2) {
        return "draw";
    } else if (poke1 == bulba && poke2 == squirtle) {
        return true;
    } else if (poke1 == bulba && poke2 == charmander) {
        return false;
    } else if (poke1 == squirtle && poke2 == bulba) {
        return false;
    } else if (poke1 == squirtle && poke2 == charmander) {
        return true;
    } else if (poke1 == charmander && poke2 == bulba) {
        return true;
    } else if (poke1 == charmander && poke2 == squirtle) {
        return false;
    }
    showApp();
}

function hemmelig(){
    window.location.assign('https://www.youtube.com/watch?v=DLzxrzFCyOs');
}
