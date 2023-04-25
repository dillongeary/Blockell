export let integerValidator = function () {
    this.getField("VAL").setValidator(function (value) {
        return value.replace(/[^0-9]/g,"")
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
        value = value[0].toLowerCase() + value.slice(1);
        return value.replace(/[^0-9a-zA-Z_-]/g,"")
    })
}