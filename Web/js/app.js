var app = angular.module("sportingApp", []);

app.controller("HomeController", ["$scope", "$timeout", function ($scope, $timeout) {
    var vm = this;
    var stadiumBaseCost = 72000;
    var videoSources = {
        "videos/video1.mp4": true,
        "videos/video2.mp4": true,
        "videos/video3.mp4": true,
        "videos/video4.mp4": true,
        "videos/video5.mp4": true,
        "videos/video6.mp4": true
    };

    vm.stats = [
        { label: "leyendas", value: 6 },
        { label: "videos activos", value: 6 },
        { label: "fotos 360", value: 12000 }
    ];

    vm.filters = ["Todos", "Jugadores", "Entrenadores"];
    vm.activeFilter = "Todos";
    vm.searchText = "";

    vm.people = [
        {
            name: "David Villa",
            role: "Delantero referencia",
            era: "Primer equipo y salto al futbol de elite",
            category: "Jugadores",
            image: "imagenes/foto2.png",
            page: "david-villa.html",
            description: "Una figura ideal para abrir el tour por su impacto deportivo y su capacidad para conectar con el publico."
        },
        {
            name: "Quini",
            role: "Icono historico del club",
            era: "Leyenda eterna del Sporting",
            category: "Jugadores",
            image: "imagenes/foto3.png",
            page: "quini.html",
            description: "Representa la parte mas emocional del proyecto y aporta peso historico a la experiencia virtual."
        },
        {
            name: "Luis Enrique",
            role: "Jugador polivalente y referente",
            era: "Talento surgido de Mareo",
            category: "Jugadores",
            image: "imagenes/foto4.png",
            page: "luis-enrique.html",
            description: "Da variedad al relato del recorrido con una trayectoria reconocible dentro y fuera del club."
        },
        {
            name: "Abelardo",
            role: "Capitan y tecnico",
            era: "Etapas clave en campo y banquillo",
            category: "Entrenadores",
            image: "imagenes/foto5.png",
            page: "abelardo.html",
            description: "Aporta una vision doble del Sporting, como jugador competitivo y como entrenador muy ligado al club."
        },
        {
            name: "Joaquin",
            role: "Defensa con sello de cantera",
            era: "Generacion de identidad rojiblanca",
            category: "Jugadores",
            image: "imagenes/foto6.jpg",
            page: "joaquin.html",
            description: "Refuerza el enfoque de club, cantera y pertenencia dentro del recorrido del estadio."
        },
        {
            name: "Chus",
            role: "Perfil historico del Sporting",
            era: "Memoria del equipo y sus epocas",
            category: "Jugadores",
            image: "imagenes/foto7.png",
            page: "chus.html",
            description: "Completa la seleccion de personajes para que el visitante perciba una historia coral y no una sola epoca."
        }
    ];

    vm.selectedPerson = vm.people[0];

    vm.videoFilters = ["Todos", "Historia", "Experiencia"];
    vm.activeVideoFilter = "Todos";

    vm.videos = [
        {
            title: "Presentacion del estadio",
            type: "Experiencia",
            src: "videos/video1.mp4",
            description: "Una entrada audiovisual potente para situar al visitante dentro del recorrido."
        },
        {
            title: "Leyenda destacada",
            type: "Historia",
            src: "videos/video2.mp4",
            description: "Contenido centrado en una figura clave para reforzar la narrativa del proyecto."
        },
        {
            title: "Momento inmersivo",
            type: "Experiencia",
            src: "videos/video3.mp4",
            description: "Material perfecto para mostrar el tono visual del tour virtual."
        },
        {
            title: "Recorrido por zonas clave",
            type: "Experiencia",
            src: "videos/video4.mp4",
            description: "Sirve para explicar la navegacion entre grada, vestuarios y terreno de juego."
        },
        {
            title: "Perfil de Joaquin",
            type: "Historia",
            src: "videos/video5.mp4",
            description: "Una pieza intermedia para completar la secuencia audiovisual antes del cierre de Chus."
        },
        {
            title: "Cierre emotivo del proyecto",
            type: "Historia",
            src: "videos/video6.mp4",
            description: "Un final mas emocional con foco en la memoria del club y la aficion."
        }
    ].filter(function (video) {
        return videoSources[video.src];
    });

    vm.tours = [
        {
            name: "Basico",
            price: 450,
            note: "Ideal para una demo breve con navegacion principal y contenido esencial."
        },
        {
            name: "Normal",
            price: 1500,
            note: "Equilibrio entre recorrido, narrativa y una presentacion mas completa de las leyendas."
        },
        {
            name: "Premium",
            price: 6000,
            note: "La opcion mas potente para exponer el proyecto con una experiencia completa y mas impacto."
        }
    ];

    vm.selectedTour = vm.tours[2];

    vm.setFilter = function (filter) {
        vm.activeFilter = filter;
        refreshDynamicUi();
    };

    vm.setVideoFilter = function (filter) {
        vm.activeVideoFilter = filter;
        refreshDynamicUi();
    };

    vm.selectPerson = function (person) {
        vm.selectedPerson = person;
        refreshDynamicUi();
    };

    vm.selectTour = function (tour) {
        vm.selectedTour = tour;
        refreshDynamicUi();
    };

    vm.onSearchChange = function () {
        refreshDynamicUi();
    };

    vm.personFilter = function (person) {
        var matchesSearch;
        var matchesFilter;
        var term = vm.searchText.toLowerCase();

        matchesSearch = !term ||
            person.name.toLowerCase().indexOf(term) !== -1 ||
            person.role.toLowerCase().indexOf(term) !== -1;

        matchesFilter = vm.activeFilter === "Todos" || person.category === vm.activeFilter;

        return matchesSearch && matchesFilter;
    };

    vm.videoFilter = function (video) {
        return vm.activeVideoFilter === "Todos" || video.type === vm.activeVideoFilter;
    };

    vm.baseTotal = function () {
        return stadiumBaseCost + vm.selectedTour.price;
    };

    vm.taxTotal = function () {
        return vm.baseTotal() * 0.21;
    };

    vm.grandTotal = function () {
        return vm.baseTotal() + vm.taxTotal();
    };

    refreshDynamicUi(true);

    function refreshDynamicUi(includeCounters) {
        $timeout(function () {
            setupRevealAnimations();

            if (includeCounters) {
                setupCounterAnimations();
            }
        }, 0, false);
    }
}]);

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
        threshold: 0.15
    });

    elements.forEach(function (element) {
        if (element.classList.contains("is-visible")) {
            return;
        }

        observer.observe(element);
    });
}

function setupCounterAnimations() {
    var counters = document.querySelectorAll(".counter");

    if (!("IntersectionObserver" in window)) {
        counters.forEach(function (counter) {
            counter.textContent = formatCounter(counter.getAttribute("data-target"));
        });
        return;
    }

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    var target = Number(element.getAttribute("data-target")) || 0;
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
        var progress;
        var currentValue;

        if (!startTime) {
            startTime = timestamp;
        }

        progress = Math.min((timestamp - startTime) / duration, 1);
        currentValue = Math.floor(progress * target);
        element.textContent = formatCounter(currentValue);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = formatCounter(target);
        }
    }

    window.requestAnimationFrame(step);
}

function formatCounter(value) {
    return Number(value).toLocaleString("es-ES");
}
