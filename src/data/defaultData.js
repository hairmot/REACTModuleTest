import currentTime from '../util/currentTime';

var validate = (value, item) => {

	var templateItem = inputsTemplate.concat(learningHoursTemplate).find(b => b.fieldName === item);
	return value.length >= (templateItem.hasOwnProperty('minLength') ? templateItem.minLength : 0) && value.length <= (templateItem.hasOwnProperty('maxLength') ? templateItem.maxLength : 9999) && (value != '' && value != '<p></p>' && value != '<p><br></p>');
}

export var inputsTemplate = [
	{
		fieldName: 'title',
		type: 'text',
		maxLength: 100,
		minLength: 1,
		validate,
		readOnly:true
	},
	{
		fieldName: 'module_code',
		type: 'text',
		maxLength: 12,
		minLength: 1,
		validate,
		readOnly:true
	},
	{
		fieldName: 'level',
		type: 'text',
		maxLength: 6,
		minLength: 1,
		validate,
		readOnly:true
	},
	{
		fieldName: 'credits',
		type: 'number',
		maxLength: 6,
		minLength: 1,
		validate,
		readOnly:true
	},
	// {
	// 	fieldName: 'ects_credits_value',
	// 	type: 'text',
	// 	maxLength: 6,
	// 	minLength: 1,
	// 	readOnly: true,
	// 	formatting: (val) => { var res = Math.floor(val / 2); return res === 0 ? '' : res },
	// 	relatedField: 'credits',
	// 	omitFromProgress: true,
	// 	validate
	// },
	{
		fieldName: 'faculty',
		type: 'text',
		validation: ['Computing', 'Business'],
		maxLength: 6,
		validate,
		readOnly:true
	},
	{
		fieldName: 'department',
		type: 'text',
		maxLength: 12,
		validate,
		readOnly:true
	},
	{
		fieldName: 'subject_group',
		type: 'text',
		maxLength: 100,
		validate,
		readOnly:true
	},
	{
		fieldName: 'module_summary',
		type: 'textarea',
		maxLength: 500,
		validate
	},
	{
		fieldName: 'learning_teaching_and_assessment_summary',
		type: 'textarea',
		maxLength: 400,
		validate
	}
	// {
	// 	fieldName: 'learning_resources',
	// 	type: 'link',
	// 	relatedField: 'module_code',
	// 	formatting: a => 'https://shu.rl.talis.com/modules/' + a + '/lists/20172018-Academic-Year.html',
	// 	maxLength: 100,
	// 	omitFromProgress: true,
	// 	validate
	// }
]

export var assessmentsTemplate = [
	{
		fieldName: 'task_no',
		validate,
		readOnly:true
	},
	{
		fieldName: 'LO_Ref',
		formatting: (a, b) => {

			return b.find(d => d.ID === a);
		},
		validate
	},
	{
		fieldName: 'description',
		validate,
		readOnly:true
	},{
		fieldName:'GUID',
		hidden:true
	},
	{
		fieldName: 'Assessment_Task_Type',
		validate,
		readOnly:true
	},
	// {
	// 	fieldName: 'word_count',
	// 	validate
	// },
	{
		fieldName: 'task_weighting',
		validate,
		readOnly:true
	}
]

export var learningHoursTemplate = [
	{
		fieldName: 'total_number_of_notational_study_hours',
		maxLength: 4,
		minLength: 1,
		type: 'number',
		validate
	},
	{
		fieldName: 'total_number_of_scheduled_learning_and_teaching_activities',
		maxLength: 4,
		minLength: 1,
		type: 'number',
		validate
	},
	{
		fieldName: 'typical_number_of_scheduled_learning_and_teaching_activities_per_week',
		maxLength: 4,
		minLength: 1,
		type: 'number',
		validate
	},
	{
		fieldName: 'total_number_of_independent_learning_hours',
		maxLength: 4,
		minLength: 1,
		type: 'number',
		validate
	}
]



var newInputs = inputsTemplate.reduce((a, b, i) => { a[inputsTemplate[i].fieldName] = ''; return a }, {});

var newLearningHours = learningHoursTemplate.reduce((a, b, i) => { a[learningHoursTemplate[i].fieldName] = ''; return a }, {});


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
	moduleProgress: 0,
	learningHours: newLearningHours
}


