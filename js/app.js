// Setting variables
const wordInput = document.querySelector('input');
const bttn = document.querySelector('#search-bttn');
const desiredWord = document.querySelector('#word');
const posPhon = document.querySelector('#pos-phon');
const wordDef = document.querySelector('.word-meaning');
const audio = document.querySelector('#speaker-icon');
const audioTag = document.querySelector('#speaker-audio');
const container = document.querySelector('.modal');
const wrapper = document.querySelector('.definition-wrapper');
const errorDiv = document.querySelector('.error');
const srcLink = document.querySelector('.source-link');

// Fetching API
async function fetchAPI(word) {
    const apiRequest = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const api = await apiRequest.json();
    return(api);
}

bttn.addEventListener('click', async () => {
    try {
        const word = wordInput.value;
        const apiData = await fetchAPI(word);

        const phonetics = apiData[0].phonetics[0].text;
        const pos = apiData[0].meanings[0].partOfSpeech;
        const definition = apiData[0].meanings[0].definitions[0].definition;
        const audioSrc = apiData[0].phonetics[0].audio;
        const link = apiData[0].sourceUrls[0];
        
        desiredWord.innerHTML = word;
        posPhon.innerHTML = pos + "  &#x2022  " + phonetics;
        wordDef.innerHTML = definition;
        audioTag.setAttribute('src', audioSrc);
        // The API doesn't have example sentences, so I decided to replace it with source link to give the user an option to look for more information about the word.
        srcLink.innerHTML = link;
        
        wordInput.value = '';
    } catch {
        wordInput.value = '';
        alert("Couldn't find the word");
    }

});

audio.addEventListener('click', () => {
    try {
        audioTag.play();
    } catch {
        alert("This particular word doesn't have audio");
    }
});