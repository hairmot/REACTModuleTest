import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';
import persistState from '../util/persistState';
import generateId from '../util/generateId';
import { saveLearningOutcome, deleteLearningOutcome } from '../storeFunctions/learningOutcomes';
import learningActivities from '../storeFunctions/learningActivities';
import { summaries } from '../storeFunctions/moduleInputs';
import savedStates from '../storeFunctions/savedStates';
import updateAssessment from '../storeFunctions/assessment';


function Reducer(state = defaultData, action) {
	switch (action.type) {

		case 'saveState':
			var newState = Object.assign({}, state, action.state);
			savedStates(newState.savedStates);
			summaries(newState.inputs);
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
			learningActivities(newState.learningHours);
			return persistState(newState);

		case 'addNewLearningOutcome':
			var newState = Object.assign({}, state);
			newState.learningOutcomes = [...newState.learningOutcomes, { GUID: generateId(), ID: '', outcome: '' }]
			return newState

		case 'deleteLearningOutcome':
				var newState = Object.assign({}, state);
				newState.learningOutcomes = newState.learningOutcomes.filter(a => a.GUID != action.GUID);
				deleteLearningOutcome(action.GUID);
				return newState;

		case 'saveLearningOutcome':
			var newState = Object.assign({}, state);
			var lo = newState.learningOutcomes.findIndex(a => a.GUID == action.learningOutcome.GUID);
			var newArr = newState.learningOutcomes.slice(0);
			newArr[lo] = action.learningOutcome;
			newState.learningOutcomes = newArr;
			saveLearningOutcome(action.learningOutcome.GUID, action.learningOutcome.ID, action.learningOutcome.outcome);
			return newState;

		case 'addNewAssessment':
			var newState = Object.assign({}, state);

			newState.assessments = [...newState.assessments,
			{
				"GUID": generateId(),
				"task_no": "",
				"LO_Ref": "",
				"description": "",
				"Assessment_Task_Type": "",
				"word_count": "",
				"task_weighting": ""
			}];

			return newState;

		case 'deleteAssessment':
			var newState = Object.assign({}, state);
			newState.assessments = newState.assessments.filter(a => a.GUID != action.GUID);
			return persistState(newState);

		case 'saveAssessment':
			var newState = Object.assign({}, state);
			var assess = newState.assessments.findIndex(a => a.GUID == action.assessment.GUID);
			var newArr = newState.assessments.slice(0);
			newArr[assess] = action.assessment;
			newState.assessments = newArr;
			updateAssessment(action.assessment);
			return newState;


		default:
			if (retrieveState()) {
				var newState = JSON.parse(retrieveState());
				//clean up blank learning outcome
				newState.learningOutcomes = newState.learningOutcomes.filter(a => Object.keys(a).length === 3);
				newState.assessments = newState.assessments.filter(a => Object.keys(a).length === 6);
				return newState
			}
			else {
				return state;
			}
	}
}

export default Reducer;

