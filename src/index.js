const REG_ADD = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)(\+)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)/;
const REG_SUB = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)(\-)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)/;
const REG_MULT = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)(\*)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)/;
const REG_DIV = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)(\/)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+|\+\d+\.\d+|\+\d+)/;
const REG_NUMB =/(\-\d+\.\d+|\-\d+|\d+\.\d+|\d+|\+\d+\.\d+|\+\d+)(\+|\-|\*|\/)(\-\d+\.\d+|\-\d+|\d+\.\d+|\d+|\+\d+\.\d+|\+\d+)/;
const REG_BRACKETS = /\([^()]+\)/;

function eval() {
    // Do not use eval!!!
    return;
}

function addCalc(item) {
    let arr = item.match(REG_NUMB);
    return (Number(arr[1]) + Number(arr[3])) >=0  ? `+${Number(arr[1]) + Number(arr[3])}` : (Number(arr[1]) + Number(arr[3]));
}

function subCalc(item) {
    let arr = item.match(REG_NUMB);
    return (Number(arr[1]) - Number(arr[3])) >=0  ? `+${Number(arr[1]) - Number(arr[3])}` : (Number(arr[1]) - Number(arr[3]));
}

function divCalc(item) {
    let arr = item.match(REG_NUMB);
    if (Number(arr[3]) == 0) throw 'TypeError: Division by zero.';
    return (Number(arr[1]) / Number(arr[3])) >=0  ? `+${(Number(arr[1]) / Number(arr[3])).toFixed(15)}` : (Number(arr[1]) / Number(arr[3])).toFixed(15);
}

function multCalc(item) {
    let arr = item.match(REG_NUMB);
    return (Number(arr[1]) * Number(arr[3])) >=0  ? `+${Number(arr[1]) * Number(arr[3])}` : (Number(arr[1]) * Number(arr[3]));
}

function calc(item) {
    while(item.match(REG_DIV)) {
        item=item.replace(REG_DIV, divCalc);
    }
    while(item.match(REG_MULT)) {
        item=item.replace(REG_MULT, multCalc);
    }
    while(item.match(REG_SUB)) {
        item= item.replace(REG_SUB, subCalc);
    }
    while(item.match(REG_ADD)) {
        item= item.replace(REG_ADD, addCalc);
    }
    return Number(item.replace(/\(|\)/g, ''));
}

function validParentheses(parens){
    let n = 0;
    for (let i = 0; i < parens.length; i++) {
        if (parens[i] == '(') n++;
        if (parens[i] == ')') n--;
        if (n < 0) return false;
    }
    return n == 0;
}

function expressionCalculator(expr) {
    let exp = expr.replace(/\s/g, '');

    if (!validParentheses(exp)) throw "ExpressionError: Brackets must be paired"; 


    while (exp.match(REG_BRACKETS)) {
        exp = exp.replace(REG_BRACKETS, calc);
    }
    return calc(exp);
}

module.exports = {
    expressionCalculator
}