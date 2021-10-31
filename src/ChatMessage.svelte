<script>
  export let match;
  export let chat;
  import Icon from "@iconify/svelte";

  let ref = Object.values(match.players).filter((p) => p.number === chat.player_id)[0];
</script>

{#if ref}
<span>
  {#if match.diplomacy === "TG" || match.diplomacy === "Other"}<b>
      T{ref.team + 1}
    </b>{/if}
  <Icon icon="mdi:numeric-{ref.color_id + 1}-circle" color={ref.color_hex} />
  {ref.name}:
  {chat.message}
</span>
{/if}