document.addEventListener('DOMContentLoaded', () => {
    const carouselList = document.getElementById('carousel-list');

    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            people.forEach(person => {

var persoon = `
<li>
<img src="https://fdnd.directus.app/assets/${person.image}" />
<section>
<h2>${person.name}</h2>
<p>${person.tagline}</p>
</section>
</li>

`;

console.log(persoon);

     

                // Add the list item to the carousel
                carouselList.insertAdjacentHTML('beforeend', persoon);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});