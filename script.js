
const btnPlay = document.getElementById("btnMusica");
const btnNext = document.getElementById("btnSiguiente");
const btnPrev = document.getElementById("btnAnterior");
const musica = document.getElementById("musica");
const cancionActual = document.getElementById("cancionActual");
const barraProgreso = document.getElementById("barraProgreso");
const tiempoActual = document.getElementById("tiempoActual");
const tiempoTotal = document.getElementById("tiempoTotal");

let reproduciendo = false;
let indiceCancion = 0;


const playlist = [
  { nombre: "Dynamite - BTS", archivo: "/sound/BTS-Dynamite.mp3" },
  { nombre: "Boy With Luv - BTS", archivo: "/sound/Boy With Luv.mp3" },
  { nombre: "MIC Drop - BTS", archivo: "/sound/MICDrop.mp3" },
  { nombre: "DNA - BTS", archivo: "/sound/BTSDNA.mp3" }
];


function cargarCancion(indice) {
  musica.src = playlist[indice].archivo;
  cancionActual.textContent = `🎵 ${playlist[indice].nombre}`;
}


cargarCancion(indiceCancion);


btnPlay.addEventListener("click", () => {
  if (reproduciendo) {
    musica.pause();
    btnPlay.textContent = "▶ Reproducir Canción";
  } else {
    musica.play();
    btnPlay.textContent = "⏸ Pausar Cancion >:3";
  }
  reproduciendo = !reproduciendo;
});


btnNext.addEventListener("click", () => {
  indiceCancion = (indiceCancion + 1) % playlist.length;
  cargarCancion(indiceCancion);
  musica.play();
  btnPlay.textContent = "⏸ Pausar Canción";
  reproduciendo = true;
});


if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    indiceCancion = (indiceCancion - 1 + playlist.length) % playlist.length;
    cargarCancion(indiceCancion);
    musica.play();
    btnPlay.textContent = "⏸ Pausar Canción";
    reproduciendo = true;
  });
}


musica.addEventListener("ended", () => {
  indiceCancion = (indiceCancion + 1) % playlist.length;
  cargarCancion(indiceCancion);
  musica.play();
});


musica.addEventListener("timeupdate", () => {
  if (musica.duration) {
    barraProgreso.max = Math.floor(musica.duration);
    barraProgreso.value = Math.floor(musica.currentTime);

    tiempoActual.textContent = formatoTiempo(musica.currentTime);
    tiempoTotal.textContent = formatoTiempo(musica.duration);
  }
});


barraProgreso.addEventListener("input", () => {
  musica.currentTime = barraProgreso.value;
});


function formatoTiempo(segundos) {
  const min = Math.floor(segundos / 60);
  const sec = Math.floor(segundos % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}


const mensaje = document.getElementById("mensaje");
const texto = "✨ Que todos tus sueños se hagan realidad ✨ Fuerza leona 🦁💜";
let i = 0;
function escribir() {
  if (i < texto.length) {
    mensaje.textContent += texto.charAt(i);
    i++;
    setTimeout(escribir, 80);
  }
}
mensaje.textContent = "";
escribir();


let currentIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

showSlide(currentIndex);
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 3000);


const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = Array.from({ length: 100 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 2,
  d: Math.random() * 0.5 + 0.5
}));

function dibujarConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  confetti.forEach(p => {
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
  });
  ctx.fill();
  moverConfetti();
}

function moverConfetti() {
  confetti.forEach(p => {
    p.y += p.d;
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

setInterval(dibujarConfetti, 20);
