import * as Blockly from "blockly";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
        "type": "lamda_calculus",
        "message0": "λ %1 → %2",
        "args0": [
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": "item"
            },
            {
                "type": "input_value",
                "name": "NAME",
                "check": "String"
            }
        ],
        "inputsInline": false,
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "lambda_starter",
        "message0": "%1",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME"
            }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "variable",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": "item"
            }
        ],
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }]);