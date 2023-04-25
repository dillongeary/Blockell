let intValidator = function (value) {
    return value.replace(/[^0-9]/g,"")
}
export let integerValidator = function () {
    this.getField("VAL").setValidator(intValidator)
}

let charValidator = function (value) {
    if (value.length > 1) {
        return value[0]
    }
    else return value;
}

export let characterValidator = function () {
    this.getField("VAL").setValidator(characterValidator)
}

let varValidator = function (value) {
    value[0] = value[0].toLowerCase();
    return value.replace(/[^0-9a-zA-Z_-]/g,"")
}

export let variableValidator = function () {
    this.getField("VAL").setValidator(varValidator)
}