<script>
  export let match;
  import { time } from "./store.js";
  import Icon from "@iconify/svelte";
  import MatchPlayer from "./MatchPlayer.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import Tooltip from "./Tooltip.svelte";
</script>

<tr class="divider">
  <td colspan="4" class="nowrap">
    {#if match.tournament}<Icon icon="mdi:tournament" alt="Tournament Match" />
    {:else if match.lobby}<Icon icon="mdi:view-list-outline" alt="Lobby Match" />
    {:else}<Icon icon="mdi:sword-cross" alt="Matchmaking Match" />{/if}

    <span class="highlight">
      {match.game_type}
      {#if match.diplomacy !== "Other"}{match.diplomacy}
      {/if}{#if match.diplomacy === "TG" || match.diplomacy === "Other"}{match.team_size}{/if}
      on {match.map}{#if match.lobby}&nbsp({match.lobby_name}){/if}
    </span>

    <span class="ago">
      {new Intl.RelativeTimeFormat("en", {
        numeric: "always",
        style: "short",
      }).format(Math.floor((match.start_timestamp - $time) / 60), "minute")}
    </span>

    <span class="actions">
      <span class="countdown">
        {#if match.countdown && match.countdown > $time}
          {Math.floor(match.countdown - $time)} sec. wait
        {/if}
      </span>
      <Tooltip id={match.id}>
        <span class="tooltip" slot="target" hidden={match.chat.length === 0}>
          <Icon icon="mdi:chat-processing-outline" />
        </span>
        <div slot="content" style="overflow-y: auto; max-height:300px; text-align: left;">
          {#each match.chat as chat}
            <ChatMessage {match} {chat} />
            <br />
          {/each}
        </div>
      </Tooltip>

      <a href={match.link}><Icon icon="mdi:eye" /></a>
      <!--TODO: <Icon icon="mdi:cog" />-->
    </span>
  </td>
</tr>
<tr>
  <td colspan="4">
    {#if match.tournament}<Icon icon="mdi:subdirectory-arrow-right" style="margin-left: 6px" />
      <i>
        <a target="_blank" href={match.tournament_link}>{match.tournament}</a>
      </i>{/if}
  </td>
</tr>

{#each match.teams as t, i}
  {#if match.diplomacy === "TG" || match.diplomacy === "Other"}<tr>
      <td class="team"><b>Team {i + 1}</b></td>
    </tr>{/if}
  {#each match.players.sort((a, b) => a.color_id - b.color_id).filter((p) => t.includes(p.id)) as player (player.id)}
    <MatchPlayer {match} {player} />
  {/each}
{/each}

<style>
  .highlight {
    background-color: #f0f0f0;
  }
  :global(body.dark .highlight) {
    background-color: #303030;
  }
  .nowrap {
    white-space: nowrap;
  }
  .divider {
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
  :global(body.dark .divider) {
    border-top: 1px solid #303030;
  }
  .team {
    padding-left: 17px;
  }
  .tooltip {
    cursor: pointer;
  }
  .ago {
    font-size: 80%;
  }
  .countdown {
    padding-left: 5px;
    font-size: 80%;
    padding-right: 5px;
  }
  .actions {
    float: right;
  }
</style>
