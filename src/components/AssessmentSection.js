import React from 'react';
import Assessment from './Assessment';
import update from 'immutability-helper'
import CollapsiblePanel from './CollapsiblePanel';


export default class AssessmentSection extends React.Component {

	render() {
		var assessments = '';
		if (this.props.assessments) {
			assessments = this.props.assessments.map((a, b) => {
				return (
					<Assessment learningOutcomes={this.props.learningOutcomes} key={a.GUID} saveAssessment={this.props.saveAssessment} removeAssessment={this.props.removeAssessment} index={b} values={a} />
				)
			})
		}

		return (
			<CollapsiblePanel valid={this.props.valid} title="Assessments">
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
							<td colSpan="2"><button type="button" onClick={this.props.addNewAssessment} className="sv-btn sv-btn-default sv-btn-block">Add New Assessment</button></td>
						</tr>
					</tbody>
				</table>
			</CollapsiblePanel>
		)
	}
}
