<script lang="ts">
  import * as Blockly from "blockly"
  import type {ToolboxDefinition} from "blockly/core/utils/toolbox";
  import {Toolbox} from "blockly";
  import {onMount} from "svelte";

  const toolbox:ToolboxDefinition = {
    "kind":"flyoutToolbox",
    "contents": [
      {
        "kind":"block",
        "type":"controls_if"
      }
    ]
  };

  onMount(async () => {
    const blocklyDiv = document.getElementById("blocklyDiv")
    const workspace = Blockly.inject(blocklyDiv, {
      toolbox:toolbox
    });
  });

</script>

<main>
  <div id="blocklyDiv" class="blocklyWorkspace"></div>
</main>

<style>
  .blocklyWorkspace {
    width:50vw;
    height:80vh;
    background-color:white;
  }
</style>