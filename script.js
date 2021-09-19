const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isReady = false;
let numberOfImagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// Check if all images have been loaded
function imagesLoaded() {
    numberOfImagesLoaded++;
    console.log('No of images loaded:', numberOfImagesLoaded);

    if (numberOfImagesLoaded === totalImages) {
        isReady = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for links and photos, add them to the DOM
function displayPhotos() {

    totalImages = totalImages + photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event listener, check when each has finished loading
        img.addEventListener('load', imagesLoaded);

        // Put <img> inside <a> element, and then place inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error
    }
}

// Check to see if scrolling near page bottom, and if so, load more photos
window.addEventListener('scroll', () => {
    
    // NOTE: change later
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
        isReady = false;
        getPhotos();
    }
})

// On load
getPhotos();