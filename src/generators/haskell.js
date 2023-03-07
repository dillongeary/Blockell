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
    const code = `map ${variable} ${value}`;
    return [code,0];
}

haskellGenerator["filter"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const code = `filter ${variable} ${value}`;
    return [code,0];
}

haskellGenerator["foldl"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    const code = `foldl ${variable} ${value} ${list}`;
    return [code,0];
}

haskellGenerator["foldr"] = function(block) {
    const variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
    const value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
    const list = haskellGenerator.valueToCode(block,"LIST",0) || "";
    const code = `foldr ${variable} ${value} ${list}`;
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