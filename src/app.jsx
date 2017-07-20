import React from 'react';
import '../styles/index.scss';
import Module from './Module'

export default class App extends React.Component {


  render() {


			var ob = {
			title: 'This is the original data',
			module_code:'',
			level:'',
			credits:'',
			ects_credits_value:'',
			faculty:'',
			department:'',
			subject_group:'',
			total_number_of_notational_study_hours_for_this_module:'',
			total_number_of_scheduled_learning_and_teaching_activities_for_this_module:'',
			module_summary:'',
			learning_teaching_and_assessment_summary:'',
			assessment_information: [
				{
					task_no: '1',
					LO_Ref:'dunno',
					description: '',
					Assessment_Task_Type: 'Ex',
					word_count :'2000',
					task_weighting:'20'

				}
			],
			learning_resources_for_this_module: ''
		}



    return (
      <div className="sv-container"><br/>
				<div className="sv-panel sv-panel-primary">
					<div className="sv-panel-heading">
						Example form
						</div>
					<div className="sv-panel-body">
				 		<Module inputs={ob} />
				 	</div>
				 </div>
      </div>
    )
  }
}
