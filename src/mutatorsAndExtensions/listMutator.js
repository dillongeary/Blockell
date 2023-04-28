import * as Blockly from "blockly";

export let listCreateMutator;
listCreateMutator = {
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

export let listHelper;
listHelper = function() {
    this.itemCount_ = 1;
    this.updateShape_();
}

export let listCreateWithContainer;
listCreateWithContainer = {
    init: function() {
        this.appendDummyInput().appendField(Blockly.Msg['LISTS_CREATE_WITH_CONTAINER_TITLE_ADD']);
        this.appendStatementInput("STACK");
    }
};

export let listCreateWithItem
listCreateWithItem = {
    init: function() {
        this.appendDummyInput().appendField(Blockly.Msg['LISTS_CREATE_WITH_ITEM_TITLE']);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};