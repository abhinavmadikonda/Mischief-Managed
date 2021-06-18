var musicId = document.getElementById("homeScreenMusic");
var containerId = document.getElementsByClassName("background")[0];
var outputId = document.getElementById("output");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var openSpells = ['alohomora', 'open the door', 'lumos maxima', 'Mischief Managed'];
var grammar =  '#JSGF V1.0; grammar openSpells; public <openSpell> = ' + openSpells.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event){
    var spell = event.results[0][0].transcript;
    console.log(`abhi: ${JSON.stringify(event)} and ${spell}`);
    nextScreen(spell);

}

recognition.onspeechend = function(event){
    recognition.stop();
}

recognition.onnomatch = function(event){
    outputId.innerHTML = "no input";
}

recognition.onerror = function(event){
    outputId.textContent = "error occured!";
}

function startRecognition(){
    if(checkConnectivity()){
        musicId.pause();
        musicOn = false;
        recognition.start();
        console.log('Ready to receive spell..');
    } else {
        alert("You are not connected to internet!")
    }
    
}








var currentScreen = 'door';
var musicOn = true;
function muteMusic(event) {
    if(event.code == 'KeyM'){
        if(musicOn) {
            musicId.pause();
            musicOn = false;
        } else {
            musicId.play();
            musicOn = true;
        }
    }
}

document.addEventListener('keypress', muteMusic);

function checkConnectivity(){
    return navigator.onLine;
}

function nextScreen(spell) { 
    switch(spell.toString().toLowerCase()){
        case 'alohomora':
        case 'open the door': {
            containerId.style.backgroundImage ="url('resources/images/light.jpg')";
            containerId.style.filter= "brightness(25%)";
            break;
            }
        case 'lumos maxima': {
            containerId.style.filter= "brightness(120%)";
            break;
        }
        case 'mischief managed': {
            containerId.style.backgroundImage ="url('resources/images/Thankyou.png')";
            break;
        }
    } 
    outputId.innerHTML = spell;
}