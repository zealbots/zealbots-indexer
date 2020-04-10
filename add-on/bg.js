var title = "ZealBots-Indexer";
var urlAddress = ["nature", "biomedcentral", "wiley"];
var taburl;
function protocolIsApplicable(url) {
  var array =  url.split('/')[2].split('.')[1];
  return urlAddress.includes(array);
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

// sending to popup
function handleMessage(request, sender, sendResponse){

  if(request.requesting == "url"){      
      sendResponse({response :taburl});

  }

}
browser.runtime.onMessage.addListener(handleMessage);