document.addEventListener('DOMContentLoaded', () => {
    // Posities binnen de SVG viewBox (dus in SVG-coördinaten, niet pixels)
    const countryPositions = {
        Netherlands: { x: 482, y: 275 },
        "United States": { x: 170, y: 330 },
        Germany: { x: 495, y: 280 },
        Greece: { x: 529, y: 325 },
        "Great Britain": { x: 462, y: 275 },
        Romania: { x: 535, y: 303 },
        Portugal: { x: 445, y: 325 },
        Russia: { x: 600, y: 250 },
        Lebanon: { x: 567, y: 347 },
        Belgium: { x: 477, y: 282 },
        Austria: { x: 507, y: 295 },
        Canada: { x: 150, y: 250 },
        Singapore: { x: 758, y: 444 },
        Nigeria: { x: 490, y: 420 },
        Luxembourg: { x: 484, y: 287 },
        Australia: { x: 840, y: 520 },
        Spain: { x: 457, y: 325 }
    };

    // svgPanZoom
    svgPanZoom('svg', {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: true,
        center: true
    });

    // Haal data op van API
    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;
            const g = document.querySelector('svg>g');

            // Unieke landen selecteren
            const uniqueCountries = new Map();
            people.forEach(person => {
                const countryName = person.country?.trim();
                if (!countryName || uniqueCountries.has(countryName)) return;
                uniqueCountries.set(countryName, person);
            });

            // Alleen één pin per uniek land
            uniqueCountries.forEach(person => {
                const countryName = person.country?.trim();

                if (!countryName) {
                    console.log(`Geen landnaam voor ${person.name}`);
                    return;
                }

                const position = countryPositions[countryName];

                if (!position) {
                    console.log(`Geen positie gevonden voor land: ${countryName}`);
                    return;
                }

                const path = document.querySelector(`path[id="${countryName}"]`);

                if (path) {
                    console.log(`${person.name} gevonden in ${countryName}`);
                    path.style.fill = 'var(--landactive)';
                } else {
                    console.log(`${person.name} heeft land ${countryName}, maar geen match in SVG`);
                }

                const pin = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                pin.setAttributeNS(null, 'href', '../photo/pin-point.png');
                pin.setAttribute('x', position.x);
                pin.setAttribute('y', position.y);
                pin.classList.add('pinpoint');

                g.appendChild(pin);
            });
        })
        .catch(error => {
            console.error('Fout bij ophalen van data:', error);
        });
});


document.addEventListener('DOMContentLoaded', () => {
    const carouselList = document.getElementById('carousel-list');

    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            people.forEach(person => {

                var persoon = `
<li onclick="showCard(this);" data-name="${person.name}">
<div>
<img src="https://fdnd.directus.app/assets/${person.image}" />
<section>
<h2>${person.name}</h2>
<p>${person.tagline}</p>
<p>Comes from: ${person.country}</p>
</section>
</div>
</li>
`;

                profileCard = `
                <div class="profileCard"  data-name="${person.name}">
                    <header class="profile-header">
                 <h1 id="naam">${person.name}</h1>
                        <img class="profile-image" src="https://fdnd.directus.app/assets/${person.image}" alt="Profielfoto">
       
                    </header>
                    
                    <p id="tagline">Tagline: ${person.tagline}</p>
                    <p id="categorie">${person.period}</p>
                    <p id="werk">Works at: ${person.work}</p>
                    
                    <footer class="profile-icons">
                        <a href="${person.github}" target="_blank">
                            <img id="icon" src="photo/githubLogo.png" alt="github">
                        </a>
                        

                        <a href="${person.codepen}" target="_blank">
                            <img id="icon" src="photo/codepenLogo.png" alt="Codepen">
                        </a>
                        
                        <a href="${person.website}" target="_blank">
                            <img id="icon" src="photo/webbrowserLogo.png" alt="webbrowser">
                        </a>
                    </footer>
                    </div>
                `;


                console.log(persoon);



                // Add the list item to the carousel
                carouselList.insertAdjacentHTML('beforeend', persoon);

var cardContainer = document.querySelector('.cardContainer');

cardContainer.insertAdjacentHTML('beforeend', profileCard);


            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function showCard(obj) {
    let allCards = document.querySelectorAll('.profileCard');

    allCards.forEach(card => {
        if (card.dataset.name === obj.dataset.name) {
            card.style.display = 'block';
            console.log('kaas');
        } else {
            card.style.display = 'none';
            console.log('geen kaas');
        }
    });
}