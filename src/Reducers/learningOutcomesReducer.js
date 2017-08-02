import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';
import persistState from '../util/persistState';
import generateId from '../util/generateId';

export default function learningOutcomesReducer(state =defaultData, action) {
	switch (action.type) {

			case 'addNewLearningOutcome':
				var newState = Object.assign({}, state);
				newState.learningOutcomes = [...newState.learningOutcomes, {GUID: generateId() ,ID:'', outcome: '' } ]
				return newState

			case 'deleteLearningOutcome':
				var newState = Object.assign({}, state);
				newState.learningOutcomes = newState.learningOutcomes.filter(a => a.GUID != action.GUID);
				return persistState(newState);

			case 'saveLearningOutcome':
				var newState = Object.assign({}, state);

				var lo = newState.learningOutcomes.findIndex(a => a.GUID == action.learningOutcome.GUID);
				var newArr = newState.learningOutcomes.slice(0);
				newArr[lo] = action.learningOutcome;
				newState.learningOutcomes = newArr;
				return persistState(newState);

			default:
			if (retrieveState()) {
				var newState = JSON.parse(retrieveState());
				return newState
			}
			else {
				return state;
			}
	}

}
