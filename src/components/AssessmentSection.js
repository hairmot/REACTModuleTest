import React from 'react';
import Assessment from './Assessment';
import update from 'immutability-helper'
import ValidTick from './validTick';


export default class AssessmentSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = { assessments: this.props.assessments, expanded:false }
	}

	updateVal = (ev, assessment) => {
		let newAssess =this.state.assessments.slice(0);
		newAssess[ev.target.id] = assessment;
		this.setState({ assessments: newAssess }, () => this.props.saveAssessments(this.state.assessments));
	}

	removeAssessment = (event) => {
		const newAssess = this.state.assessments.slice(0)
		newAssess.splice(parseInt(event.target.id), 1);
		this.setState({ assessments: newAssess }, () => this.props.saveAssessments(this.state.assessments))
	}

	addAssessment = () => {
		const newAssess = this.state.assessments;
		const newAssessState = update(newAssess, {
			$push:
			[{
				task_no: '',
				LO_Ref: '',
				description: '',
				Assessment_Task_Type: '',
				word_count: '',
				task_weighting: ''

			}]
		});

		this.setState({ assessments: newAssessState });
		this.props.updateAssessments(newAssessState);
	}

	render() {
		var assessments = '';
		if (this.state.assessments) {
			assessments = this.state.assessments.map((a, b) => {
				return (
					<Assessment learningOutcomes={this.props.learningOutcomes} key={b} updateVal={this.updateVal} removeAssessment={this.removeAssessment} index={b} values={a} />
				)
			})
		}

		return (
			<div className={this.props.valid ? 'sv-panel sv-panel-default' : 'sv-panel sv-panel-danger'}>
				<div className="sv-panel-heading" onClick={() => this.setState({expanded: !this.state.expanded})}>
					Assessments {!this.state.expanded ? '(click to expand)' : ''} <ValidTick valid={this.props.valid}/>
							</div>
				<div className="sv-panel-body" style={this.state.expanded ? {display:'block'} : {display:'none'}}>
					<table className="sv-table sv-table-striped sv-table-bordered">
						<thead>
							<tr>
								<th>Task Data</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{assessments}
							<tr>
								<td colSpan="2"><button type="button" onClick={this.addAssessment} className="sv-btn sv-btn-default sv-btn-block">Add New Module</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
