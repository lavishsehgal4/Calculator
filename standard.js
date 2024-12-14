"use strict";
const num_btn = document.querySelectorAll(".primary");
const operator_btn = document.querySelectorAll(".operator");
const equal_btn = document.querySelector(".equal");
const semi_cal = document.querySelector(".showFullCal");
const clear_cross = document.querySelectorAll(".cross");
const operator2_btn = document.querySelectorAll(".operator_2");
let index = 0;
let first = 0;
let is_equal_click = false;
let is_decimal = false;
let cal_arr = [0, 0, "0", 0, 0];

function operate(a) {
  let result;
  if (a[1] === "+") {
    result = Number(a[0] + a[2]);
    return Math.round(result * 1000) / 1000;
  } else if (a[1] === "-") {
    result = a[0] - a[2];
    return Math.round(result * 1000) / 1000;
  } else if (a[1] === "×") {
    result = a[0] * a[2];
    return Math.round(result * 1000) / 1000;
  } else if (a[1] === "÷") {
    result = a[0] / a[2];
    return Math.round(result * 1000) / 1000;
  }
}

function operate2(a) {
  let result;
  if (a[4] == "x²") {
    result = a[2] * a[2];
    return Math.round(result * 1000) / 1000;
  } else if (a[4] == "√x") {
    result = Math.sqrt(a[2]);
    return Math.round(result * 1000) / 1000;
  } else if (a[4] == "1/x") {
    result = 1 / a[2];
    return Math.round(result * 1000) / 1000;
  } else if (a[4] == "+/-") {
    result = -a[2];
    return Math.round(result * 1000) / 1000;
  } else {
    result = a[2] / 100;
    return Math.round(result * 1000) / 1000;
  }
}
//special operator symbols
function operate2_symbol(a) {
  if (a[4] == "x²") {
    return "sqr";
  } else if (a[4] == "√x") {
    return "sqrt";
  } else if (a[4] == "1/x") {
    return "1/";
  } else if (a[4] == "+/-") {
    return " -";
  } else {
    return "%";
  }
}
//working of number buttons

for (let i = 0; i < num_btn.length; i++) {
  num_btn[i].addEventListener("click", function () {
    cal_arr[3] = 0;
    is_equal_click = false;
    const btnValue = num_btn[i].textContent;
    if (btnValue === "." && !is_decimal) {
      first = first + ".";
      is_decimal = true;
    } else if (btnValue !== "." && is_decimal) {
      first = first + btnValue;
    }
    if (!is_decimal) {
      first = first * 10 + Number(num_btn[i].textContent);
    }
    document.querySelector(".display").value = first;
    if (index === 0) {
      cal_arr[0] = Number(first);
    } else {
      cal_arr[2] = Number(first);
    }
  });
}

