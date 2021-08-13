const REG_ADDITION = /((\d+\.\d+)|\d+)(\+)((\d+\.\d+)|\d+)/;
const REG_MINUS = /((\d+\.\d+)|\d+)(\-)((\d+\.\d+)|\d+)/;
const REG_MULTIPLY = /((\d+\.\d+)|\d+)(\*)((\d+\.\d+)|\d+)/;
const REG_DIVISION = /((\d+\.\d+)|\d+)(\/)((\d+\.\d+)|\d+)/;
const REG_CALC = /((\d+\.\d+)|\d+)(\/|\-|\+|\*)((\d+\.\d+)|\d+)/;
const REG_MOD = /((\d+\.\d+)|\d+)(\+\-|\*\-|\/\-)((\d+\.\d+)|\d+)/;
const REG_MINUSNUMBMINUS = /((\-\d+\.\d+)|\-\d+)(\-|\+)((\d+\.\d+)|\d+)/;
const REG_BRACKETS = /((\(\d+\.\d+\))|(\(\-\d+\.\d+\))|\(\d+\)|\(\-\d+\))/;

let result = 0;

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
            return -Number(arr[0]) / Number(arr[2])
    }
}

function calcMinusOnMinusNumb(item) {
    let arr = item.split('+');
     if (Number(arr[0]) + Number(arr[1])) {
         return Number(arr[0]) + Number(arr[1])}
    else {
        arr = item.split('-');
        return -(Number(arr[1]) + Number(arr[2])) // bug split
    }
}

function excOper(item) {
    result = item
    if (result.match(REG_BRACKETS)) {
        result = result.replace(/\(|\)/g, '');
    }
    if(result.match(REG_DIVISION)) {
        result = result.replace(REG_DIVISION, newSub)
        if(result.match(REG_DIVISION)) excOper(result)
    }
    if(result.match(REG_MULTIPLY)) {
        result = result.replace(REG_MULTIPLY, newSub)
        if(result.match(REG_MULTIPLY)) excOper(result)
    }
    if(result.match(REG_MINUS)) {
        result = result.replace(REG_MINUS, newSub)
        if (result.match(REG_MOD)) {
            result = result.replace(REG_MOD, calcOnMinusNumb)
            if(result.match(REG_MOD)) excOper(result)
        }
        if (result.match(REG_MINUSNUMBMINUS)) {
            result = result.replace(REG_MINUSNUMBMINUS, calcMinusOnMinusNumb)
            excOper(result)
        }
        if(result.match(REG_MINUS)) excOper(result)
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '');
            if (result.match(REG_MOD)) {
                result = result.replace(REG_MOD, calcOnMinusNumb)
                if(result.match(REG_MOD)) excOper(result)
            }
            if (result.match(REG_MINUSNUMBMINUS)) {
                result = result.replace(REG_MINUSNUMBMINUS, calcMinusOnMinusNumb)
                excOper(result)
            }
            excOper(result);
        }
    }
    if (result.match(REG_MINUSNUMBMINUS)) {
        result = result.replace(REG_MINUSNUMBMINUS, calcMinusOnMinusNumb)
        excOper(result)
    }
    if(result.match(REG_ADDITION)) {
        result = result.replace(REG_ADDITION, newSub)
        if(result.match(REG_ADDITION)) excOper(result)
    }
    if (result.match(REG_BRACKETS)) {
        result = result.replace(/\(|\)/g, '');
        if (result.match(REG_MOD)) {
            result = result.replace(REG_MOD, calcOnMinusNumb)
            if(result.match(REG_MOD)) excOper(result)
        }
        if (result.match(REG_MINUSNUMBMINUS)) {
            result = result.replace(REG_MINUSNUMBMINUS, calcMinusOnMinusNumb)
            excOper(result)
        }
        excOper(result);
    }
    if (result.match(REG_CALC)) excOper(result)
    
    return +result;
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
    // if (!validParentheses(expr)) throw "ExpressionError: Brackets must be paired"; 
    return excOper(exp);
}

module.exports = {
    expressionCalculator
}