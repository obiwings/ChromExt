var TestDIV = document.createElement("div");

TestDIV.innerHTML = "테스트용으로 넣어본 DIV 입니다.";
TestDIV.setAttribute("id", "testdiv");
TestDIV.style.backgroundColor = "yellow";

var CT = document.getElementsByClassName("column_top");
CT[0].appendChild(TestDIV);