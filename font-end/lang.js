 lang={};
 lang["vi"] ={
	label_offfb:"Ẩn danh facebook",
	label_blockad:"Chặn quảng cáo",
	label_facebook_darktheme:"Facebook Darktheme",
	label_protect:"Bảo vệ khỏi các mối nguy hiểm",
	notic_danger_title:"Phát hiện mã độc đào tiền ảo",
	notic_danger_content:'Trang bị chèn mã độc đào tiền ảo script: {0} KMA Extension đã chặn script này.'
}

 lang["en"] ={
	label_offfb:"Always offline",
	label_blockad:"Block Ads",
	label_facebook_darktheme:"Facebook Darktheme",
	label_protect:"Protect browser"
}
function getLang(title)
{
  return lang[extension_lang][title];
}
