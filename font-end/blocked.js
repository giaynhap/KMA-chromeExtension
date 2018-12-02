 chrome.runtime.sendMessage({cmd: "get_block_site",id:""},setDOMInfo);


function setDOMInfo(info)
{
	
	$(".domain").html("Phát hiện: "+info);
}