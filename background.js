var isBlockFacebookOnline = false;
var isBlockAds= true;
var isFBDarkTheme = false;
var isProtect = true;
var extension_lang="vi";
var strBlock;
 
var lstPageBlock = {};
var list_block = ["https://www.facebook.com/ajax/mercury/change_read_status.php?*","https://edge-chat.facebook.com/pull?*&idle=*", "https://edge-chat.facebook.com/active_ping?*&state=*", "https://edge-chat.messenger.com/pull?*&idle=*", "https://edge-chat.messenger.com/active_ping?*&state=*"];
loadAllSetting();
for ( i = 0; i < 10; i++)
{
 list_block.push("https://" + i + "-edge-chat.facebook.com/pull?*&idle=*");
 list_block.push("https://" + i + "-edge-chat.facebook.com/active_ping?*&state=*");
 list_block.push("https://" + i + "-edge-chat.messenger.com/pull?*&idle=*");
 list_block.push("https://" + i + "-edge-chat.messenger.com/active_ping?*&state=*");
}
String.prototype.format = function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a){
            return args[+(a.substr(1,a.length-2))||0];
        });
};
chrome.contextMenus.create({
  id: "contentMenu",
  title: "Tools",
  contexts: ["all"]
}, onCreated);

chrome.contextMenus.create({
  id: "findmalware",
  title: "Find Malware",
  parentId:"contentMenu",
  contexts: ["all"]
}, onCreated);


function onCreated(n) {
  if (chrome.runtime.lastError) {
    console.log(`Error: ${chrome.runtime.lastError}`);
  }
}

function block(requestDetails) {
 if (isBlockFacebookOnline)
 {
   console.log("Giay Nhap:block-url")
   return {cancel: true};
 }
 
}
chrome.webRequest.onBeforeRequest.addListener( block, {urls:  list_block, types: ["xmlhttprequest"]},["blocking", "requestBody"]);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

   if (request.directive!=null)
   {
    switch (request.directive) {
      case "block-online-fb":
      isBlockFacebookOnline = request.value;
      break;
      case "block-ads":
      isBlockAds =request.value;
      break;
      case "fb-darktheme":
      isFBDarkTheme =request.value;
      break;
      case "protect":
      isProtect=request.value;
      break;
      case "startup":
      sendResponse({bock_online_facebook:isBlockFacebookOnline,block_ads:isBlockAds,fb_darktheme:isFBDarkTheme,protect:isProtect});
      break;
    }

    chrome.storage.sync.set({ "save_setting":{protect:isProtect,bock_online_facebook:isBlockFacebookOnline,block_ads:isBlockAds,fb_darktheme:isFBDarkTheme} });
  }
  else{
   switch (request.cmd) {
    case "block_page":
    do_block_page(request,sender)
    break;
    case "get_block_site":
    sendResponse(lstPageBlock[sender.tab.id]);

    break;
  }
}
}
);

function do_block_page(type,sender)
{

  lstPageBlock[sender.tab.id]=sender.url;
  // chrome.tabs.create({ url: chrome.extension.getURL('font-end/blocked.html') });
   // chrome.tabs.executeScript(sender.tab.id, {code:"location.href='"+chrome.extension.getURL('font-end/blocked.html')+"'"}, function(){});
 }
 function loadAllSetting()
 {
  chrome.storage.sync.get('save_setting', function(data) {
    console.log(data);
    isBlockFacebookOnline = data.save_setting.bock_online_facebook;
    isBlockAds =  data.save_setting.block_ads;
    isFBDarkTheme =  data.save_setting.fb_darktheme;
    protect = data.save_setting.protect
  });
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
 if (info.menuItemId == "findmalware") {

   chrome.tabs.executeScript(tab.id, {file:"font-end/protect_script/facebookphishing.js"}, function(){});
   chrome.tabs.executeScript(tab.id, {file:"font-end/protect_script/clickjacking.js"}, function(){});

 }  
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (!isFBDarkTheme) return;


   chrome.tabs.executeScript(tabId, {code:`
    setTimeout(function(){console.log("helo")},3000)
	 
   `,}, function(){});
 
 
  if (changeInfo.status == 'loading') {



    var re = /(.*?).facebook.com(.*?)/;
    if (re.test( tab.url))
    {

     chrome.tabs.insertCSS(tab.id, { file:"font-end/style/facebook-dark-theme.css", runAt: "document_start" }, function () {

     });

   }

 }
 else
 {
   chrome.tabs.executeScript(tabId, {code:"isVip =true;"}, function(){});
 }
})
