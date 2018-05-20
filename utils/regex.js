const pattern = {
    gtZeroNumber: /^[1-9]\d*$/,
    mobile: /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199)+\d{8})$/
}




const mobile = function (val){
    return pattern.mobile.test(val);
}

const gtZeroNumber = function (val) {
  return pattern.gtZeroNumber.test(val);
}

module.exports = {
    mobile: mobile,
    gtZeroNumber: gtZeroNumber
}