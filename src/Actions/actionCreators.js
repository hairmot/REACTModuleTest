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


