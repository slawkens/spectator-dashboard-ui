<script>
  import { players, theme } from "./store.js";
  import Icon from "@iconify/svelte";
  import { Circle, Pulse } from "svelte-loading-spinners";
  import PlayerName from "./PlayerName.svelte";

  function sortPlayers(a, b) {
    const has_rank_a = a.rank_tournament !== null;
    const has_rank_b = b.rank_tournament !== null;
    return has_rank_b - has_rank_a || (has_rank_a === true && a.rank_tournament - b.rank_tournament) || 0;
  }
</script>

<table id="players">
  <tr>
    <th class="nowrap">Rank (1v1)</th>
    <th>Name</th>
    <th>Team</th>
    <th>Status</th>
    <th>Event</th>
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
      <td class="nowrap status">
        {#if player.status === "playing"}
          <a href={player.spectate_link}>
            <Icon icon="mdi:eye" />
            {player.match_map}
            {#if player.match_diplomacy == "1v1"}
              vs {player.match_vs}
            {:else}
              {player.match_diplomacy}
            {/if}
          </a>
        {:else if player.status === "queuing"}
          <Circle size="13" color={$theme === "dark" ? "#fff" : "#000"} unit="px" duration="4s" /> Queuing
          {#if player.queue_num !== undefined && player.queue_num > 0} w/{player.queue_num}{/if}
        {:else if player.status === "matched"}
        <Pulse size="13" color={$theme === "dark" ? "#fff" : "#000"} unit="px" duration="1s" />
          {#if player.match_map !== undefined}{player.match_map}{/if}
          {#if player.match_diplomacy === "1v1"}vs {player.match_vs}{:else}{player.match_diplomacy}{/if}
        {:else if player.status === "lobby"}
        <a href="{player.lobby_link}">
          <Icon icon="mdi:view-list-outline" />
          {#if player.match_map !== undefined}{player.match_map} {/if}{#if player.match_diplomacy === "1v1"}vs {player.match_vs}{:else if player.match_diplomacy !== undefined}{player.match_diplomacy}{/if}</a>
        {:else if player.status === "private"}
          <Icon icon="mdi:eye-off" />
          {#if player.match_map !== undefined}{player.match_map}{/if}
          {#if player.match_diplomacy === "1v1"}vs {player.match_vs}{:else}{player.match_diplomacy}{/if}
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
            {:else if player.stream_link.includes("facebook")}
              <Icon icon="mdi:facebook" />
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
  :global(.status div) {
    display: inline-block !important;
    vertical-align: middle !important;
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
    max-width: 350px;
  }
</style>
