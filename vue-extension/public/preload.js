console.log(`프리로드`)
let SEARCH_KEY = 'KEYWORD'
let RESPONSE_KEY = 'PREDICT_VALUE'

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
function isEmptyObj(obj) {
    if (obj.constructor === Object
        && Object.keys(obj).length === 0) {
        return true;
    }

    return false;
}
// =================================================================
setInterval(async () => {
    // 여기서 결과가 저장되어 있으면 화면 처리합니다. 
    let app = await check_cmd('PREDICT_VALUE')
    if (!isEmptyObj(app)) {
        //items = document.querySelector('#account')  
        // 예측 결과를 받아서 화면 조작 처리
        items = document.querySelector('#related #items')
        if (items != null) {
            console.log("items > ", items)
            items.innerHTML = app['PREDICT_VALUE']
            await remove_cmd(['PREDICT_VALUE'])
        }
    }
}, 1000)