import * as Blockly from "blockly";

export let functionDeclarationCreateMutator;
functionDeclarationCreateMutator  = {
    saveExtraState: function() {
        return {
            "inputList": this.inputList_,
            "outputList": this.outputList_,
            "indentCount": this.indentCount_,
        };
    },
    loadExtraState: function(state) {
        this.inputList_ = state["inputList"];
        this.outputList_ = state["outputList"];
        this.indentCount_ = state["indentCount"];
        this.updateShape_();
    },
    decompose: function(workspace) {
        var topBlock = workspace.newBlock("function_create_with_container");
        topBlock.initSvg();

        var inputConnection = topBlock.getInput("STACK").connection;
        for (const block of this.inputList_) {
            var itemBlock;
            switch (block) {
                case "Int" : itemBlock = workspace.newBlock("function_create_with_int"); break;
                case "String" : itemBlock = workspace.newBlock("function_create_with_string"); break;
                case "Char" : itemBlock = workspace.newBlock("function_create_with_char"); break;
                case "Bool" : itemBlock = workspace.newBlock("function_create_with_bool"); break;
                default : if (block.startsWith("(")) {}
            }
            itemBlock.initSvg();
            inputConnection.connect(itemBlock.previousConnection);
            inputConnection = itemBlock.nextConnection;
        }

        var outputConnection = topBlock.getInput("STACK2").connection;
        for (const block of this.outputList_) {
            var itemBlock;
            switch (block) {
                case "Int" : itemBlock = workspace.newBlock("function_create_with_int"); break;
                case "String" : itemBlock = workspace.newBlock("function_create_with_string"); break;
                case "Char" : itemBlock = workspace.newBlock("function_create_with_char"); break;
                case "Bool" : itemBlock = workspace.newBlock("function_create_with_bool"); break;
                default : itemBlock = workspace.newBlock("function_create_with_int");
            }
            itemBlock.initSvg();
            outputConnection.connect(itemBlock.previousConnection);
            outputConnection = itemBlock.nextConnection;
        }
        return topBlock;
    },
    compose: function(topBlock) {
        var tempInputList = [];
        var itemBlock = topBlock.getInputTargetBlock("STACK");
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            tempInputList.push(itemBlock.getText());
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
        }
        var tempOutputList = [];
        var itemBlock = topBlock.getInputTargetBlock("STACK2");
        while (itemBlock && !itemBlock.isInsertionMarker()) {
            tempOutputList.push(itemBlock.getText());
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock()
        }

        this.inputList_ = tempInputList;
        this.outputList_ = tempOutputList;
        this.updateShape_();
    },
    saveConnections: function(topBlock) {
        var itemBlock = topBlock.getInputTargetBlock("STACK");
    },
    updateShape_: function() {
        let blockText = this.inputList_.concat(this.outputList_).join(" → ");
        this.setFieldValue(blockText,"INPUTS");
        let child = this.getInputTargetBlock("CODE")
        while (child) {
            child.updateShape_();
            child = child.nextConnection.targetBlock();
        }
    },
    getIndentCount: function() {
        if (this.getSurroundParent()) {
            this.indentCount_ = this.getSurroundParent().getIndentCount() + 1;
        } else {
            this.indentCount_ = 0;
        }
        return this.indentCount_;
    }
}

function typingParser(input) {
    var output = [];
    let current = "";
    input = input.replace(" ","");
    let char = "";
    for (let i = 0; i < input.length; i++) {
        char = input.charAt(i);
        if (char === "→") {
            output.push(current);
            current = "";
        } else if (char === "(") {
            let depth = 1;
            current += char;

            while (depth > 0 && i < input.length - 1) {
                i++;
                const nextChar = input.charAt(i);

                if (nextChar === "(") {
                    depth++;
                } else if (nextChar === ")") {
                    depth--;
                }

                current += nextChar;
            }
        } else if (current === ",") {
            output.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    output.push(current);

    return output;
}

export let functionHelper;
functionHelper = function() {
    this.inputList_ = ["String","String"];
    this.outputList_ = ["Bool"]
    this.updateShape_()
}

export let functionCreateWithContainer;
functionCreateWithContainer = {
    init: function() {
        this.appendDummyInput().appendField("Function Inputs:")
        this.appendStatementInput("STACK")
        this.appendDummyInput().appendField("Function Output:")
        this.appendStatementInput("STACK2")
        this.setColour(0)
    }
};

export let functionCreateWithInt;
functionCreateWithInt = {
    init: function() {
        this.appendDummyInput().appendField("Int");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(0)
        //this.setMutator(new Blockly.Mutator(["function_input_type_mutator"]))
    },
    getText : function() {
        return "Int"
    }
}

export let functionCreateWithBool;
functionCreateWithBool = {
    init: function() {
        this.appendDummyInput().appendField("Bool");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(0)
        //this.setMutator(new Blockly.Mutator(["function_input_type_mutator"]))
    },
    getText : function() {
        return "Bool"
    }
}

export let functionCreateWithChar;
functionCreateWithChar = {
    init: function() {
        this.appendDummyInput().appendField("Char");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(0)
        //this.setMutator(new Blockly.Mutator(["function_input_type_mutator"]))
    },
    getText : function() {
        return "Char"
    }
}

export let functionCreateWithString;
functionCreateWithString = {
    init: function() {
        this.appendDummyInput().appendField("String");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(0)
        //this.setMutator(new Blockly.Mutator(["function_input_type_mutator"]))
    },
    getText : function() {
        return "String"
    }
}

export let functionCreateWithList;
functionCreateWithList = {
    init: function() {
        this.appendDummyInput().appendField("[")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(0);
        this.appendStatementInput("LISTTYPE");
        this.appendDummyInput("]");
    },
    getText : function() {
        let type = this.getInputTargetBlock("LISTTYPE") && this.getInputTargetBlock("LISTTYPE").getText();
        return `[${type}]`
    }
}