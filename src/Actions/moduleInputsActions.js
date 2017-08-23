import {triggerAsync, getServerStateJSON, verifySaved} from './shared.js';

export function updateModuleInputs(inputs) {
	return {
		type: 'updateModuleInputs',
		inputs
	}
}

export function updateModuleProgress(inputs) {
	return {
		type: 'updateModuleProgress',
		inputs
	}
}

export function startSavingModuleInputs(inputs) {
	return function (dispatch) {
		dispatch(savingModuleInputsStarted(inputs));
			$('[data-mod-summary]').val(Object.keys(inputs).filter(a => a === 'module_summary').map(a => inputs[a])[0]);
			$('[data-lta-summary]').val(Object.keys(inputs).filter(a => a === 'learning_teaching_and_assessment_summary').map(a => inputs[a])[0]);
		triggerAsync('[data-save-module-inputs]').then(response => getServerStateJSON().then(response => response.json()).then(json => {
			var response = json.inputs;

				var saved = verifySaved(stripSubjectGroup(inputs), stripSubjectGroup(response));
				dispatch(moduleInputsSaved(saved));

				if(saved)
					dispatch(updateModuleProgress(inputs));
		})).catch(function(err) {
			moduleInputsSaved(false);
		});
	}
}

export function savingModuleInputsStarted() {
	return {
		type: 'savingModuleInputsStarted'
	}
}

export function moduleInputsSaved(saved) {
	return {
		type:'moduleInputsSaved',
		saved
	}
}

function stripSubjectGroup(inputs) {
	var newInputs = Object.assign({}, inputs);
	delete newInputs.subject_group;
	return newInputs;
}


