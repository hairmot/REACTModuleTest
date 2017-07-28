import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';


function Reducer(state, action) {
	switch (action.type) {

		case 'saveState':
			return Object.assign({}, state, action.state);
		case 'updateAssessments':
			return Object.assign({}, state, { assessments: action.assessments });

		case 'updateLearningOutcomes':
			return Object.assign({}, state, { learningOutcomes: action.learningOutcomes });

		case 'updateModuleProgress':
			var inputArray = Object.keys(action.inputs);
			var mod = Math.floor(
				(100 / inputArray.filter(a => !inputsTemplate
					.find(b => b.fieldName === a)
					.omitFromProgress)
					.length) * inputArray.filter(a => action.inputs[a] !== '')
					.length);
			return Object.assign({}, state, { moduleProgress: mod });

		default:
			if (retrieveState()) {
			var newState = JSON.parse(retrieveState());
				return newState
			}
			else {
				return defaultData;
			}
	}
}

export default Reducer;

