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
            // Collab
            if (shoesObject['Name'].includes(' x ')) {
                shoesObject['Collab'] = 1
            } else {
                shoesObject['Collab'] = 0
            };
            // 여성용?
            if (shoesObject['Name'].includes('(W')){
                shoesObject['(W)'] = 1
            } else {
                shoesObject['(W)'] = 0
            };
            shoesObject['ImageURL'] = document.getElementsByClassName("image")[0].src;

            console.log(shoesObject);
            if (shoesObject != null) {
                // 화면에서 정보를 획득하여 서버쪽으로 예측을 요청하기 위한 데이터를 저장합니다.
                // 화면 조작을 할필요 없다 여기서는 
                removeAllchild(shoesObject)
                // 서버로 예측을 보내기 위한 기본 정보 저장
                chrome.storage.sync.set(
                shoesObject, async () => {
                    let temp = await check_cmd(shoesObject)
                    console.log('---------- 저장된 오브젝트 ----------')
                    console.log(temp)
                    console.log('검색어 등록 완료')
                    // 반복 타이머 종료
                    clearInterval(tmp)
                });
                // background.js 로 메세지와 데이터 전송  
                chrome.runtime.sendMessage({
                    Brand : shoesObject.Brand,
                    ReleaseDate : shoesObject.ReleaseDate,
                    Woman : shoesObject["(W)"],
                    ReleasePrice : shoesObject.ReleasePrice,
                    Collab : shoesObject.Collab,
                    ImageURL : shoesObject.ImageURL,                
                },
                    function(response) {
                        // callback
                        console.log(response)
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
