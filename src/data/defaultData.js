import currentTime from '../util/currentTime';

export var inputsTemplate = [
	{
		fieldName: 'title',
		type: 'text',
		maxLength: 100,
		minLength: 1
	},
	{
		fieldName: 'module_code',
		type: 'text',
		maxLength: 12,
		minLength: 1
	},
	{
		fieldName: 'level',
		type: 'text',
		maxLength: 6,
		minLength: 1
	},
	{
		fieldName: 'credits',
		type: 'number',
		maxLength: 6,
		minLength: 1
	},
	{
		fieldName: 'ects_credits_value',
		type: 'text',
		maxLength: 6,
		minLength: 1,
		readOnly: true,
		formatting: (val) => { var res = Math.floor(val / 2); return res === 0 ? '' : res },
		relatedField: 'credits',
		omitFromProgress: true,
	},
	{
		fieldName: 'faculty',
		type: 'text',
		validation: ['Computing', 'Business'],
		maxLength: 6
	},
	{
		fieldName: 'department',
		type: 'text',
		maxLength: 12
	},
	{
		fieldName: 'subject_group',
		type: 'text',
		maxLength: 100
	},
	{
		fieldName: 'total_number_of_notational_study_hours_for_this_module',
		maxLength: 100,
		type: 'number'
	},
	{
		fieldName: 'total_number_of_scheduled_learning_and_teaching_activities_for_this_module',
		maxLength: 100,
		type: 'number'
	},
	{
		fieldName: 'module_summary',
		type: 'textarea',
		maxLength: 500
	},
	{
		fieldName: 'learning_teaching_and_assessment_summary',
		type: 'textarea',
		maxLength: 400
	},
	{
		fieldName: 'learning_resources',
		type: 'link',
		relatedField: 'module_code',
		formatting: a => 'https://shu.rl.talis.com/modules/' + a + '/lists/20172018-Academic-Year.html',
		maxLength: 100,
		omitFromProgress: true
	}
]

export var assessmentsTemplate = [
	{
		fieldName: 'task_no'
	},
	{
		fieldName: 'LO_Ref',
		formatting: (a,b) => {

			return 	b.find(d => d.ID === a);
		}
	},
	{
		fieldName: 'description'
	},
	{
		fieldName: 'Assessment_Task_Type'
	},
	{
		fieldName: 'word_count'
	},
	{
		fieldName: 'task_weighting'
	}
]

var newInputs = inputsTemplate.reduce((a, b, i) => { a[inputsTemplate[i].fieldName] = ''; return a }, {});


export default {
	savedStates: [
		{
			time: currentTime(),
			inputs: newInputs
		}
	],
	inputs: newInputs,
	assessments: [
	],
	learningOutcomes: [
	],
	moduleProgress: 0
}


