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
    chrome.pageAction.setIcon({tabId: tab.id, path: "logo.png"});
    chrome.pageAction.setTitle({tabId: tab.id, title: title});
    chrome.pageAction.show(tab.id);
  }
}


chrome.windows.getAll({populate:true},function(windows){
  windows.forEach(function(window){
    window.tabs.forEach(function(tab){
      initializeBrowserAction(tab);
      });
    });
  });


function handleUpdated(tabId, changeInfo, tabInfo) {
    initializeBrowserAction(tabInfo);
}


chrome.tabs.onUpdated.addListener(handleUpdated);

// sending to popup


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse){

    if(request.requesting == "url"){      
        sendResponse({response :taburl});
  
    }
  }  
);