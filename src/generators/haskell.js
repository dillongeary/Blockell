import * as Blockly from "blockly";

export const haskellGenerator = new Blockly.Generator("Haskell");

haskellGenerator["lamda_calculus"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"VAR",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const code = `\\ ${variable} -> ${value}`;

    return [code,0];
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