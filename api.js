// API URL
const API_URL = 'https://fdnd.directus.app/items/women_in_tech';
const API_ASSETS_URL = 'https://fdnd.directus.app/assets/';

// Fetch data from API
async function fetchProfiles() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data; // Directus API typically returns data in a 'data' property
    } catch (error) {
        console.error('Error fetching profiles:', error);
        document.querySelector('.loading').textContent = 'Er is een fout opgetreden bij het laden van de profielen.';
        return [];
    }
}

// Create profile cards
function createProfileCards(profiles) {
    const container = document.getElementById('profiles-container');
    const template = document.getElementById('profile-template');
    
    // Remove loading message
    container.querySelector('.loading').remove();
    
    // Check if there are any profiles
    if (!profiles || profiles.length === 0) {
        const noData = document.createElement('p');
        noData.textContent = 'Geen profielen gevonden.';
        container.appendChild(noData);
        return;
    }
    
    // Create a card for each profile
    profiles.forEach(profile => {
        // Clone template
        const card = template.content.cloneNode(true);
        
        // Set image if available
        const imgElement = card.querySelector('.profile-image');
        if (profile.image) {
            imgElement.src = `${API_ASSETS_URL}${profile.image}`;
            imgElement.alt = `Foto van ${profile.name}`;
        } else {
            imgElement.src = 'https://via.placeholder.com/150';
            imgElement.alt = 'Geen profielfoto beschikbaar';
        }
        
        // Set profile information
        card.querySelector('name').textContent = profile.name || 'Naam onbekend';
        
        // Conditionally display fields if they exist
        const taglineElement = card.querySelector('.profile-tagline');
        if (profile.tagline) {
            taglineElement.textContent = profile.tagline;
        } else {
            taglineElement.style.display = 'none';
        }
        
        const categoryElement = card.querySelector('.profile-category');
        if (profile.period) {
            categoryElement.textContent = `Periode: ${profile.period}`;
        } else {
            categoryElement.style.display = 'none';
        }
        
        const workElement = card.querySelector('.profile-work');
        if (profile.work) {
            workElement.textContent = `Werkt bij: ${profile.work}`;
        } else {
            workElement.style.display = 'none';
        }
        
        // Set social links
        const githubLink = card.querySelector('.github-link');
        if (profile.github) {
            githubLink.href = profile.github;
        } else {
            githubLink.style.display = 'none';
        }
        
        const codepenLink = card.querySelector('.codepen-link');
        if (profile.codepen) {
            codepenLink.href = profile.codepen;
        } else {
            codepenLink.style.display = 'none';
        }
        
        const websiteLink = card.querySelector('.website-link');
        if (profile.website) {
            websiteLink.href = profile.website;
        } else {
            websiteLink.style.display = 'none';
        }
        
        // Add card to container
        container.appendChild(card);
    });
}

// Initialize
async function init() {
    const profiles = await fetchProfiles();
    createProfileCards(profiles);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);