export default function(state, item = 'reactState') {
		localStorage.setItem(item, JSON.stringify(state));
		document.querySelector('[data-ajax]').value = JSON.stringify(state);
	}
