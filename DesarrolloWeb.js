// Usuarios predefinidos con roles
const users = {
    "8547": "Marlenny León Sánchez",
    "1695": "William León Sánchez",
    "7149": "Elida León Sánchez",
    "1036": "Milciades León Sánchez",
    "4895": "Alejandro León Buitrago",  //Instructor 
    "9031": "Karen Ibague León",        
    "4198": "Yerson León Velazco",
    "1874": "Oscar Hernandez León",
    "1847": "Julian León Velazco",
    "1876": "Salome León Martinez",
    "2398": "Linda Yuleth León",
    "4561": "Wendy Loraine Peña León",
    "1391": "Mary Luz",
    "3218": "Lauren Hernandez León",
};

let currentUser = null;

// Clases disponibles
let classes = [
    {
        title: "Introducción al Desarrollo Web",
        description: "Conceptos básicos sobre cómo funciona el desarrollo web.",
        resources: [],
    },
    {
        title: "HTML Básico",
        description: "Aprenderemos las etiquetas más importantes de HTML.",
        resources: [],
    },
];

// Inicio de sesión con código predefinido
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const pin = document.getElementById("login-pin").value.trim();
    if (users[pin]) {
        currentUser = { name: users[pin], role: pin === "4895" ? "instructor" : "student" };
        document.getElementById("auth-screen").style.display = "none";
        document.getElementById("main-page").style.display = "block";

        const welcomeMessage = `Hola, ${currentUser.name} (${currentUser.role === "instructor" ? "Instructor" : "Estudiante"})`;
        document.getElementById("welcome-message").textContent = welcomeMessage;

        if (currentUser.role === "instructor") {
            document.getElementById("edit-tools").style.display = "block";
        }
        renderClasses();
    } else {
        alert("Código PIN incorrecto. Intenta de nuevo.");
    }
});

// Renderizar lista de clases
function renderClasses() {
    const classList = document.getElementById("class-list");
    classList.innerHTML = "";

    classes.forEach((cls, index) => {
        const classItem = document.createElement("div");
        classItem.classList.add("class-item");
        classItem.innerHTML = `
            <h3>${cls.title}</h3>
            <p>${cls.description}</p>
            <button onclick="openClass(${index})" class="btn">Ver</button>
            ${
                currentUser.role === "instructor"
                    ? `<button onclick="deleteClass(${index})" class="btn-delete">Eliminar Clase</button>`
                    : ""
            }
        `;
        classList.appendChild(classItem);
    });
}

// Abrir clase en el modal
function openClass(index) {
    const cls = classes[index];
    document.getElementById("class-title").textContent = cls.title;
    document.getElementById("class-description").textContent = cls.description;

    const resourceList = document.getElementById("resource-list").querySelector("ul");
    resourceList.innerHTML = "";

    cls.resources.forEach((resource, resourceIndex) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p><strong>${resource.type}:</strong> ${resource.name}</p>
            <p>${resource.description}</p>
            ${
                resource.type === "Video"
                    ? `<video src="${resource.url}" controls width="300"></video>`
                    : `<a href="${resource.url}" target="_blank">Descargar Guía</a>`
            }
            ${
                currentUser.role === "instructor"
                    ? `<button onclick="deleteResource(${index}, ${resourceIndex})" class="btn-delete">Eliminar Recurso</button>`
                    : ""
            }
        `;
        resourceList.appendChild(listItem);
    });

    if (currentUser.role === "instructor") {
        document.getElementById("upload-section").style.display = "block";
        document.getElementById("upload-files").dataset.classIndex = index;
    } else {
        document.getElementById("upload-section").style.display = "none";
    }

    document.getElementById("class-modal").style.display = "flex";
}

// Cerrar modal de clase
function closeModal() {
    document.getElementById("class-modal").style.display = "none";
}

// Agregar nueva clase (solo instructor)
function addNewClass() {
    if (currentUser.role !== "instructor") {
        alert("Solo el instructor puede agregar nuevas clases.");
        return;
    }

    const title = prompt("Ingrese el título de la nueva clase:");
    const description = prompt("Ingrese una breve descripción de la clase:");

    if (title && description) {
        classes.push({ title, description, resources: [] });
        renderClasses();
        alert("Clase agregada exitosamente.");
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Guardar recursos en la clase
function saveResource() {
    const files = document.getElementById("upload-files").files;
    const description = document.getElementById("resource-description").value.trim();
    const classIndex = document.getElementById("upload-files").dataset.classIndex;

    if (files.length > 0 && classIndex !== undefined) {
        Array.from(files).forEach(file => {
            const resource = {
                name: file.name,
                type: file.type.includes("video") ? "Video" : "Guía",
                url: URL.createObjectURL(file),
                description
            };
            classes[classIndex].resources.push(resource);
        });

        alert("Recurso(s) agregado(s) exitosamente.");
        document.getElementById("resource-description").value = "";
        renderClasses();
        openClass(classIndex);
    } else {
        alert("Selecciona un archivo antes de guardar.");
    }
}

// Eliminar clase (solo instructor)
function deleteClass(index) {
    if (currentUser.role !== "instructor") {
        alert("Solo el instructor puede eliminar clases.");
        return;
    }

    if (confirm("¿Estás seguro de que deseas eliminar esta clase?")) {
        classes.splice(index, 1);
        renderClasses();
        alert("Clase eliminada exitosamente.");
    }
}

// Eliminar recurso de una clase (solo instructor)
function deleteResource(classIndex, resourceIndex) {
    if (currentUser.role !== "instructor") {
        alert("Solo el instructor puede eliminar recursos.");
        return;
    }

    if (confirm("¿Estás seguro de que deseas eliminar este recurso?")) {
        classes[classIndex].resources.splice(resourceIndex, 1);
        openClass(classIndex);
        alert("Recurso eliminado exitosamente.");
    }
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



