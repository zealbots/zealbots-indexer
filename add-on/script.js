var title,doi,url;
var titleBox,doiBox,authorsBox,abstractBox,keywordsBox,nameBox,issnBox,urlBox;
titleBox = document.getElementById('title');
doiBox  = document.getElementById('doi');
authorsBox  = document.getElementById('authors');
abstractBox  = document.getElementById('abstract');
keywordsBox  = document.getElementById('keywords');
nameBox = document.getElementById('journal_name');
issnBox = document.getElementById('journal_ISSN');
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