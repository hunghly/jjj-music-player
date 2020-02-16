import {songsList} from "../data/songs.js";
import PlayInfo from "./play-info.js";
import TrackBar from "./track-bar.js";

const PlayList = (_ => {
    // data or state
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);


    //cache the DOM
    const playListEl = document.querySelector(".playlist");

    const flip = _ => {
        togglePlayPause();
        render();
    };

    const init = () => {
        // console.log(songsList);
        // console.log(currentSong);
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    };

    const changeAudioSrc = _ => {
        currentSong.src = songs[currentlyPlayingIndex].url;
    };

    const togglePlayPause = _ => {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    };

    const mainPlay = clickedIndex => {
        if (currentlyPlayingIndex === clickedIndex) {
            togglePlayPause();
        } else {
            currentlyPlayingIndex = clickedIndex;
            changeAudioSrc();
            togglePlayPause();
        }

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    };

    const playNext = _ => {
        if (songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++;
            currentSong.src = songs[currentlyPlayingIndex].url;
            togglePlayPause();
            render();
        }
    };

    const listeners = () => {
        playListEl.addEventListener("click", function (e) {
            if (e.target && e.target.matches(".fa")) {
                const listElem = e.target.parentNode.parentNode;
                const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                mainPlay(listElemIndex);
                render();
            }
        });
        currentSong.addEventListener("ended", _ => {
            playNext();
        })
    };

    currentSong.addEventListener("timeupdate", () => {
        TrackBar.setState(currentSong);
    });


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
        init,
        flip
    }

})();

export default PlayList;
