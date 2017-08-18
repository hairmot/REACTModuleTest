import defaultData, { inputsTemplate } from '../data/defaultData';
import retrieveState from '../util/retrieveState';
import persistState from '../util/persistState';
import generateId from '../util/generateId';
import { saveLearningOutcome, deleteLearningOutcome, learningActivities, summaries, savedStates, updateAssessment } from '../storeFunctions/';

if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (predicate) {
		if (this === null) {
			throw new TypeError('Array.prototype.findIndex called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		const list = Object(this);
		const length = list.length >>> 0;
		const thisArg = arguments[1];
		let value;

		for (let i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
}

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
			var newState = Object.assign({}, state, { learningHours: action.learningHoursItem });
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

			return Object.assign({}, state, {learningOutcomes : action.learningOutcomes, learningOutcomesLoading:false})

		case 'savingLearningOutcomesStarted' :
			var newLearningOutcomes = state.learningOutcomes.slice();
			var index = state.learningOutcomes.findIndex(a => a.GUID === action.GUID);
			newLearningOutcomes[index] = Object.assign({}, newLearningOutcomes[index], {loading:true});
			var ns = Object.assign({}, state, {learningOutcomes: newLearningOutcomes})
			return ns

		case 'updateLearningOutcome':

			var newLearningOutcomes = state.learningOutcomes.slice();
			var index = state.learningOutcomes.findIndex(a => a.GUID === action.GUID);
			newLearningOutcomes[index] = {GUID: action.GUID, ID: action.ID, outcome: action.outcome, loading:action.loading, saved: action.saved}
			return Object.assign({}, state, {learningOutcomes: newLearningOutcomes});

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
			var assess = newState.assessments.findIndex(function (a) {
				return a.GUID == action.assessment.GUID;
			});
			var newArr = newState.assessments.slice(0);
			newArr[assess] = action.assessment;
			newState.assessments = newArr;
			updateAssessment(action.assessment);
			return newState;

		case 'validateServerState':
			console.log('server state:')
			console.log(cleanServerState(action.serverState));
			console.log('client state:')
			console.log(state);
			return state;


		default:
			if (retrieveState()) {
				var newState = cleanServerState(JSON.parse(retrieveState()));
				return newState;
			}
			else {
				return state;
			}
	}
}

export default Reducer;

function cleanServerState(state) {
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
