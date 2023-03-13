<script lang="ts">
  import * as Blockly from "blockly"
  import {onMount} from "svelte";
  import {blocks} from "./blocks/haskell";
  import {haskellGenerator} from "./generators/haskell";
  import {CustomRenderer} from "./custom_renderer"
  //import {load, save} from "blockly/core/serialization/workspaces";

  Blockly.blockRendering.register("custom_rendering",CustomRenderer);

  Blockly.common.defineBlocks(blocks);

  const listCreateMutator = {
    saveExtraState: function() {
      return {
        "itemCount": this.itemCount_,
      };
    },
    loadExtraState: function(state) {
      this.itemCount_ = state["itemCount"];
      this.updateShape_();
    },
    decompose: function(workspace) {
      var topBlock = workspace.newBlock("lists_create_with_container");
      topBlock.initSvg();

      var connection = topBlock.getInput("STACK").connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock("list_create_with_item");
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }

      return topBlock;
    },
    compose: function(topBlock) {
      var itemBlock = topBlock.getInputTargetBlock("STACK");

      var connections = [];
      while (itemBlock && !itemBlock.isInsertionMarker()) {
        connections.push(itemBlock.valueConnection_);
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
      }

      for (var i = 0; i < this.itemCount_; i++) {
        var connection = this.getInput("ADD" + i).connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect();
        }
      }

      this.itemCount_ = connections.length;
      this.updateShape_();
      for (var i = 0; i < this.itemCount_; i++) {
        Blockly.Mutator.reconnect(connections[i], this, "ADD" + i);
      }
    },
    saveConnections: function(topBlock) {
      var itemBlock = topBlock.getInputTargetBlock("STACK");
      var i = 0;
      while (itemBlock) {
        var input = this.getInput("ADD"+i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      }
    },
    updateShape_: function() {
      if (this.getInput("CLOSEBRACKET")) {
        this.removeInput("CLOSEBRACKET")
      }
      if (this.itemCount_ && this.getInput("EMPTY")) {
        this.removeInput("EMPTY");
      } else if (!this.itemCount_ && !this.getInput("EMPTY")) {
        this.appendDummyInput("EMPTY").appendField("[");
      }

      for (var i = 0; i < this.itemCount_; i++) {
        if (!this.getInput("ADD"+i)) {
          var input = this.appendValueInput("ADD"+i).setAlign(Blockly.ALIGN_RIGHT);
          if (i == 0) {
            input.appendField("[");
          } else {
            input.appendField(",");
          }
        }
      }
      while (this.getInput("ADD"+i)) {
        this.removeInput("ADD"+i);
        i++
      }

      this.appendDummyInput("CLOSEBRACKET").appendField("]")
    }
  };

  var helper = function() {
    this.itemCount_ = 1;
    this.updateShape_();
  }

  Blockly.Blocks["list_create_with_container"] = {
    init: function() {
      this.appendDummyInput().appendField(Blockly.Msg['LISTS_CREATE_WITH_CONTAINER_TITLE_ADD']);
      this.appendStatementInput("STACK");
    }
  };

  Blockly.Blocks["list_create_with_item"] = {
    init: function() {
      this.appendDummyInput().appendField(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TITLE']);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    }
  };

  Blockly.Extensions.registerMutator("list_constructor_mutator",
  listCreateMutator,helper,["list_create_with_item"])

  const toolbox = {
    "kind":"categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Lambda",
        "colour":"230",
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
          }
        ]
      },
      {
        "kind": "category",
        "name": "Higher Orders",
        "colour":"120",
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
        "colour":"70",
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
        "name": "Operators",
        "colour": "170",
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
        "colour":"210",
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
      },
      {
        "kind": "category",
        "name": "Procedures",
        "custom":"PROCEDURE"
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