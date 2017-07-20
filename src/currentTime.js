export default function() {
		var date = new Date();
			return ('0' + date.getDate()).slice(-2)  + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' +  date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
