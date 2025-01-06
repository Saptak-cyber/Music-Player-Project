// Display message on the console
console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0; // Keeps track of the current song index
let audioElement = new Audio('songs/1.mp3'); // Creates a new audio element with the first song
let masterPlay = document.getElementById('masterPlay'); // Reference to the play/pause button
let myProgressBar = document.getElementById('myProgressBar'); // Reference to the progress bar
let gif = document.getElementById('gif'); // Reference to the gif (usually a visual indicator like a loading animation)
let masterSongName = document.getElementById('masterSongName'); // Reference to the song name display
let songItems = Array.from(document.getElementsByClassName('songItem')); // Array of all song items

// Array of song objects containing song names, file paths, and cover image paths
let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// Update the song list display
songItems.forEach((element, i) => { 
    // Set the cover image and song name in each song item
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle the play/pause functionality for the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        // If the audio is paused or hasn't started, play it
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle'); // Change icon to pause
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show the gif (indicating that music is playing)
    } else {
        // If the audio is playing, pause it
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle'); // Change icon to play
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide the gif
    }
})

// Update the progress bar as the song plays
audioElement.addEventListener('timeupdate', () => { 
    // Calculate the progress of the song and update the progress bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
})

// Allow the user to change the progress of the song using the progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

// Reset all play buttons to show play icon
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle'); // Change all play icons to play
        element.classList.add('fa-play-circle');
    })
}

// Add event listener to each song play button (to play a specific song)
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays(); // Reset all other play buttons to play
        songIndex = parseInt(e.target.id); // Get the index of the clicked song
        e.target.classList.remove('fa-play-circle'); // Change the clicked button to pause icon
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`; // Set the audio source to the clicked song
        masterSongName.innerText = songs[songIndex].songName; // Update the master song name display
        audioElement.currentTime = 0; // Reset the song to the start
        audioElement.play(); // Play the new song
        gif.style.opacity = 1; // Show the gif
        masterPlay.classList.remove('fa-play-circle'); // Change the master play button to pause icon
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Next button functionality to go to the next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0; // If at the last song, loop back to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Set the audio source to the next song
    masterSongName.innerText = songs[songIndex].songName; // Update the master song name display
    audioElement.currentTime = 0; // Reset the song to the start
    audioElement.play(); // Play the new song
    masterPlay.classList.remove('fa-play-circle'); // Change the master play button to pause icon
    masterPlay.classList.add('fa-pause-circle');
})

// Previous button functionality to go to the previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0; // If already at the first song, stay at the first song
    } else {
        songIndex -= 1; // Move to the previous song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Set the audio source to the previous song
    masterSongName.innerText = songs[songIndex].songName; // Update the master song name display
    audioElement.currentTime = 0; // Reset the song to the start
    audioElement.play(); // Play the new song
    masterPlay.classList.remove('fa-play-circle'); // Change the master play button to pause icon
    masterPlay.classList.add('fa-pause-circle');
})
