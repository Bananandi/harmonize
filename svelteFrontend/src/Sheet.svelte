<script>
    import { songs, frontendTestMode } from "./store.js";
    import { push } from "svelte-spa-router";

    export let params = {};

    let song;
    if ($songs !== undefined) {
        song = $songs.find((song) => song._id === params.id);
    }

    let lyricSize = 4;
    let edit = false;

    function updateLyricSize(scale) {
        lyricSize += scale;
    }

    async function updateSong() {
        await fetch("/u", {
            method: "POST",
            body: JSON.stringify(song),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Reload all songs
        const response = await fetch("/a");
        $songs = await response.json();
    }

    async function removeSong() {
        await fetch("/r", {
            method: "POST",
            body: JSON.stringify(song),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Reload all songs
        const response = await fetch("/a");
        $songs = await response.json();
    }

    function toggleEdit() {
        if (edit === true) {
            if (!$frontendTestMode) {
                updateSong();
            }
            // In frontend test mode song is binded to store
        }
        edit = !edit;
    }

    function removeClicked() {
        if (confirm("Really remove this masterpiece?")) {
            if ($frontendTestMode) {
                const i = $songs.indexOf(song);
                $songs.splice(i, 1);
            } else {
                removeSong();
            }
            push("/");
        }
    }
</script>

<div id="sheet">
    <!-- style={edit ? "background: var(--accent-color); filter: opacity(30%);" : "background: var(--background-color);"} -->

    {#if song !== undefined}
        <textarea
            id="title"
            placeholder="Title"
            spellcheck="false"
            readonly={!edit}
            rows={song.title.split("\n").length}

            style="background-color: {edit
                ? 'var(--light-accent-color)'
                : 'var(--background-color)'}"

            bind:value={song.title}
        />

        <textarea
            id="author"
            placeholder="Author"
            spellcheck="false"
            readonly={!edit}
            rows={song.author.split("\n").length}
            style="background-color: {edit
                ? 'var(--light-accent-color)'
                : 'var(--background-color)'}"
            bind:value={song.author}
        />
        <div id="btnRow">
            <button class="sizeBtn" on:click={() => updateLyricSize(-0.25)}>
                -
            </button>
            <button class="sizeBtn" on:click={() => updateLyricSize(0.25)}>
                +
            </button>
            <button
                class="ctrlBtn"
                style="margin-right: 0;"
                on:click={toggleEdit}>{edit ? "Save" : "Edit"}</button
            >
            <button class="ctrlBtn" on:click={removeClicked}>Remove</button>
        </div>
        <textarea
            style="font-size: {lyricSize}vw; background-color: {edit
                ? 'var(--light-accent-color)'
                : 'var(--background-color)'}"
            id="lyrics"
            placeholder="Lyrics"
            spellcheck="false"
            readonly={!edit}
            rows={song.lyrics.split("\n").length}
            bind:value={song.lyrics}
        />
    {:else}
        <p>Loading song failed</p>
    {/if}
</div>

<style>
    #sheet {
        margin-left: 5vw;
        margin-right: 5vw;
    }
    #title {
        font-family: inherit;
        font-size: 7vw;
        font-weight: bold;
        padding-bottom: 0;
        margin-top: 2vh;
        width: 90vw;
        border: none;
        outline: none;
        resize: none;
        overflow-x: auto;
        white-space: pre;
    }
    #author {
        font-family: inherit;
        font-size: 6vw;
        padding-top: 0;
        padding-bottom: 0;
        margin-bottom: 1vh;
        width: 90vw;
        border: none;
        outline: none;
        resize: none;
        overflow-x: auto;
        white-space: pre;
    }
    #btnRow {
        height: 6vw;
        margin-bottom: 1vh;
    }
    .ctrlBtn {
        float: right;
        margin-right: 4vw;
        color: var(--accent-color);
        border-color: var(--accent-color);
        background-color: var(--background-color);
        font-size: 4vw;
        font-family: Helvetica;
        border-radius: 1vw;
    }
    .sizeBtn {
        margin-right: 4vw;
        color: var(--accent-color);
        border-color: var(--accent-color);
        background-color: var(--background-color);
        font-size: 4vw;
        font-family: monospace;
        border-radius: 1vw;
    }
    #lyrics {
        font-family: inherit;
        font-size: 4vw;
        margin-top: 1vh;
        width: 90vw;
        border: none;
        outline: none;
        resize: none;
        overflow-x: auto;
        white-space: pre;
    }
    textarea::placeholder {
        color: var(--background-color);
    }
</style>
