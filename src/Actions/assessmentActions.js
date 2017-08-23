import {triggerAsync, getServerStateJSON, verifySaved} from './shared.js';

export function updateAssessment(values) {
	return {
		type: 'updateAssessment',
		values
	}
}

export function startSavingAssessment(assessment) {
	return function (dispatch) {
		dispatch(savingAssessment(assessment.GUID));
		var ref = assessment.GUID + '#' + assessment.LO_Ref.join(',');
		$('[data-assessment]').val(ref);
		triggerAsync('[data-save-assessment]').then(response => getServerStateJSON().then(response => response.json()).then(json => {
			var response = json.assessments.find(a => a.GUID === assessment.GUID);
			var clientSide = Object.assign({}, assessment, {saved:true, loading:false, LO_Ref: assessment.LO_Ref.join(',')});
			dispatch(assessmentSaved(assessment.GUID, verifySaved(clientSide, response)))
		})).catch(function() {
				dispatch(assessmentSaved(assessment.GUID, false));
		});
	}
}

export function assessmentSaved(GUID, result) {
	return {
		type: 'assessmentSaved',
		GUID,
		result
	}
}

export function savingAssessment(GUID) {
	return {
		type: 'savingAssessment',
		GUID
	}
}
