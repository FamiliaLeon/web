const words = ["juegos", "hola", "html", "css", "familia", "colombia", "pagina", "ahorcado", "celestial"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = "_".repeat(selectedWord.length);
let wrongLetters = [];
let attempts = 10;

const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const attemptsElement = document.getElementById("attempts");
const messageElement = document.getElementById("message");
const letterInput = document.getElementById("letter");
const submitButton = document.getElementById("submit");
const hangmanImg = document.getElementById("hangman-img");

function updateWordDisplay() {
    wordElement.textContent = `Palabra: ${displayedWord}`;
}

function updateWrongLetters() {
    wrongLettersElement.textContent = `Letras incorrectas: ${wrongLetters.join(", ")}`;
}

function updateAttempts() {
    attemptsElement.textContent = `Intentos restantes: ${attempts}`;
}

function updateHangmanImage() {
    hangmanImg.src = `images/${10 - attempts}.png`;
}

function checkGameStatus() {
    if (displayedWord === selectedWord) {
        messageElement.textContent = "¡Felicidades! Has adivinado la palabra.";
        submitButton.disabled = true;
    } else if (attempts === 0) {
        messageElement.textContent = `¡Perdiste! La palabra era: ${selectedWord}`;
        submitButton.disabled = true;
    }
}

function handleGuess() {
    const letter = letterInput.value.toLowerCase();
    if (letter === "" || wrongLetters.includes(letter) || displayedWord.includes(letter)) {
        return;
    }

    if (selectedWord.includes(letter)) {
        let newWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            newWord += selectedWord[i] === letter ? letter : displayedWord[i];
        }
        displayedWord = newWord;
    } else {
        wrongLetters.push(letter);
        attempts--;
        updateHangmanImage();
    }

    updateWordDisplay();
    updateWrongLetters();
    updateAttempts();
    checkGameStatus();
    letterInput.value = "";
    letterInput.focus();
}

submitButton.addEventListener("click", handleGuess);

updateWordDisplay();
updateWrongLetters();
updateAttempts();


 // Función para registrar una visita
 function registrarVisita() {
    const nombreVisitante = prompt("Ingresa tu nombre:");

    if (nombreVisitante) {
        const visitas = JSON.parse(localStorage.getItem("visitas")) || [];

        // Registrar la visita con nombre y fecha
        const fecha = new Date().toLocaleString();
        visitas.push({ nombre: nombreVisitante, fecha });

        // Guardar visitas en localStorage
        localStorage.setItem("visitas", JSON.stringify(visitas));

        // Mostrar las visitas actualizadas
        mostrarVisitas();
    }
}

// Función para mostrar las visitas
function mostrarVisitas() {
    const visitas = JSON.parse(localStorage.getItem("visitas")) || [];
    const listaVisitas = document.getElementById("lista-visitas");

    listaVisitas.innerHTML = ""; // Limpiar lista de visitas

    visitas.forEach(visitante => {
        const div = document.createElement("div");
        div.classList.add("visitante");
        div.textContent = `${visitante.nombre} visitó la página el ${visitante.fecha}`;
        listaVisitas.appendChild(div);
    });
}

// Llamar a la función mostrarVisitas al cargar la página
mostrarVisitas();

// Evento para el botón de registrar visita
document.getElementById("registrar-visita").addEventListener("click", registrarVisita);


