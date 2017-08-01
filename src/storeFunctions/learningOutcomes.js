export function deleteLearningOutcome(guid) {
	document.querySelector('[data-learningoutcome]').value = guid;
	triggerAsync('[data-delete-learning-outcome]')
}


export function saveLearningOutcome(guid, id, outcome) {
	document.querySelector('[data-learningoutcome]').value = guid + '~' + id + '~' + outcome;
		triggerAsync('[data-save-learning-outcome]')
}

function triggerAsync(selector) {
	$(selector).click();
}
