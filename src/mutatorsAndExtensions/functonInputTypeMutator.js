import * as Blockly from "blockly"

export let functionInputTypeMutator;
functionInputTypeMutator = {
    saveExtraState: function () {
        if (this.getParent().getInput("STACK2").connection.targetBlock() === this) {
            this.isOuput_ = true
        } else {
            this.isOuput_ = false
        }
        this.updateShape_()
        return {
            "isOutput": this.isOuput_,
        };
    },
    loadExtraState: function (state) {
        this.isOuput_ = state["isOutput"]
        this.updateShape_()
    },
    updateShape_: function () {
        this.setNextStatement(!this.isOuput_)
    }
}

export let functionInputTypeHelper;
functionInputTypeHelper = function() {
    this.isOutput_ = false;
    this.updateShape_()

}