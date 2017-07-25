import currentTime from '../util/currentTime';

export default {
	savedStates: [
		{
			time: currentTime(),
			inputs: {
				title: '',
				module_code: '',
				level: '',
				credits: '',
				ects_credits_value: '',
				faculty: '',
				department: '',
				subject_group: '',
				total_number_of_notational_study_hours_for_this_module: '',
				total_number_of_scheduled_learning_and_teaching_activities_for_this_module: '',
				module_summary: '',
				learning_teaching_and_assessment_summary: ''
			}
		}
	],
	inputs: {
		title: '',
		module_code: '',
		level: '',
		credits: '',
		ects_credits_value: '',
		faculty: '',
		department: '',
		subject_group: '',
		total_number_of_notational_study_hours_for_this_module: '',
		total_number_of_scheduled_learning_and_teaching_activities_for_this_module: '',
		module_summary: '',
		learning_teaching_and_assessment_summary: ''
	},
	assessments: [
	],
	learningOutcomes: [

	],
	moduleProgress: 0
}


