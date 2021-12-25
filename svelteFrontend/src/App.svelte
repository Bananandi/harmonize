<script>
	import Router, { location } from "svelte-spa-router";
	import {
		songs,
		testSongs,
		frontendTestMode,
		theme,
	} from "./store.js";
	import Add from "./Add.svelte";
	import List from "./List.svelte";
	import Sheet from "./Sheet.svelte";
	import NotFound from "./NotFound.svelte";

	function setTheme(t) {
		document.body.style = `--background-color:${t.backgroundColor};--color:${t.color};--accent-color:${t.accentColor};--light-accent-color:${t.lightAccentColor}`;
	}

	async function fetchAllSongs() {
		if ($frontendTestMode) {
			$songs = $testSongs;
		} else {
			const response = await fetch("/a");
			$songs = await response.json();
		}
	}

	setTheme($theme);
	fetchAllSongs();
</script>

<main>
	<nav>
		<a
			href="#/"
			class={$location === "/" ? "selectedLink" : "unselectedLink"}
			>List</a
		>
		<a
			href="#/add"
			class={$location === "/add" ? "selectedLink" : "unselectedLink"}
			>Add</a
		>
	</nav>

	<Router
		routes={{
			"/": List,
			"/add": Add,
			"/sheet/:id": Sheet,
			"/*": NotFound,
		}}
	/>
</main>

<style>
	nav {
		padding-top: 2vh;
		padding-bottom: 2vh;
		padding-left: 5vw;
		padding-right: 5vw;
		background-color: var(--accent-color);
	}
	a {
		text-decoration: none;
		font-size: 7vw;
		margin-right: 5vw;
		border: none;
		border-radius: 1vw;
		color: var(--accent-color);
	}
	.unselectedLink {
		background-color: var(--accent-color);
		color: var(--background-color);
	}
	.selectedLink {
		background-color: var(--background-color);
		color: var(--accent-color);
	}
</style>
