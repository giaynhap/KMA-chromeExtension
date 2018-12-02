

var n = 0,
i = 10,
r = 100,
o = r,
c = "_no-clickjacking-",
a = 0,
l = {},
log = console.log

function removeAllByQuery(e)
{
var t = Array.from(document.querySelectorAll(e));
if (t.length>0) 
t.map(function(e) {
    e.remove()
})
}

function checkElement_pluginFBLike(e) {
return !!e.hasAttribute("src") && e.src.includes("facebook.com/plugins/like.php")
}

function checkElement_URLRedict(e) {
    if (e.hasAttribute("src")) {
        var t = decodeURIComponent(e.src);
        if (t.toLowerCase().includes("href=")) {
            var n = t.split("href=", 2);
            if (n.length > 1 && n[1].includes("&")) {
                var i = n[1].split("&", 1)[0];
                return i
            }
        }
    }
    return null
}
function RemoveTheiframe() {
    var e = document.getElementById("theiframe");
    if (e!=null  )
    {
        checkElement_pluginFBLike(e)
        checkElement_URLRedict(e)
        e.remove();
        removeAllByQuery('script[src*="likeme.js"]')
 
    } 
}
 
function detecting() {
var lstIframe = document.getElementsByTagName("iframe"),
foundLst = [];
for (var m in lstIframe)
{
    var iframe = lstIframe[m];
    try {

        var style = getComputedStyle(iframe);
        if (style && parseFloat("0" + style.opacity) < .1) {
           
            var y = iframe.id;
            if (y ==null){
                y = c + a;
                a++;
                iframe.id = y;
            }
             foundLst.push(y)
        }
    } catch (h) {
        log(h.message)
    }
}




if (foundLst.length > 0) {
    var k = "";
    for (var w in foundLst) {
        var E = foundLst[w],
            j = document.getElementById(E);
            j.remove();
    }
   
}
    if (n<i)
    {
     n++;
     o += n * r;
     setTimeout(detecting, o)
    }
    else log("stopped");

}
         
detecting();
RemoveTheiframe();   

