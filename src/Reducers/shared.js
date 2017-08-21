export function cleanServerState(state) {
	var newState = state;
	newState.learningOutcomes = newState.learningOutcomes.filter(a => Object.keys(a).length === 3);
	newState.assessments = newState.assessments.filter(a => Object.keys(a).length === 6);
	newState.assessments = newState.assessments.map(a => {
		if (a.LO_Ref !== '') {
			a.LO_Ref = a.LO_Ref.split(',')
		}
		else {
			a.LO_Ref = []
		}
		return a
	});
	return newState
}
