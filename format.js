function formate(num, dp, dp2) { 
  // num: number that you need to formate
  // dp: decimal points below 1e6
  // dp2: decimal points between 1e6 and e1e6, 1 more decimal point than dp2 after e1e6
  num = new Decimal(num)
  let output = ""
  let ret = num.abs()
  if (ret.lt(1e6)) {
    output = ret.toFixed(dp)
  } else if (ret.lt("e1e6")) {
    output = formateNum(ret, dp2)
  } else if (ret.lt("ee1e6")) {
    ret = ret.log10()
    output = "e" + formateNum(ret, dp2 + 1)
  } else if (ret.lt("eee1e6")) {
    ret = ret.log10().log10()
    output = "ee" + formateNum(ret, dp2 + 1)
  } else if (ret.lt("eeee1e6")) {
    ret = ret.log10().log10().log10()
    output = "eee" + formateNum(ret, dp2 + 1)
  } else if (ret.lt("eeeee1e6")) {
    ret = ret.log10().log10().log10().log10()
    output = "eeee" + formateNum(ret, dp2 + 1)
  } else output = ret.toString()
  return (num.lt(0) ? "-" : "") + output
}

function formateNum(num, dp) {
  let exponent = num.log10().floor().toNumber();
  let mantissa = num.div(new Decimal(10).pow(exponent)).toNumber();
  if (game.notation <= 3){
    if (num.gte(new Decimal(10).pow(3 * 10 ** game.notation + 3))) {
      if (mantissa >= 10 - 10 ** (-1 * dp) / 2){
        mantissa /= 10
        exponent += 1
      }
      return mantissa.toFixed(dp) + "e" + exponent
    } else {
      let mod = exponent % 3
      exponent = (exponent - mod) / 3 - 1
      mantissa = mantissa * 10 ** mod
      if (mantissa >= 1000 - 10 ** (-1 * dp) / 2){
        mantissa /= 1000
        exponent += 1
      }
      if (num.lt(new Decimal(1e33))) {
        return mantissa.toFixed(dp) + " " + standardPreE33[exponent]
      } else {
        return mantissa.toFixed(dp) + " " + standardUnits[exponent % 10] + standardTens[Math.floor(exponent / 10) % 10] + standardHundreds[Math.floor(exponent / 100)]
      }
    }
  } else {
    switch(game.notation) {
    case 4:
    return "e" + num.log10().toNumber().toFixed(dp)
    break;
    }
  }
}

const standardPreE33 = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"]
const standardUnits = ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"]
const standardTens = ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"]
const standardHundreds = ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]

function toggleNotation() {
  game.notation = (game.notation + 1) % 5
}

function getNotation(){
  let output
  switch(game.notation) {
  case 0:
    output = "Scientific"
    break;
  case 1:
    output = "Standard I"
    break;
  case 2:
    output = "Standard II"
    break;
  case 3:
    output = "Standard III"
    break;
  case 4:
    output = "Logarithm"
    break;
  default:
    output = ""
  }
  return output
}