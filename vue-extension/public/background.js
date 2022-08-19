'use strict';
chrome.runtime.onInstalled.addListener(async () => {
  console.log(`백그라운드`)
});

let SEARCH_KEY;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // work!
    sendResponse('background.js에서 받았습니다.')
    SEARCH_KEY = request
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
  let app = await check_cmd(SEARCH_KEY)
  // 비워있지 않다면
  if (!isEmptyObj(app)) {
    // 통신 => 여기서 서버쪽으로 딥러닝 예측을 수행할 데이터를 보내면 됩니다.
    /*
      // 응답 예시 : json
      {message: 'Welcome to Thunder Client', about: 'Thunder Client is a hand-crafted lightweight Rest API Client extension for VS Code.', createdBy: 'Ranga Vadhineni', github: 'github.com/rangav/thunder-client-support', twitter: 'twitter.com/thunder_client', …}
    */
    console.log(JSON.stringify(SEARCH_KEY));
    fetch('http://127.0.0.1:5000/', {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(SEARCH_KEY)
    })
    .then((response) => response.json())
    .then(async (data) => {
      // 예측 결과를 저장합니다.
      console.log(data)
      console.log({ 'PREDICT_VALUE': data.message })
      await update_cmd({ 'PREDICT_VALUE': data.message })
    });
    // 키워드 삭제 -> 그래야 통신이 1회만 작동함
    await remove_cmd(SEARCH_KEY)
  }
  else {
    // 저장된 내용이 없어서 아무것도 않한다
    console.log( '검색어 없음')
  }
}, 1000)