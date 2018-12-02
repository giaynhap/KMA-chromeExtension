var FacebookVideo ={
	isFacebook()
	{
		  var re = /(.*?).facebook.com(.*?)[post|video]/
		  return re.test(location.href);
	},
	findSDVideo()
	{
		if (!this.isFacebook())  return;
		var html = document.body.innerHTML;
		var re = /sd_src:\"(.*?)\"/;
		match = html.match(re);
		if (match==null) return;
		if (match.length<2) return null
			else return match[1];
	}
	,
	findHDVideo()
	{
		if (!this.isFacebook())  return;
		var html = document.body.innerHTML;
		var re = /hd_src:\"(.*?)\"/;
		match = html.match(re);
		if (match==null) return;
		if (match.length<2) return null
		else return match[1];
	},findVideoTAG()
	{

		videotag =document.getElementsByTagName("video")[0];
		if (videotag==null) return;
 		var sdVideo =FacebookVideo.findSDVideo();
 		var hdVideo =FacebookVideo.findHDVideo();
 		if (hdVideo==null && sdVideo == null) return;
 		var bodyCode = ""
 		if (hdVideo!=null) bodyCode+='<a href="'+hdVideo+'" download target="_blank"><div class=" _4jy0 _4jy3 _4jy1" style="margin:2px;display: inline-block;cursor: pointer;">HD video</div></a>'
 		if (sdVideo!=null) bodyCode+='<a href="'+sdVideo+'" download target="_blank"><div class=" _4jy0 _4jy3 _4jy1" style="margin:2px;display: inline-block;cursor: pointer;">SD video</div></a>'


		var code= '<div style="background-color: black;padding: 10px;color: white">\
					<label style="color:white">Download:</label>'+bodyCode+'</div>';
		 videotag.parentNode.insertAdjacentHTML( 'beforebegin',code);
		 return true;
	}

}

OrtherFilmPage={
	hasDownload:false
	,
	findVideoTag:function()
	{
		current = this;
		videotag =document.getElementsByTagName("video");
		for (var k in videotag)
		{
			video_tag = videotag[k];
			 
			 
			this.checkIsVideoLink(video_tag,function(success,video){
			 
 					if (video==null) return;
 					if (success.indexOf("video")<0) return;
 					var bodycode = '<a  id="downloadui" download target="_blank" style="color:white;text-decoration: none;" href="'+video.src+'">Download</a>'
 					var top =getCoords(video).top;
 					var left =getCoords(video).left;
 					var imageURL = chrome.runtime.getURL("font-end/image/download.png");
					var code= '<div  id="downloadui2" style=";border-radius: 5px;position: absolute;top:'+top+'px;left:'+left+'px; z-index: 100;;background-color: #26a550;padding: 10px;color: white">\
					 <img src="'+imageURL+'" width="16px">'+bodycode+'</div>';
					
					 document.body.insertAdjacentHTML( 'beforebegin',code);
					 downloadui = document.getElementById("downloadui2");
					 downloadui.addEventListener("mouseover", function(){
					 	 
					 	document.getElementById("downloadui").style.display="inline-block"
					 });
					  downloadui.addEventListener("mouseout", function(){
					 	 
					 	document.getElementById("downloadui").style.display="none"
					 });
					  video.addEventListener("mouseover", function(){
					 		downloadui = document.getElementById("downloadui");
					 	downloadui.style.display="inline-block"
					 });
				 	video.addEventListener("mouseout",function(){
					 
					 	downloadui.style.display="none"
					 });
				 	current.hasDownload = true;
			});
		}

	},
	checkIsVideoLink:function(video_tag,CallBack){
		if (video_tag.src==null||video_tag.src.startWith!=null||video_tag.src.indexOf("blob:")>0||video_tag.src.indexOf("blank.mp4")>0||video_tag.src.indexOf("/1.mp4")>0||video_tag.src.indexOf(".php")>0) return; 
			console.log("video "+video_tag.src)
			if (CallBack!=null ) CallBack("video",video_tag)
			return;
			try{
		var xhttp = new XMLHttpRequest();
			xhttp.open('HEAD', video_tag.src);
			xhttp.onreadystatechange = function () {
			    if (this.readyState == this.DONE) {
			      	if (this.status==200)
			        var type= this.getResponseHeader("Content-Type");
			   		 console.log(type+"  "+video_tag.src)
			    	if (CallBack!=null ) CallBack(type,video_tag)
			    }
			};
			xhttp.send();
		}catch(e){

		}
	},



}

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

