import * as Blockly from "blockly";

export const haskellGenerator = new Blockly.Generator("Haskell");

haskellGenerator["lamda_calculus"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"VAR",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const code = `\\ ${variable} -> ${value}`;

    return [code,0];
}

haskellGenerator["map"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const code = `map (${variable}) (${value})`;
    return [code,0];
}

haskellGenerator["filter"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const code = `filter (${variable}) (${value})`;
    return [code,0];
}

haskellGenerator["fold"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    const operator = block.getFieldValue("OPERATOR");
    const code = `${operator} (${variable}) (${value}) (${list})`;
    return [code,0];
}

haskellGenerator["list_constructor"] = function(block) {
    var code = "["
    var i = 0
    while (true) {
        var val = haskellGenerator.valueToCode(block,"ADD"+i,0);
        if (val === "") {
            break
        }
        if (i > 0) {code = code + ","}
        code = code + val
        i++
    }
    code = code + "]"
    return [code,0];
}

haskellGenerator["list_access"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    const list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    const code = `${operator} (${list})`;
    return [code,0];
}

haskellGenerator["cons"] = function(block) {
    const item = haskellGenerator.valueToCode(block,"ITEM",0) || "";
    const list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    const code = `${item} : ${list}`;
    return [code,0];
}

haskellGenerator["enum"] = function(block) {
    const item = haskellGenerator.valueToCode(block,"FROM",0) || "";
    const list = haskellGenerator.valueToCode(block,"TO",0) || "";
    const code = `${item} .. ${list}`;
    return [code,0];
}

haskellGenerator["numOperator"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    const a = haskellGenerator.valueToCode(block,"A",0) || "";
    const b = haskellGenerator.valueToCode(block,"B",0) || "";
    const code = `(${a}) ${operator} (${b})`
    return [code,0]
}

haskellGenerator["boolOperator"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    const a = haskellGenerator.valueToCode(block,"A",0) || "";
    const b = haskellGenerator.valueToCode(block,"B",0) || "";
    const code = `(${a}) ${operator} (${b})`
    return [code,0]
}

haskellGenerator["notOperator"] = function(block) {
    const a = haskellGenerator.valueToCode(block,"A",0) || "";
    const code = `not (${a})`
    return [code,0]
}

haskellGenerator["comparison"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    const a = haskellGenerator.valueToCode(block,"A",0) || "";
    const b = haskellGenerator.valueToCode(block,"B",0) || "";
    const code = `(${a}) ${operator} (${b})`
    return [code,0]
}

haskellGenerator["string"] = function(block) {
    const value = block.getFieldValue("VAL");
    const code = `"${value}"`
    return [code,0];
}

haskellGenerator["char"] = function(block) {
    const value = block.getFieldValue("VAL");
    const code = `'${value}'`
    return [code,0];
}

haskellGenerator["integer"] = function(block) {
    const value = block.getFieldValue("VAL");
    return [value,0];
}

haskellGenerator["variable"] = function(block) {
    const value = block.getFieldValue("VAL");
    return [value,0];
}