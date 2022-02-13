function addPart() {
	let parent = document.querySelectorAll('[load]');
	parent.forEach(function(el){ 
		fetch(`parts/${el.getAttribute("load")}.html`)
		.then(function (data) {
			return data.text();
		})
		.then(function (html) { 
			el.insertAdjacentHTML('afterend', html);
			var scripts = el.querySelectorAll("script");
			for (var i = 0; i < scripts.length; i++) {
				if (scripts[i].innerText) {
					eval(scripts[i].innerText);
				} else {
					fetch(scripts[i].src).then(function (data) {
						data.text().then(function (r) {
							eval(r);
						})
					}); 
				} 
				scripts[i].parentNode.removeChild(scripts[i]);
			}
			el.remove();
		})		
	})
}
	addPart();