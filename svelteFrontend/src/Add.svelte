<script>
    import { songs, frontendTestMode } from "./store";
    import { push } from "svelte-spa-router";
    import { ObjectId } from "bson";

    let newSong = { title: "", author: "", lyrics: "" };

    let lyricSize = 4;

    function updateLyricSize(scale) {
        lyricSize += scale;
    }

    async function submitSong() {
        await fetch("/s", {
            method: "POST",
            body: JSON.stringify(newSong),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Reload all songs
        const response = await fetch("/a");
        $songs = await response.json();
    }

    function submitClicked() {
        if (confirm("Save this masterpiece?")) {
            if ($frontendTestMode) {
                $songs.push({ _id: new ObjectId().toString(), ...newSong });
            } else {
                submitSong();
            }
            push("/");
        }
    }
</script>

<div id="sheet">
    <textarea
        id="title"
        placeholder="Title"
        spellcheck="false"
        rows={newSong.title.split("\n").length}
        bind:value={newSong.title}
    />
    <textarea
        id="author"
        placeholder="Author"
        spellcheck="false"
        rows={newSong.author.split("\n").length}
        bind:value={newSong.author}
    />
    <div id="btnRow">
        <button class="sizeBtn" on:click={() => updateLyricSize(-0.25)}>
            -
        </button>
        <button class="sizeBtn" on:click={() => updateLyricSize(0.25)}>
            +
        </button>
        <button id="submit" style="margin-right: 0;" on:click={submitClicked}
            >Submit</button
        >
    </div>
    <textarea
        id="lyrics"
        placeholder="Lyrics"
        spellcheck="false"
        style="font-size: {lyricSize}vw;"
        rows={newSong.lyrics.split("\n").length}
        bind:value={newSong.lyrics}
    />
</div>

<style>
    #sheet {
        margin-left: 5vw;
        margin-right: 5vw;
    }
    #title {
        background-color: var(--light-accent-color);
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
        background-color: var(--light-accent-color);
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
    .sizeBtn {
        margin-right: 4vw;
        color: var(--accent-color);
        border-color: var(--accent-color);
        background-color: var(--background-color);
        font-size: 4vw;
        font-family: monospace;
        border-radius: 1vw;
    }
    #submit {
        float: right;
        margin-right: 4vw;
        color: var(--accent-color);
        border-color: var(--accent-color);
        background-color: var(--background-color);
        font-size: 4vw;
        font-family: Helvetica;
        border-radius: 1vw;    }
    #lyrics {
        background-color: var(--light-accent-color);
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
