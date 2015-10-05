var polling = false;
function poll() {
	ajax(get('protocol').value + get('url').value,function(err,data){
		if (err) {
			get('json').innerHTML = 'Error: ' + err;
		}
		else {
			get('json').innerHTML = prettify(JSON.parse(data),0);
		}
		if (polling) setTimeout(poll,1000 * parseFloat(get('pollInterval').value));
	})
}

function connect () {
	var url = get('url');
	var btn = get('connect');
	if (polling) {
		btn.innerHTML = 'Connect';
		url.readOnly = false;
		url.style.backgroundColor = 'white';
		polling = false;
		hide('json')
		show('conf')
	}
	else {
		btn.innerHTML = 'Disconnect';
		url.readOnly = true;
		url.style.backgroundColor = '#ccc';
		polling = true;
		poll();
		hide('conf')
		show('json')
	}
}

window.onload = function(){
	get('connect').onclick = connect;
	get('url').onkeypress = function(e){
		if (e.keyCode == '13') connect();
	};
}
