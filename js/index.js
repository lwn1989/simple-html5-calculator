var equ = "";
var sc1Show = "";
var sc2Show = "";
$(".opt-equal").on("click", function(){
  setTimeout(function(){$(".opt-equal").blur()}, 200);
});
$(document).ready(function() {
  $("#sc2").append("0");
  $("#sc1").append("H");
  setTimeout(function(){
    $("#sc1").append("E");
  }, 100); 
  setTimeout(function(){
    $("#sc1").append("L");
  }, 200);
  setTimeout(function(){
    $("#sc1").append("L");
  }, 300);
  setTimeout(function(){
    $("#sc1").append("O");
  }, 400);
});
$(".btn-classic").on("click", function(){
  $("#sc1").removeClass("showRes1");
  $("#sc2").removeClass("showRes2");
  setTimeout(function(){$(".btn-classic").blur()}, 200);
  setTimeout (function(){
    console.log(equ);
    if (equ.length > 1 && equ[0] == "0") {
      equ = equ[1];
    }
    sc1Show = equ;
    if (sc1Show.length > 10) {
      sc1Show = "..." + sc1Show.slice(sc1Show.length-10);
    }
    equMod = equ.replace(/×/g, "*")
    sc2Show = equCalc(equMod);
    console.log("sc2Show:"+sc2Show);
    if (!sc2Show && sc2Show !== 0) {
      sc2Show = "";
    }
    if (sc2Show.length>17) {
      sc2Show = sc2Show.toFixed(4);
    } 
    $("#sc2").html(sc2Show);
    $("#sc1").html(sc1Show);
    }, 50);
});
var bracketNum = 0;
$("#bracket").on("click", function(){
  if (equ) {
    if (bracketNum%2 == 1) {
      equ += ")";
      sc2Show = ")";
      bracketNum += 1;  
    } else {
      equ += "(";
      bracketNum += 1;
      sc2Show = "(";
      sc1Show = equ;
    }
  } else {
    equ += "(";
    bracketNum += 1;
    console.log("hello");
    $("#sc2").html("(");
    $("#sc1").html("(");
    lastInput = "(";
  };
});
$("#num9").on("click", function(){
  equ += 9;
});
$("#num8").on("click", function(){
  equ += 8
});
$("#num7").on("click", function(){
  equ += 7;
});
$("#num6").on("click", function(){
  equ += 6;
});
$("#num5").on("click", function(){
  equ += 5;
});
$("#num4").on("click", function(){
  equ += 4;
});
$("#num3").on("click", function(){
  equ += 3;
});
$("#num2").on("click", function(){
  equ += 2;
});
$("#num1").on("click", function(){
  equ += 1;
});
$("#num0").on("click", function(){
  equ += 0;
});
$("#dot").on("click", function(){
  if (!equ) {
    equ += "0.";
  } else {
    equ += ".";
  } 
});
$("#plus").on("click", function(){
  equ += "+";
});
$("#minus").on("click", function(){
  equ += "-";
});
$("#divide").on("click", function(){
  equ += "/";
});
$("#times").on("click", function(){
  equ += "×";
});
$("#clearAll").on("click", function(){
  bracketNum = 0;
  equ = "0";
});
$("#backspace").on("click", function(){
  if (equ[equ.length-1] == "(" || equ[equ.length-1] == ")") {
    bracketNum -= 1;
  }
  equ = equ.slice(0, -1);
  if (equ == "") {
    equ = "0";
  }
});
$("#equal").on("click", function(){
  console.log("hello");
  sc2Show = equCalc(equMod);
  if (!sc2Show && sc2Show !== 0) {
    sc2Show = "Bad Expression!";
  }
  $("#sc2").html(sc2Show);
  $("#sc1").addClass("showRes1");
  $("#sc2").addClass("showRes2");
});
function equCalc(equ) {
  if (!checkSyntax(equ)) {
    return false;
  } else {
    while (equ.match(/\(/g)) {
      equ = calcInsideBracket(equ);
      console.log(equ);
    }
    var finalRes = calcNoBracket(equ);
    return finalRes;
  } 
  function checkSyntax(equ) {
    var reSynatx = /([\+\-\*\/]{2,}|\/\|\*\)|\(\*|\(\/|\(\))/g; 
    var matchSynatx = equ.match(reSynatx);
    if (matchSynatx) {
      return false;
    } else {
      return true;
    }
  }
  function calcInsideBracket(equ) {
    var leftBracketNum,rightBracketNum;
    var leftTemp = equ.match(/\(/g);
    if (leftTemp) {
      leftBracketNum = leftTemp.length;
    } else {
      leftBracketNum = 0;
    }
    var rightTemp = equ.match(/\)/g);
    if (rightTemp) {
      rightBracketNum = rightTemp.length;
    } else {
      rightBracketNum = 0;
    }
    if (leftBracketNum > rightBracketNum) {
      if (equ[equ.length-1] != "(") {
        equ+=")";
      } else {
        equ = equ.slice(0,-1);
        return equ;
      }
    }
    var brackets = equ.match(/\(([^\)\(]+)\)/g);
    //console.log(brackets);
    if (brackets) {
      brackets.forEach(function(item){
        tmpEqu = item.slice(1,-1);
        var res = calcNoBracket(tmpEqu);
        var tmpIndex = equ.indexOf(item);
        console.log(tmpIndex);
        var addMul = [0, 0];
        if (!isNaN(equ[tmpIndex-1])) {
          addMul[0] = 1;
        }
        if (!isNaN(equ[tmpIndex+item.length])) {
          addMul[1] = 1;
        }
        if (addMul[0]==0 && addMul[1]==0) {
          equ = equ.replace(item, res);
        } else if (addMul[0]==1 && addMul[1]==0) {
          equ = equ.replace(item, "*"+res);
        } else if (addMul[0]==0 && addMul[1]==1) {
          equ = equ.replace(item, res+ "*");
        } else if (addMul[0]==1 && addMul[1]==1) {
          equ = equ.replace(item, "*"+res+"*");
        }
      })
      console.log(equ);
      return equ;
    } else {
      return equ;
    }
  }
  function calcNoBracket(equ) {
    if (equ[0] == "+" || equ[0] == "-" ) {
      equ = "0" + equ;
    } 
    if (equ[equ.length-1] == "+" || equ[equ.length-1] == "-" ) {
      equ += "0";
    }
    var equParts = equ.split(/[\+\-]/g);
    var plusOrMinu = equ.match(/[\+\-]/g);
    var equPartsRes = [];
    equParts.forEach(function(item) {
      var itemParts = item.split(/[\*\/]/g);
      var operParts = item.match(/[\*\/]/g);
      if (operParts) {
        var tmpRes = parseFloat(itemParts[0]);
        for (var i=0;i<itemParts.length-1;i++) {
          if (operParts[i]=="*") {
            tmpRes *= parseFloat(itemParts[i+1]);
          } else {
            tmpRes /= parseFloat(itemParts[i+1]);
          }
        }
        equPartsRes.push(parseFloat(tmpRes));
      } else {
        equPartsRes.push(parseFloat(item));
      } 
    })
    var tmpTotRes = equPartsRes[0];
    for (var j=0;j<equPartsRes.length-1;j++) {
      if (plusOrMinu[j]=="+") {
        tmpTotRes += equPartsRes[j+1];
      } else {
        tmpTotRes -= equPartsRes[j+1];
      }
    }
    return tmpTotRes;
  }
}