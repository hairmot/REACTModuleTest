import {triggerAsync, getServerStateJSON} from './shared.js';


export function startSavingLearningHours(learningHours) {
		return function (dispatch) {
		dispatch(updatingLearningHours());
		$('[data-learningactivities]').val(Object.keys(learningHours).map(a =>learningHours[a]).join('~'));
		triggerAsync('[data-save-learning-hours]').then(response => getServerStateJSON().then(response => response.json()).then(json => {
			var response = json.learningHours;
				dispatch(learningHoursSaved(verifySaved(learningHours, response)))
		}));
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

function verifySaved(clientSide, serverSide) {
		var length = Object.keys(clientSide)
		if (length.length === Object.keys(serverSide).length) {
			return length.map(a => clientSide[a] === serverSide[a]).reduce((a,b) => a && b);
		}
		return false
}
