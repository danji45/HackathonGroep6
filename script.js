document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            // loop voor elk persoon
            people.forEach(person => {
                console.log('Persoon:', person); // log hele persoon debug

                // laat de naam van de persoon zien.
                console.log(person.name);
                const naamElement = document.getElementById("naam");
                naamElement.textContent = `${person.name}`;

                // laat de tagline van de persoon zien.
                console.log(person.tagline);
                const taglineElement = document.getElementById("tagline");
                taglineElement.textContent = `Tagline: ${person.tagline}`;

                // laat de categorie van de persoon zien.
                console.log(person.period);
                const categorieElement = document.getElementById("categorie");
                categorieElement.textContent = `${person.period}`;

                // laat de werk van de persoon zien.
                console.log(person.work);
                const werkElement = document.getElementById("werk");
                werkElement.textContent = `Works at: ${person.work}`;


                // laat de afbeelding van de persoon zien.
                console.log(person.image);
                const imageUrl = `https://fdnd.directus.app/assets/${person.image}`;
                
                const imageElement = document.getElementById("image");
                imageElement.src = imageUrl;  // Zorgt ervoor dat de afbeelding correct wordt weergegeven


                // laat de github van de persoon zien.
                console.log(person.github);
                const githubUrl = person.github;  // Zorg ervoor dat dit een geldige URL is
                
                const githubElement = document.getElementById("github-link");
                if (githubUrl) {
                    githubElement.href = githubUrl;
                    githubElement.target = "_blank";  // Opent de link in een nieuw tabblad
                } else {
                    console.error("Geen geldige GitHub-URL gevonden!");
                }


                // laat de codepen van de persoon zien.
                console.log(person.codepen);
                const codepenUrl = person.codepen;  // Zorg ervoor dat dit een geldige URL is
                
                const codepenElement = document.getElementById("codepen-link");
                if (codepenUrl) {
                    codepenElement.href = codepenUrl;
                    codepenElement.target = "_blank";  // Opent de link in een nieuw tabblad
                } else {
                    console.error("Geen geldige codepen-URL gevonden!");
                }

                
                // laat de website van de persoon zien.
                console.log(person.website);
                const websiteUrl = person.website;  // Zorg ervoor dat dit een geldige URL is
                
                const websiteElement = document.getElementById("website-link");
                if (websiteUrl) {
                    websiteElement.href = websiteUrl;
                    websiteElement.target = "_blank";  // Opent de link in een nieuw tabblad
                } else {
                    console.error("Geen geldige website-URL gevonden!");
                }
                
                

                const countryCode = person.country?.trim(); // landen-ID ophalen

                if (!countryCode) {
                    console.warn(`Geen landcode gevonden voor ${person.name}`);
                    return;
                }

                const path = document.querySelector(`path[id="${countryCode}"]`);

                if (path) {
                    console.log(`${person.name} gevonden in ${countryCode}`);
                    path.style.fill = 'darkgreen'; // tijdelijk: highlight het land
                } else {
                    console.warn(`${person.name} heeft land ${countryCode}, maar geen match in SVG`);
                }
            });



        })
        .catch(error => {
            console.error('Error:', error);
        });
});
