import {triggerAsync, getServerStateJSON, verifySaved} from './shared.js';

export function startSavingLearningHours(learningHours) {
		return function (dispatch) {
		dispatch(updatingLearningHours());
		$('[data-learningactivities]').val(Object.keys(learningHours).map(a =>learningHours[a]).join('~'));
		triggerAsync('[data-save-learning-hours]').then(response => getServerStateJSON().then(response => response.json()).then(json => {
			var response = json.learningHours;
				dispatch(learningHoursSaved(verifySaved(learningHours, response)))
		})).catch(function() {
			dispatch(learningHoursSaved(false))
		});
	}
}

export function learningHoursSaved(saved) {
	return {
		type: 'learningHoursSaved',
		saved
	}
}

export function updatingLearningHours() {
	return {
		type: 'updatingLearningHours'
	}
}

export function updateLearningHours(learningHours) {
	return {
		type: 'updateLearningHours',
		learningHours
	}
}
