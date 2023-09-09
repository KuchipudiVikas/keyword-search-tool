console.log("It's coming from background")

const  getPageType = (url) =>{
  console.log(url)
  if(url.includes('google')){
      return 'google'
  }else if(url.includes('etsy')){
      return 'etsy'
}
}

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
  function extractBaseUrl(url) {
    var components = url.split("?");
    return components[0];
  }
    let baseUrl = extractBaseUrl(sender.tab.url);
    let page = getPageType(baseUrl);
    if(request.query === 'getTabUrl'){
      sendResponse(page);
    }
;
});
 


