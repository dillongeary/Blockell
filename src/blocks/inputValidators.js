export let integerValidator = function () {
    this.getField("VAL").setValidator(function (value) {
        value = value.replace(/[^0-9-.]/g,"")
        return Math.round(value);
    })
}
export let characterValidator = function () {
    this.getField("VAL").setValidator(function (value) {
        if (value.length > 1) {
            return value[0]
        }
        else return value;
    })
}
export let variableValidator = function () {
    this.getField("VAL").setValidator(function (value) {
        value = value.replace(/[^0-9a-zA-Z_\- ]/g,"");
        let newValue = ""
        let space = false;
        for (const char of value) {
            if (char === " ") {
                space = true;
            } else if (space === true) {
                newValue+= char.toUpperCase()
                space = false;
            } else {
                newValue+= char;
            }
        }
        value = newValue

        var first = value[0];
        value = value.slice(1);

        while (first && first.replace(/[^a-z]/g,"") === "") {
            if (!(first.replace(/[^A-Z]/g,"") === "")) {
                first = first.toLowerCase()
            } else {
                first = value[0]
                value = value.slice(1)
            }
        }
        if (!(first)) {first = ""}
        return first + value;
    })
}