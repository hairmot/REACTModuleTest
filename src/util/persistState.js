export default function(state, item = 'reactState') {
	if(document.querySelector('[data-id]')) {
		document.querySelector('[data-id]').value = JSON.stringify(state);
		var formData = $('form').first().serialize() + '&NEXT.DUMMY.MENSYS.1=Next';
			$.post($('form').first().attr('action'), formData, function() {
		});
	}
	else {
		localStorage.setItem(item, JSON.stringify(state));
	}
}
