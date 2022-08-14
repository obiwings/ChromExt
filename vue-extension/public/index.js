var TestDIV = document.createElement("div");
TestDIV.innerHTML = `테스트 중 입니다....<br>
<img src="long_predi.png" alt="logo">
<div class="vGraph">
    <ul class = "GraphZone">
    <li><span class="gTerm">LSTM</span><span class="gBar" style="height:33%"><span>33%</span></span></li>
    <li><span class="gTerm">KNN</span><span class="gBar" style="height:20%"><span>20%</span></span></li>
    <li><span class="gTerm">Log</span><span class="gBar" style="height:30%"><span>30%</span></span></li>
    <li><span class="gTerm">ANN</span><span class="gBar" style="height:40%"><span>40%</span></span></li>
    <li><span class="gTerm">XGB</span><span class="gBar" style="height:50%"><span>50%</span></span></li>
    <li><span class="gTerm">RID</span><span class="gBar" style="height:60%"><span>60%</span></span></li>
    <li><span class="gTerm">SVM</span><span class="gBar" style="height:30%"><span>80%</span></span></li>
    <li><span class="gTerm">HMM</span><span class="gBar" style="height:55%"><span>80%</span></span></li>
    <li><span class="gTerm">ADA</span><span class="gBar" style="height:75%"><span>80%</span></span></li>
    <li><span class="gTerm">OLS</span><span class="gBar" style="height:44%"><span>80%</span></span></li>
    </ul>
    <div class = "PriceZone">
        신발 가격 : 713,000,000원<br> 예측 가격 : 40,000원
    </div>
</div>`;
TestDIV.setAttribute("id", "TestDIV");
TestDIV.style.backgroundColor = "white";

var CT = document.getElementsByClassName("column_top");
CT[0].appendChild(TestDIV);


