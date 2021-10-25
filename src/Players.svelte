<script>
  import { players } from "./store.js";
  import Icon from "@iconify/svelte";
  import PlayerName from "./PlayerName.svelte";

  function sortPlayers(a, b) {
    const has_rank_a = a.rank_tournament !== null;
    const has_rank_b = b.rank_tournament !== null;
    return has_rank_b - has_rank_a || (has_rank_a === true && a.rank_tournament - b.rank_tournament) || 0;
  }
</script>

<table id="players">
  <tr>
    <th class="nowrap">Rank (Ladder)</th>
    <th>Name</th>
    <th>Team</th>
    <th>Playing</th>
    <th>Tournament</th>
    <th>Streaming</th>
  </tr>
  {#each Object.values($players)
    .filter((player) => player.verified)
    .sort(sortPlayers) as player}
    <tr class="row">
      <td class="nowrap">
        {#if player.rank_tournament}#{player.rank_tournament}{:else}N/A{/if}
        {#if player.rank_rm_1v1} ({player.rank_rm_1v1}){/if}
      </td>
      <td class="nowrap">
        {#if player.warning}<Icon icon="mdi:alert" /> {/if}
        <PlayerName {player} />
      </td>
      <td class="nowrap">
        {#if player.team}{player.team}{/if}
      </td>
      <td class="nowrap">
        {#if player.playing}
          <a href={player.spectate_link}>
            <Icon icon="mdi:eye" />
            {player.match_map}
            {#if player.match_diplomacy == "1v1"}
              vs {player.match_vs}
            {:else}
              TG
            {/if}
          </a>
        {/if}
      </td>
      <td class="nowrap">
        {#if player.tournament}<a target="_blank" href={player.tournament_link}>
            <Icon icon="mdi:tournament" />
            {player.tournament}
          </a>{/if}
      </td>
      <td class="ellipsis streaming">
        {#if player.streaming}<a target="_blank" href={player.stream_link}>
            {#if player.stream_link.includes("twitch")}
              <Icon icon="mdi:twitch" />
            {:else if player.stream_link.includes("douyu")}
              <Icon icon="mdi:shark" />
            {/if}
            {player.stream_title}
          </a>{/if}
      </td>
    </tr>
  {/each}
</table>

<style>
  .nowrap {
    white-space: nowrap;
  }
  th {
    text-align: left;
    padding-left: 4px;
    padding-right: 4px;
  }
  table {
    border: 0px;
    border-collapse: collapse;
  }
  td {
    border-top: 1px solid #ccc;
    padding-left: 4px;
    padding-right: 4px;
  }
  :global(body.dark #players .row > td) {
    border-top: 1px solid #303030;
  }
  .nowrap {
    white-space: nowrap;
  }
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .streaming {
    max-width: 400px;
  }
</style>
