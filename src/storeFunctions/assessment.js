export default function updateAssessment(assessment) {
	$('[data-assessment]').val(assessment.GUID + '#' + assessment.LO_Ref);
		triggerAsync('[data-save-assessment]')
}

function triggerAsync(selector) {
	$(selector).click();
}

