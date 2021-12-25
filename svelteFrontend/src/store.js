import { writable, readable } from "svelte/store";

export const songs = writable(undefined);
export const testSongs = readable([
    {
        _id: "61b3d9326323a8d25b9117be",
        title: "Mind Trick",
        author: "Jamie Cullum",
        lyrics: "I missed the oppertunities\nto get you baby stay with me ...",
    },
    {
        _id: "61b66aa685d074b001441e5b",
        title: "What A Difference",
        author: "Jamie Cullum",
        lyrics: "What a difference a day made ...",
    },
]);

export const theme = readable({
    backgroundColor: "white",
    color: "black",
    accentColor: "deeppink",
    lightAccentColor: "lightpink",
});

export const frontendTestMode = readable(false);
