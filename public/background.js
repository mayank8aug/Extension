// import { showNotification } from './../src/helper';
chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    getOrderStatus();
    getFlashSale();
    getAllTabsUrl();
    // create alarm after extension is installed / upgraded
    chrome.alarms.create('getOrderStatus', {
        periodInMinutes: 1
    });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    getOrderStatus();
});
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    var tabURL = tabs.length && tabs[0].url;
    console.log(tabURL);
});
chrome.tabs.getCurrent(tab => {
    console.log(tab);
});
chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});
let itemStatus = {};

function getOrderStatus() {
    const sessionToken = 'c5d4056f-ee0b-405a-8939-d8c1d937658d';
    fetch(`https://api.lenskart.com/v3/orders?page=0&page-size=1`, {
        headers: {
            'x-api-client': 'desktop',
            'x-session-token': sessionToken
        }
    })
        .then(resp => {
            resp.json().then(res => {
                const orderData = res.result && res.result.orders;
                const { items } = orderData[0];
                const statusUpdated = [];
                let item;
                let status;
                for (let i = 0, len = items.length; i < len; i++) {
                    item = items[i];
                    status = item.status.status.replace('_', ' ');
                    if (itemStatus[item.id] && itemStatus[item.id] !== status) {
                        statusUpdated.push({
                            title: `Item Id: ${item.id}`,
                            message: `Current status: ${status}`
                        });
                        itemStatus[item.id] = status;
                    }
                }
                if (statusUpdated.length) {
                    options = {
                        type: "list",
                        title: "Your Order Status",
                        message: "Your order has been updated",
                        items: statusUpdated,
                        iconUrl: "/icon.png"
                    };
                    chrome.notifications.create(id = '', options, function (data) {
                        console.log(data);
                    });
                }
            })
        })
}
function getFlashSale() {
    // console.log('installed flash');
    const socket = io.connect('http://192.168.4.86:9090');
    socket.on("connect", () => {
        // socket.emit('storeClientInfo', { customId: 'mayank' });
    });
    // socket.on("FromAPI", data => console.log(data));
    socket.on('flashActive', data => {
        chrome.notifications.create('', {
            type: "basic",
            title: "Flash Sale",
            message: "Hurry!! Flash Sale is Active Now",
            iconUrl: "/icon.png"

        }, function (data) {
            console.log(data);
        });
    });
}
function getAllTabsUrl() {
    chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                console.log(tab.url);
            });
        });
    });

    chrome.tabs.getSelected(null, function (tab) {
        tabUrl = tab.url;
        console.log(`current: ${tabUrl}`);
    });

    chrome.tabs.onUpdated.addListener(function(params) {
    });

    chrome.tabs.onCreated.addListener(function(params) {
    });
    
    chrome.tabs.onActivated.addListener(function(params) {
    });
}