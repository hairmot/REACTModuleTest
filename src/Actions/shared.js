export function triggerAsync(selector) {
	var elem = document.querySelector(selector);
	var newVal = elem.getAttribute('id').substring(0, elem.getAttribute('id').length - 1) + '=' + elem.value.replace(/ /g, '+');
	var formData = $('form').first().serialize().replace(elem.nextSibling.getAttribute('name'), newVal + '&' + elem.nextSibling.getAttribute('name'));

	return fetch(document.querySelectorAll('form')[0].getAttribute('action'), {
		method: 'POST',
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		},
		body: formData
	})
}

export function getServerStateJSON() {
	return fetch(document.querySelector('[data-checkstate]').getAttribute('href'), { credentials: "same-origin" });
}

export function verifySaved(clientSide, serverSide) {
		var length = Object.keys(clientSide)
		if (length.length === Object.keys(serverSide).length) {
			return length.map(a => clientSide[a] === serverSide[a]).reduce((a,b) => a && b);
		}
		return false
}
