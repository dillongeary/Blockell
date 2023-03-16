import * as Blockly from "blockly";

export const haskellGenerator = new Blockly.Generator("Haskell");

haskellGenerator["lamda_calculus"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"VAR",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const code = `\\ ${variable} -> ${value}`;

    return [code,0];
}

haskellGenerator["starter"] = function(block) {
    const value = haskellGenerator.valueToCode(block,"NAME",0) || "";
    const code = `main = do ${value}`;
    return code;
}

haskellGenerator["map"] = function(block) {
    let variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    let value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    if (variable.includes(" ")) {variable = `(${variable})`}
    if (value.includes(" ")) {value = `(${value})`}
    const code = `map ${variable} ${value}`;
    return [code,0];
}

haskellGenerator["filter"] = function(block) {
    let variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    let value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    if (variable.includes(" ")) {variable = `(${variable})`}
    if (value.includes(" ")) {value = `(${value})`}
    const code = `filter ${variable} ${value}`;
    return [code,0];
}

haskellGenerator["fold"] = function(block) {
    let variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    let value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    if (variable.includes(" ")) {variable = `(${variable})`}
    if (value.includes(" ")) {value = `(${value})`}
    if (list.includes(" ")) {list = `(${list})`}
    const operator = block.getFieldValue("OPERATOR");
    const code = `${operator} ${variable} ${value} ${list}`;
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
    let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    if (list.includes(" ")) {list = `(${list})`}
    const code = `${operator} ${list}`;
    return [code,0];
}

haskellGenerator["cons"] = function(block) {
    let item = haskellGenerator.valueToCode(block,"ITEM",0) || "";
    let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    if (item.includes(" ")) {item = `(${item})`}
    if (list.includes(" ")) {list = `(${list})`}
    const code = `${item} : ${list}`;
    return [code,0];
}

haskellGenerator["enum"] = function(block) {
    let item = haskellGenerator.valueToCode(block,"FROM",0) || "";
    let list = haskellGenerator.valueToCode(block,"TO",0) || "";
    if (item.includes(" ")) {item = `(${item})`}
    if (list.includes(" ")) {list = `(${list})`}
    const code = `${item} .. ${list}`;
    return [code,0];
}

haskellGenerator["numOperator"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    let a = haskellGenerator.valueToCode(block,"A",0) || "";
    let b = haskellGenerator.valueToCode(block,"B",0) || "";
    if (a.includes(" ")) {a = `(${a})`}
    if (b.includes(" ")) {b = `(${b})`}
    const code = `${a} ${operator} ${b}`
    return [code,0]
}

haskellGenerator["boolOperator"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    let a = haskellGenerator.valueToCode(block,"A",0) || "";
    let b = haskellGenerator.valueToCode(block,"B",0) || "";
    if (a.includes(" ")) {a = `(${a})`}
    if (b.includes(" ")) {b = `(${b})`}
    const code = `${a} ${operator} ${b}`
    return [code,0]
}

haskellGenerator["notOperator"] = function(block) {
    let a = haskellGenerator.valueToCode(block,"A",0) || "";
    if (a.includes(" ")) {a = `(${a})`}
    const code = `not ${a}`
    return [code,0]
}

haskellGenerator["comparison"] = function(block) {
    const operator = block.getFieldValue("OPERATOR");
    let a = haskellGenerator.valueToCode(block,"A",0) || "";
    let b = haskellGenerator.valueToCode(block,"B",0) || "";
    if (a.includes(" ")) {a = `(${a})`}
    if (b.includes(" ")) {b = `(${b})`}
    const code = `${a} ${operator} ${b}`
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

haskellGenerator["block"] = function(block) {
    const value = block.getFieldValue("BOOL");
    return [value,0];
}

haskellGenerator["variable"] = function(block) {
    const value = block.getFieldValue("VAL");
    return [value,0];
}