import {triggerAsync, getServerStateJSON} from './shared.js';

export function saveLearningOutcome(learningOutcomes) {
	return {
		type: 'saveLearningOutcome',
		learningOutcomes
	}
}

export function updateLearningOutcome(GUID, ID, outcome, loading, saved) {
	return {
		type: 'updateLearningOutcome',
		GUID,
		ID,
		outcome,
		loading,
		saved
	}
}

export function startSaveLearningOutcome(learningOutcome) {
	return function (dispatch) {
		dispatch(savingLearningOutcomesStarted(learningOutcome.GUID));
		$('[data-learningoutcome]').val(learningOutcome.GUID + '~' + learningOutcome.ID + '~' + learningOutcome.outcome);
		triggerAsync('[data-save-learning-outcome]').then(response => getServerStateJSON().then(response => response.json()).then(json => {
			var response = json.learningOutcomes.find(a => a.GUID === learningOutcome.GUID);
			var { GUID, ID, outcome } = response;
				dispatch(updateLearningOutcome(GUID, ID, outcome, false, verifySaved(learningOutcome, response)))
		}));
	}
}

export function savingLearningOutcomesStarted(GUID) {
	return {
		type: 'savingLearningOutcomesStarted',
		GUID
	}
}

export function addNewLearningOutcome() {
	return {
		type: 'addNewLearningOutcome'
	}
}

export function deleteLearningOutcome(GUID) {
	return {
		type: 'deleteLearningOutcome',
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
