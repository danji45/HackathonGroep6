document.addEventListener('DOMContentLoaded', () => {
    const carouselList = document.getElementById('carousel-list');

    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            people.forEach(person => {
                const persoon = `
                <li data-id="${person.id}">
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

                // Add the list item to the carousel
                carouselList.insertAdjacentHTML('beforeend', persoon);
            });

            // Add click event listeners after items are added
            const listItems = document.querySelectorAll('#carousel-list li');
            listItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Find the person that was clicked
                    const personId = item.getAttribute('data-id');
                    const clickedPerson = people.find(p => p.id == personId);

                    // Create a detailed view
                    const detailView = `
                    <div class="person-detail">
                        <img src="https://fdnd.directus.app/assets/${clickedPerson.image}" alt="${clickedPerson.name}">
                        <h2>${clickedPerson.name}</h2>
                        <p><strong>Tagline:</strong> ${clickedPerson.tagline}</p>
                        <p><strong>Country:</strong> ${clickedPerson.country}</p>
                        <p><strong>Bio:</strong> ${clickedPerson.bio || 'No additional information available'}</p>
                        ${clickedPerson.linkedin ? `<a href="${clickedPerson.linkedin}" target="_blank">LinkedIn</a>` : ''}
                    </div>
                    `;

                    // Remove any existing detail view
                    const existingDetailView = document.querySelector('.person-detail');
                    if (existingDetailView) {
                        existingDetailView.remove();
                    }

                    // Add the detail view after the carousel
                    carouselList.closest('.carousel').insertAdjacentHTML('afterend', detailView);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});