<script lang="ts">
  import * as Blockly from "blockly"
  import {onMount} from "svelte";
  import type {ToolboxDefinition} from "blockly/core/utils/toolbox";

  const toolbox = {
    "kind":"categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Lambda",
        "colour":"290",
        "contents": [
          {
            "kind": "block",
            "type": "lamda_calculus"
          },
          {
            "kind": "block",
            "type": "lambda_starter"
          },
          {
            "kind": "block",
            "type": "variable"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Variables",
        "colour":"290",
        "custom": "VARIABLE"
      }
    ]
  };

  //Block Definitions

  Blockly.Blocks['lamda_calculus'] = {
    init: function() {
      this.appendValueInput("NAME")
              .setCheck("String")
              .appendField("λ")
              .appendField(new Blockly.FieldVariable("var"), "NAME")
              .appendField("→");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['lambda_starter'] = {
    init: function() {
      this.appendValueInput("NAME")
              .setCheck(null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  Blockly.Blocks['variable'] = {
    init: function() {
      this.appendDummyInput()
              .appendField(new Blockly.FieldVariable("var"), "NAME");
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  const options = {
    toolbox : toolbox,
    collapse : true,
    comments : true,
    disable : true,
    maxBlocks : Infinity,
    trashcan : true,
    horizontalLayout : false,
    toolboxPosition : 'start',
    css : true,
    media : 'https://blockly-demo.appspot.com/static/media/',
    rtl : false,
    scrollbars : true,
    sounds : true,
    oneBasedIndex : true,
    zoom : {
      controls : true,
      wheel : true,
      startScale : 1,
      maxScale : 3,
      minScale : 0.3,
      scaleSpeed : 1.2
    }
  };


  onMount(async () => {

    const blocklyDiv = document.getElementById("blocklyDiv")

    const workspace = Blockly.inject(blocklyDiv, options);

    const workspaceBlocks = document.getElementById("workspaceBlocks");

    Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
  });


</script>

<main>
  <div id="blocklyDiv" class="blocklyWorkspace"></div>
</main>

<style>
  .blocklyWorkspace {
    width:100vw;
    height:100vh;
    background-color:white;
  }
</style>