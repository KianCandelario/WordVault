// Setting variables
const searchButton = document.querySelector('#search-bttn');
const closeButton = document.querySelector('#close-bttn');
const outer = searchButton.closest('.layout');
const defWrapper = document.querySelector('.definition-wrapper');
const errorDiv = document.querySelector('.error');
const modal = outer.nextElementSibling;
const overlay = modal.nextElementSibling;

// Event Listeners
searchButton.addEventListener('click', () => {
    if (defWrapper.classList.contains('disable') && errorDiv.classList.contains('active')) {
        defWrapper.classList.remove('disable');
        errorDiv.classList.remove('active');
        triggerModal(modal, overlay);
    }
    else {
        triggerModal(modal, overlay);
    }
});

closeButton.addEventListener('click', () => {
    triggerModal(modal, overlay);
});

overlay.addEventListener('click', () => {
    const outside = document.querySelector('.modal.active');
    triggerModal(outside, overlay);
});

// Function for DRY Principle :P
function triggerModal (modal, overlay) {
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}