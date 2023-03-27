import * as Blockly from "blockly";

export let functionDeclarationCreateMutator;
functionDeclarationCreateMutator  = {
    saveExtraState: function() {
        return {
            "inputList": this.inputList_,
        };
    },
    loadExtraState: function(state) {
        this.inputList_ = state["inputList"];
        this.updateShape_();
    },
    decompose: function(workspace) {
        var topBlock = workspace.newBlock("function_create_with_container");
        topBlock.initSvg();

        var connection = topBlock.getInput("STACK").connection;
        for (const block of this.inputList_) {
            var itemBlock;
            switch (block) {
                case "Int" : itemBlock = workspace.newBlock("function_create_with_int"); break;
                case "String" : itemBlock = workspace.newBlock("function_create_with_string"); break;
                case "Char" : itemBlock = workspace.newBlock("function_create_with_char"); break;
                case "Bool" : itemBlock = workspace.newBlock("function_create_with_bool"); break;
                default : itemBlock = workspace.newBlock("function_create_with_int");
            }
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }

        return topBlock;
    },
    compose: function(topBlock) {
        var itemBlock = topBlock.getInputTargetBlock("STACK");
        var tempInputList = [];
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            tempInputList.push(itemBlock.getFieldValue("TYPE"));
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
        }

        this.inputList_ = tempInputList;
        this.updateShape_();
    },
    saveConnections: function(topBlock) {
        var itemBlock = topBlock.getInputTargetBlock("STACK");
    },
    updateShape_: function() {
        let blockText = this.inputList_.join(" → ");
        this.setFieldValue(blockText,"INPUTS");
        let child = this.getInputTargetBlock("CODE")
        while (child) {
            child.updateShape_();
            child = child.nextConnection.targetBlock();
        }
    }
}

export let functionHelper;
functionHelper = function() {
    this.inputList_ = ["String","String","Bool"];
    this.updateShape_()
}

export let functionCreateWithContainer;
functionCreateWithContainer = {
    init: function() {
        this.appendDummyInput().appendField("Function Inputs:")
        this.appendStatementInput("STACK")
    }
};

export let functionCreateWithInt;
functionCreateWithInt = {
    init: function() {
        this.appendDummyInput().appendField("Int","TYPE");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

export let functionCreateWithBool;
functionCreateWithBool = {
    init: function() {
        this.appendDummyInput().appendField("Bool","TYPE");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

export let functionCreateWithChar;
functionCreateWithChar = {
    init: function() {
        this.appendDummyInput().appendField("Char","TYPE");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

export let functionCreateWithString;
functionCreateWithString = {
    init: function() {
        this.appendDummyInput().appendField("String","TYPE");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}