function checknotreal()
{
	var t = window.top.location.hostname.toLowerCase();
	return t.indexOf(".facebook.com") === -1 && t.indexOf(".messenger.com") === -1
}
 function getElement(e) {
        return null !== document.getElementById(e)
    }
function checkPhishing() {
 
	if (!checknotreal()) return false;
    if (document.forms.length > 0) {
        var e = ["skip_api_login", "enable_profile_selector", "profile_selector_ids"];
        for (var r in e)
            if (getElement(e[r])) return !0;
        if (getElement("login_form")) {
            var n = document.getElementById("login_form");
            if (null !== n.querySelector("input#email") && null !== n.querySelector("input#pass") && null !== n.querySelector("label#loginbutton")) return !0;
            if (null !== n.querySelector("input#m_login_email") && null !== n.querySelector('input[name="lsd"]')) return !0
        }
        if (null !== document.forms[0].querySelector('a[data-sigil="password-plain-text-toggle"]')) return !0;
        if (null !== document.forms[0].querySelector('input[data-sigil="login-password-field"]')) return !0;
        if (null !== document.querySelector("html#facebook") && (document.title.startsWith("Log in to Facebook") || document.title.startsWith("Đăng nhập Facebook")) && null !== document.querySelector("#email.inputtext") && null !== document.querySelector("#pass.inputtext")) return !0;
        if (getElement("pagelet_bluebar") && null !== document.querySelector("#email.inputtext") && null !== document.querySelector("#pass.inputtext")) return !0;
        var o = document.querySelector(".mobile-login-form");
        if (null !== o && null !== o.querySelector('input[name="lsd"]') && null !== o.querySelector('input[name="m_ts"]')) return !0
    }
    return !1
}
if (checkPhishing()){
	chrome.runtime.sendMessage({cmd:"block_page",type:"phishing"})
	location.reload();
}