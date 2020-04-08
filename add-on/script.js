var url;

document.getElementById('submit').addEventListener('click', function(){

});

  
//Title handle response

function urlHandleResponse(message){
  url = String(message.response);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

url = browser.runtime.sendMessage({
    requesting : "url"
});
url.then(urlHandleResponse, handleError);







//scraping section

browser.runtime.onMessage.addListener(function(request, sender) {
    
    if (request.action == "getSource") {
      var doc = new DOMParser().parseFromString(request.source, "text/html");

      let urlSplit = url.split('/');

      // nature block
      if( urlSplit[2] == 'www.nature.com' &&  urlSplit[3] == 'articles') {
          //for getting multiple keywords
          var elements = doc.getElementsByName('dc.subject');
          var keys = '';
          for(var i=0; i<elements.length; i++) {
              keys += elements[i].content + ", ";
          }
          if(doc.title != null) {
            document.querySelector('#title').value = doc.title;
            removeAttr();
          }                     

          if(doc.querySelector('meta[name="DOI"]') != null)
            document.querySelector('#doi').value = doc.querySelector('meta[name="DOI"]').content;

          if(doc.querySelector('meta[name="dc.creator"]') != null)
            document.querySelector('#authors').value = doc.querySelector('meta[name="dc.creator"]').content;

          if(doc.querySelector('meta[name="dc.description"]') != null)
            document.querySelector('#abstract').value = doc.querySelector('meta[name="dc.description"]').content;
          
          if(keys != null)
            document.querySelector('#keywords').value = keys;

          if(doc.querySelector('meta[name="dc.publisher"]') != null)
            document.querySelector('#journal_name').value = doc.querySelector('meta[name="dc.publisher"]').content;

          if(doc.querySelector('span[itemprop="issn"]').innerText != '')
            document.querySelector('#journal_ISSN').value = doc.querySelector('span[itemprop="issn"]').innerText;

          if(doc.querySelector('meta[property="og:url"]') != null)
            document.querySelector('#url').value = doc.querySelector('meta[property="og:url"]').content;
          
          message.innerText = ''

         }
      }
  });
  
  function onWindowLoad() {
  
    var message = document.querySelector('#message');
  
    browser.tabs.executeScript(null, {
      file: "meta.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (browser.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + browser.runtime.lastError.message;
      }
    });
  
  }
  
  window.onload = onWindowLoad;

  //Function to remove readonly attribute

  function removeAttr(){
    document.querySelector('#title').removeAttribute('readonly');
    document.querySelector('#doi').removeAttribute('readonly');
    document.querySelector('#authors').removeAttribute('readonly');
    document.querySelector('#abstract').removeAttribute('readonly');
    document.querySelector('#keywords').removeAttribute('readonly');
    document.querySelector('#journal_name').removeAttribute('readonly');
    document.querySelector('#journal_ISSN').removeAttribute('readonly');
    document.querySelector('#url').removeAttribute('readonly');
  }


