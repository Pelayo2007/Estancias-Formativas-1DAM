var vibeCodingApp = angular.module("vibeCodingApp", []);

vibeCodingApp.controller("VibeCodingController", ["$timeout", function ($timeout) {
    var vm = this;

    vm.heroPoints = [
        "Creatividad",
        "Prueba y error",
        "Mejora progresiva",
        "Herramientas IA"
    ];

    vm.youtubeVideos = [
        createYoutubeVideo("uquw8yUKaYM", "Introduccion al enfoque", "Video de referencia para entender el contexto y la forma de trabajar."),
        createYoutubeVideo("iLCDSY2XX7E", "Ideas y flujo de trabajo", "Material util para inspirar decisiones durante el desarrollo de la web."),
        createYoutubeVideo("Ex1x9EIPuo8", "Herramientas y proceso", "Ejemplo de recursos que apoyan una programacion mas fluida y experimental."),
        createYoutubeVideo("nBq5ZzT81lY", "Aplicacion practica", "Referencia visual de como convertir una idea en una implementacion funcional.")
    ];

    vm.aiTools = [
        {
            name: "Cursor AI",
            icon: "../imagenes/cursorai.png",
            description: "Editor de codigo con inteligencia artificial que ayuda a generar y modificar codigo."
        },
        {
            name: "Windsurf",
            icon: "../imagenes/windsurfai.png",
            description: "Herramienta de desarrollo asistido por IA para mejorar la productividad programando."
        },
        {
            name: "Codex",
            icon: "../imagenes/codex-color.png",
            description: "Modelo de IA especializado en generacion y comprension de codigo."
        }
    ];

    vm.selectedTool = vm.aiTools[0];

    vm.selectTool = function (tool) {
        vm.selectedTool = tool;
    };

    vm.handleToolKey = function ($event, tool) {
        if ($event.key === "Enter" || $event.key === " ") {
            $event.preventDefault();
            vm.selectTool(tool);
        }
    };

    $timeout(function () {
        setupRevealAnimations();
        setupCardHoverFeedback();
    }, 0, false);
}]);

function createYoutubeVideo(id, title, description) {
    return {
        id: id,
        title: title,
        description: description,
        url: "https://youtu.be/" + id,
        thumbnail: "https://img.youtube.com/vi/" + id + "/0.jpg"
    };
}

function setupRevealAnimations() {
    var elements = document.querySelectorAll(".reveal-up");

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("is-visible");
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14
    });

    elements.forEach(function (element) {
        observer.observe(element);
    });
}

function setupCardHoverFeedback() {
    var cards = document.querySelectorAll(".ai-card");

    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (event) {
            var bounds = card.getBoundingClientRect();
            var offsetX = event.clientX - bounds.left;
            var offsetY = event.clientY - bounds.top;

            card.style.background = "radial-gradient(circle at " + offsetX + "px " + offsetY + "px, rgba(179,19,43,0.16), rgba(255,255,255,0.95) 55%)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.background = "";
        });
    });
}
