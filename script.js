document.addEventListener('DOMContentLoaded', () => {
    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            // loop voor elk persoon
            people.forEach(person => {
                console.log('Persoon:', person); // log hele persoon debug

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
