'use strict'

    var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
    var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];

    function isTrueValidateCodeBy18IdCard(a_idCard) {   
        var sum = 0;
        if (a_idCard[17].toLowerCase() == 'x') {   
            a_idCard[17] = 10;
        }   
        for ( var i = 0; i < 17; i++) {   
            sum += Wi[i] * a_idCard[i];
        }   
        var valCodePosition = sum % 11;
        if (a_idCard[17] == ValideCode[valCodePosition]) {   
            return true;   
        }
        return false;   
    }

    function isValidityBrithBy18IdCard(idCard18){   
        var year = idCard18.substring(6,10);   
        var month = idCard18.substring(10,12);   
        var day = idCard18.substring(12,14);   
        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
        if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
            return false;   
        }
        return true;   
    }

    function isValidityBrithBy15IdCard(idCard15){   
        var year =  idCard15.substring(6,8);   
        var month = idCard15.substring(8,10);   
        var day = idCard15.substring(10,12);
        var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
        if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
            return false;   
        }
        return true;
    }

export function verifyName(gets){
    return /^([\u4e00-\u9fa5\.]{2,10})$/.test(gets);
}

export function verifyIdCard(gets){
    if (gets && gets.length == 15) {   
        return isValidityBrithBy15IdCard(gets);   
    }else if (gets && gets.length == 18){   
        var a_idCard = gets.split("");
        if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
            return true;   
        }   
        return false;
    }
    return false;
}