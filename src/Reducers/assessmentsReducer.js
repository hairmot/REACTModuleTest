import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';
import persistState from '../util/persistState';
import generateId from '../util/generateId';

export default function assessmentsReducer(state = defaultData, action) {
	switch (action.type) {

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
				console.log('saved it');
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
