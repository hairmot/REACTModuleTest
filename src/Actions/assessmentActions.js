import { triggerAsync, getServerStateJSON } from './shared.js';

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
		}));
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

function verifySaved(clientSide, serverSide) {
		var length = Object.keys(clientSide)
		if (length.length === Object.keys(serverSide).length) {
			return length.map(a => clientSide[a] === serverSide[a]).reduce((a,b) => a && b);
		}
		return false
}
