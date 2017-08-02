export default function saveLearningOutcome(savedStates) {
	document.querySelector('[data-saved-states]').value = JSON.stringify(savedStates);

}
