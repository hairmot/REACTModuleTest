export default function () {
	if (document.querySelector('[data-id]') && document.querySelector('[data-id]').value !== '') {
		return document.querySelector('[data-id]').value;
	}
	else if (localStorage.getItem('reactState')){
		return localStorage.getItem('reactState');
	}
	else {
		return false;
	}
}
