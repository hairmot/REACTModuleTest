export default function () {
	if (document.querySelector('[data-ajax]') && document.querySelector('[data-ajax]').value !== '') {
		return document.querySelector('[data-ajax]').value;
	}
	else if (localStorage.getItem('reactState')){
		return localStorage.getItem('reactState');
	}
	else {
		return false;
	}
}
