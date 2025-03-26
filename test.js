document.addEventListener('DOMContentLoaded', () => {
    const carouselList = document.getElementById('carousel-list');

    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            people.forEach((person, index) => {
                // Maak de carousel-item
                const carouselItem = document.createElement('li');
                carouselItem.className = 'carousel-card';
                carouselItem.dataset.id = person.id;

                // Voorkant van de kaart
                const frontCard = document.createElement('div');
                frontCard.className = 'card-front';
                frontCard.innerHTML = `
                    <img src="https://fdnd.directus.app/assets/${person.image}" alt="${person.name}" />
                    <section>
                        <h2>${person.name}</h2>
                        <p>${person.tagline}</p>
                    </section>
                `;

                // Achterkant van de kaart (profiel)
                const backCard = document.createElement('div');
                backCard.className = 'card-back';
                backCard.innerHTML = `
                    <header class="profile-header">
                        <img class="profile-image" src="https://fdnd.directus.app/assets/${person.image}" alt="Profielfoto">
                        <h1>${person.name}</h1>
                    </header>
                    
                    <p>Tagline: ${person.tagline}</p>
                    <p>${person.period}</p>
                    <p>Works at: ${person.work}</p>
                    
                    <footer class="profile-icons">
                        <a href="${person.github}" target="_blank">
                            <img src="photo/githubLogo.png" alt="github">
                        </a>
                        <a href="${person.codepen}" target="_blank">
                            <img src="photo/codepenLogo.png" alt="Codepen">
                        </a>
                        <a href="${person.website}" target="_blank">
                            <img src="photo/webbrowserLogo.png" alt="webbrowser">
                        </a>
                    </footer>
                `;

                // Combineer voor- en achterkant
                carouselItem.appendChild(frontCard);
                carouselItem.appendChild(backCard);

                // Voeg toe aan carousel
                carouselList.appendChild(carouselItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});