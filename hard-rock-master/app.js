const searchButton = () =>{
    const inputField = document.getElementById('input').value;
    const url = `https://api.lyrics.ovh/suggest/:${inputField}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySong(data.data))
    .catch(error => displayError('something went wrong'));
}

const displaySong = songs =>{
    const storeSongs = document.getElementById('store-songs')
    storeSongs.innerHTML = '';
    songs.forEach(song => {
        console.log(song)
        const songDiv = document.createElement('div');
        songDiv.innerHTML = '';
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        `;
        storeSongs.appendChild(songDiv)
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v16/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics);
    }
    catch (error) {
        displayError('something went wrong')
    }
    
}

const displayLyric = lyric => {
    const lyricContainer = document.getElementById('lyric-container');
    lyricContainer.innerText = lyric;
}

const displayError = error =>{
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = error;
}

// const searchButton = async () =>{
//     const inputField = document.getElementById('input').value;
//     const url = `https://api.lyrics.ovh/suggest/:${inputField}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySong(data.data)
// }


// const getLyric = async (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     displayLyric(data.lyrics);
// }