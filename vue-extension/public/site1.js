const CHECK_URL_1 = "https://kream.co.kr/products/"

const site_1_init = async () => {

    if (document.location.href.startsWith(CHECK_URL_1)) {
        console.log(`${CHECK_URL_1} 진입시작`)

        let tmp = setInterval(() => {
            // 기존 자리 삭제
            //items = document.querySelector('#account')    
            // 예측을 보내기 위한 최소 정보가 로드되었다 -> 특정 요소를 점검
            var shoesObject = {};
            // Brand
            shoesObject['Brand'] = document.querySelector('a.brand').text;
            // Name
            shoesObject['Name'] = document.querySelector('p.title').textContent;
            // ReleaseDate
            shoesObject['ReleaseDate'] = document.querySelectorAll('dd.product_info')[1].textContent;
            // ReleasePrice
            shoesObject['ReleasePrice'] = document.querySelectorAll('dd.product_info')[3].textContent;
            // Collab?
            if (shoesObject['Name'].includes(' x ')) {
                shoesObject['Collab'] = 1
            } else {
                shoesObject['Collab'] = 0
            };
            // 여성용?
            if (shoesObject['Name'].includes('(W')) {
                shoesObject['Woman'] = 1
            } else {
                shoesObject['Woman'] = 0
            };
            shoesObject['ImageURL'] = document.getElementsByClassName("image")[0].src;

            console.log(shoesObject);
            if (shoesObject != null) {
                // 화면에서 정보를 획득하여 서버쪽으로 예측을 요청하기 위한 데이터를 저장합니다.
                // 화면 조작을 할필요 없다 여기서는 
                removeAllchild(shoesObject)
                // 서버로 예측을 보내기 위한 기본 정보 저장
                // chrome.storage.sync.set(
                //     shoesObject, async () => {
                //         let temp = await check_cmd(shoesObject)
                //         console.log('---------- 저장된 오브젝트 ----------')
                //         console.log(temp)
                //         console.log('검색어 등록 완료')
                //         // 반복 타이머 종료
                //         clearInterval(tmp)
                //     });
                clearInterval(tmp)
                // 서비스 워커로 메시지 전송
                let msg = {
                    brand: shoesObject.Brand,
                    ReleaseDate: shoesObject.ReleaseDate,
                    Woman : shoesObject.Woman,
                    ReleasePrice: shoesObject.ReleasePrice,
                    Collab: shoesObject.Collab,
                    ImageURL: shoesObject.ImageURL,
                }
                chrome.runtime.sendMessage(msg, (response) => {
                    fetch('http://127.0.0.1:5000/test', {
                        method: 'POST', // 또는 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(msg),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('성공:', data);
                        // 여기서 직접 화면 처리하면됨
                        let VALUES = [Number(data.RF_VALUE.slice(1,-2)), 
                            Number(data.GB_VALUE.slice(1,-2)), 
                            Number(data.XGB_VALUE.slice(1,-2)), 
                            Number(data.LGBM_VALUE.slice(1,-2))];

                        var TestDIV = document.createElement("div");
                        TestDIV.setAttribute("id", "TestDIV");
                        let MaxValue = Math.round(Math.max(...VALUES));
                        console.log('Max :', MaxValue);
                        let MinValue = Math.round(Math.min(...VALUES));

                        let totalPrice = VALUES[0] + VALUES[1] + VALUES[2] + VALUES[3];
                        let VALUES_rate = [0,0,0,0] // RF GB XGB LGBM
                        
                        VALUES_rate[0] = Math.round(VALUES[0] / MaxValue * 100)
                        VALUES_rate[1] = Math.round(VALUES[1] / MaxValue * 100)
                        VALUES_rate[2] = Math.round(VALUES[2] / MaxValue * 100)
                        VALUES_rate[3] = Math.round(VALUES[3] / MaxValue * 100)


                        
                        console.log('Min :', MinValue);

                        TestDIV.innerHTML = `
                        <div class="charts">
                        <div class="charts__chart chart--p${VALUES_rate[0]}  chart--blue    chart--hover">RF : ${Math.round(VALUES[0])}</div><!-- /.charts__chart -->
                        <div class="charts__chart chart--p${VALUES_rate[1]}  chart--green   chart--hover">GB : ${Math.round(VALUES[1])}</div><!-- /.charts__chart -->
                        <div class="charts__chart chart--p${VALUES_rate[2]}  chart--red     chart--hover">XGB : ${Math.round(VALUES[2])}</div><!-- /.charts__chart -->
                        <div class="charts__chart chart--p${VALUES_rate[3]}  chart--yellow  chart--hover">LGBM : ${Math.round(VALUES[3])}</div><!-- /.charts__chart -->
                        </div><!-- /.charts -->
                        <div class = "PriceZone">[PREDI]<br>최저가 ${MinValue}원 ~ 최고가 ${MaxValue}원</div>

                        `;
                        TestDIV.style.backgroundColor = "white";

                        // var logoImage = document.createElement('img')
                        // logoImage.src = "https://postfiles.pstatic.net/MjAyMjA4MjNfMjY0/MDAxNjYxMjM4NTkyNjkx.zfy7cQRKeIVCIO91lUCMtHl2qBetuQeU5F14jVEjLtwg.NYI5kjIioqvoMMJrIDuvMXzotKddC4bRtWymoFr-6eIg.PNG.chdo999/long_predi.png?type=w580"
                        var CT = document.getElementsByClassName("column_top");
                        CT[0].appendChild(TestDIV);
                        // TestDIV.appendChild(logoImage)



                        chrome.runtime.sendMessage(data, (response1) => {
                            console.log('[content] background로 예측 결과를 보냄')
                            console.log(response1)
                        })
                    })
                    .catch((error) => {
                        console.error('실패:', error);
                    })
                    .finally(() => {
                        console.log(4)
                    });
                    // callback
                    console.log('background.js :', response);
                    // 여기서 결과를 기반으로 화면 처리 마무리
                });
            } else {
                console.log('해당 요소를 못찾음')
            }
        }, 1000)
    }
}



function removeAllchild(ele) {
    if (ele != undefined && ele != null) {
        while (ele.hasChildNodes) {
            console.log(`삭제`)
            ele.removeChild(ele.firstChild);
        }
    }
}
site_1_init()

