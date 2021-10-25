<script>
  export let match;
  export let player;
  import { players, time, theme } from "./store.js";
  import Icon from "@iconify/svelte";
  import { Pulse } from "svelte-loading-spinners";
  import PlayerName from "./PlayerName.svelte";

  $: ref = $players[player.id];
</script>

<tr>
  <td class="nowrap player">
    <Icon icon="mdi:numeric-{player.color_id + 1}-circle" color={player.color_hex} />

    {#if $players.hasOwnProperty(player.id) && $players[player.id].verified}<Icon icon="mdi:check-decagram" />
    {/if}
    {#if $players.hasOwnProperty(player.id) && $players[player.id].streaming}
      {#if ref.stream_link.includes("twitch")}
        <Icon icon="mdi:twitch" />
      {:else if ref.stream_link.includes("douyu")}
        <Icon icon="mdi:shark" />
      {/if}
    {/if}
    <PlayerName {player} />
  </td>

  <td class="nowrap">
    {#if player.random || player.full_random}<Icon icon="mdi:map-marker-question" />{/if}{player.civilization}
  </td>
  <td>
    {#if player.age && (!match.countdown || match.countdown <= $time)}{player.age}
    {:else}
      <Pulse size="13" color={$theme === "dark" ? "#fff" : "#000"} unit="px" duration="1s" />
    {/if}
  </td>
  <td class="rate">
    {#if ref && ref.mmr_rm_1v1}{ref.mmr_rm_1v1}{/if}
  </td>
</tr>
{#if player.composition.length > 0}<tr>
    <td colspan="4" class="composition player">
      <Icon icon="mdi:subdirectory-arrow-right" style="margin-left: 6px" />{player.composition.join("/")}
    </td>
  </tr>{/if}

<style>
  td {
    padding-left: 4px;
    padding-right: 4px;
  }
  .nowrap {
    white-space: nowrap;
  }
  .composition {
    font-size: 80%;
  }
  .player {
    padding-left: 17px;
  }
  .rate {
    text-align: right;
  }
</style>
