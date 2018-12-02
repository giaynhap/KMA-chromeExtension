var protectBlock = [];
var protectCoint = [];
var msgNotic={};
var filterReplace={
	"$script":"*.js",
	"$third-party":"?*",
	"$popup":"*",
	"$subdocument":"*",
	"$image":"*.*",
	"$xmlhttprequest":"*",
	"$object":"*"
};
list_block = ["an.facebook.com/(.*?)","(.*?)\\.mgid\\.com(.*?)","googlesyndication\\.com(.*?)","(.*?)cpmstar\\.com(.*?)","skin/(.*?)/js/fuck\\.adblock\\.js","gg\\.gg/(.*?)","googleads.g.(.*?)","googleadservices.com/pagead/(.*?)"];
function makeRegexp(str)
{
	str =str.replace(/\\/g, '\\\\');
	str =str.replace(/\./g, '\\.');
	str = str.replace(/\[/g, '\\[');
	str = str.replace(/\^/g, '');
	str = str.replace(/\|/g, '');
	return str;
}



 

request("https://pastebin.com/raw/8Lh04TnS",function(text){
	var json = JSON.parse(text);
	for (var k in json)
	{
	 
		protectBlock.push(json[k].domain);
	}

})
request("http://abpvn.com/filter/abpvn-Ga44a6.txt",function(text){
	compileFilter(text);

})
request("https://pastebin.com/raw/1janahA8",function(text){
	compileFilter(text);

})


request("https://pastebin.com/raw/54vEvNyD",function(text){
	var json = JSON.parse(text);
	for (var k in json)
	{
	 
		protectCoint.push(json[k]);
	}
		chrome.webRequest.onBeforeRequest.addListener( block_coin, {urls: protectCoint},["blocking", "requestBody"]);

})


function request(url,callback)
{
	console.log("request")
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	 	if(callback!=null)	callback(xhttp.responseText);
	}
	};

	xhttp.open("GET", url, true);
	xhttp.send();
}
function block_coin(info)
{
	if (isProtect)
	{
		if (msgNotic[info.tabID] ==1) return;
		var m =chrome.extension.getURL("icon.png");;
		console.log("protectCoint");
		msgNotic[info.tabID] = 1
		
		 chrome.notifications.create(null, {
                    type: "basic",
                  	type: "basic",
                    iconUrl: m,
                    appIconMaskUrl: m,
                    title: getLang("notic_danger_title"),
                    message: (getLang("notic_danger_content")).format(info.url)
        }) 
	return {cancel:true};
	}
}
function block(info)
{
	
 
	 //	console.log({"type":info.type,url:info.url});	
 

/*
for (var k in list_block)
{
	str = list_block[k];
	var re = new RegExp(str);

	var test = re.test(info.url);

	if (test)
	{
		console.log("block "+str)
	return {cancel:true};
	}
}
*/
if (isProtect)
{
	if (lstPageBlock!=null)
	{
		for (var k in lstPageBlock)
		{
			if (info.url==lstPageBlock[k])
			{
				return  {redirectUrl: chrome.runtime.getURL("font-end/blocked.html")};
			}
		}
	}
	if (protectBlock!=null)
	{
		for (var k in protectBlock)
		{
			if (info.url.indexOf(protectBlock[k])>0)
			{
				lstPageBlock[info.tabId] = info.url;
				return  {redirectUrl: chrome.runtime.getURL("font-end/blocked.html")};
			}
		}
	}
}
if (!isBlockAds)  return ;
var re = new RegExp(strBlock);

	var test = re.test(info.url);

	if (test)
	{
		 
	return {cancel:true};
	}

return ;
}

function compileFilter(str)
{
	lsStr = str.split("\n");
	for (var k in lsStr)
	{
			lineAnalysis(lsStr[k]);
	}
	strBlock = "";
	for (var k in list_block)
		if (strBlock.length <1)
			strBlock+=list_block[k]
		else
			strBlock+="|"+list_block[k]

	chrome.webRequest.onBeforeRequest.addListener( block, {urls: ["<all_urls>"]},["blocking", "requestBody"]);
}



function lineAnalysis(str){
	if(str.startsWith("[")||str.startsWith("!")) return ;
	if(str.startsWith("/")){
		urlHTMLAnalysis(str);
		return;
	}
 	else if(str.startsWith("||")){
		urlBlockAnalysis(str);
		return;
	}
	else if (str.startsWith("@@"))
	{
		WhiteListAnalysis(str);
		return;
	}
	else 
	{
		elementBlockAnalysis(str);
	}

}
function urlHTMLAnalysis(str)
{

}

function urlBlockAnalysis(str)
{
str= str.substr(2);
str=removeAfterTAG(removeAfterTAG(str,","),"$domain")
str = makeRegexp(doReplaceFilter(str));
str = str.replace(/\*/g, '(.*?)');
 list_block.push(str)

}

function doReplaceFilter(str)
{
	for (var k in filterReplace)
	{
		str = str.replace(k,filterReplace[k]);
	}
	return str;
}
function removeAfterTAG(str,tag)
{
str = str.replace(/\^/g, '');
start = str.indexOf(tag);
if (start>0)
str = str.substr(0,start);
return str
}

function WhiteListAnalysis(str)
{

}
function elementBlockAnalysis(str)
{

}