'use strict';
chrome.runtime.onInstalled.addListener(async () => {
  console.log(`백그라운드`)
});

let SEARCH_KEY = "CHECK"; // 특정 키를 사용하는 것이지 뭔가 값을 받아 오는것이 아님
chrome.runtime.onMessage.addListener( async (request, sender, sendResponse) => {
    sendResponse('content-script에서 데이터를 받았다잉');
    return true
  }
);
let RESPONSE_KEY = 'PREDICT_VALUE'

function isEmptyObj(obj) {
  if (obj.constructor === Object
    && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
}
function check_cmd(key) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get(key, data => {
      resolve(data)
    })
  });
}
function update_cmd(key_value) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.set(key_value, () => {
      resolve()
    })
  });
}
function remove_cmd(key_value) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.remove(key_value, () => {
      resolve()
    })
  });
}

setInterval(async () => {
  // SEARCH_KEY라는 이름으로 뭔가 저장되었냐?
  console.log( 'SEARCH_KEY', SEARCH_KEY)
  let app = await check_cmd(SEARCH_KEY)
  // 비워있지 않다면
  if ( !isEmptyObj(app)) {
    // 키워드 삭제 -> 그래야 통신이 1회만 작동함
    await remove_cmd(SEARCH_KEY)
    //chrome.storage.sync.remove(SEARCH_KEY, () => {})
    // 통신 => 여기서 서버쪽으로 딥러닝 예측을 수행할 데이터를 보내면 됩니다.
    //console.log(SEARCH_KEY);
    //console.log(JSON.stringify(SEARCH_KEY));
    console.log(1)
    fetch('http://127.0.0.1:5000/test', {
      method: 'POST', // 또는 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(app),
    })
    .then((response) => response.json())
    .then( async (data) => {
      console.log(2)
      console.log('성공:', data);
      await update_cmd({ 'PREDICT_VALUE': data.message })
    })
    .catch((error) => {
      console.log(3)
      console.error('실패:', error);
    })
    .finally( async ()=>{
      // 무조건 삭제
      console.log(4) 
      
    });
    
  }
  else {
    // 저장된 내용이 없어서 아무것도 않한다
    console.log('검색어 없음')
  }
}, 1000)
