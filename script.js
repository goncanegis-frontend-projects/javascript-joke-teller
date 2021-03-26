const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke To VoiceRSS
function tellMe(joke) {
    VoiceRSS.speech({
        key: '68131f10766b47118861c92349e92956',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

// Get Jokes from JokeAPI SDK
async function getJokes() {
    toggleButton();
    let joke = '';
    try {
        const apiUrl =
            'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-speech
        tellMe(joke);
        // Disable Button
    } catch (error) {
        toggleButton();
        console.error(error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
