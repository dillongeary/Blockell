import * as Blockly from "blockly";

export function generateHaskellGenerator(addUpdateToolbox,formatBrackets) {
    const haskellGenerator = new Blockly.Generator("Haskell");

    haskellGenerator.scrub_ = function (block, code, thisOnly) {
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        if (nextBlock && !thisOnly) {
            return code + "\n" + haskellGenerator.blockToCode(nextBlock);
        }
        return code;
    }
    // do some stuff to generate this in here
    haskellGenerator["functionDeclaration"] = function (block) {
        const name = block.getFieldValue("NAME");
        const typing = block.getFieldValue("INPUTS").replaceAll("→","->");
        const definition = haskellGenerator.blockToCode(block.getInputTargetBlock("CODE"))
        let amountOfLists = block.inputList_.length ;

        let json = {
            "kind":"block",
            "type":"function_"+name
        }
        let blockk = {
            init: function() {
                this.appendDummyInput().appendField(name);
                for (var i = 0; i < amountOfLists; i++) {
                    this.appendValueInput("ADD" + i).setCheck(null);
                }
                this.setInputsInline(true);
                this.setColour(270);
                this.setOutput(true,null);
            }
        };
        addUpdateToolbox(haskellGenerator,name,blockk,json);

        let code = `${name} :: ${typing}\n${definition}\n`

        return code;
    };

    haskellGenerator["functionDefinition"] = function (block) {
        const name = block.getSurroundParent() && block.getSurroundParent().getFieldValue("NAME")
        const output = haskellGenerator.valueToCode(block,"OUTPUT",0)
        let code;
        if (name) {
            code = name;
        } else {
            code = "defaultName"
        }

        var i = 0
        while (true) {
            let val = haskellGenerator.valueToCode(block,"INPUT"+i,0);
            if (val === "") {
                break
            } else if (block.getInputTargetBlock("INPUT"+i).type === "cons") {
                val = `(${val})`
            }
            code = `${code} ${val}`
            i++
        }

        let indent;

        if (block.getPreviousBlock() && block.getPreviousBlock().type === "whereClause") {
            indent = ""
        } else if (block.getPreviousBlock()){
            indent = " ".repeat(block.getSurroundParent().getIndentCount() * 8);
        } else {
            indent = ""
        }

        block.childrensIndentLength_ = indent.length + code.length;

        if (block.getInputTargetBlock("OUTPUT") && block.getInputTargetBlock("OUTPUT").type === "guardWrapper") {
            code = `${indent}${code} ${output}`
        } else {
            code = `${indent}${code} = ${output}`
        }

        return code;
    }

    haskellGenerator["whereClause"] = function (block) {
        const rest = haskellGenerator.blockToCode(block.getInputTargetBlock("CODE"));
        let indentAmount = Math.max(0, block.getIndentCount() - 1)
        let indent = " ".repeat(indentAmount * 8)
        let code;
        if (block.getPreviousBlock() && block.getPreviousBlock().type === "whereClause") {
            code = `${indent}        ${rest}`
        } else {
            code = `${indent}  where ${rest}`
        }
        return code
    }

    haskellGenerator["guardWrapper"] = function (block) {
        const definition = haskellGenerator.blockToCode(block.getInputTargetBlock("CODE"));
        const otherwise = haskellGenerator.valueToCode(block,"OTHERWISE",0);

        let indent
        if (block.getParent()) {
             indent = " ".repeat(block.getParent().childrensIndentLength_ + 1);
        } else {
            indent = ""
        }

        let code;
        if (!definition) {
            code = `| otherwise = ${otherwise}`
        } else {
            code = `${definition}\n${indent}| otherwise = ${otherwise}`
        }

        return [code,0]
    }

    haskellGenerator["guard"] = function (block) {
        const predicate = haskellGenerator.valueToCode(block,"PREDICATE",0);
        const code = haskellGenerator.valueToCode(block,"CODE",0);

        let indent;
        if (block.getPreviousBlock() && block.getPreviousBlock().type === "guardWrapper") {
            indent = ""
        } else if (block.getPreviousBlock()){
            indent = " ".repeat(block.getSurroundParent().getParent().childrensIndentLength_ + 1);
        } else {
            indent = ""
        }

        return `${indent}| ${predicate} = ${code}`
    }

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
        variable = formatBrackets(variable)
        value = formatBrackets(value)
        const code = `map ${variable} ${value}`;
        return [code,0];
    }

    haskellGenerator["filter"] = function(block) {
        let variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
        let value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
        variable = formatBrackets(variable)
        value = formatBrackets(value)
        const code = `filter ${variable} ${value}`;
        return [code,0];
    }

    haskellGenerator["fold"] = function(block) {
        let variable = haskellGenerator.valueToCode(block,"FUNC",0) || "";
        let value = haskellGenerator.valueToCode(block,"VALUE",0) || "";
        let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
        variable = formatBrackets(variable)
        value = formatBrackets(value)
        list = formatBrackets(list)
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
        list = formatBrackets(list)
        const code = `${operator} ${list}`;
        return [code,0];
    }

    haskellGenerator["cons"] = function(block) {
        let item = haskellGenerator.valueToCode(block,"ITEM",0) || "";
        let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
        item = formatBrackets(item)
        list = formatBrackets(list)
        const code = `${item} : ${list}`;
        return [code,0];
    }

    haskellGenerator["concat"] = function(block) {
        let item = haskellGenerator.valueToCode(block,"ITEM",0) || "";
        let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
        item = formatBrackets(item)
        list = formatBrackets(list)
        const code = `${item} ++ ${list}`;
        return [code,0];
    }

    haskellGenerator["enum"] = function(block) {
        let item = haskellGenerator.valueToCode(block,"FROM",0) || "";
        let list = haskellGenerator.valueToCode(block,"TO",0) || "";
        item = formatBrackets(item)
        list = formatBrackets(list)
        const code = `${item} .. ${list}`;
        return [code,0];
    }

    haskellGenerator["tuple_constructor"] = function(block) {
        var code = "("
        var i = 0;
        while (true) {
            var val = haskellGenerator.valueToCode(block,"ADD"+i,0);
            if (val === "") {
                break
            }
            if (i > 0) {code = code + ","}
            code = code + val
            i++
        }
        code = code + ")"
        return [code,0];
    }

    haskellGenerator["tuple_access"] = function(block) {
        const operator = block.getFieldValue("OPERATOR");
        let list = haskellGenerator.valueToCode(block,"LIST",0) || "";
        list = formatBrackets(list)
        const code = `${operator} ${list}`;
        return [code,0];
    }

    haskellGenerator["numOperator"] = function(block) {
        const operator = block.getFieldValue("OPERATOR");
        let a = haskellGenerator.valueToCode(block,"A",0) || "";
        let b = haskellGenerator.valueToCode(block,"B",0) || "";
        a = formatBrackets(a)
        b = formatBrackets(b)
        const code = `${a} ${operator} ${b}`
        return [code,0]
    }

    haskellGenerator["boolOperator"] = function(block) {
        const operator = block.getFieldValue("OPERATOR");
        let a = haskellGenerator.valueToCode(block,"A",0) || "";
        let b = haskellGenerator.valueToCode(block,"B",0) || "";
        a = formatBrackets(a)
        b = formatBrackets(b)
        const code = `${a} ${operator} ${b}`
        return [code,0]
    }

    haskellGenerator["notOperator"] = function(block) {
        let a = haskellGenerator.valueToCode(block,"A",0) || "";
        a = formatBrackets(a)
        const code = `not ${a}`
        return [code,0]
    }

    haskellGenerator["comparison"] = function(block) {
        const operator = block.getFieldValue("OPERATOR");
        let a = haskellGenerator.valueToCode(block,"A",0) || "";
        let b = haskellGenerator.valueToCode(block,"B",0) || "";
        a = formatBrackets(a)
        b = formatBrackets(b)
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

    return haskellGenerator;
}