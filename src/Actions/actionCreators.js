import {verifySaved, triggerAsync, getServerStateJSON} from './shared.js';

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

export function saveAssessment(assessment) {
	return {
		type: 'saveAssessment',
		assessment
	}
}
