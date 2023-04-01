import * as Blockly from "blockly";

const lambdaColor = 0;
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
    "colour": lambdaColor,
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
        "colour": lambdaColor,
        "tooltip": "",
        "helpUrl": ""
    },{
        "type": "functionDeclaration",
        "message0": "%1 :: %2 %3 %4",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "functionName",
                "check" : ["statement","value"]
            },{
                "type": "field_label_serializable",
                "name": "INPUTS",
                "text": ""
            },{
                "type": "input_dummy"
            },{
                "type": "input_statement",
                "name": "CODE",
                "check": "declaration"
            }
        ],
        "colour": lambdaColor,
        "tooltip": "",
        "helpUrl": "",
        "mutator":"function_declaration_constructor_mutator"
    },{
        "type": "functionDefinition",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "field_label_serializable",
                "name": "FUNC_NAME",
                "text": "name"
            },{
                "type": "input_value",
                "name": "INPUT0",
                "check": "value"
            },
            {
                "type": "input_value",
                "name": "OUTPUT",
                "check": ["statement","value"]
            }
        ],
        "colour": lambdaColor,
        "inputsInline": true,
        "previousStatement": "declaration",
        "nextStatement": "declaration",
        "tooltip": "",
        "helpUrl": "",
        "mutator":"function_definition_mutator"
    },{
        "type": "whereClause",
        "message0": "where %1 :: %2 %3 %4",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "functionName",
                "check" : ["statement","value"]
            },{
                "type": "field_label_serializable",
                "name": "INPUTS",
                "text": ""
            },{
                "type": "input_dummy"
            },{
                "type": "input_statement",
                "name": "CODE",
                "check": "declaration"
            }
        ],
        "colour": lambdaColor,
        "previousStatement": "declaration",
        "nextStatement": "declaration",
        "tooltip": "",
        "helpUrl": "",
        "mutator":"function_declaration_constructor_mutator"
    },{
        "type": "guardWrapper",
        "message0": "Guards: %1 %2 otherwise: %3",
        "args0": [
            {
                "type": "input_dummy"
            },{
                "type": "input_statement",
                "name": "CODE",
                "check": "guard"
            },{
                "type": "input_value",
                "name": "OTHERWISE",
                "check": ["statement","value"]
            }
        ],
        "colour": lambdaColor,
        "inputsInline": true,
        "output": "statement",
        "tooltip": "",
        "helpUrl": "",
    },{
        "type": "guard",
        "message0": "if %1 then %2",
        "args0": [
            {
                "type": "input_value",
                "name": "PREDICATE",
                "check": ["statement","value"]
            },{
                "type": "input_value",
                "name": "CODE",
                "check": ["statement","value"]
            }
        ],
        "colour": lambdaColor,
        "inputsInline": true,
        "previousStatement": "guard",
        "nextStatement": "guard",
        "tooltip": "",
        "helpUrl": "",
    }]

const higherColor = 45;
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
    "colour": higherColor,
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
    "colour": higherColor,
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
    "colour": higherColor,
    "tooltip": "",
    "helpUrl": ""
}]

const listColor = 90;
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
        "colour":listColor
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
        "colour":listColor,
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
        "colour":listColor,
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
        "colour":listColor,
        "tooltip":"",
        "helpUrl":""
    }
]

const tupleColor = 135;
const tupleBlocks = [
    {
        "type": "tuple_constructor",
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
        "mutator":"tuple_constructor_mutator",
        "colour":tupleColor
    },{
        "type": "tuple_access",
        "message0": "%1 %2",
        "args0": [
            {
                "type":"field_dropdown",
                "name":"OPERATOR",
                "options": [
                    ["fst","fst"],
                    ["snd","snd"]
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
        "colour":tupleColor,
        "tooltip":"",
        "helpUrl":""
    }
]

const operatorColor = 180;
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
        "colour": operatorColor,
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
        "colour": operatorColor,
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
        "colour": operatorColor,
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
        "colour": operatorColor,
        "tooltip":"",
        "helpUrl":""
    }
]

const variableColor = 225;
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
        "colour": variableColor,
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
        "colour": variableColor,
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
        "colour": variableColor,
        "tooltip": "",
        "helpUrl": ""
    },{
        "type": "bool",
        "message0": "%1",
        "args0": [
            {
                "type":"field_dropdown",
                "name":"BOOL",
                "options": [
                    ["True","True"],
                    ["False","False"]
                ]
            }
        ],
        "output": "value",
        "colour": variableColor,
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
        "colour": variableColor,
        "tooltip": "",
        "helpUrl": ""
    }
]


export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([].concat(lambdaBlocks,higherOrderBlocks,listBlocks,variableBlocks,operators,tupleBlocks));