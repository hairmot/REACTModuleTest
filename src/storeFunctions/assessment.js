export default function updateAssessment(assessment) {
	var ref = assessment.GUID + '#' + assessment.LO_Ref.join(',');
	$('[data-assessment]').val(ref);
	triggerAsync('[data-save-assessment]')
}

function triggerAsync(selector) {
	$(selector).click();
}

// if ($ === undefined) {
// 	var $ = () => {
// 		return {
// 			val: () => { }, click: () => { }
// 		}
// 	};
// }
