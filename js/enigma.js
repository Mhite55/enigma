
const ecran = document.getElementById("ecran")

let btn = document.getElementsByClassName("btn")

let affichage = ""
let regex = /\d+/

console.log(btn)
for (const element of btn) {
    element.addEventListener("click", gererTouche)
}

function gererTouche(event){
    const listeBtn = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "=", "C" ];
    if(regex.test(this.value)){
        affichage = (affichage === "") ? this.value.toString() : affichage + this.value.toString()
        ecran.innerHTML = affichage
        console.log(affichage)
    }else{
        switch (this.value) {
            case "C":
                console.log("reset")
                affichage = "";
                ecran.innerHTML = 0
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                affichage = (affichage === this.value) ? this.value.toString() : affichage + this.value.toString()
                console.log(this.value)
                break;
            case "=":
                affichage = math.evaluate(affichage.value)  
                break;
            default:
                console.log(`Sorry, i'm done.`)
                break;
        }
    }
}