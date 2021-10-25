<script>
  export let id;
  import { onMount, afterUpdate } from "svelte";
  import { theme } from "./store.js";
  import tippy, { hideAll } from "tippy.js";
  import "tippy.js/dist/tippy.css";
  import "tippy.js/themes/light.css";
  import "tippy.js/themes/light-border.css";
  let tooltipElem;

  let instance;

  onMount(() => {
    if (tooltipElem !== undefined) {
      const sel = ".tooltip-" + tooltipElem.getAttribute("name");
      instance = tippy(tooltipElem, {
        content: document.querySelector(sel),
        interactive: true,
        maxWidth: 700,
        onShow(inst) {
          hideAll({ duration: 0 });
          var timestamp = new Date().getTime();
          inst.popper.querySelectorAll(".refresh").forEach((element) => {
            element.src = element.getAttribute("base") + "?t=" + timestamp;
          });
        },
      });
    }
  });

  afterUpdate(() => {
    instance.setProps({
      theme: $theme === "dark" ? null : "light-border"
    });
  });
</script>

<div class="tooltip-{id}">
  <slot name="content" />
</div>

<span name={id} bind:this={tooltipElem}>
  <slot name="target" />
</span>
