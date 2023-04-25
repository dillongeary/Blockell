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
    functionCreateWithBool,
    functionCreateWithChar,
    functionCreateWithContainer,
    functionCreateWithInt,
    functionCreateWithString,
    functionHelper,
    functionCreateWithList,
    functionCreateWithTuple,
    functionCreateWithFunction
  } from "./blocks/functionDeclarationMutator";
  import {defineFunctionDefinitionCreateMutator, functionDefinitionHelper} from "./blocks/funcitonDefinitionMutator";
  import {functionInputTypeHelper, functionInputTypeMutator} from "./blocks/functonInputTypeMutator";
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
  Blockly.Blocks["function_create_with_list"] = functionCreateWithList;
  Blockly.Blocks["function_create_with_tuple"] = functionCreateWithTuple;
  Blockly.Blocks["function_create_with_function"] = functionCreateWithFunction;

  Blockly.Extensions.registerMutator("function_input_type_mutator",functionInputTypeMutator,functionInputTypeHelper)

  Blockly.Extensions.registerMutator("function_declaration_constructor_mutator",
          functionDeclarationCreateMutator,functionHelper,["function_create_with_int","function_create_with_bool","function_create_with_char","function_create_with_string","function_create_with_list","function_create_with_tuple","function_create_with_function"])

  Blockly.Extensions.registerMutator("list_constructor_mutator",
          listCreateMutator,listHelper,["list_create_with_item"]);

  Blockly.Extensions.registerMutator("tuple_constructor_mutator",
          tupleCreateMutator,tupleHelper,["tuple_create_with_item"]);


  const toolbox = {
    "kind":"categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Meta",
        "colour":"0",
        "contents": [
          {
            "kind": "block",
            "type": "starter"
          },
          {
            "kind": "block",
            "type": "functionDeclaration",
            "inputs": {
              "CODE": {
                "block": {
                  "type":"functionDefinition"
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "functionDefinition"
          },
          {
            "kind": "block",
            "type": "whereClause",
            "inputs": {
              "CODE": {
                "block": {
                  "type":"functionDefinition"
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "guardWrapper",
            "inputs": {
              "CODE": {
                "block": {
                  "type":"guard"
                }
              }
            }
          },
          {
            "kind": "block",
            "type": "guard"
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
          },{
            "kind": "block",
            "type": "lamda_calculus",
            "inputs": {
              "VAR": {
                "shadow" : {
                  "type" : "variable"
                }
              }
            }
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
            "type":"concat"
          },{
            "kind":"block",
            "type":"enum"
          },{
            "kind":"block",
            "type":"list_access"
          },{
            "kind":"block",
            "type":"list_sublist"
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
          },{
            "kind":"block",
            "type":"wildcard"
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

  let code = ""

  export let addUpdateToolbox;

  onMount(async () => {
    const blocklyDiv = document.getElementById("blocklyDiv");

    const options = {
      toolbox : toolbox,
      renderer : "thrasos",
      collapse : false,
      comments : false,
      disable : false,
      maxBlocks : Infinity,
      trashcan : true,
      horizontalLayout : true,
      toolboxPosition : 'end',
      css : true,
      media : 'https://blockly-demo.appspot.com/static/media/',
      rtl : false,
      scrollbars : true,
      sounds : true,
      oneBasedIndex : true,
      zoom : {
        controls : false,
        wheel : true,
        startScale : 1,
        maxScale : 3,
        minScale : 0.3,
        scaleSpeed : 1.2
      }
    };

    const workspace = Blockly.inject(blocklyDiv, options);

    let functionDefinitionCreateMutator = defineFunctionDefinitionCreateMutator(workspace)
    Blockly.Extensions.registerMutator("function_definition_mutator",functionDefinitionCreateMutator,functionDefinitionHelper);

    let currentFunctionBlocks = {}

    function formatBrackets(str) {
      if (str.startsWith("(") && str.endsWith(")") && checkIfOneBigOuterBracket(str)) {
        return str
      } else if (str.startsWith("[") && str.endsWith("]")) {
        return str
      } else if (str.includes(" ")) {
        return "(" + str + ")"
      } else {
        return str
      }
    }

    function checkIfOneBigOuterBracket(str) {
      let i = 0;
      for (const char of str) {
        if (char == "(") {
          i+=1;
        } else if (char == ")") {
          i-=1;
        }
        if (i < 0) {
          return false;
        }
      }
      return true;
    }

    function generateCode(haskellGenerator,name) {
      return function(block) {
        var code = `${name}`
        var i = 0;
        while (true) {
          var val = haskellGenerator.valueToCode(block, "ADD" + i, 0);
          if (val === "") {
            break
          }
          code = code + " " + formatBrackets(val)
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

    let haskellGenerator = generateHaskellGenerator(addUpdateToolbox,formatBrackets);

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
    <div id="outputPane"><h3>Generated Code:</h3><pre id="insideOutputPane"><code>{code}</code></pre></div>
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
    height: 100%;
    width: 60%;
    background-color:white;
    resize:horizontal;
    overflow: auto;
  }
  #outputPane {
    display: flex;
    flex-direction: column;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    flex: 1;
    width: 40%;
    height: 100%;
  }
  #insideOutputPane {
    flex: 1;
    width: 100%;
    background-color: rgb(247, 240, 228);
    color: black;
    text-align: left;
    margin: auto;
    margin-bottom: 0px;
  }
</style>