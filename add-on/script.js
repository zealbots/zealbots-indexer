var title,doi,url;
var urlBox = document.getElementById('url');
function handleResponse(message){
   urlBox.value = String(message.response);
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