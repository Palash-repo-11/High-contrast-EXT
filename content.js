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
const getDomain = () => {
    let url = new URL(window.location.href)
    return url.hostname
}
const applyInvert = () => {
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body.style.backgroundColor = 'black';
};

const removeInvert = () => {
    document.documentElement.style.filter = '';
    document.body.style.backgroundColor = '';
};

const toggleInvert = async () => {
    let selectedDomains = await getFromStorage('selectedDomain');
    const currentDomain = getDomain();

    if (selectedDomains.includes(currentDomain)) {
        console.log('sdjkhkj')
        applyInvert();
    } else {
        removeInvert();
    }
};
toggleInvert()
chrome.runtime.onMessage.addListener((message, sender) => {
    console.log('slnkbkjgh')
    if (message.msg == 'APPLY_CONTRAST') toggleInvert()


})