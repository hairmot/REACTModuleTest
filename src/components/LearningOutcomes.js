import React from 'react'
import ValidTick from './validTick';
import LearningOutcome from './learningOutcome';

export default class LearningOutcomes extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expanded:true }
	}

	render() {
		var outcomes = <tr></tr>;
		if (this.props.learningOutcomes) {
			outcomes = this.props.learningOutcomes.map((a, b) => {
				return (
					<LearningOutcome key={a.GUID} deleteLearningOutcome={this.props.deleteLearningOutcome} saveLearningOutcome={this.props.saveLearningOutcome} learningOutcome={a} />
				)
			});
		}

		return (
			<div className="">
				<div className={this.props.valid ? 'sv-panel sv-panel-default' : 'sv-panel sv-panel-danger'}>
					<div className="sv-panel-heading" style={{cursor:'pointer'}} onClick={() => this.setState({expanded: !this.state.expanded})}>
						Learning Outcomes {!this.state.expanded ? '(click to expand)' : '(click to hide)'} <ValidTick valid={this.props.valid} />
					</div>
					<div className="sv-panel-body" style={this.state.expanded ? {display:'block'} : {display:'none'}}>
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
					</div>
				</div>
			</div>
		)
	}
}
