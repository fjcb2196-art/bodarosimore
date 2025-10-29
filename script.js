// =========================================================
// 📅 Configuración y Constantes
// =========================================================

// ⚠️ Cambia esta fecha por la real del evento (¡ACTUALIZAR!)
const EVENT_DATE = new Date("december 20, 2025 16:00:00").getTime(); 

// Elementos del DOM (cache para rendimiento)
const toggleButton = document.getElementById('toggleButton'); 
const welcomeButton = document.getElementById('boton-bienvenido'); // Botón de Bienvenida
const leftDoor = document.querySelector('.left-door'); // Puerta Izquierda
const rightDoor = document.querySelector('.right-door'); // Puerta Derecha
const bienvenidaScreen = document.getElementById('pantalla-bienvenida'); // Contenedor de las puertas
const mainWrapper = document.getElementById('main-wrapper'); // Contenedor Principal
const mainInvitation = document.querySelector('.invitacion-principal'); // Contenido
const audio = document.getElementById('audio-boda'); // Elemento Audio
const rsvpForm = document.getElementById('rsvp-form');

// *********************************************************
// 🟢 CONSTANTE WHATSAPP AGREGADA
// *********************************************************

const WHATSAPP_NUMBER = '584245226404'; 


// =========================================================
// 🚪 Función 1: Transición de Bienvenida (Apertura de Puertas y Audio)
// ... (mantenemos esta función sin cambios)
// =========================================================
function handleWelcomeTransition() {
    // La lógica se concentra en el modelo de puertas, ya que los elementos existen.
    if (leftDoor && rightDoor && bienvenidaScreen && mainWrapper) {
        
        // 1. Iniciar animación de puertas
        leftDoor.classList.add('open');
        rightDoor.classList.add('open');
        
        // 2. Ocultar el botón y elementos de interacción
        const activeToggleButton = toggleButton || welcomeButton;
        if (activeToggleButton) {
            activeToggleButton.classList.add('fade-out');
            // Nota: Se asume que 'fade-out' CSS maneja la opacidad a 0.
        }

        // 3. Reproducir audio
        if (audio) {
            audio.volume = 0.25;
            audio.play().catch(error => {
                // Mensaje si el navegador bloquea el autoplay
                console.warn("Error de Autoplay (El navegador lo ha bloqueado):", error);
            });
        }
        
        // 4. Ocultar la pantalla de bienvenida y mostrar contenido principal después de la transición CSS (1s)
        setTimeout(() => {
            bienvenidaScreen.style.display = 'none';

            // El contenido principal se hace visible (si se usa un fade-in en el mainWrapper)
            mainWrapper.classList.add('visible'); 
            
            // Si usas el contenedor .invitacion-principal, asegúrate de mostrarlo
            if (mainInvitation) {
                mainInvitation.style.display = 'block'; 
            }
        }, 1000); 

    } else {
        console.error("Error: Faltan elementos de puertas (leftDoor, rightDoor, o bienvenidaScreen) para iniciar la transición.");
    }
}

// =========================================================
// 📝 Función 3: Lógica del Formulario RSVP (Versión Final Limpia)
// =========================================================

/**
 * Maneja el envío del formulario de confirmación (RSVP) a WhatsApp.
 */
function handleRsvpSubmit(event) {
    event.preventDefault(); // Detiene el envío normal del formulario

    // 1. Capturar los valores de los campos
    const nombre = document.getElementById('name').value.trim();
    const asistencia = document.getElementById('attend').value;
    const guests = document.getElementById('guests').value;
    
    // 2. Validaciones básicas
    if (nombre === '' || asistencia === '' || asistencia === null || asistencia === '') {
        alert('Por favor, completa tu Nombre y selecciona tu Asistencia.');
        return;
    }
    
    // Carácter para un salto de línea en un mensaje de WhatsApp codificado
    const saltoDeLinea = '%0A'; 

    // 3. Formatear el mensaje de forma clara y concisa
    
    // Título inicial
    let mensaje = `*CONFIRMACIÓN DE ASISTENCIA*%0A${saltoDeLinea}`;
    
    // Línea 1: Nombre
    mensaje += `*Nombre:* ${nombre}${saltoDeLinea}`;

    // Línea 2 y 3: Asistencia y Total Personas
    if (asistencia === 'si') {
        mensaje += `*Asistencia:* SÍ ✅${saltoDeLinea}`;
        mensaje += `*Total Personas:* ${guests}`;
        
    } else if (asistencia === 'no') {
        mensaje += `*Asistencia:* NO ❌`; // No se pone saltoDeLinea al final
        
    } else {
        alert('Ocurrió un error con el campo de asistencia.');
        return;
    }
    
    // 4. Codificar el mensaje para URL
    const urlMensaje = encodeURIComponent(mensaje);
    
    // 5. Construir la URL de WhatsApp y abrir
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${urlMensaje}`; 

    // Abrir WhatsApp en una nueva pestaña/ventana
    window.open(whatsappURL, '_blank');
    
    // 6. Mostrar un mensaje de éxito y limpiar el formulario
    alert(`¡Gracias ${nombre}! Por favor, envía el mensaje que aparecerá en WhatsApp.`);
    
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.reset(); 
    }
}

// =========================================================
// 🚀 INICIO: Asignación de Eventos al Cargar el DOM
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Asignar Eventos de Bienvenida
    // Se asigna el listener al botón que exista de los dos modelos.
    const activeButton = toggleButton || welcomeButton;
    if (activeButton) {
        activeButton.addEventListener('click', handleWelcomeTransition);
    }
    
    // 2. Asignar Evento del Formulario
    if (rsvpForm) {
        // ⭐ ¡AHORA LLAMA A LA FUNCIÓN DE WHATSAPP! ⭐
        rsvpForm.addEventListener('submit', handleRsvpSubmit); 
    }

    // 3. Iniciar el Contador Regresivo
    if (countdownEl) {
        startCountdown();
    }
});



// Elemento donde se mostrará el contador
const countdownElement = document.getElementById('countdown');
// Elemento para el mensaje final
const overlayMessage = document.getElementById('countdown-overlay');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = EVENT_DATE - now;

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Si el contador aún no ha terminado, mostrar el tiempo
    if (distance > 0) {
        countdownElement.innerHTML = `
        <div class="countdown-unit" data-label="Días"><span>${days}</span></div>
        <div class="countdown-unit" data-label="Horas"><span>${hours}</span></div>
        <div class="countdown-unit" data-label="Mins"><span>${minutes}</span></div>
        <div class="countdown-unit" data-label="Segs"><span>${seconds}</span></div>
        `;
        // Ocultar el mensaje "El día ha llegado" mientras cuenta
        overlayMessage.style.display = 'none';

    } else {
        // Si el contador ha terminado, mostrar el mensaje final
        clearInterval(interval);
        countdownElement.innerHTML = ""; // Vaciar el contador
        overlayMessage.style.display = 'block';
        overlayMessage.innerHTML = "🎉 ¡El Gran Día ha Llegado! 🎉";
        countdownElement.classList.add('finished');
    }
}

// Actualizar el contador cada 1 segundo (1000 milisegundos)
const interval = setInterval(updateCountdown, 1000);

// Ejecutar una vez al inicio para evitar un retraso de 1 segundo

updateCountdown();


