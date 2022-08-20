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
