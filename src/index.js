const REG_PLUS = /((\d+\.\d+)|\d+)(\+)((\d+\.\d+)|\d+)/;
const REG_MINUS = /((\d+\.\d+)|\d+)(\-)((\d+\.\d+)|\d+)/;
const REG_MODMINUS = /\-((\d+\.\d+)|\d+)(\-)((\d+\.\d+)|\d+)/;
const REG_MODMINUSNEW = /^\-((\d+\.\d+)|\d+)(\-)((\d+\.\d+)|\d+)$/;
const REG_MODPLUSNEW = /^\-((\d+\.\d+)|\d+)(\+)((\d+\.\d+)|\d+)$/;
const REG_MODPLUS = /\-((\d+\.\d+)|\d+)(\+)((\d+\.\d+)|\d+)/;
const REG_MULTIPLY = /((\d+\.\d+)|\d+)(\*)((\d+\.\d+)|\d+)/;
const REG_DIVIDE = /((\d+\.\d+)|\d+)(\/)((\d+\.\d+)|\d+)/;
const REG_CALC = /((\d+\.\d+)|\d+)(\*|\/|\-|\+)((\d+\.\d+)|\d+)/;
const REG_BRACKETS = /((\(\d+\.\d+\))|(\(\-\d+\.\d+\))|\(\d+\)|\(\-\d+\))/;
const REG_MOD = /((\d+\.\d+)|\d+)(\+\-)((\d+\.\d+)|\d+)/;

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

function mod(item) {
    let arr = item.split(/(\+\-)/);
    return Number(arr[0]) - Number(arr[2])
}

function modPlus(item) {
    let arr = item.split(/(\+)/);
    return  Math.abs(Number(arr[2])) - Math.abs(Number(arr[0]))
}

function modMinus(item) {
    let arr = item.split(/(\-\d+\.\d+|\-\d+|\+\d+\.\d+|\+\d+|)/);
    return  Number(arr[1]) + Number(arr[3]) // баг в регулярке
}

function excOper(item) {
    result = item
    if(result.match(REG_DIVIDE)) {
        result = result.replace(REG_DIVIDE, newSub)
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '')
            excOper(result);
        }
        if(result.match(REG_DIVIDE)) excOper(result)
    }
    if(result.match(REG_MULTIPLY)) {
        result = result.replace(REG_MULTIPLY, newSub)
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '')

        }
        if(result.match(REG_MULTIPLY)) excOper(result)
    }
    if(result.match(REG_MODMINUSNEW)) {
        result = result.replace(REG_MODMINUS, modMinus)
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '')
            excOper(result);
        }
    }
    if(result.match(REG_MODPLUSNEW)) {
        result = result.replace(REG_MODPLUSNEW, modMinus)
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '')
            excOper(result);
        }
    }
    if(result.match(REG_MINUS)) {
        result = result.replace(REG_MINUS, newSub)
        if (result.match(REG_MOD)) {
            result = result.replace(REG_MOD, mod)
        }
        if (result.match(REG_MODMINUS)) {
            result = result.replace(REG_MODMINUS, modMinus)
        }
        if (result.match(REG_MODPLUS)) {
            result = result.replace(REG_MODPLUS, modPlus)
        }
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '')
            excOper(result);
        }
        if(result.match(REG_MINUS)) excOper(result)
    }
    if(result.match(REG_PLUS)) {
        result = result.replace(REG_PLUS, newSub)
        if (result.match(REG_BRACKETS)) {
            result = result.replace(/\(|\)/g, '')
            excOper(result);
        }
        if(result.match(REG_PLUS)) excOper(result)
    }
    if (result.match(REG_BRACKETS)) {
        result = result.replace(/\(|\)/g, '')
        excOper(result);
    }
    if (result.match(REG_CALC)) {
        excOper(result)
    }
    return +result;
}

function expressionCalculator(expr) {
    let exp = expr.replace(/\s/g, '');
    return excOper(exp);
}

module.exports = {
    expressionCalculator
}