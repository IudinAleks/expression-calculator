function eval() {
    // Do not use eval!!!
    return;
}


function newSub(item) {
    let arr = item.split(/(\-|\*|\+|\/)/);
    switch (arr[1]) {
        case '*':
            return Number(arr[0]) * Number(arr[2])
        case '+':
            return Number(arr[0]) + Number(arr[2])
        case '-': 
            return Number(arr[0]) - Number(arr[2])
        case '/': 
            return Number(arr[0]) / Number(arr[2]);
        default:
            break;
    }
}

let result
function excOper(item) {
    result = item.replace(/[+-]?([0-9]*[.])?[0-9]+\*[+-]?([0-9]*[.])?[0-9]+/, newSub).replace(/[+-]?([0-9]*[.])?[0-9]+\/[+-]?([0-9]*[.])?[0-9]+/, newSub).replace(/[+-]?([0-9]*[.])?[0-9]+\+[+-]?([0-9]*[.])?[0-9]+/, newSub).replace(/[+-]?([0-9]*[.])?[0-9]+\-[+-]?([0-9]*[.])?[0-9]+/, newSub);
    if (result.match(/[+-]?([0-9]*[.])?[0-9]+(\*|\/|\+|\-)[+-]?([0-9]*[.])?[0-9]+/)) excOper(result)
    return +result;
}

function expressionCalculator(expr) {
    let exp = expr.replace(/\s/g, '');
    return excOper(exp);
}

module.exports = {
    expressionCalculator
}