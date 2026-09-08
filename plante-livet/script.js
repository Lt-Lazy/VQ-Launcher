// ==========================================
// INNSTILLINGER
// ==========================================


// Bytt denne til den ekte e-postadressen.
const SALES_EMAIL = "din.epost@example.no";


// ==========================================
// PLANTER
// ==========================================
//
// For å legge til en ny plante senere,
// kopierer du bare ett av objektene under.
//

const plants = [

    {
        id: 1,

        name: "Rosa Lilje",

        image: "assets//blomster/rosa-blomst.jpg",

        shortDescription:
            "En stor rosa blomsterplante med grønne blader og små blomsterdetaljer.",

        description:
            "Rosa Lilje er en dekorativ håndlaget plante med store rosa blomster, grønne blader og mindre blomsterdetaljer. Hver blomst og stilk formes individuelt før planten settes sammen.",

        status: "På forespørsel"
    },


    {
        id: 2,

        name: "Skogblomst",

        image: "assets//blomster/skogblomst.jpg",

        shortDescription:
            "En grønn og naturlig modell inspirert av planter fra skogbunnen.",

        description:
            "Skogblomst er inspirert av den norske skogen og kombinerer grønne blader med små dekorative blomster. Modellen passer godt i vinduskarmen, på en hylle eller som borddekorasjon.",

        status: "På forespørsel"
    },


    {
        id: 3,

        name: "Sommereng",

        image: "assets/blomster/sommereng.jpg",

        shortDescription:
            "En fargerik blomsterplante inspirert av en norsk sommereng.",

        description:
            "Sommereng kombinerer flere små blomster og grønne plantedetaljer i én dekorasjon. Fordi hver plante lages for hånd vil plassering, form og detaljer variere litt.",

        status: "På forespørsel"
    }

];


// ==========================================
// ELEMENTER
// ==========================================

const plantsGrid =
    document.getElementById("plantsGrid");

const plantModal =
    document.getElementById("plantModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalStatus =
    document.getElementById("modalStatus");

const modalRequestButton =
    document.getElementById("modalRequestButton");

const contactPlant =
    document.getElementById("contactPlant");

const contactForm =
    document.getElementById("contactForm");

const displayEmail =
    document.getElementById("displayEmail");

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.getElementById("mainNav");


// Planten som eventuelt er åpnet i modal.
let selectedPlant = null;


// ==========================================
// VIS E-POST
// ==========================================

displayEmail.textContent = SALES_EMAIL;


// ==========================================
// LAG PLANTEKORT
// ==========================================

function renderPlants() {

    plantsGrid.innerHTML = "";


    plants.forEach((plant) => {

        const card =
            document.createElement("article");

        card.className = "plant-card";


        card.innerHTML = `

            <div class="plant-image-wrapper">

                <img
                    src="${plant.image}"
                    alt="${plant.name}"
                    class="plant-image"
                >

                <span class="plant-status">
                    ${plant.status}
                </span>

            </div>


            <div class="plant-card-content">

                <h3>
                    ${plant.name}
                </h3>

                <p class="plant-card-description">
                    ${plant.shortDescription}
                </p>


                <div class="plant-card-bottom">

                    <span>
                        Håndlaget
                    </span>

                    <button
                        class="view-button"
                        data-id="${plant.id}"
                    >
                        Se planten →
                    </button>

                </div>

            </div>

        `;


        const image =
            card.querySelector(".plant-image");


        // Hvis et bilde ikke finnes ennå,
        // viser vi en pen placeholder istedenfor.

        image.addEventListener(
            "error",
            () => {

                const wrapper =
                    image.parentElement;

                image.remove();

                const placeholder =
                    document.createElement("div");

                placeholder.className =
                    "image-placeholder";

                placeholder.innerHTML = `

                    <span>❀</span>

                    <p>
                        Bilde kommer
                    </p>

                `;

                wrapper.prepend(placeholder);

            }
        );


        plantsGrid.appendChild(card);

    });


    setupPlantButtons();

}


// ==========================================
// KNAPPER PÅ PLANTEKORT
// ==========================================

function setupPlantButtons() {

    const buttons =
        document.querySelectorAll(
            ".view-button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const plantId =
                    Number(
                        button.dataset.id
                    );

                openPlantModal(plantId);

            }
        );

    });

}


// ==========================================
// ÅPNE PLANTE
// ==========================================

function openPlantModal(plantId) {

    const plant =
        plants.find(
            item =>
                item.id === plantId
        );


    if (!plant) {
        return;
    }


    selectedPlant = plant;


    modalImage.src =
        plant.image;

    modalImage.alt =
        plant.name;

    modalTitle.textContent =
        plant.name;

    modalDescription.textContent =
        plant.description;

    modalStatus.textContent =
        plant.status;


    plantModal.classList.add(
        "active"
    );


    plantModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


// ==========================================
// LUKK MODAL
// ==========================================

function closePlantModal() {

    plantModal.classList.remove(
        "active"
    );


    plantModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    selectedPlant = null;

}


modalClose.addEventListener(
    "click",
    closePlantModal
);


plantModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === plantModal
        ) {
            closePlantModal();
        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            plantModal.classList.contains(
                "active"
            )
        ) {
            closePlantModal();
        }

    }
);


// ==========================================
// FORESPØRSEL FRA EN PLANTE
// ==========================================

modalRequestButton.addEventListener(
    "click",
    () => {

        if (!selectedPlant) {
            return;
        }


        // Setter planten i kontaktskjemaet.
        contactPlant.value =
            selectedPlant.name;


        // Lager eksempelmelding.
        document.getElementById(
            "contactMessage"
        ).value =
            `Hei! Jeg er interessert i modellen "${selectedPlant.name}". Jeg ønsker gjerne mer informasjon om pris og tilgjengelighet.`;


        closePlantModal();


        document.getElementById(
            "kontakt"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ==========================================
// LEGG PLANTER I KONTAKTSKJEMA
// ==========================================

function populatePlantSelect() {

    plants.forEach((plant) => {

        const option =
            document.createElement(
                "option"
            );


        option.value =
            plant.name;

        option.textContent =
            plant.name;


        contactPlant.appendChild(option);

    });

}


// ==========================================
// KONTAKTSKJEMA
// ==========================================

contactForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document.getElementById(
                "contactName"
            ).value.trim();


        const email =
            document.getElementById(
                "contactEmail"
            ).value.trim();


        const plant =
            document.getElementById(
                "contactPlant"
            ).value;


        const message =
            document.getElementById(
                "contactMessage"
            ).value.trim();


        let subject =
            "Forespørsel om håndlaget plante";


        if (plant) {

            subject =
                `Forespørsel – ${plant}`;

        }


        const body = `Hei!

Navn:
${name}

E-post:
${email}

Plante/modell:
${plant || "Generell forespørsel"}

Melding:
${message}

Med vennlig hilsen
${name}`;


        const mailtoLink =
            `mailto:${SALES_EMAIL}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        window.location.href =
            mailtoLink;

    }
);


// ==========================================
// MOBILMENY
// ==========================================

menuButton.addEventListener(
    "click",
    () => {

        mainNav.classList.toggle(
            "active"
        );

    }
);


document
    .querySelectorAll(
        ".main-nav a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mainNav.classList.remove(
                    "active"
                );

            }
        );

    });


// ==========================================
// ÅRSTALL
// ==========================================

document.getElementById(
    "currentYear"
).textContent =
    new Date().getFullYear();


// ==========================================
// START
// ==========================================

renderPlants();

populatePlantSelect();