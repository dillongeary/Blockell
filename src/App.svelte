<script lang="ts">
  import * as Blockly from "blockly"
  import {onMount} from "svelte";
  import {blocks} from "./blocks/haskell";
  import {haskellGenerator} from "./generators/haskell";
  //import {load, save} from "blockly/core/serialization/workspaces";

  Blockly.common.defineBlocks(blocks);

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
    const outputDiv = document.getElementById("outputPane")

    const workspace = Blockly.inject(blocklyDiv, options);

    const runCode = () => {
      const code = haskellGenerator.workspaceToCode(workspace);
      outputDiv.innerText = code;
    };

    Blockly.serialization.workspaces.load(workspace);
    runCode();

    workspace.addChangeListener((e) => {
      if (e.isUiEvent) return;
      Blockly.serialization.workspaces.save(workspace);
    });

    workspace.addChangeListener((e) => {
      if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || workspace.isDragging()) {
        return;
      }
      runCode();
    });
  });


</script>

<main>
  <div id="pageContainer">
    <div id="blocklyDiv" class="blocklyWorkspace"></div>
    <div id="outputPane"></div>
  </div>
</main>

<style>
  #pageContainer {
    display: flex;
    width: 100%;
    max-width: 100vw;
    max-height: 100vh;
  }
  #blocklyDiv {
    flex-basis: 100%;
    height: 100%;
    min-width: 600px;
    background-color:white;
  }
  #outputPane {
    display: flex;
    flex-direction: column;
    width: 400px;
    flex: 0 0 400px;
    overflow: auto;
    margin: 1rem;
  }
</style>