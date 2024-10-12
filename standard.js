"use strict";
const num_btn = document.querySelectorAll(".primary");
const operator_btn = document.querySelectorAll(".operator");
const equal_btn = document.querySelector(".equal");
const semi_cal = document.querySelector(".showFullCal");
let index = 0;
let first = 0;
let second;
let total;
const cal_arr = [0, 0, "0", 0];

function operate(a) {
  if (a[1] === "+") {
    return Number(a[0] + a[2]);
  } else if (a[1] === "-") {
    return a[0] - a[2];
  } else if (a[1] === "×") {
    return a[0] * a[2];
  } else if (a[1] === "÷") {
    return a[0] / a[2];
  }
}

//working of number buttons

for (let i = 0; i < num_btn.length; i++) {
  num_btn[i].addEventListener("click", function () {
    cal_arr[3] = 0;
    first = first * 10 + Number(num_btn[i].textContent);
    document.querySelector(".display").value = first;
    if (index === 0) {
      cal_arr[0] = first;
    } else {
      cal_arr[2] = first;
    }
  });
}

//working of operators
for (let i = 0; i < operator_btn.length; i++) {
  operator_btn[i].addEventListener("click", function () {
    document.querySelector(".display").value = "";
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

//equate
equal_btn.addEventListener("click", function () {
  if (cal_arr[3] === 1) {
    document.querySelector(".display").value = "Invalid Input";
  } else {
    if (index === 0 || cal_arr[2] === "0") {
      document.querySelector(".display").value = cal_arr[0];
    } else {
      semi_cal.textContent = String(cal_arr[0]) + cal_arr[1] + cal_arr[2] + "=";
      cal_arr[0] = operate(cal_arr);

      document.querySelector(".display").value = cal_arr[0];
      cal_arr[2] = "0";
      first = 0;
    }
  }
});
