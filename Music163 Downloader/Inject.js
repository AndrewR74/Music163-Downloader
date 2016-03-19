console.log("M3 Kappa");

window.GetSongDetails = function(sid, callback) {
	/*
	var be = NEJ.P
      , eL = be("nej.g")
      , bH = be("nej.j")
      , bm = be("nej.u")
      , bHd = be("nm.x.ek")
      , bq = be("nm.x");
	  
    var bi = function(qr) {
        var bn = [];
        bm.bLt(qr, function(nb) {
            bn.push(bHd.emj[nb])
        });
        return bn.join("")
    };
	
	var token = bH.fN("__csrf"), songId = sid;

	var p1 = JSON.stringify({ csrf_token: token, id: songId, ids: JSON.stringify([songId]) });
	// CONST
	var p2 = "010001";		
	// CONST
	var p3 = ["00e0b509f6259df8642", "dbc35662901477df22677", "ec152b5ff68ace615bb7b725", "152b3ab17a876aea8a5aa7", "6d2e417629ec4ee341f56135", "fccf695280104e0312ecbd", "a92557c93870114af6c9d05", "c4f7f0c3685b7a46bee2", "55932575cce10b424d813", "cfe4875d3e82047b97ddef5", "2741d546b8e289dc693", "5b3ece0462db0a22b8e7"].join("");
	// CONST
	var p4 = "0CoJUm6Qyw8W8jud"; 

	//var r1 = window.aesRsaEncrypt(p1, p2, p3, p4);
	var r1 = window.asrsea(p1, bi(["流泪", "强"]), bi(bHd.md), bi(["爱心", "女孩", "惊恐", "大笑"]));
	
	var d1 = { params: r1.encText, encSecKey: r1.encSecKey };
	*/
	
	var e = "010001";
	var f = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7";
	var g = "0CoJUm6Qyw8W8jud";
	var s = JSON.stringify({"ids":"[" + sid + "]","br":128000,"csrf_token":""});
	var d1 = window.asrsea(s, e, f, g);
	d1["params"] = d1["encText"];
	delete d1["encText"];

	var xmlhttp;

	if (window.XMLHttpRequest)
	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			callback(JSON.parse(xmlhttp.responseText));
		}
	}

	var str = "";
	for (var key in d1) {
		if (str != "") {
			str += "&";
		}
		str += key + "=" + encodeURIComponent(d1[key]);
	}

	//xmlhttp.open("POST","http://music.163.com/weapi/song/detail/?csrf_token=" + token, true);
	xmlhttp.open("POST","http://music.163.com/weapi/song/enhance/player/url?csrf_token=", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send(str);
}

function GetSongId() { 
	var s = window.location.href.indexOf("song?id="),
	i = window.location.href.indexOf("&", s);
	if(s > -1)
		return window.location.href.substring((s+8), (i==-1?window.location.href.length:i) );
	else return "";
}

function DownloadMP3(url, filename) {
	ChromeAPIConnect({method: "downloadmp3", filename: filename, url: url});
}

function ChromeAPIConnect(obj) {
	// The ID of the extension we want to talk to.
	var editorExtensionId = "{CID}";

	// Make a simple request:
	chrome.runtime.sendMessage(editorExtensionId, obj, function(response) {
		if (!response.success)
		  console.log("Error Connecting To Chrome");
	});
}

var _anchor = false;

setInterval(function() {
	
	if(!_anchor) {
		_anchor = true; 
		console.log("Anchor");
	}
	
	if(window.location.href.indexOf("song?id=") > -1) {
		var elem = document.getElementById("m163d");
		
		if(elem === null) {
			var btn = document.createElement("div");
			btn.setAttribute("id", "m163d");
			btn.setAttribute("class", "u-btn2 u-btn2-2 u-btni-addply f-fl");
			var t = document.createElement("i");
			var t2 = document.createTextNode("Download");
			t.appendChild(t2);
			btn.appendChild(t);
			btn.style.cssText = "position:absolute; top:10; left:10; z-index: 99999;";
			
			btn.onclick = function () {
				var sid = GetSongId();
				if(sid.length > 0 && !isNaN(sid)) {
					window.GetSongDetails(sid, function(songDetails) {
						if(songDetails != null && typeof(songDetails.data) !== "undefined") {
							if(songDetails.data.length > 0) {
								var filename = document.title.split('-').splice(0,2).join("-").trim();
								
								DownloadMP3(songDetails.data[0].url, filename + ".mp3");
							} else {
								console.log("No Song Found");
							}
						} else {
							console.log("Song Details Are Invalid");
						}
					});
				} else {
					console.log("Invalid Song ID");
				}
			};
			
			document.body.appendChild(btn);
		}
	}
}, 2000);