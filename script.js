const preguntas = [
  {
    pregunta: "¿Género musical favorito?",
    opciones: ["A) Rap Emo", "B) Trap Americano", "C) Jazz"],
    correcta: "B"
  },
  {
    pregunta: "¿Cuántos tatuajes tienes?",
    opciones: ["A) 36", "B) 40", "C) 20"],
    correcta: "A"
  },
  {
    pregunta: "¿Cuántos años tienes?",
    opciones: ["A) 19", "B) 23", "C) 25"],
    correcta: "B"
  },
  {
    pregunta: "¿Comida favorita?",
    opciones: ["A) Hamburguesa", "B) Pizza", "C) Lasagna"],
    correcta: "B"
  },
  {
    pregunta: "¿Cuál es la moto de tus sueños?",
    opciones: ["A) GSXS-750", "B) Triumph Tiger Sport 660", "C) MT-09", "D) Z900"],
    correcta: "B"
  },
  {
    pregunta: "¿Cantante favorito?",
    opciones: ["A) C.R.O", "B) Lil Peep", "C) Don Toliver", "D) XXXTENTACION"],
    correcta: "A"
  },
  {
    pregunta: "¿Juego favorito?",
    opciones: ["A) Assassin's Creed", "B) GTA VI", "C) Fall Guys"],
    correcta: "A"
  }
];

let indice = 0;
let puntos = 0;
let nombreJugador = "";
let respondida = false;

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const resultado = document.getElementById("resultado");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const siguiente = document.getElementById("siguiente");

document.getElementById("comenzar").addEventListener("click", () => {
  nombreJugador = document.getElementById("nombre").value.trim() || "Jugador";
  indice = 0;
  puntos = 0;
  inicio.classList.add("oculto");
  resultado.classList.add("oculto");
  juego.classList.remove("oculto");
  mostrarPregunta();
});

function mostrarPregunta() {
  respondida = false;
  const actual = preguntas[indice];
  document.getElementById("contador").textContent =
    `PREGUNTA ${indice + 1} DE ${preguntas.length}`;
  const avance = Math.round((indice / preguntas.length) * 100);
  document.getElementById("porcentaje").textContent = `${avance}%`;
  document.getElementById("progreso").style.width = `${avance}%`;
  document.getElementById("texto-pregunta").textContent = actual.pregunta;
  opciones.innerHTML = "";
  mensaje.textContent = "";
  mensaje.className = "mensaje";
  siguiente.classList.add("oculto");

  actual.opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.className = "opcion";
    boton.textContent = opcion;
    boton.addEventListener("click", () => comprobarRespuesta(boton, opcion[0]));
    opciones.appendChild(boton);
  });
}

function comprobarRespuesta(botonElegido, respuesta) {
  if (respondida) return;
  respondida = true;

  const actual = preguntas[indice];
  const botones = [...opciones.querySelectorAll("button")];
  botones.forEach((boton) => {
    boton.disabled = true;
    if (boton.textContent[0] === actual.correcta) boton.classList.add("correcta");
  });

  if (respuesta === actual.correcta) {
    puntos++;
    mensaje.textContent = "¡Correcto! Esa era la respuesta.";
    mensaje.classList.add("ok");
  } else {
    botonElegido.classList.add("incorrecta");
    mensaje.textContent = `¡No era esa! La respuesta correcta era ${actual.correcta}.`;
    mensaje.classList.add("error");
  }

  siguiente.textContent = indice === preguntas.length - 1 ? "VER RESULTADO →" : "SIGUIENTE →";
  siguiente.classList.remove("oculto");
}

siguiente.addEventListener("click", () => {
  indice++;
  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  juego.classList.add("oculto");
  resultado.classList.remove("oculto");
  document.getElementById("progreso").style.width = "100%";
  document.getElementById("saludo").textContent = `¡Buen trabajo, ${nombreJugador}!`;
  document.getElementById("puntaje").textContent = `${puntos}/${preguntas.length}`;

  let evaluacion;
  if (puntos === preguntas.length) {
    evaluacion = "¡PERFECTO! Me conoces demasiado bien.";
  } else if (puntos >= 5) {
    evaluacion = "¡Muy bien! Me conoces bastante.";
  } else if (puntos >= 3) {
    evaluacion = "No está mal, pero todavía te falta conocerme.";
  } else {
    evaluacion = "JAJAJA, ¿seguro que me conoces?";
  }
  document.getElementById("evaluacion").textContent = evaluacion;
  document.getElementById("detalle").textContent =
    `Respondiste correctamente ${puntos} de ${preguntas.length} preguntas.`;
}

document.getElementById("reiniciar").addEventListener("click", () => {
  resultado.classList.add("oculto");
  inicio.classList.remove("oculto");
  document.getElementById("nombre").value = "";
});
