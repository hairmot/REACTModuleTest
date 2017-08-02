export function summaries(inputs) {
	document.querySelector('[data-mod-summary]').value = Object.keys(inputs).filter(a => a === 'module_summary').map(a => inputs[a])[0];
		document.querySelector('[data-lta-summary]').value = Object.keys(inputs).filter(a => a === 'learning_teaching_and_assessment_summary').map(a => inputs[a])[0];
}
