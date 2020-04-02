var title,doi,url;

function handleResponse(message){
    alert(message.response);
}
function handleError(error) {
    console.log(`Error: ${error}`);
  }

document.getElementById('notifiyMe').addEventListener('click', function(){
    
    url = browser.runtime.sendMessage({
        requesting : "url"
    });
    
    url.then(handleResponse, handleError);
});