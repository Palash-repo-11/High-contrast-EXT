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


const getDomain = (url) => new URL(url).hostname;

document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const domain = getDomain(tab.url);
    document.getElementById('domain-name').textContent = domain;

    const selectedDomain = await getFromStorage('selectedDomain');
    let selected = selectedDomain || [];
    console.log(selected)
    const isInverted = selected.includes(domain);
    console.log(isInverted, "skfgjhg")
    document.getElementById('toggle-btn').textContent = isInverted ? 'Remove Inversion' : 'Apply Inversion';

    document.getElementById('toggle-btn').onclick = async () => {
        if (isInverted) {
            selected = selected.filter(d => d !== domain);
        } else {
            selected.push(domain);
        }

        await setToStorage('selectedDomain', selected);
        await chrome.tabs.sendMessage(tab.id, { msg: 'APPLY_CONTRAST' });
        window.close();
    };
});
