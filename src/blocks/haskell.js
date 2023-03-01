import * as Blockly from "blockly";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
        "type": "lamda_calculus",
        "message0": "λ %1 → %2",
        "args0": [
            {
                "type": "input_value",
                "name": "VAR",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "String"
            }
        ],
        "inputsInline": true,
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
    },{
        "type": "string",
        "message0": "\" %1 \"",
        "args0": [
            {
                "type": "field_input",
                "name": "VAL",
                "text": "string"
            }
        ],
        "output": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },{
        "type": "char",
        "message0": "\' %1 \'",
        "args0": [
            {
                "type": "field_input",
                "name": "VAL",
                "text": "char"
            }
        ],
        "output": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },{
        "type": "integer",
        "message0": "%1",
        "args0": [
            {
                "type": "field_input",
                "name": "VAL",
                "text": "int"
            }
        ],
        "output": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    },{
        "type": "variable",
        "message0": "%1",
        "args0": [
            {
                "type": "field_input",
                "name": "VAL",
                "text": "variableName"
            }
        ],
        "output": null,
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    }
]);