if (!FacebookVideo.findVideoTAG())
{
	 /*
var m = 0;
if (location.href.indexOf("youtube.com")<0&&location.href.indexOf("facebook.com")<0)
var interval = setInterval(function(){
	OrtherFilmPage.findVideoTag()
 
	m++;

	if (OrtherFilmPage.hasDownload||m>20) 
		clearInterval(interval);
},3000)
*/
}



var ImageTag=function(){


}
ImageTag.prototype = {
	makeStyle:function(){
		return [
		  ['.gn-btn-rotate'
		    ['top', '0px'],
		    ['background-color', 'green', true],
		    ['position', 'absolute' ] ,
		    ['z-index','999999'],
		    ['display','inline-block']
		  ] 
		]
	},
	findTag:function()
	{
				var imgTag = document.body.querySelectorAll("img");
				var x=0;
				Array.from(imgTag).forEach(function(e){
					x++;
					var width = e.offsetWidth;
					var height = e.offsetHeight;
					var rect = e.getBoundingClientRect();
					if (e.getAttribute("gnset") == 'true') return;
					e.setAttribute("gnset", "true")
					e.setAttribute("rotate", "0")

					if (width>100&&height>100)
					{
							console.log(width+"  "+height)

						code="<pan id = 'element-"+x+"' class='gn-btn-rotate'   style='background-image:url(http://www.free-icons-download.net/images/rotate-icon-32005.png);left:"+rect.left+"px;top:"+rect.top+"px;opacity:0;position:absolute;z-index:9999999;width:30px;height:30px;color:white;background-size:100% 100%'/></pan>"
						e.insertAdjacentHTML( 'afterend',code);
						e.addEventListener("mouseover", function(){
							var e=	document.getElementById(this.data);

								e.style.opacity = "1";
						}.bind({elm:e,data:'element-'+x}));


						e.addEventListener("mouseleave", function(){
							var e=	document.getElementById(this.data);

								e.style.opacity = "0";
						}.bind({elm:e,data:'element-'+x}));

						e.addEventListener("resize", function(){

							var rect = this.getBoundingClientRect();
							this.rtn.style.top = rect.top;
							this.rtn.style.left = rect.left;
						});

						var x=	document.getElementById('element-'+x);

						x.addEventListener("mouseover", function(){
							 
								this.style.opacity = "1";
						}.bind(x));
						x.par = e
						x.addEventListener("click", function(){
							 
							 	rotate = this.par.getAttribute("rotate") 
							 	rotate = parseInt(rotate)+90;
							 	this.par.setAttribute("rotate",rotate)
							 
								this.par.style.transform= 'rotate('+rotate+'deg)';

						}.bind(x));
						e.rtn = x;



					}
				})
	},
	addStyle:function(rules){

		  var styleEl = document.createElement('style'), styleSheet;

				  document.head.appendChild(styleEl);


				  styleSheet = styleEl.sheet;

				  for (var i = 0, rl = rules.length; i < rl; i++) {
				    var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';

				    if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
				      rule = rule[1];
				      j = 0;
				    }

				    for (var pl = rule.length; j < pl; j++) {
				      var prop = rule[j];
				      propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
				    }


				    styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
				  }

	}

	


}

/*
try{
	 
function removeClass(classx){
	console.log("."+classx)
		var btn = document.querySelectorAll("."+classx);
		btn.forEach((elm)=>{
			console.log(elm);
			elm.classList.remove(classx);
			elm.style.display="block"
		}) 
				console.log(btn)
}
removeClass("onp-locker-call");
	
}catch(e)
{
	 
}

*/

try{
imageScr = new ImageTag();

imageScr.addStyle(imageScr.makeStyle());
setInterval(function(){
imageScr.findTag();
},1000)

}catch(e)
{
	console.log(e);
}


// unsafelinkz
