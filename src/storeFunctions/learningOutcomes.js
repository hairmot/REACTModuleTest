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


