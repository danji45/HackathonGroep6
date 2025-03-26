document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.querySelector('body');

    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            // loop voor elk persoon
            people.forEach(person => {
                // Maak een nieuwe article aan voor elke persoon
                const profileCard = document.createElement('article');
                profileCard.className = 'profile-card';
                
                profileCard.innerHTML = `
                    <header class="profile-header">
                        <img class="profile-image" src="https://fdnd.directus.app/assets/${person.image}" alt="Profielfoto">
                        <h1 id="naam">${person.name}</h1>
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
                `;

                // Voeg de nieuwe profielkaart toe aan de body
                profileContainer.appendChild(profileCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});