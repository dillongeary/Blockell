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
            "type": "lamda_calculus",
            "inputs": {
              "VAR": {
                "shadow" : {
                  "type" : "variable"
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "lambda_starter"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Variables",
        "colour":"290",
        "contents": [
          {
            "kind":"block",
            "type":"string"
          },{
            "kind":"block",
            "type":"char"
          },{
            "kind":"block",
            "type":"integer"
          },{
            "kind":"block",
            "type":"variable"
          }
        ]
      }
    ]
  };

  const options = {
    toolbox : toolbox,
    renderer : "thrasos",
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

  let code = ""

  onMount(async () => {
    const blocklyDiv = document.getElementById("blocklyDiv");

    const workspace = Blockly.inject(blocklyDiv, options);

    const runCode = () => {
      code = haskellGenerator.workspaceToCode(workspace);
    };

    //Blockly.serialization.workspaces.load(workspace);
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

<body>
  <div id="pageContainer">
    <div id="blocklyDiv" class="blocklyWorkspace"></div>
    <div id="outputPane">
      <pre id="generatedCode" class="insideOuterPane" ><code>{code}</code></pre>
      <div id="output" class="insideOuterPane"></div>
    </div>
  </div>
</body>

<style>
  body {
    margin: 0;
    max-width: 100vw;
  }
  #pageContainer {
    display: flex;
    width: 100vw;
    height: 100vh;
  }
  #blocklyDiv {
    flex-basis: 100%;
    height: 100%;
    width: 60%;
    background-color:white;
  }
  #outputPane {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-left: 1rem;
    gap:1rem;
  }
  #generatedCode {
    background-color: rgb(247, 240, 228);
    color: black;
    margin: 0;
  }
  #output {
    background-color: white;
  }
  .insideOuterPane {
    height:50vh;
    flex: 50%;
    text-align: left;
  }

  @media screen and (max-height:540px) {
    .insideOuterPane {
      height:100%;
    }
    #outputPane {
      flex-direction: row;
      width: 60%;
    }
    #blocklyDiv {
      width: 40%;
    }
  }
</style>