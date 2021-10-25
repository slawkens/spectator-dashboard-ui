<script>
  export let player;
  import { players } from "./store.js";
  import Icon from "@iconify/svelte";
  import PlayerTooltip from "./PlayerTooltip.svelte";
  import Tooltip from "./Tooltip.svelte";
  $: ref = $players[player.id];
</script>

<span>
  {#if ref && ref.verified}<Icon icon="cif:{ref.country_code}" width="16" />
    <Tooltip id={player.id}>
      <span slot="target" class="tooltip">
        {ref.name}
      </span>
      <PlayerTooltip {player} slot="content" />
    </Tooltip>
  {:else}
    {player.name}
  {/if}
</span>

<style>
  .tooltip {
    text-decoration-line: underline;
    text-decoration-style: dashed;
    text-decoration-color: gray;
    text-decoration-thickness: 1px;
    cursor: pointer;
  }
</style>
