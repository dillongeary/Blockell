<script lang="ts">
  import * as Blockly from "blockly"
  import {onMount} from "svelte";
  import {blocks} from "./blocks/haskell";
  import {CustomRenderer} from "./custom_renderer"
  import {listCreateMutator,listHelper,listCreateWithItem,listCreateWithContainer} from "./blocks/listMutator";
  import {tupleCreateMutator,tupleHelper,tupleCreateWithItem,tupleCreateWithContainer} from "./blocks/tupleMutator";
  import {generateHaskellGenerator} from "./generators/haskell";
  import {
    functionDeclarationCreateMutator,
    functionCreateWithBool, functionCreateWithChar,
    functionCreateWithContainer,
    functionCreateWithInt, functionCreateWithString, functionHelper
  } from "./blocks/functionDeclarationMutator";
  import {functionDefinitionCreateMutator, functionDefinitionHelper} from "./blocks/funcitonDefinitionMutator";
  //import {load, save} from "blockly/core/serialization/workspaces";

  Blockly.blockRendering.register("custom_rendering",CustomRenderer);

  Blockly.common.defineBlocks(blocks);

  Blockly.Blocks["list_create_with_container"] = listCreateWithContainer;
  Blockly.Blocks["list_create_with_item"] = listCreateWithItem;

  Blockly.Blocks["tuple_create_with_container"] = tupleCreateWithContainer;
  Blockly.Blocks["tuple_create_with_item"] = tupleCreateWithItem;

  Blockly.Blocks["function_create_with_container"] = functionCreateWithContainer;
  Blockly.Blocks["function_create_with_int"] = functionCreateWithInt;
  Blockly.Blocks["function_create_with_bool"] = functionCreateWithBool;
  Blockly.Blocks["function_create_with_string"] = functionCreateWithString;
  Blockly.Blocks["function_create_with_char"] = functionCreateWithChar;

  Blockly.Extensions.registerMutator("function_declaration_constructor_mutator",
          functionDeclarationCreateMutator,functionHelper,["function_create_with_int","function_create_with_bool","function_create_with_char","function_create_with_string"])

  Blockly.Extensions.registerMutator("list_constructor_mutator",
          listCreateMutator,listHelper,["list_create_with_item"]);

  Blockly.Extensions.registerMutator("tuple_constructor_mutator",
          tupleCreateMutator,tupleHelper,["tuple_create_with_item"]);

  Blockly.Extensions.registerMutator("function_definition_mutator",functionDefinitionCreateMutator,functionDefinitionHelper);

  const toolbox = {
    "kind":"categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Lambda",
        "colour":"0",
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
            "type": "starter"
          },
          {
            "kind": "block",
            "type": "functionDeclaration"
          },
          {
            "kind": "block",
            "type": "functionDefinition"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Higher Orders",
        "colour":"45",
        "contents": [
          {
            "kind":"block",
            "type":"map"
          },{
            "kind":"block",
            "type":"filter"
          },{
            "kind":"block",
            "type":"fold"
          }
        ]
      },
      {
        "kind": "category",
        "name": "List Operators",
        "colour":"90",
        "contents": [
          {
            "kind":"block",
            "type":"list_constructor"
          },{
            "kind":"block",
            "type":"cons"
          },{
            "kind":"block",
            "type":"enum"
          },{
            "kind":"block",
            "type":"list_access"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Tuple Operators",
        "colour":"135",
        "contents": [
          {
            "kind":"block",
            "type":"tuple_constructor"
          },{
            "kind":"block",
            "type":"tuple_access"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Operators",
        "colour": "180",
        "contents": [
          {
            "kind":"block",
            "type":"numOperator"
          },{
            "kind":"block",
            "type":"boolOperator"
          },{
            "kind":"block",
            "type":"notOperator"
          },{
            "kind":"block",
            "type":"comparison"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Variables",
        "colour":"225",
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
            "type":"bool"
          },{
            "kind":"block",
            "type":"variable"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Functions",
        "color":"270",
        "contents": []
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

  export let addUpdateToolbox;

  onMount(async () => {
    const blocklyDiv = document.getElementById("blocklyDiv");

    const workspace = Blockly.inject(blocklyDiv, options);

    let currentFunctionBlocks = {}

    function generateCode(haskellGenerator,name) {
      return function(block) {
        var code = `${name}`
        var i = 0;
        while (true) {
          var val = haskellGenerator.valueToCode(block, "ADD" + i, 0);
          if (val === "") {
            break
          }
          code = code + " " + val
          i++
        }
        return [code,0];
      }
    }

    addUpdateToolbox = (haskellGenerator,name,block,json) => {
      Blockly.Blocks["function_"+name] = block;
      currentFunctionBlocks[name] = json;
      haskellGenerator["function_"+name] = generateCode(haskellGenerator,name)
    }

    let haskellGenerator = generateHaskellGenerator(addUpdateToolbox);

    const runCode = () => {
      currentFunctionBlocks = {};

      code = haskellGenerator.workspaceToCode(workspace);

      let toolboxCopy = structuredClone(toolbox);
      toolboxCopy["contents"][6]["contents"] = Object.values(currentFunctionBlocks);
      workspace.updateToolbox(toolboxCopy);
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