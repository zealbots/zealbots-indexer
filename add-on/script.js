var title,url;
var urlBox;
urlBox = document.getElementById('url');

function handleResponse(message){

   url = String(message.response);
   let urlSplit = url.split('/');
   if( urlSplit[2] == 'www.nature.com' )
   {
       if(urlSplit[3] == 'articles'){
           if(urlSplit[4] != '')
                urlBox.value = url;
       }
   }

}
function handleError(error) {
    console.log(`Error: ${error}`);
  }

document.getElementById('submit').addEventListener('click', function(){
    
    url = browser.runtime.sendMessage({
        requesting : "url"
    });
    
    url.then(handleResponse, handleError);
});

function getMeta(doc, metaName) {
    const metas = doc.getElementsByTagName('meta');
  
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }
  
    return 'erroe';
  }



//scraping section
browser.runtime.onMessage.addListener(function(request, sender) {
    
    if (request.action == "getSource") {
      
      var doc = new DOMParser().parseFromString(request.source, "text/html");

      //for getting multiple keywords
      var elements = doc.getElementsByName('dc.subject');
      var keys = '';
      for(var i=0; i<elements.length; i++) {
          keys += elements[i].content + ", ";
      }
      
      document.querySelector('#title').value = doc.title;
      document.querySelector('#doi').value = doc.querySelector('meta[name="DOI"]').content;
      document.querySelector('#authors').value = doc.querySelector('meta[name="dc.creator"]').content;
      document.querySelector('#abstract').value = doc.querySelector('meta[name="dc.description"]').content;
      document.querySelector('#keywords').value = keys;
      document.querySelector('#journal_name').value = doc.querySelector('meta[name="dc.publisher"]').content;
      document.querySelector('#journal_ISSN').value = doc.querySelector('span[itemprop="issn"]').innerText;
      message.innerText = ''
    }
  });
  
  function onWindowLoad() {
  
    var message = document.querySelector('#message');
  
    browser.tabs.executeScript(null, {
      file: "cs.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (browser.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + browser.runtime.lastError.message;
      }
    });
  
  }
  
  window.onload = onWindowLoad;