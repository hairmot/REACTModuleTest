import React from 'react'
import LearningOutcome from './learningOutcome';
import CollapsiblePanel from './CollapsiblePanel';

export default class LearningOutcomes extends React.Component {

	render() {
		var outcomes = <tr></tr>;
		if (this.props.learningOutcomes) {
			outcomes = this.props.learningOutcomes.filter(a => Object.keys(a).length === 3).map((a, b) => {
				return (
					<LearningOutcome key={a.GUID} deleteLearningOutcome={this.props.deleteLearningOutcome} saveLearningOutcome={this.props.saveLearningOutcome} learningOutcome={a} />
				)
			});
		}

		return (
		<CollapsiblePanel valid={this.props.valid} title="Learning Outcomes">
			<table className="sv-table sv-table-striped sv-table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Outcome</th>
						<th> </th>
					</tr>
				</thead>
				<tbody>
					{outcomes}
					<tr>

						<td colSpan="3"><button type="button" onClick={this.props.addNewLearningOutcome} className="sv-btn sv-btn-default sv-btn-block">Add Learning Outcome</button></td>
					</tr>
				</tbody>
			</table>
		</CollapsiblePanel>
		)
	}
}
