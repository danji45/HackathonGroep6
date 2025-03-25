document.addEventListener('DOMContentLoaded', () => {
    const carouselList = document.getElementById('carousel-list');

    fetch('https://fdnd.directus.app/items/women_in_tech')
        .then(response => response.json())
        .then(data => {
            const people = data.data;

            people.forEach(person => {
                // Create a new list item with an ID based on the person's name
                const listItem = document.createElement('li');
                listItem.id = `id-${person.name.toLowerCase().replace(/\s+/g, '-')}`;

                // Create and set up profile image
                const profileImage = document.createElement('img');
                profileImage.classList.add('profile-image');
                profileImage.src = `https://fdnd.directus.app/assets/${person.image}`;
                profileImage.alt = `Profile of ${person.name}`;
                listItem.appendChild(profileImage);

                // Create name heading
                const nameHeading = document.createElement('h2');
                nameHeading.textContent = person.name;
                listItem.appendChild(nameHeading);

                // Create tagline paragraph
                const taglineParagraph = document.createElement('p');
                taglineParagraph.textContent = person.tagline;
                listItem.appendChild(taglineParagraph);

                // Optional: Add additional details
                const workParagraph = document.createElement('p');
                workParagraph.textContent = `Works at: ${person.work}`;
                listItem.appendChild(workParagraph);

                // Optional: Add social links
                const linkContainer = document.createElement('div');
                linkContainer.classList.add('social-links');

                // GitHub link
                if (person.github) {
                    const githubLink = document.createElement('a');
                    githubLink.href = person.github;
                    githubLink.textContent = 'GitHub';
                    githubLink.target = '_blank';
                    linkContainer.appendChild(githubLink);
                }

                // CodePen link
                if (person.codepen) {
                    const codepenLink = document.createElement('a');
                    codepenLink.href = person.codepen;
                    codepenLink.textContent = 'CodePen';
                    codepenLink.target = '_blank';
                    linkContainer.appendChild(codepenLink);
                }

                // Website link
                if (person.website) {
                    const websiteLink = document.createElement('a');
                    websiteLink.href = person.website;
                    websiteLink.textContent = 'Website';
                    websiteLink.target = '_blank';
                    linkContainer.appendChild(websiteLink);
                }

                listItem.appendChild(linkContainer);

                // Add the list item to the carousel
                carouselList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});