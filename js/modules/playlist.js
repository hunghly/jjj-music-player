import {songsList} from "../data/songs.js";

const PlayList = (_ => {
    // data or state
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);
    let isPlaying = false;

    //cache the DOM
    const playListEl = document.querySelector(".playlist");

    const init = () => {
        console.log("hello");
        // console.log(songsList);
        // console.log(currentSong);
        render();
    };

    const render = () => {
        let markup = "";

        const toggleIcon = (itemIndex) => {
            if (currentlyPlayingIndex === itemIndex) {
                return currentSong.paused ? 'fa-play' : 'fa-pause';
            } else {
                return 'fa-play';
            }
        };

        songs.forEach((songObj, index) => {
            markup += `
                    <li class="playlist__song ${index === currentlyPlayingIndex ? "playlist__song--active" : ""}">
                        <div class="play-pause">
                            <i class="fa ${toggleIcon(index)} pp-icon"></i>
                        </div>
                        <div class="playlist__song-details">
                            <span class="playlist__song-name">${songObj.title}</span>
                            <br>
                            <span class="playlist__song-artist">${songObj.artist}</span>
                        </div>
                        <div class="playlist__song-duration">
                            ${songObj.time}
                        </div>
                    </li>`;
        });

        playListEl.innerHTML = markup;
    };

    return {
        init
    }

})();

export default PlayList;
