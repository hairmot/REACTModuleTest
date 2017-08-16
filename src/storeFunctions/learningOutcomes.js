var serialize = require('form-serialize');

export function deleteLearningOutcome(guid) {
	$('[data-learningoutcome]').val(guid);
	triggerAsync('[data-delete-learning-outcome]')
}


export function saveLearningOutcome(guid, id, outcome) {
	$('[data-learningoutcome]').val(guid + '~' + id + '~' + outcome);
	triggerAsync('[data-save-learning-outcome]')
}

function triggerAsync(selector) {
	$(selector).click();
}


// function triggerAsync(selector) {
// 	var elem = document.querySelector(selector);
// 	var newVal = elem.getAttribute('id').substring(0, elem.getAttribute('id').length - 1) + '=' + elem.value.replace(/ /g, '+');
// 	console.log(newVal);
// 	var formData = $('form').first().serialize().replace(elem.nextSibling.getAttribute('name'), newVal + '&' + elem.nextSibling.getAttribute('name'));

// 	fetch(document.querySelectorAll('form')[0].getAttribute('action'), {
// 		method:'POST',
// 		credentials: "same-origin",
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
// 		},
// 		body:formData
// 	}).then(data => {
// 		console.log('done');
// 	})
// }


