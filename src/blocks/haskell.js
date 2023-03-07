import * as Blockly from "blockly";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([{
        "type": "lamda_calculus",
        "message0": "λ %1 → %2",
        "args0": [
            {
                "type": "input_value",
                "name": "VAR",
                "check": "value"
            },
            {
                "type": "input_value",
                "name": "VALUE",
                "check": ["statement","value"]
            }
        ],
        "inputsInline": true,
        "output": "statement",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },{
    "type": "map",
    "message0": "map %1 %2",
    "args0": [
        {
            "type": "input_value",
            "name": "FUNC",
            "check": ["statement","value"]
        },
        {
            "type": "input_value",
            "name": "VALUE",
            "check": ["statement","value"]
        }
    ],
    "inputsInline": true,
    "output": "statement",
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
},{
    "type": "filter",
    "message0": "filter %1 %2",
    "args0": [
        {
            "type": "input_value",
            "name": "FUNC",
            "check": ["statement","value"]
        },
        {
            "type": "input_value",
            "name": "VALUE",
            "check": ["statement","value"]
        }
    ],
    "inputsInline": true,
    "output": "statement",
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
},{
    "type": "foldl",
    "message0": "foldl %1 %2 %3",
    "args0": [
        {
            "type": "input_value",
            "name": "FUNC",
            "check": ["statement","value"]
        },
        {
            "type": "input_value",
            "name": "VALUE",
            "check": ["statement","value"]
        },
        {
            "type": "input_value",
            "name": "LIST",
            "check": ["statement","value"]
        }
    ],
    "inputsInline": true,
    "output": "statement",
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
},{
    "type": "foldr",
    "message0": "foldr %1 %2 %3",
    "args0": [
        {
            "type": "input_value",
            "name": "FUNC",
            "check": ["statement","value"]
        },
        {
            "type": "input_value",
            "name": "VALUE",
            "check": ["statement","value"]
        },
        {
            "type": "input_value",
            "name": "LIST",
            "check": ["statement","value"]
        }
    ],
    "inputsInline": true,
    "output": "statement",
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
},{
        "type": "starter",
        "message0": "Run: %1",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check" : ["statement","value"]
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
        "output": "value",
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
        "output": "value",
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
        "output": "value",
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
        "output": "value",
        "colour": 210,
        "tooltip": "",
        "helpUrl": ""
    }
]);