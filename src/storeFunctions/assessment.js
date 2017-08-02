export default function updateAssessment(assessment) {
	document.querySelector('[data-assessment]').value = assessment.GUID + '#' + assessment.LO_Ref;
		triggerAsync('[data-save-assessment]')
}

function triggerAsync(selector) {
	$(selector).click();
}
