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
      var zeal_impactFactor = "";


      // nature block
      if( urlSplit[2].split('.')[1] == 'nature' &&  urlSplit[3] == 'articles') {
          //for getting multiple keywords        
          var key_elements = doc.getElementsByName('dc.subject');
          var keys = '';
          for(var i=0; i<key_elements.length; i++) {
              keys += key_elements[i].content + ", ";
          }

          //for getting multiple authors        
          var auth_elements = doc.getElementsByName('dc.creator');
          var authors = '';
          for(var i=0; i<auth_elements.length; i++) {
              authors += auth_elements[i].content + ", ";
          }

          if(doc.title != null) {
            zeal_title = doc.title;
            removeAttr();
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
          var keys = '';
          for(var i=0; i<key_elements.length; i++) {
              keys += key_elements[i].content + ", ";
          }

          // //for getting multiple authors        
          var auth_elements = doc.getElementsByName('dc.creator');
          var authors = '';
          for(var i=0; i<auth_elements.length; i++) {
              authors += auth_elements[i].content + ", ";
          }

          if(doc.querySelector('meta[name="dc.title"]') != null)
            zeal_title = doc.querySelector('meta[name="dc.title"]').content;
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
          var keys = '';
          for(var i=0; i<key_elements.length; i++) {
              keys += key_elements[i].content + ", ";
          }
          //for getting multiple authors   
          var auth_elements = doc.getElementsByName('citation_author');
          var authors = '';
          for(var i=0; i<auth_elements.length; i++) {
              authors += auth_elements[i].content + ", ";
          }

          if(doc.querySelector('meta[property="og:title"]') != null)
            zeal_title = doc.querySelector('meta[property="og:title"]').content;
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
        var data = {
          'pub_type' : zeal_pubType,
          'journal' : zeal_Name, 
          'access_type' : "",
          'journal_issn' : zeal_ISSN,  
          'impact_factor' : zeal_impactFactor,
          'journal_dictionary' : "",
          'doi' : zeal_DOI,
          'pmid' : "",
          'citation_details' : "",
          'pmc' : "",
          'title' : zeal_title,
          'authors' : zeal_authors, 
          'corresponding_author' : "",
          'volume' : zeal_volume,
          'issue' : zeal_issue,
          'pagenum' : zeal_pageNumber,
          'date_published' : zeal_pubDate,
          'date_received' : "" ,
          'date_accepted' : "" ,
          'abstract_text' : zeal_abstract,
          'keywords' : zeal_keywords,
          'pdf_url' : zeal_pdfLink,
          'html_url' : url
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