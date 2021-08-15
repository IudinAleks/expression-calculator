const REG_ADDITION = /((\d+\.\d+)|\d+)(\+)((\d+\.\d+)|\d+)/;
const REG_MINUSNUMBADDITION = /((\-\d+\.\d+)|\-\d+)(\+)((\d+\.\d+)|\d+)/;
const REG_MINUS = /((\d+\.\d+)|\d+)(\-)((\d+\.\d+)|\d+)/;
const REG_MULTIPLY = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)(\*)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)/;
const REG_MINUSNUMBMULTIPLY = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)(\*)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)/;
const REG_DIVISION = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)(\/)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)/;
const REG_MINUSNUMBDIVISION = /((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)(\/)((\-\d+\.\d+)|\-\d+|(\d+\.\d+)|\d+)/;
const REG_CALC = /((\d+\.\d+)|\d+)(\/|\-|\+|\*)((\d+\.\d+)|\d+)/;
const REG_MOD = /((\d+\.\d+)|\d+|(\-\d+\.\d+)|\-\d+)(\+\-|\*\-|\/\-)((\d+\.\d+)|\d+)/;
const REG_MINUSNUMBPLUS = /((\-\d+\.\d+)|\-\d+)(\+)((\d+\.\d+)|\d+)/;
const REG_MINUSNUMBMINUS = /((\-\d+\.\d+)|\-\d+)(\-)((\d+\.\d+)|\d+)/;
const REG_BRACKETS = /((\(\d+\.\d+\))|(\(\-\d+\.\d+\))|\(\d+\)|\(\-\d+\))/;
const REG_BRACKETSARR = /\(.+\)/;

function eval() {
    // Do not use eval!!!
    return;
}

function mainOperations(item) {
    let arr = item.split(/(\-|\*|\+|\/)/);
    switch (arr[1]) {
        case '*':
            return Number(arr[0]) * Number(arr[2])
        case '+':
            return Number(arr[0]) + Number(arr[2])
        case '-': 
            return Number(arr[0]) - Number(arr[2])
        case '/': 
            if (arr[2] == 0) throw 'TypeError: Division by zero.';
            return Number(arr[0]) / Number(arr[2]);
        default:
            break;
    }
}

function calcOnMinusNumb(item) {
    let arr = item.split(/(\+\-|\*\-|\/\-)/);
    switch (arr[1]) {
        case '+-':
            return Number(arr[0]) - Number(arr[2])
        case '*-':
            return -Number(arr[0]) * Number(arr[2])
        case '/-':
            if (arr[2] == 0) throw 'TypeError: Division by zero.';
            return -Number(arr[0]) / Number(arr[2])
    }
}

function calc(item) {
    let arr = item.split(/(\*|\/|\+)/);
    switch (arr[1]) {
        case '*':
            return Number(arr[0]) * Number(arr[2])
        case '/':
            if (arr[2] == 0) throw 'TypeError: Division by zero.';
            return Number(arr[0]) / Number(arr[2])
        case '+':
            return Number(arr[0]) + Number(arr[2])
    }
}

function calcMinusOnMinusNumb(item) {
    let arr = item.split('+');
     if (Number(arr[0]) + Number(arr[1])) {
         return Number(arr[0]) + Number(arr[1])
        }
    else {
        arr = item.split('-');
        return -(Number(arr[1]) + Number(arr[2])) // bug split
    }
}

function excOper(item) {
    while(item.match(REG_DIVISION)) {
        item=item.replace(REG_MINUSNUMBDIVISION, calc);
    }
    while(item.match(REG_MULTIPLY)) {
        item=item.replace(REG_MINUSNUMBMULTIPLY, calc);
    }
    while(item.match(REG_MINUS)) {
        item= item.replace(REG_MINUSNUMBMINUS, calcMinusOnMinusNumb);
        item=item.replace(REG_MINUS, mainOperations);
        item=item.replace(REG_MOD, calcOnMinusNumb);
        item= item.replace(REG_MINUSNUMBPLUS, calcMinusOnMinusNumb)
    }
    while(item.match(REG_ADDITION)) {
        item= item.replace(REG_MINUSNUMBADDITION, calc);
        item=item.replace(REG_ADDITION, mainOperations);
        item=item.replace(REG_MOD, calcOnMinusNumb);
    }
    return +item.replace(/\(|\)/g, '');
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
    //# валидация скобок
    // if (!validParentheses(exp)) throw "ExpressionError: Brackets must be paired"; 
    
    //#проверим есть ли что в скобках
    if (exp.match(REG_BRACKETSARR)) {
        exp=exp.replace(REG_BRACKETSARR, ()=> {
            let arr =  exp.match(REG_BRACKETSARR);
            return excOper(arr[0])
        })
    }
    return excOper(exp);
}

module.exports = {
    expressionCalculator
}