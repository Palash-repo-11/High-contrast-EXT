const setToStorage = async (key, value) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ [key]: value }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        });
    });
};

const getFromStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key]);
            }
        });
    });
};

function notify(msg) {
    let logo = chrome.runtime.getURL('./icons/Icon.png')
    chrome.notifications.create({
        type: "basic",
        iconUrl: logo,
        title: "High Contrast",
        message: msg,
    });
}

chrome.runtime.onInstalled.addListener(async function (details) {
    if (details.reason === "install") {
        notify("Use this extension to apply high contrast themes to webpages for improved readability and accessibility. ")
    }
    await setToStorage('selectedDomain', [])

});