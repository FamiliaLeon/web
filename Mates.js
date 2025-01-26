let score = 0;
let timeLeft = 90; // Mantener el tiempo de 90 segundos
let currentAnswer;
let currentQuestion;

// Genera una nueva pregunta matemática con operaciones variadas
function generateQuestion() {
    const operations = ['+', '-', '*', '/', 'sqrt', 'fraction']; // Operaciones posibles
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let num1, num2;
    if (operation === 'fraction') {
        num1 = Math.floor(Math.random() * 90) + 10; // Números de 2 cifras
        num2 = Math.floor(Math.random() * 90) + 10;
        currentAnswer = (num1 / num2).toFixed(2);
        currentQuestion = `¿Cuánto es ${num1} / ${num2}? (Fracción)`;
    } else if (operation === 'sqrt') {
        num1 = Math.floor(Math.random() * 90) + 10; // Números de 2 cifras
        currentAnswer = Math.sqrt(num1).toFixed(2);
        currentQuestion = `¿Cuál es la raíz cuadrada de ${num1}?`;
    } else {
        num1 = Math.floor(Math.random() * 90) + 10; // Números de 2 cifras
        num2 = Math.floor(Math.random() * 90) + 10;
        if (operation === '+') {
            currentAnswer = num1 + num2;
            currentQuestion = `¿Cuánto es ${num1} + ${num2}?`;
        } else if (operation === '-') {
            currentAnswer = num1 - num2;
            currentQuestion = `¿Cuánto es ${num1} - ${num2}?`;
        } else if (operation === '*') {
            currentAnswer = num1 * num2;
            currentQuestion = `¿Cuánto es ${num1} * ${num2}?`;
        } else if (operation === '/') {
            currentAnswer = (num1 / num2).toFixed(2);
            currentQuestion = `¿Cuánto es ${num1} / ${num2}?`;
        }
    }

    document.getElementById('question').innerText = currentQuestion;
}

// Verifica la respuesta del jugador
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value).toFixed(2);
    if (userAnswer == currentAnswer) {
        score++;
        document.getElementById('score').innerText = `Puntuación: ${score}`;
        generateQuestion();
        document.getElementById('answer').value = '';
    }
}

// Maneja el temporizador del juego
function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Tiempo restante: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`¡Tiempo terminado! Tu puntuación final es: ${score}`);
            location.reload(); // Reinicia el juego
        }
    }, 1000);
}

// Inicializa el juego
function initGame() {
    generateQuestion();
    startTimer();

    document.getElementById('submit').addEventListener('click', checkAnswer);
}

// Espera a que cargue la página para iniciar el juego
window.onload = initGame;


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

