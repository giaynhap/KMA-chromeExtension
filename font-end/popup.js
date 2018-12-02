var checkbox_block_online;
var checkbox_block_ads;
var checkbox_fb_darktheme;
var checkbox_protect;
var extension_lang="vi";
function clickHandler(e) {

    chrome.runtime.sendMessage({directive: "block-online-fb",value:checkbox_block_online.checked}, function(response) {
       
    });
}
function clickHandler2(e) {

 
    chrome.runtime.sendMessage({directive: "block-ads",value:checkbox_block_ads.checked}, function(response) {
       
    });
}
function clickHandler3(e) {
 
    chrome.runtime.sendMessage({directive: "fb-darktheme",value:checkbox_fb_darktheme.checked}, function(response) {
       
    });
}

function clickHandler4(e) {

 
    chrome.runtime.sendMessage({directive: "protect",value:checkbox_protect.checked}, function(response) {
       
    });
}


function setDOMInfo(info)
{
	
	checkbox_block_online.checked= info.bock_online_facebook 
	checkbox_block_ads.checked = info.block_ads;
	checkbox_fb_darktheme.checked = info.fb_darktheme;
  checkbox_protect.checked= info.protect;

	$("#label_offfb").html(lang[extension_lang].label_offfb)
	$("#label_blockad").html(lang[extension_lang].label_blockad);
	$("#label_facebook_darktheme").html(lang[extension_lang].label_facebook_darktheme);
  $("#label_protect").html(lang[extension_lang].label_protect);
}
document.addEventListener('DOMContentLoaded', function () {
   
 chrome.runtime.sendMessage({directive: "startup",value:""},setDOMInfo);

   checkbox_block_online= document.getElementById('block-online-facebook');
   checkbox_block_ads = document.getElementById('block-ads');
   checkbox_fb_darktheme= document.getElementById('facebook-darktheme');
   checkbox_protect = document.getElementById("protect");

   checkbox_block_online.addEventListener('click', clickHandler);
      checkbox_block_ads.addEventListener('click', clickHandler2);
       checkbox_fb_darktheme.addEventListener('click', clickHandler3);
    checkbox_protect.addEventListener('click', clickHandler4);
})
 