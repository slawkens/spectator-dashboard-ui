<script>
  import { fade, fly } from "svelte/transition";
  import { matches, players, connection, theme } from "./store.js";
  import Icon from "@iconify/svelte";
  import DarkMode from "svelte-dark-mode";
  import Match from "./Match.svelte";
  import Players from "./Players.svelte";

  $: num_matches = Object.values($matches).length;
  $: num_players = Object.values($players).filter((player) => player.verified).length;
  $: document.body.className = $theme;
</script>

<main>
  <DarkMode bind:theme={$theme} />
  <span class="theme" on:click={() => ($theme = $theme === "dark" ? "light" : "dark")}>
    <Icon icon="mdi:brightness-4" width="20" />
  </span>
  <h1>
    Spectator Dashboard Beta
    {#if !$connection}
      <span transition:fade>[OFFLINE]</span>
    {/if}
  </h1>
  {#if $connection}
    <div>
      <div class="column">
        <h2>
          Ongoing Matches ({#key num_matches}<span style="display: inline-block" in:fly={{ y: -20 }}>
              {num_matches}
            </span>{/key})
        </h2>
        <table id="matches">
          {#each Object.values($matches).sort((a, b) => b.start_timestamp - a.start_timestamp) as match (match.id)}
            <Match {match} />
          {/each}
        </table>
      </div>
      <div class="column">
        <h2>
          Online ({#key num_players}<span style="display: inline-block" in:fly={{ y: -20 }}>
              {num_players}
            </span>{/key})
        </h2>
        <Players />
      </div>
    </div>
  {/if}
</main>
<div id="footer">
  Questions? Contact <Icon icon="mdi:discord" />
  <code>happyleaves#4133</code>
  or visit the
  <a target="_blank" href="https://discordapp.com/invite/njAsNuD">Siege Engineers Discord.</a>
  Find the
  <a href="https://github.com/siegeengineers/aoc-reference-data">reference data</a>
  and
  <a href="https://github.com/siegeengineers/spectator-dashboard-ui">UI source</a>
  on <Icon icon="mdi:github" /> github. Tournament and team data provided by
  <a target="_blank" href="https://liquipedia.net/ageofempires/Main_Page">Liquipedia</a>.
</div>

<style>
  :global(body) {
    padding: 0px;
    margin: 0px;
    transition: background-color 0.3s;
  }
  :global(.dark) {
    background-color: #222222;
    color: #ffffff;
    color-scheme: dark;
  }
  :global(body.dark #footer) {
    background-color: #303030;
  }
  :global(body.dark a) {
    color: #00bc8c;
  }
  h1,
  h2 {
    margin: 0px;
  }
  main {
    margin: 10px;
  }
  #footer {
    padding: 3px;
    clear: both;
    background-color: #f0f0f0;
  }
  .column {
    float: left;
    margin: 20px;
  }
  #matches {
    max-width: 700px;
    border-collapse: collapse;
  }
  .theme {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 0;
  }
</style>
