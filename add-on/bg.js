var title = "ZealBots-Indexer";
var urlAddress = ["www.nature.com"];
var taburl;
function protocolIsApplicable(url) {
  var array =  url.split('/');
  var a = array[2];
  return urlAddress.includes(a);
}
function initializeBrowserAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    taburl = tab.url;
    browser.pageAction.setIcon({tabId: tab.id, path: "logo.png"});
    browser.pageAction.setTitle({tabId: tab.id, title: title});
    browser.pageAction.show(tab.id);
    
  }
}

function initializer(tabs){
    for (let tab of tabs) {
            initializeBrowserAction(tab);
          }
}

var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then(initializer);

function handleUpdated(tabId, changeInfo, tabInfo) {
    initializeBrowserAction(tabInfo);
}

browser.tabs.onUpdated.addListener(handleUpdated);
