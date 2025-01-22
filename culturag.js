let score = 0;
let timeLeft = 90; // Tiempo de juego
let currentAnswer;

// Lista de preguntas de cultura general
const questions = [
    {
        question: "¿Quién pintó la Mona Lisa?",
        answer: "Leonardo da Vinci"
    },
    {
        question: "¿En qué continente se encuentra Egipto?",
        answer: "África"
    },
    {
        question: "¿Cuál es la capital de Japón?",
        answer: "Tokio"
    },
    {
        question: "¿Quién escribió 'Cien años de soledad'?",
        answer: "Gabriel García Márquez" 
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        answer: "Júpiter"
    },
    {
        question: "¿En qué año llegó el hombre a la luna?",
        answer: "1969"
    },
    {
        question: "¿Qué ciudad es conocida como la 'Gran Manzana'?",
        answer: "Nueva York"
    },
    {
        question: "¿Quién fue el primer presidente de los Estados Unidos?",
        answer: "George Washington"
    },
    {
        question: "¿Cuál es el río más largo del mundo?",
        answer: "Amazonas"
    },
    {
        question: "¿Qué es la fotosíntesis?",
        answer: "El proceso por el cual las plantas convierten la luz solar en energía"
    }
];

// Genera una nueva pregunta
function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionObj = questions[randomIndex];
    currentAnswer = questionObj.answer;
    document.getElementById('question').innerText = questionObj.question;
}

// Verifica la respuesta del jugador
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    if (userAnswer === currentAnswer.toLowerCase()) {
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

