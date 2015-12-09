
	$.get(chrome.extension.getURL("Inject.js"),
		function (data) {
			var node = document.createElement("script");
			node.textContent = data.replace("{CID}", chrome.runtime.id);
			document.body.appendChild(node);
		}
	);
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		/*if (request.method == "downloadmp3") {
			if(request.filename && request.url) {
				var xhr = new XMLHttpRequest();
				xhr.open('GET', request.url, true);
				xhr.responseType = 'arraybuffer';
				xhr.onload = function(e) {
					if (this.status == 200) {
						var uInt8Array = new Uint8Array(this.response);
						var i = uInt8Array.length;
						var binaryString = new Array(i);
						
						while (i--)
						{
						  binaryString[i] = String.fromCharCode(uInt8Array[i]);
						}
						var data = binaryString.join('');

						var base64 = window.btoa(data);
						
						var link = document.createElement("a");
						link.download = request.filename;
						link.href = "data:audio/mpeg;base64,"+ base64;
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					}
				};
				xhr.send();
			}
		}*/
	});
