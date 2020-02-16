import PlayList from "./playlist.js";

const PlayInfo = (() => {

    const state = {
        songsLength: 0,
        isPlaying: false
    };

    // cache the DOM
    const playerCountEl = document.querySelector(".player__counter");
    const playerTriggerEl = document.querySelector(".player__trigger");

    const init = _ => {
        render();
        listeners();
    };

    const listeners = _ => {
        playerTriggerEl.addEventListener("click", () => {
            console.log("clicked");
            state.isPlaying = !state.isPlaying;
            render();
            PlayList.flip();
        });
    };

    const setState = obj => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    };

    const render = _ => {
        playerCountEl.innerHTML = state.songsLength;
        playerTriggerEl.innerHTML = state.isPlaying ? "Pause" : "Play";
    };

    return {
        init,
        setState
    }
})();

export default PlayInfo;


