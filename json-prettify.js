function prettify (o,indent,name) {
	var tab = '    '.repeat(indent);
	if (name) {
		name = '<span class="key">' + name + '</span>: ';
	} else {
		name = '';
	}
	if (typeof o == 'string') {
		return tab + name + '"' + o + '"';
	}
	if (typeof o == 'number' ||
		typeof o == 'boolean' ||
		typeof o == 'undefined' ||
		o === null
	) {
		return tab + name + o;
	}
	if (o instanceof Array) {
		if (o.length) {
			var items = [];
			for (var i=0;i<o.length;i++) {
				items.push(prettify(o[i],0));
			}
			if (items.join(', ').length < 100) {
				return tab + name + '[ ' + items.join(', ') + ' ]';
			} else {
				items = [];
				for (var i=0;i<o.length;i++) {
					items.push(prettify(o[i],indent+1));
				}
				var ret = tab + name + '[\n';
				ret += items.join(',\n') + '\n';
				ret += tab + ']';
				return ret;
			}
		} else {
			return tab + name + '[]';
		}
	}
	// object
	var items = [];
	
	for (var i in o) {
		items.push(prettify(o[i],0,i));
	}
	if (items.length == 0) {
		return tab + name + '{}';
	}
	if (items.join(', ').length < 100) {
		return tab + name + '{ ' + items.join(', ') + ' }';
	} else {
		items = [];
		for (var i in o) {
			items.push(prettify(o[i],indent+1,i));
		}
		var ret = tab + name + '{\n';
		ret += items.join(',\n') + '\n';
		ret += tab + '}';
		return ret;
	}
}
