import {triggerAsync, getServerStateJSON, verifySaved} from './shared.js';


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
		var { GUID, ID, outcome } = learningOutcome;
		dispatch(savingLearningOutcomesStarted(learningOutcome.GUID));
		$('[data-learningoutcome]').val(learningOutcome.GUID + '~' + learningOutcome.ID + '~' + learningOutcome.outcome);
		triggerAsync('[data-save-learning-outcome]').then(response => getServerStateJSON().then(response => response.json()).then(json => {
			var response = json.learningOutcomes.find(a => a.GUID === learningOutcome.GUID);
				dispatch(updateLearningOutcome(GUID, ID, outcome, false, verifySaved(learningOutcome, response)))
		})).catch(function(err) {
			updateLearningOutcome(GUID, ID, outcome, false, false);
		});;
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
	return function (dispatch) {
		$('[data-learningoutcome]').val(GUID);
		dispatch(deleteLearningOutcomeFinished(GUID));
		triggerAsync('[data-delete-learning-outcome]')
	}
}

export function deleteLearningOutcomeFinished(GUID) {
	return {
		type: 'deleteLearningOutcome',
		GUID
	}
}
