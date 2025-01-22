// Al cargar la página, verificar si hay un usuario registrado
window.onload = function () {
    const username = localStorage.getItem('chatUsername');
    if (username) {
        document.getElementById('registration-form').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        document.getElementById('chat-username').innerText = `¡Hola, ${username}! 😊`;
        loadMessages(); // Cargar mensajes guardados
    } else {
        loadMessages(); // Cargar mensajes para que estén visibles incluso sin usuario registrado
    }
};

// Función para registrar al usuario
function registerUser() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Por favor, ingresa un nombre de usuario.");
        return;
    }
    localStorage.setItem('chatUsername', username); // Guardar usuario
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('chat-container').style.display = 'flex';
    document.getElementById('chat-username').innerText = `¡Hola, ${username}! 😊`;
}

// Función para enviar un mensaje
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        const chatBox = document.getElementById('chat-box');
        const date = new Date();
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.innerHTML = `
            <strong>${localStorage.getItem('chatUsername') || "Invitado"}:</strong> ${message}
            <div class="date">${formattedDate}</div>
        `;
        chatBox.appendChild(messageDiv);

        messageInput.value = ''; // Limpiar el campo de texto
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll al final
        saveMessages(); // Guardar mensajes
    }
}

// Función para cerrar sesión
function logout() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        localStorage.removeItem('chatUsername'); // Solo elimina el nombre de usuario
        alert("Sesión cerrada. Los mensajes se conservarán.");
        window.location.reload(); // Reinicia la página
    }
}

// Función para borrar todos los mensajes
function clearMessages() {
    if (confirm("¿Estás seguro de que deseas borrar todos los mensajes?")) {
        localStorage.removeItem('chatMessages'); // Borra los mensajes del almacenamiento
        document.getElementById('chat-box').innerHTML = ''; // Limpia la caja de mensajes
        alert("Mensajes borrados.");
    }
}

// Guardar mensajes en localStorage
function saveMessages() {
    const messages = document.getElementById('chat-box').innerHTML;
    localStorage.setItem('chatMessages', messages);
}

// Cargar mensajes guardados
function loadMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        document.getElementById('chat-box').innerHTML = savedMessages;
    }
}

// Función para manejar la carga de archivos
function uploadFile() {
    const fileInput = document.getElementById('file-upload');
    fileInput.click();
    fileInput.onchange = function () {
        const file = fileInput.files[0];
        if (file) {
            alert(`Has seleccionado el archivo: ${file.name}`);
        }
    };
}

// Función para simular la grabación de audio
function uploadAudio() {
    alert("Función de grabación de audio no implementada aún.");
}

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


