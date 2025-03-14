const playPauseBtn = document.getElementById('playPauseBtn');
const ambientSoundSelect = document.getElementById('ambientSoundSelect');
const instructionDisplay = document.getElementById('instruction');

let sound;
let isPlaying = false;

const sounds = {
    forest: 'forest.mp3',
    ocean: 'ocean.mp3',
    rain: 'rain.mp3',
};

function loadSound(soundFile) {
    if (sound) {
        sound.stop();
        sound.unload();
    }

    sound = new Howl({
        src: [soundFile],
        loop: true,
        volume: 0.5,
    });
}

ambientSoundSelect.addEventListener('change', (event) => {
    const selectedSound = event.target.value;
    loadSound(sounds[selectedSound]);

    if (isPlaying) {
        sound.play();
    }
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        sound.pause();
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    } else {
        const selectedSound = ambientSoundSelect.value;
        if (!sound) {
            loadSound(sounds[selectedSound]);
        }
        sound.play();
        playPauseBtn.textContent = 'Pause';
        isPlaying = true;
    }
});

// Breathing exercise timing (in seconds)
const inhaleTime = 4;
const holdTime = 2;
const exhaleTime = 6;

let breathInterval;

function startBreathing() {
    let cycle = 'inhale';
    let timeLeft = inhaleTime;

    instructionDisplay.textContent = 'Get Ready';

    breathInterval = setInterval(() => {
        if (cycle === 'inhale') {
            instructionDisplay.textContent = `Inhale (${timeLeft})`;
            timeLeft--;

            if (timeLeft < 0) {
                cycle = 'hold';
                timeLeft = holdTime;
                instructionDisplay.textContent = `Hold (${timeLeft})`;

            }
        } else if (cycle === 'hold') {
	        instructionDisplay.textContent = `Hold (${timeLeft})`;
            timeLeft--;

            if (timeLeft < 0) {
                cycle = 'exhale';
                timeLeft = exhaleTime;
                instructionDisplay.textContent = `Exhale (${timeLeft})`;
            }
        }
         else if (cycle === 'exhale') {
            instructionDisplay.textContent = `Exhale (${timeLeft})`;
            timeLeft--;

            if (timeLeft < 0) {
                cycle = 'inhale';
                timeLeft = inhaleTime;
                instructionDisplay.textContent = `Inhale (${timeLeft})`;
            }
        }
    }, 1000); // Update every 1 second
}

// Initialize the app
loadSound(sounds['forest']); // Default sound
startBreathing();