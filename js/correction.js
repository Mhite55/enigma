const buttons = document.querySelectorAll(".btn")
const operation = document.getElementById('ecran')
const regNum = /\d+/

// Ici,nous avons un tableau de correspondance des boutons de la calculatrice.
// Cela permet d'éviter une attaque XSS (Cross-Site-Scripting)
arrayBtn = ['Delete', 'Backspace', '%', '/', '7', '8', '9', '*','4', '5', '6', '-', '1', '2', '3', '+', '.', '0', 'Enter']
let opt = [0];
operation.innerHTML = opt.join('');

buttons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        // Ici nous allons ajouter une variable qui stockera la valeur du bouton.
        let btnValue = arrayBtn[index];
        // Code pour la calculatrice
        // Mon affichage
        checkBtn(btnValue);
    })
    document.addEventListener("keydown", function(event) {
        let btnValue = arrayBtn[index];
        if(event.key == btnValue){
            checkBtn(btnValue)
        }
    })
})

// Fonction qui va vérifier si le bouton est numérique ou une touche d'opérateur.
function checkBtn(value){
    // Regex qui vérifie des valeurs numériques
    // On compare le regex à la valeur de la fonction
    if(regNum.test(value)){
        // La valeur est numérique dans le cas là
        checkZero(value)
        operation.innerHTML += opt.join(''); // Le += permet de sauvegarder ce qu'on écrit.     
    }else {
        // Ici la valeur n'est pas numérique 
        // ce qui signifie que la valeur est un opérateur
        switch (value) {
            case "+":
            case "-":
            case "/":
            case "*":
            case ".":
            case "%":
                replaceDuplicateOperator(value)
                operation.innerHTML += opt.join(''); // Le += permet de sauvegarder ce qu'on écrit.     
                break;
            case "Delete":
                opt = [0];
                operation.innerHTML += opt.join('');    
                break;
            case "Backspace":
                backSpaceZero(value);
                operation.innerHTML += opt.join('');  
                break;
            case "Enter":
                let buffer = Math.evaluate(opt.join(''));
                opt =[];
                opt[0] = buffer;
                operation.innerHTML = opt.join('');
                break;
            default:
                console.error("Bouton non reconnu !")
                break;
        }
    }
}
// Fonction qui va vérifier le dernier élément du tableau opt
// Si c'est un opérateur il sera remplacer par le dernier cliqué.

function replaceDuplicateOperator(value) {
    // On vérifie ici que le dernier élément du tableau N'EST PAS 
    // Una valeur numérique donc un opérateur
    if(!regNum.test(opt[opt.length - 1])){
        opt[length - 1] = value;
    }
    else if (value === "-" && opt.length <= 1 && opt[0] == 0) { // Ceci nous permet de pouvoir commencer par un "-"
        opt[0] = value; // Ceci nous permet de pouvoir commencer par un "-"
    }else {
        // Si la dernière valeur est numérique, je peux ajouter l'opérateur en toute sécurité. 
        opt.push(value)
    }
}

// Cette fonction permet d'enlever le 0 qui se met au démarrage ou quand on delete ce qu'on a mis.
function checkZero(value) {
    // On vérifie qu'il y a qu'une valeur valeur dans le tableau, pour remplacé
    // par la valeur souhaiter
    if ( opt[0] == 0 && opt.length <= 1) {
        opt[0] = value;
    // Ici on évite l'accumulation de zero apres le zero
    }else if (opt [0] == 0 && opt.length <= 1 && value === 0) {
        opt[0] = 0;
        // ici on évite d'accumuler les zeros apres un operateur
        // sans // en autorisant les nombre tels que 0.15, 0.41
    }else if (!regNum.test(opt [opt.length-2]) && opt [opt.length-1] == 0 && regNum.test(value) && opt [opt.length-2] != ".") {
        opt [opt.length-1] = value
        // Ici on push la valeur 
    }else {
        opt.push(value)
    }
}

// Cette fonction fait que quand on delete un chiffre (et qu'il n'y en a qu'un) ça met un 0
// fonction pour effacer la valeur précèdente
function backSpaceZero(value) {
    // ici quand il n'y a plus de valeur on affiche le zero
    if ( opt.length === 1 || opt[0] === 0) { // si 0 = 0 ou si la longueur est inférieur ou égal à 1 (ce qui nous permet de mettre 0,2 par exemple)
        opt[0] = 0;
    }else {
        // On efface la dernière valeur 
        opt.pop(); // pop supprime le dernier élément d'un tableau.
    }
}

function evaluateAndErrors(){
    // On essaye d'évaluer la string qui permet le calcul
try{
    let buffer = math.evaluate(opt.join(''))
        if(buffer != Infinity) { // Ici on gère la division par zeros
            opt = [] // Quand la valeur est évaluée on efface le tableau et on met le résultat dans une variable tampon
            opt[0] = buffer // on injecte la variable tampon dans le premier index du tableau
            operation.innerHTML = opt.join('')
        }else{
            operation.innerHTML = "Division par Zéro !!"
        }
    // ici on gère les erreur 
    }catch(error){
        operation.innerHTML = "Syntaxe ERROR !!"
    }
}