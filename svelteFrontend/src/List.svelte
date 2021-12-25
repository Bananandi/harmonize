<script>
    import { songs } from "./store.js";
</script>

<div id="list">
    {#if $songs !== undefined}
        {#each $songs as song}
            <a href="#/sheet/{song._id}">
                <h2>{song.title}</h2>
                <p>{song.author}</p>
            </a>
        {/each}
    {:else}
        <p>Loading Songs Failed</p>
    {/if}
</div>

<style>
    #list {
        margin-top: 2vh;
        margin-left: 5vw;
        margin-right: 5vw;
    }
    #list a {
        text-decoration: none;
    }
    #list h2 {
        font-size: 7vw;
        color: var(--accent-color);
        margin: 0;
    }
    #list p {
        font-size: 5vw;
        color: var(--color);
        margin-top: 0;
        margin-bottom: 2vh;
    }
</style>