//working of operators
for (let i = 0; i < operator_btn.length; i++) {
  operator_btn[i].addEventListener("click", function () {
    document.querySelector(".display").value = "";
    is_decimal = false;
    is_equal_click = false;
    if (index === 0) {
      cal_arr[1] = operator_btn[i].textContent;
      index = 1;
      first = 0;
      semi_cal.textContent = String(cal_arr[0]) + cal_arr[1];
      cal_arr[3] = 1;
    } else {
      if (typeof cal_arr[2] === "number") {
        cal_arr[0] = operate(cal_arr);
      }
      cal_arr[1] = operator_btn[i].textContent;
      console.log(cal_arr[0]);
      first = 0;
      cal_arr[3] = 1;
      semi_cal.textContent = String(cal_arr[0]) + cal_arr[1];
    }
  });
}
let str2 = "";
for (let i = 0; i < operator2_btn.length; i++) {
  operator2_btn[i].addEventListener("click", function () {
    document.querySelector(".display").value = "";
    is_decimal = false;
    cal_arr[3] = 0;
    is_equal_click = false;
    cal_arr[4] = operator2_btn[i].textContent;
    if (index === 0) {
      semi_cal.textContent =
        operate2_symbol(cal_arr) + "(" + String(cal_arr[0]) + ")";
      first = 0;
      cal_arr[2] = cal_arr[0];
      cal_arr[0] = operate2(cal_arr);
      cal_arr[2] = "0";
      document.querySelector(".display").value = cal_arr[0];
    } else if (cal_arr[2] === "0" && cal_arr[1] === 0 && index == 1) {
      semi_cal.textContent =
        operate2_symbol(cal_arr) + "(" + String(cal_arr[0]) + ")";
      first = 0;
      cal_arr[2] = cal_arr[0];
      cal_arr[0] = operate2(cal_arr);
      cal_arr[2] = "0";
      cal_arr[1] = 0;
      document.querySelector(".display").value = cal_arr[0];
    } else {
      first = 0;
      str2 = semi_cal.textContent =
        String(cal_arr[0]) +
        cal_arr[1] +
        operate2_symbol(cal_arr) +
        "(" +
        String(cal_arr[2]) +
        ")";
      cal_arr[2] = operate2(cal_arr);
      cal_arr[0] = operate(cal_arr);
      cal_arr[2] = "0";
      cal_arr[1] = 0;
      cal_arr[4] = 0;
      document.querySelector(".display").value = "";
    }
  });
}
//equate

equal_btn.addEventListener("click", function () {
  is_equal_click = true;
  is_decimal = false;
  if (cal_arr[3] === 1) {
    document.querySelector(".display").value = "Invalid Input";
  } else {
    if (cal_arr[1] === 0 && index === 1 && cal_arr[4] === 0) {
      semi_cal.textContent = str2 + "=";

      document.querySelector(".display").value = cal_arr[0];
      cal_arr[2] = "0";
      first = 0;
    } else if (index === 0 || cal_arr[2] === "0") {
      semi_cal.textContent = first + "=";
      document.querySelector(".display").value = cal_arr[0];
      first = 0;
    } else {
      semi_cal.textContent = String(cal_arr[0]) + cal_arr[1] + cal_arr[2] + "=";
      cal_arr[0] = operate(cal_arr);

      document.querySelector(".display").value = cal_arr[0];
      cal_arr[2] = "0";
      first = 0;
    }
  }
});

//working of clear and cross button

for (let i = 0; i < clear_cross.length; i++) {
  clear_cross[i].addEventListener("click", function () {
    if (clear_cross[i].textContent == "⌫") {
      if (first !== 0) {
        if (typeof first === "number") {
          first = Math.floor(first / 10);
          if (index === 0) {
            cal_arr[0] = first;
          } else {
            cal_arr[2] = first;
          }
        } else {
          let lastChar = first[first.length - 1];
          first = first.slice(0, -1);
          if (lastChar === ".") {
            first = Number(first);
            is_decimal = false;
          }
          if (index === 0) {
            cal_arr[0] = Number(first);
          } else {
            cal_arr[2] = Number(first);
          }
        }
        document.querySelector(".display").value = first;
      }
    } else if (clear_cross[i].textContent == "CE") {
      if (!is_equal_click) {
        first = 0;
        is_decimal = false;
        if (index === 0) {
          cal_arr[0] = first;
        } else {
          cal_arr[2] = first;
        }
        document.querySelector(".display").value = first;
      } else {
        //reset the calculator
        index = 0;
        first = 0;
        is_equal_click = false;
        is_decimal = false;
        cal_arr = [0, 0, "0", 0, 0];
        document.querySelector(".display").value = "";
        semi_cal.textContent = "";
      }
    } else {
      //reset the calculator
      index = 0;
      first = 0;
      is_equal_click = false;
      is_decimal = false;
      cal_arr = [0, 0, "0", 0, 0];
      document.querySelector(".display").value = "";
      semi_cal.textContent = "";
    }
  });
}
