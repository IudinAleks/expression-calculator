function eval() {
    // Do not use eval!!!
    return;
}

const reg = /\(([^)]+)\)/g;

function newSub(item) {
    let arr = item.split('');
    switch (arr[1]) {
        case '+':
            return Number(arr[0]) + Number(arr[2])
        case '-': 
            return Number(arr[0]) - Number(arr[2])
        case '*':
            return Number(arr[0]) * Number(arr[2])
        case '/': 
        if(arr[2] == 0) throw 'Division by zero'
         return Number(arr[0]) / Number(arr[2]);
        default:
            break;
    }
}

function expressionCalculator(expr) {
    let result = expr.replace(/\s/g, '');
    return +result.replace(/\d.\d/g, newSub)
}

module.exports = {
    expressionCalculator
}