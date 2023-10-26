
const ecran = document.getElementById("ecran")

let btn = document.getElementsByClassName("btn")

let precedent = 0
let affichage = ""
let operation = null
let memoire

console.log(btn)
for (const element of btn) {
    element.addEventListener("click", gererTouche)
}

function gererTouche(event){
    const listeBtn = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "=", "C" ];
    if(parseFloat(listeBtn) >= 0 || listeBtn === "." ){
        affichage = (affichage === "") ? this.value.toString() : affichage + this.value.toString()
        ecran.innerHTML = affichage
    }else{
        switch (event) {
            case "C":
                console.log("reset enfoire")
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                break;
            case "=":
                break;
            default:
                console.log(`Sorry, i'm done.`)
                break;
        }
    }
}
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}