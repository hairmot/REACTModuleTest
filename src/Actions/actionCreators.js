export function saveLearningOutcome(learningOutcomes) {
	return {
		type: 'saveLearningOutcome',
		learningOutcomes
	}
}

export function updateLearningOutcome(GUID, ID, outcome, loading, saved) {
	;
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

function verifySaved(clientSide, serverSide) {
		var length = Object.keys(clientSide)
		if (length.length === Object.keys(serverSide).length) {
			return length.map(a => clientSide[a] === serverSide[a]).reduce((a,b) => a && b);
		}
		return false
}

export function savingLearningOutcomesStarted(GUID) {
	return {
		type: 'savingLearningOutcomesStarted',
		GUID
	}
}


function triggerAsync(selector) {
	var elem = document.querySelector(selector);
	var newVal = elem.getAttribute('id').substring(0, elem.getAttribute('id').length - 1) + '=' + elem.value.replace(/ /g, '+');
	var formData = $('form').first().serialize().replace(elem.nextSibling.getAttribute('name'), newVal + '&' + elem.nextSibling.getAttribute('name'));

	return fetch(document.querySelectorAll('form')[0].getAttribute('action'), {
		method: 'POST',
		credentials: "same-origin",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		},
		body: formData
	})
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





export function updateLearningHours(learningHoursItem) {
	return {
		type: 'updateLearningHours',
		learningHoursItem
	}
}







export function updateAssessments(assessments) {
	return {
		type: "updateAssessments",
		assessments
	}
}


export function updateModuleProgress(inputs) {
	return {
		type: "updateModuleProgress",
		inputs
	}
}

export function saveState(state) {
	return {
		type: "saveState",
		state
	}
}

export function retrieveState() {
	return {
		type: "retrieveState"
	}
}

export function addNewAssessment() {
	return {
		type: 'addNewAssessment'
	}
}

export function deleteAssessment(GUID) {
	return {
		type: 'deleteAssessment',
		GUID
	}
}

export function saveAssessment(assessment) {
	return {
		type: 'saveAssessment',
		assessment
	}
}
function getServerStateJSON() {
	return fetch(document.querySelector('[data-checkstate]').getAttribute('href'), { credentials: "same-origin" });
}


export function getServerState() {
	return function (dispatch) {
		return getServerStateJSON().then(response => response.json()).then(json => dispatch(validateStateFromServer(json)));
	}
}

export function validateStateFromServer(serverState) {
	return {
		type: 'validateServerState',
		serverState
	}
}


