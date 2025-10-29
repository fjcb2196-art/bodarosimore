var petalPlayers = [];

function animatePetals() {
    var petals = document.querySelectorAll('.petal');
    const PETAL_IMAGE_URL = '/templates/petalo.svg';
    if (!petals[0].animate) {
        console.warn("El navegador no soporta Web Animations API.");
        return false;
    }

    for (var i = 0, len = petals.length; i < len; ++i) {
        var petal = petals[i];
        petal.innerHTML = '<div class="rotate"><img src="' + PETAL_IMAGE_URL + '" class="askew"></div>'; 
        
        var scale = Math.random() * 0.8 + 0.2;
        const startX = Math.random() * 100;
        const endX = Math.random() * 100;

        var player = petal.animate([
            { left: startX + 'vw', top: '0vh', transform: 'scale(' + scale + ')' },
            { left: endX + 'vw', top: '150vh', transform: 'scale(' + scale + ')' }
        ], {
            duration: Math.random() * 90000 + 3000,
            iterations: Infinity,
            delay: -(Math.random() * 5000)
        });

        petalPlayers.push(player);
    }
}

document.addEventListener('DOMContentLoaded', animatePetals);
