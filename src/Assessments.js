import React from 'react';
import Assessment from './Assessment';
import update from 'immutability-helper'


export default class Module extends React.Component {
	constructor(props) {
		super(props);
		this.state = {assessments: this.props.assessments}
	}

	updateVal = (ev) => {
		const newAssess = this.state.assessments.slice(0)
		var newObj = Object.assign({},newAssess[ev.target.id]);
		newObj[ev.target.name] = ev.target.value;
		newAssess[ev.target.id] = newObj;
		this.setState({assessments:newAssess}, () => this.props.saveAssessments(this.state.assessments));
	}

	removeAssessment = (event) => {
			const newAssess = this.state.assessments.slice(0)
			console.log(newAssess[event.target.id])
			newAssess.splice(parseInt(event.target.id), 1);
			console.log(newAssess.length)
			this.setState({assessments:newAssess})

	}

	addAssessment = () => {
		const newAssess = this.state.assessments;
		const newAssessState = update(newAssess, {$push:
			[{
					task_no: '',
					LO_Ref:'',
					description: '',
					Assessment_Task_Type: '',
					word_count :'',
					task_weighting:''

				}]});

		this.setState({assessments: newAssessState});
	}

	render() {
		var assessments = '';
		if (this.state.assessments) {
			assessments = this.state.assessments.map((a,b) => {
				return (
					<Assessment key={b} updateVal={this.updateVal} removeAssessment={this.removeAssessment} index={b} values={a} />
				)
			})
		}

		return (
			<table className="sv-table sv-table-striped sv-table-bordered">
				<thead>
					<tr>
						<th>Task No</th>
						<th>Title</th>
						<th>Something</th>
						<th>Type</th>
						<th>Length</th>
						<th>Weighting</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{assessments}
					<tr>
						<td colSpan="7"><button onClick={this.addAssessment} className="sv-btn sv-btn-default sv-btn-block">Add New Module</button></td>
					</tr>
				</tbody>
			</table>
		)
	}
}
