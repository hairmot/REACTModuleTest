export function updateAssessments(assessments) {
    return {
        type: "updateAssessments",
        assessments
    }
}

export function updateLearningOutcomes(learningOutcomes) {
    return {
        type: "updateLearningOutcomes",
        learningOutcomes
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

export function updateLearningHours(learningHoursItem) {
	return {
		type: 'updateLearningHours',
		learningHoursItem
	}
}

export function logState() {
	return {
		type: 'logState'
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

export function saveLearningOutcome(learningOutcome) {
	return {
		type: 'saveLearningOutcome',
		learningOutcome
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




