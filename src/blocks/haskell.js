import * as Blockly from "blockly";

const lambdaBlocks = [
    {
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
    }]

const higherOrderBlocks = [
    {
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
    "type": "fold",
    "message0": "fold %4 %1 %2 %3",
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
        },
        {
            "type":"field_dropdown",
            "name":"OPERATOR",
            "options": [
                ["left","foldl"],
                ["right","foldr"]
            ]
        }
    ],
    "inputsInline": true,
    "output": "statement",
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
}]

const listBlocks = [
    {
        "type": "list_constructor",
        "message0": "%1",
        "args0": [
            {
                "type":"input_dummy",
                "name":"EMPTY",
            },
        ],
        "output":"value",
        "inputsInline":true,
        "tooltip":"",
        "helpUrl":"",
        "mutator":"list_constructor_mutator",
        "colour":70
    },{
        "type": "cons",
        "message0": "%1 : %2",
        "args0": [
            {
                "type":"input_value",
                "name":"ITEM",
                "check": ["statement","value"]
            },
            {
                "type":"input_value",
                "name":"LIST",
                "check": ["statement","value"]
            }
        ],
        "inputsInline": true,
        "output": "value",
        "colour":70,
        "tooltip":"",
        "helpUrl":""
    },{
        "type": "enum",
        "message0": "%1 .. %2",
        "args0": [
            {
                "type":"input_value",
                "name":"FROM",
                "check": ["statement","value"]
            },
            {
                "type":"input_value",
                "name":"TO",
                "check": ["statement","value"]
            }
        ],
        "inputsInline": true,
        "output": "statement",
        "colour":70,
        "tooltip":"",
        "helpUrl":""
    },{
        "type": "list_access",
        "message0": "%1 %2",
        "args0": [
            {
                "type":"field_dropdown",
                "name":"OPERATOR",
                "options": [
                    ["head","head"],
                    ["tail","tail"],
                    ["init","init"],
                    ["last","last"],
                ]
            },
            {
                "type":"input_value",
                "name":"LIST",
                "check": ["statement","value"]
            }
        ],
        "inputsInline": true,
        "output": "statement",
        "colour":70,
        "tooltip":"",
        "helpUrl":""
    }
]

const operators = [
    {
        "type": "numOperator",
        "message0": "%2 %1 %3",
        "args0": [
            {
                "type":"field_dropdown",
                "name":"OPERATOR",
                "options": [
                    ["+","+"],
                    ["-","-"],
                    ["*","*"],
                    ["/","/"]
                ]
            },{
                "type":"input_value",
                "name":"A",
                "check": ["statement","value"]
            },
            {
                "type":"input_value",
                "name":"B",
                "check": ["statement","value"]
            }
        ],
        "inputsInline":true,
        "output": "statement",
        "colour": 170,
        "tooltip":"",
        "helpUrl":""
    },{
        "type": "boolOperator",
        "message0": "%2 %1 %3",
        "args0": [
            {
                "type":"field_dropdown",
                "name":"OPERATOR",
                "options": [
                    ["&&","&&"],
                    ["||","||"]
                ]
            },{
                "type":"input_value",
                "name":"A",
                "check": ["statement","value"]
            },
            {
                "type":"input_value",
                "name":"B",
                "check": ["statement","value"]
            }
        ],
        "inputsInline":true,
        "output": "statement",
        "colour": 170,
        "tooltip":"",
        "helpUrl":""
    },{
        "type": "notOperator",
        "message0": "not %1",
        "args0": [
            {
                "type":"input_value",
                "name":"A",
                "check": ["statement","value"]
            }
        ],
        "inputsInline":true,
        "output": "statement",
        "colour": 170,
        "tooltip":"",
        "helpUrl":""
    },{
        "type": "comparison",
        "message0": "%2 %1 %3",
        "args0": [
            {
                "type":"field_dropdown",
                "name":"OPERATOR",
                "options": [
                    ["==","=="],
                    ["<","<"],
                    [">",">"],
                    ["<=","<="],
                    [">=",">="]
                ]
            },{
                "type":"input_value",
                "name":"A",
                "check": ["statement","value"]
            },
            {
                "type":"input_value",
                "name":"B",
                "check": ["statement","value"]
            }
        ],
        "inputsInline":true,
        "output": "statement",
        "colour": 170,
        "tooltip":"",
        "helpUrl":""
    }
]

const variableBlocks = [
    {
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
]


export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([].concat(lambdaBlocks,higherOrderBlocks,listBlocks,variableBlocks,operators));