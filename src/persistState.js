export default function(state, item = 'reactState') {
		localStorage.setItem(item, JSON.stringify(state));
}
