
const play = document.getElementById('play');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress_main');
let progress_div = document.getElementById('progress_div');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const audio = document.querySelector('audio');
let img = document.getElementById('img');
let isPlaying = false;
const songs = [
    {
        name: 'aryan1',
        title: '2 Asle',
        author: 'Navaan Sandhu'
    },
    {
        name: 'aryan2',
        title: 'Ashke',
        author: 'Gurshabad'
    },
    {
        name: 'aryan3',
        title: 'Mel Gel',
        author: 'Diljit Dosanjh'
    },
    {
        name: 'aryan4',
        title: 'Candle Light',
        author: 'G Sidhu'
    },
    {
        name: 'aryan5',
        title: 'Chak Na Time',
        author: 'Sanam Bhullar'
    },
    {
        name: 'aryan6',
        title: 'High End',
        author: 'Diljit Dosanjh'
    },
    {
        name: 'aryan7',
        title: 'Guddiyan Patole',
        author: 'Gurnam Bhullar'
    },
    {
        name: 'aryan8',
        title: 'Jhanjar',
        author: 'Karan Aujla'
    },
    {
        name: 'aryan9',
        title: 'Pasand Bangi',
        author: 'Gurnam Bhullar'
    },
    {
        name: 'aryan10',
        title: 'Khrey Khrey Jatt',
        author: 'Jass Bajwa'
    }
];

const playMusic = () => {
    audio.play();
    isPlaying = true;
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime');
};

const pauseMusic = () => {
    audio.pause();
    isPlaying = false;
    play.classList.replace('fa-pause', 'fa-play');
};

play.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic();
    }
    else {
        playMusic();
    }
});

const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.author;
    audio.src = 'music/' + songs.name + '.mp3';
    img.src = 'images/' + songs.name + '.jpg';
};

let songIndex = 0;
// loadSong(songs[0]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex--]);
    playMusic();
}

audio.addEventListener('timeupdate', (event) => {
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    let tot_duration;
    if (sec < 10 && sec > 0) {
        tot_duration = `${min}:0${sec}`;
    }
    else {
        tot_duration = `${min}:${sec}`;
    }
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    let curr_min = Math.floor(currentTime / 60);
    let curr_sec = Math.floor(currentTime % 60);
    let tot_curr_time;
    if (curr_sec < 10 && curr_sec >= 0) {
        tot_curr_time = `${curr_min}:0${curr_sec}`;
    }
    else {
        tot_curr_time = `${curr_min}:${curr_sec}`;
    }
    if (currentTime) {
        current_time.textContent = `${tot_curr_time}`;
    }
});

progress_div.addEventListener('click', (event) => {
    const { duration } = audio;
    let clicked_time = (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = clicked_time;
});

audio.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
