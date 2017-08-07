export function summaries(inputs) {
	$('[data-mod-summary]').val(Object.keys(inputs).filter(a => a === 'module_summary').map(a => inputs[a])[0]);
		$('[data-lta-summary]').val(Object.keys(inputs).filter(a => a === 'learning_teaching_and_assessment_summary').map(a => inputs[a])[0]);
}
