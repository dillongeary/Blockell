import * as Blockly from "blockly";


export let functionDefinitionCreateMutator;
functionDefinitionCreateMutator = {
    saveExtraState: function() {
        console.log("WE HAVE A RUN")
        if (this.getSurroundParent()) {
            console.log("WE HAVE A PARENT")
            let tempFuncName = this.getSurroundParent().getFieldValue("NAME");
            if (tempFuncName !== null) {
                console.log("WE HAVE A NAME: "+tempFuncName)
                this.functionName_ = tempFuncName;
            }
            let tempInputAmount = this.getSurroundParent().inputList_.length;
            if (tempInputAmount !== null) {
                this.amountOfInputs_ = tempInputAmount;
            }
        }
        this.updateShape_()
        return {
            "functionName": this.functionName_,
            "amountOfInputs": this.amountOfInputs_,
        };
    },
    loadExtraState: function (state) {
        this.functionName_ = state["functionName"];
        this.amountOfInputs_ = state["amountOfInputs"];
        this.updateShape_()
    },
    updateShape_: function() {
        if(this.getFieldValue("FUNC_NAME") && this.functionName_) {
            console.log("WE HAVE A NAME")
            this.setFieldValue(this.functionName_, "FUNC_NAME");
        }

        let outputConnection = null;
        if (this.getInput("OUTPUT")) {
            if (this.getInput("OUTPUT").connection.targetBlock()) {
                outputConnection = this.getInput("OUTPUT").connection.targetBlock().outputConnection
            }
            this.removeInput("OUTPUT")
        }

        for (var i = 0; i < this.amountOfInputs_; i++) {
            if (!this.getInput("INPUT"+i)) {
                let input = this.appendValueInput("INPUT"+i).setAlign(Blockly.ALIGN_RIGHT).setCheck("value");
                if (i === 0) {
                    input.appendField(this.functionName_,"FUNC_NAME")
                }
            }
        }
        while (this.getInput("INPUT"+i)) {
            this.removeInput("INPUT"+i);
            i++;
        }

        let output = this.appendValueInput("OUTPUT").setCheck(["value","statement"])
        if (this.amountOfInputs_ < 1) {
            output.appendField(this.functionName_ + " = ")
        } else {
            output.appendField(" = ")
        }
        if (outputConnection) {
            output.connection.connect(outputConnection);
        }
    }
}

export let functionDefinitionHelper;
functionDefinitionHelper = function() {
        this.functionName_ = "defaultName";
        this.amountOfInputs_ = 1;
        this.updateShape_()

}