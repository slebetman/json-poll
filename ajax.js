function ajax (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url);
	
	// Track the state changes of the request.
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			switch(xhr.status) {
			case 200:
				callback(null,xhr.responseText);break;
			case 404:
				callback(xhr.status + ' File not found');break;
			case 500:
				callback(xhr.status + ' Server error');break;
			case 0:
				callback(xhr.status + ' Request aborted');break;
			default:
				callback(xhr.status + ' Unknown error');
			}
		}
	};
	
	xhr.send(null);
}

function get (id) {
	return document.getElementById(id);
}

function hide (id) {
	get(id).style.display = 'none';
}

function show (id) {
	get(id).style.display = 'block';
}
