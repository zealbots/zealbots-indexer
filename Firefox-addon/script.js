var url;
var data;

//Title handle response
function reqListener () {
values_return = JSON.parse(this.responseText);
collection_count = values_return.count;
collection_names = "";
var ele = document.getElementById('sel');
if(collection_count == 0){
  '<option value="' + collection_count + '">' + 'Create New collection' + '</option>';
}

else{
  for (var i = 0; i < collection_count; i++) {
    // POPULATE SELECT ELEMENT WITH JSON.
    ele.innerHTML = ele.innerHTML +
        '<option value="' + [values_return.data[i].id, values_return.data[i].name, "Aswin"]+ '">' + values_return.data[i].name + '</option>';
    }  
}
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://api.zealbots.com/api/v1/citeman/?Key=9406e1c9d5bbaf5e75612f64cdffd8b3f56e1015");
oReq.send();


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

      var zeal_title = "" ;// article title 
      var zeal_DOI = "";
      var zeal_authors = "";
      var zeal_abstract = "";
      var zeal_keywords = "";
      var zeal_Name = "" ;// journal name actually
      var zeal_ISSN = "";
      var zeal_volume = "";
      var zeal_issue = "";
      var zeal_pubDate = "";
      var zeal_pageNumber = "";
      var zeal_pdfLink = "";
      var zeal_pubType = "";


      // nature block
      if( urlSplit[2].split('.')[1] == 'nature' &&  urlSplit[3] == 'articles') {
          //for getting multiple keywords        
          var key_elements = doc.getElementsByName('dc.subject');
          var keys = [];
          for(var i=0; i<key_elements.length; i++) {
              keys.push(key_elements[i].content);
          }

          //for getting multiple authors        
          var auth_elements = doc.getElementsByName('dc.creator');
          var authors = [];
          for(var i=0; i<auth_elements.length; i++) {
              authors.push(auth_elements[i].content);
          }

          if(doc.querySelector('meta[name="dc.title"]') != null)
          {
            removeAttr();
            zeal_title = doc.querySelector('meta[name="dc.title"]').content;
          }
            
            
          if(doc.querySelector('meta[name="DOI"]') != null)
            zeal_DOI = doc.querySelector('meta[name="DOI"]').content;
          if(authors != null)
            zeal_authors= authors;
          if(doc.querySelector('meta[name="dc.description"]') != null)
            zeal_abstract = doc.querySelector('meta[name="dc.description"]').content;
          if(keys != null)
            zeal_keywords = keys;
          if(doc.querySelector('meta[property="og:type"]') != null)
            zeal_pubType = doc.querySelector('meta[property="og:type"]').content;
          if(doc.querySelector('meta[name="prism.number"]') != null)
            zeal_issue = doc.querySelector('meta[name="prism.number"]').content;
          if(doc.querySelector('meta[name="prism.volume"]') != null)
            zeal_volume = doc.querySelector('meta[name="prism.volume"]').content;
          if(doc.querySelector('meta[name="prism.publicationName"]') != null)
            zeal_Name = doc.querySelector('meta[name="prism.publicationName"]').content;
          if(doc.querySelector('span[itemprop="issn"]').innerText != '')
            zeal_ISSN = doc.querySelector('span[itemprop="issn"]').innerText;
          if(doc.querySelector('meta[name="prism.publicationDate"]') != null)
            zeal_pubDate = doc.querySelector('meta[name="prism.publicationDate"]').content;  
          if(doc.querySelector('meta[name="citation_pdf_url"]') != null)
            zeal_pdfLink = doc.querySelector('meta[name="citation_pdf_url"]').content;  

         }

         //BMC block
        if( urlSplit[2].split('.')[1] == 'biomedcentral' &&  urlSplit[3] == 'articles') {

          //for getting multiple keywords        
          var key_elements = doc.getElementsByName('dc.subject');
          var keys = [];
          for(var i=0; i<key_elements.length; i++) {
              keys.push(key_elements[i].content);
          }

          // //for getting multiple authors        
          var auth_elements = doc.getElementsByName('dc.creator');
          var authors = [];
          for(var i=0; i<auth_elements.length; i++) {
              authors.push(auth_elements[i].content);
          }

          if(doc.querySelector('meta[name="dc.title"]') != null){
            removeAttr();
            zeal_title = doc.querySelector('meta[name="dc.title"]').content;
          }
            
            
          if(doc.querySelector('meta[name="DOI"]') != null)
            zeal_DOI = doc.querySelector('meta[name="DOI"]').content;
          if(authors != null)
            zeal_authors= authors;
          if(doc.querySelector('meta[name="dc.description"]') != null)
            zeal_abstract = doc.querySelector('meta[name="dc.description"]').content;
          if(keys != null)
            zeal_keywords = keys;
          if(doc.querySelector('meta[name="citation_article_type"]') != null)
            zeal_pubType = doc.querySelector('meta[name="citation_article_type"]').content;
          if(doc.querySelector('meta[name="prism.number"]') != null)
            zeal_issue = doc.querySelector('meta[name="prism.number"]').content;
          if(doc.querySelector('meta[name="prism.volume"]') != null)
            zeal_volume = doc.querySelector('meta[name="prism.volume"]').content;
          if(doc.querySelector('meta[name="prism.publicationName"]') != null)
            zeal_Name = doc.querySelector('meta[name="prism.publicationName"]').content;
          if(doc.querySelector('meta[name="prism.publicationDate"]') != null)
            zeal_pubDate = doc.querySelector('meta[name="prism.publicationDate"]').content;  
          if(doc.querySelector('meta[name="prism.issn"]') != null)
            zeal_ISSN = doc.querySelector('meta[name="prism.issn"]').content;  
          if(doc.querySelector('meta[name="citation_pdf_url"]') != null)
            zeal_pdfLink = doc.querySelector('meta[name="citation_pdf_url"]').content;  
         }

        if( urlSplit[2].split('.')[1] == 'wiley' &&  urlSplit[3] == 'doi') {
          //for getting multiple keywords 
          var key_elements = doc.getElementsByName('citation_keywords');
          var keys = [];
          for(var i=0; i<key_elements.length; i++) {
              keys.push(key_elements[i].conten);
          }
          //for getting multiple authors   
          var auth_elements = doc.getElementsByName('citation_author');
          var authors = [];
          for(var i=0; i<auth_elements.length; i++) {
              authors.push(auth_elements[i].content);
          }

          if(doc.querySelector('meta[property="og:title"]') != null){
            removeAttr();
            zeal_title = doc.querySelector('meta[property="og:title"]').content;
          }
            
          if(doc.querySelector('meta[name="citation_doi"]') != null)
            zeal_DOI = doc.querySelector('meta[name="citation_doi"]').content;
          if(authors != null)
            zeal_authors= authors;
          if(doc.querySelector('meta[name="Description"]') != null)
            zeal_abstract = doc.querySelector('meta[name="Description"]').content;
          if(keys != null)
            zeal_keywords = keys;
          if(doc.querySelector('meta[property="og:type"]') != null)
            zeal_pubType = doc.querySelector('meta[property="og:type"]').content;
          if(doc.querySelector('meta[name="citation_journal_title"]') != null)
            zeal_Name = doc.querySelector('meta[name="citation_journal_title"]').content;
          if(doc.querySelector('meta[name="citation_online_date"]') != null)
            zeal_pubDate = doc.querySelector('meta[name="citation_online_date"]').content;  
          if(doc.querySelector('meta[name="citation_issn"]') != null)
            zeal_ISSN = doc.querySelector('meta[name="citation_issn"]').content;  
          if(doc.querySelector('meta[name="citation_pdf_url"]') != null)
            zeal_pdfLink = doc.querySelector('meta[name="citation_pdf_url"]').content;  
         }
        // values to be sent API
        data = {
          // "pub_type" : zeal_pubType,
          "journal" : zeal_Name, 
          "journal_issn" : zeal_ISSN,  
          "doi" : zeal_DOI,
          "title" : zeal_title,
          "authors" : zeal_authors, 
          "volume" : zeal_volume,
          "issue" : zeal_issue,
          "pagenum" : zeal_pageNumber,
          "pub_date" : zeal_pubDate,
          "abstract" : zeal_abstract,
          "keywords" : zeal_keywords,
          "pdf_url" : zeal_pdfLink,
          "html_url" : url
        };


        // post this data to API

        // display properties
        document.querySelector('#title').value = zeal_title;
        document.querySelector('#doi').value = zeal_DOI;
        document.querySelector('#authors').value = zeal_authors;
        document.querySelector('#journal_name').value = zeal_Name;
        document.querySelector('#publish_date').value = zeal_pubDate;
        document.querySelector('#volume').value = zeal_volume;
        document.querySelector('#issue').value = zeal_issue;

        message.innerText = '';
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
    document.querySelector('#journal_name').removeAttribute('readonly');
    document.querySelector('#publish_date').removeAttribute('readonly');
    document.querySelector('#volume').removeAttribute('readonly');
    document.querySelector('#issue').removeAttribute('readonly');
}


