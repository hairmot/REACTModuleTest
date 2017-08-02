import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';
import persistState from '../util/persistState';


function Reducer(state = defaultData, action) {
	switch (action.type) {

		case 'saveState':
			var newState = Object.assign({}, state, action.state);
			persistState(newState);
			return newState;

		case 'updateModuleProgress':
			var inputArray = Object.keys(action.inputs);
			var eligible = inputArray.filter(a => !inputsTemplate.find(b => b.fieldName === a).omitFromProgress);
			var validInputs = eligible.filter(a => inputsTemplate.find(b => b.fieldName === a).validate(action.inputs[a], a));
			var mod = Math.floor((100 / eligible.length) * validInputs.length);
			return Object.assign({}, state, { moduleProgress: mod });

		case 'updateLearningHours':
			var updatedItem = {};
			updatedItem[action.learningHoursItem.name] = action.learningHoursItem.value;
			var newLearningHours = Object.assign({}, state.learningHours, updatedItem);
			var newState = Object.assign({}, state, { learningHours: newLearningHours });
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

export default Reducer;

