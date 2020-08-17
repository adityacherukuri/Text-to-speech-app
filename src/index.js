const speechSynth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#input-text');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const selectVoices = document.querySelector('#select-voice');
const body = document.querySelector('body');

let voices = [];

const getVoices = () => {
    voices = speechSynth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        //console.log(option);
        selectVoices.appendChild(option);
    });
};

getVoices();

if(speechSynth.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = getVoices;
}  


const speak = () => {
    if(speechSynth.speaking){
        console.error('Transaltion in progress...');
        return;
    }
    if(textInput.value !== ""){
        body.style.background = '#141414 url(images/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%'
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = () => {
            console.log('Translation Completed...');
            body.style.background = '#141414';
        }

        speakText.onerror = () => {
            console.error('Something is wrong...');
        }

        const selectedVoice = selectVoices.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        speechSynth.speak(speakText);
    }
};

textForm.addEventListener('submit', (s) => {
    s.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change', (c) => rateValue.textContent = rate.value);
pitch.addEventListener('change', (c) => pitchValue.textContent = pitch.value);
selectVoices.addEventListener('change', (c) => speak());

