document.addEventListener("DOMContentLoaded", function () {
    var pageRow = document.querySelector(".espacioBarra");

    if (!pageRow) {
        return;
    }

    var title = pageRow.querySelector("h2");
    var columns = Array.from(pageRow.querySelectorAll(":scope > div[class*='col-']"));
    var scriptColumn = findColumnByHeading(columns, "gu");
    var mediaColumn = findColumnByHeading(columns, "hoja") || findColumnByHeading(columns, "personaje");
    var videoColumn = findColumnByHeading(columns, "v");

    enhanceColumns(columns);
    enhanceParagraphs(scriptColumn);
    enhanceImages(pageRow);
    insertActionBar(title, scriptColumn, mediaColumn, videoColumn);
    createLightbox();
});

function findColumnByHeading(columns, textStart) {
    return columns.find(function (column) {
        var heading = column.querySelector("h3");
        return heading && heading.textContent.trim().toLowerCase().indexOf(textStart) === 0;
    }) || null;
}

function enhanceColumns(columns) {
    columns.forEach(function (column) {
        column.classList.add("legend-interactive-card");
    });
}

function enhanceParagraphs(scriptColumn) {
    if (!scriptColumn) {
        return;
    }

    var paragraphs = scriptColumn.querySelectorAll("p");

    paragraphs.forEach(function (paragraph) {
        paragraph.classList.add("legend-page-paragraph");
        paragraph.addEventListener("click", function () {
            paragraphs.forEach(function (item) {
                item.classList.remove("legend-page-paragraph-active");
            });

            paragraph.classList.add("legend-page-paragraph-active");
        });
    });
}

function enhanceImages(root) {
    var images = root.querySelectorAll("img");

    images.forEach(function (image) {
        if (image.closest(".navbar-brand")) {
            return;
        }

        image.classList.add("legend-zoomable");
        image.addEventListener("click", function () {
            openLightbox(image.currentSrc || image.src, image.alt);
        });
    });
}

function insertActionBar(title, scriptColumn, mediaColumn, videoColumn) {
    if (!title) {
        return;
    }

    var wrapper = document.createElement("div");
    wrapper.className = "legend-page-actions";

    if (scriptColumn) {
        wrapper.appendChild(createToggleButton("Mostrar/Ocultar guion", scriptColumn));
    }

    if (mediaColumn) {
        wrapper.appendChild(createToggleButton("Mostrar/Ocultar recursos", mediaColumn));
    }

    if (videoColumn) {
        wrapper.appendChild(createToggleButton("Mostrar/Ocultar video", videoColumn));

        var goToVideo = document.createElement("button");
        goToVideo.type = "button";
        goToVideo.className = "legend-action-btn";
        goToVideo.textContent = "Ir al video";
        goToVideo.addEventListener("click", function () {
            videoColumn.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        wrapper.appendChild(goToVideo);
    }

    title.insertAdjacentElement("afterend", wrapper);
}

function createToggleButton(label, target) {
    var button = document.createElement("button");

    button.type = "button";
    button.className = "legend-action-btn";
    button.textContent = label;
    button.addEventListener("click", function () {
        target.classList.toggle("legend-is-hidden");
    });

    return button;
}

function createLightbox() {
    if (document.querySelector(".legend-lightbox")) {
        return;
    }

    var overlay = document.createElement("div");
    var closeButton = document.createElement("button");
    var image = document.createElement("img");

    overlay.className = "legend-lightbox";
    overlay.hidden = true;

    closeButton.type = "button";
    closeButton.className = "legend-lightbox-close";
    closeButton.setAttribute("aria-label", "Cerrar imagen");
    closeButton.textContent = "X";

    closeButton.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    overlay.appendChild(closeButton);
    overlay.appendChild(image);
    document.body.appendChild(overlay);
}

function openLightbox(src, alt) {
    var overlay = document.querySelector(".legend-lightbox");
    var image = overlay ? overlay.querySelector("img") : null;

    if (!overlay || !image) {
        return;
    }

    image.src = src;
    image.alt = alt || "Imagen ampliada";
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    var overlay = document.querySelector(".legend-lightbox");

    if (!overlay) {
        return;
    }

    overlay.hidden = true;
    document.body.style.overflow = "";
}