document.getElementById('submit').addEventListener('click', function(){

    var e = document.getElementById("sel");
    var result = e.options[e.selectedIndex].value;
    var splitString = result.split(",");
    actual_data = {"id" : "36","name" : "sample_2","author" : "Aswink","category" : "Article","article" : {"title" : ";ldfk;3ldfkgdfControversialfdg cave discoveries suggest humans reached Americas much earlier than thought","doi" : "10.10383/d41586-dfg;ldkfgldfgdfg020-02190-y","journal" : "Na3turedf;lgl;dfdfgdfgkg","volume" : "103dfg","issue" : "144","pub_date":"2020-02-02","html_url" : "hfgdfgature.com/articles/d41586-020-02190-y","authors" : ["Cdfgdfgfgdfolindfdfgf Barras"],"journal_issn" : "1235-59dfgff53","pagenum" : "1as","abstract" : "ljdfgffgglkdjfgklfdgorem nu varum la antha etext","keywords" : ["sskljdfkldgf", "ksdfgdldfgfjklsdjfdfg"],"pdf_url" : "sssdfsfdfsdfklsjfskldjfslkdfgdf"}}
    actual_data = {
      "id" : splitString[0],
      "name" : splitString[1],
      "author" : splitString[1],
      "category" : "Article",
      "article" : data
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://api.zealbots.com/api/v1/citeman/update/?Key=9406e1c9d5bbaf5e75612f64cdffd8b3f56e1015', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        document.querySelector('#body').style.display = 'none';
        return_message = JSON.parse(this.responseText)
        document.querySelector('#message').innerHTML += "";
        document.querySelector('#message').innerHTML +=
        '<div><img style="width: 250px" src="thank_you_bot.png"></div> <div style="color:#196f3d"><strong> ' + return_message.message +"   In  " + actual_data.name + '</strong></div>';
        }
      }
    xhr.send(JSON.stringify(actual_data));    
  });