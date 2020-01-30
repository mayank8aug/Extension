// import { showNotification } from './../src/helper';
chrome.runtime.onInstalled.addListener(() => {
    console.log('onInstalled...');
    getOrderStatus();
    getFlashSale();
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
}, function(tabs) {
    var tabURL = tabs[0].url;
    console.log(tabURL);
});
 chrome.tabs.getCurrent(tab => {
    console.log(tab);
 });
 chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });
  });
let orderStatus = '';

function getOrderStatus() {
    const sessionToken = '82725d0d-c4c3-4e2e-89dc-c0fc5c579f5f';
    fetch(`https://api.lenskart.com/v3/orders?page=0&page-size=2`, {
            headers: {
                'x-api-client': 'desktop',
                'x-session-token': sessionToken
            }
        })
        .then(resp => {
            resp.json().then(res => {
                const orderData = res.result && res.result.orders;
                let currentOrderStatus = orderData[0] && orderData[0].trackingDetails[0] && orderData[0].trackingDetails[0].status;
                if (orderStatus !== currentOrderStatus) {
                    options = {
                        type: "basic",
                        title: "Your Order Status",
                        message: `Your order is ${currentOrderStatus}`,
                        iconUrl: "/icon.png"
                    };
                    chrome.notifications.create(id = '', options, function(data) {
                        console.log(data);
                    });
                }
                orderStatus = currentOrderStatus;
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
        
      }, function(data) {
        console.log(data);
      });
    });
}