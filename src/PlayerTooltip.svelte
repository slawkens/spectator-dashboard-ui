<script>
  export let player;

  import { players } from "./store.js";
  import Icon from "@iconify/svelte";

  $: ref = $players[player.id];
</script>

{#if ref}
  <table>
    <tr>
      <td>
        <img src={ref.steam_avatar} alt="Avatar" />
      </td>
      <td>
        <h2>
          {player.name}
          {#if ref.verified}<Icon icon="mdi:check-decagram" />{/if}
        </h2>
        <i>
          {#if ref.team}{ref.team}
            <sup>1</sup>{/if}
        </i>
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td>
        <table>
          {#if ref.real_name}<tr>
              <th>
                Name <sup>1</sup>
              </th>
              <td>{ref.real_name}</td>
            </tr>{/if}
          {#if ref.age}<tr>
              <th>
                Age <sup>1</sup>
              </th>
              <td>{ref.age}</td>
            </tr>{/if}
          <tr>
            <th>Country</th>
            <td>
              <Icon icon="cif:{ref.country_code}" width="16" />
              {ref.country}
            </td>
          </tr>
          <tr>
            <th>
              Matches <sup>4</sup>
            </th>
            <td>
              {Intl.NumberFormat("en-US", {
                maximumFractionDigits: 0,
              }).format(ref.match_count)}
            </td>
          </tr>
          <tr>
            <th>
              Recs Since <sup>2</sup>
            </th>
            <td>{ref.known_since}</td>
          </tr>
          {#if ref.aliases.length > 0}
            <tr>
              <th>
                Aliases <sup>2</sup>
              </th>
              <td>
                <div class="aliases" alt={ref.aliases.join(", ")}>
                  {ref.aliases.join(", ")}
                </div>
              </td>
            </tr>
          {/if}
          {#if ref.earnings_usd}<tr>
              <th>
                Earnings <sup>1</sup>
              </th>
              <td>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(ref.earnings_usd)}
              </td>
            </tr>{/if}
        </table>
        {#if ref.rank_tournament || ref.rank_rm_1v1 || ref.rank_ew_1v1}
          <table>
            <tr>
              <th />
              <th>Rank</th>
              <th>Rating</th>
            </tr>
            {#if ref.rank_tournament}<tr>
                <th>
                  Tournament <sup>3</sup>
                </th>
                <td>#{ref.rank_tournament}</td>
                <td>{ref.mmr_tournament}</td>
              </tr>{/if}
            {#if ref.rank_rm_1v1}<tr>
                <th>
                  RM 1v1 <sup>4</sup>
                </th>
                <td>#{ref.rank_rm_1v1}</td>
                <td>{ref.mmr_rm_1v1}</td>
              </tr>{/if}
            {#if ref.rank_ew_1v1}<tr>
                <th>
                  EW 1v1 <sup>4</sup>
                </th>
                <td>#{ref.rank_ew_1v1}</td>
                <td>{ref.mmr_ew_1v1}</td>
              </tr>{/if}
          </table>
        {/if}

        <table style="width: 100%">
          <tr>
            <td>
              <span id="liquipedia">
                <sup>1</sup>
                <a target="_blank" href={ref.liquipedia_link}>Liquipedia</a>
              </span>
              <br />
              <span id="aoe2recs">
                <sup>2</sup>
                <a target="_blank" href={ref.aocrecs_link}>aoe2recs</a>
              </span>
            </td>
            <td>
              <span id="aoeelo">
                <sup>3</sup>
                <a target="_blank" href={ref.aoeelo_link}>aoe-elo</a>
              </span>
              <br />
              <span id="aoe2.net">
                <sup>4</sup>
                <a target="_blank" href={ref.aoe2net_link}>aoe2.net</a>
              </span>
            </td>
          </tr>
        </table>
      </td>
      <td>
        {#if ref.twitch_link || ref.discord_link || ref.youtube_link || ref.douyu_link || ref.steam_link}
          <b>Socials</b>
          <ul>
            {#if ref.twitch_link}<li>
                <a target="_blank" href={ref.twitch_link}>
                  {ref.twitch_link}
                </a>
              </li>{/if}
            {#if ref.discord_link}<li>
                <a target="_blank" href={ref.discord_link}>
                  {ref.discord_link}
                </a>
              </li>{/if}
            {#if ref.youtube_link}<li>
                <a target="_blank" href={ref.youtube_link}>
                  {ref.youtube_link}
                </a>
              </li>{/if}
            {#if ref.douyu_link}<li>
                <a target="_blank" href={ref.douyu_link}>
                  {ref.douyu_link}
                </a>
              </li>{/if}
            {#if ref.steam_link}<li>
                <a target="_blank" href={ref.steam_link}>
                  {ref.steam_link}
                </a>
              </li>{/if}
          </ul>
        {/if}
        {#if ref.stream_preview}
          <br />
          <a target="_blank" href={ref.stream_link}>
            <img
              class="refresh border"
              base={ref.stream_preview.replace("{width}", "320").replace("{height}", "180")}
              src={ref.stream_preview.replace("{width}", "320").replace("{height}", "180")}
              alt="Stream Preview"
            />
          </a>
        {/if}
      </td>
    </tr>
  </table>
{/if}

<style>
  h2 {
    margin: 0px;
  }
  th {
    vertical-align: text-top;
    text-align: left;
    white-space: nowrap;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  li {
    margin: 0px;
    padding: 0px;
  }
  ul {
    margin: 0px;
    padding-left: 25px;
  }
  td {
    vertical-align: top;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  sup {
    font-weight: normal;
  }
  a {
    word-break: break-all;
  }
  .aliases {
    width: 250px;
    overflow-y: auto;
    max-height: 100px;
  }
  .border {
    padding: 1px;
    border: 1px solid;
  }
</style>
