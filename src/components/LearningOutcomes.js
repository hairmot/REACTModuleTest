import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import LearningOutcome from './learningOutcome';
import CollapsiblePanel from './CollapsiblePanel';
import * as learningOutcomesActions from '../Actions/learningOutcomes';


class LearningOutcomes extends React.Component {

	render() {
		var outcomes = <tr></tr>;
		if (this.props.learningOutcomes) {
			outcomes = this.props.learningOutcomes.filter(a => Object.keys(a).length >= 3  ).sort((a,b) => parseInt(a.ID) - parseInt(b.ID)).map((a, b) => {
				return (
					<LearningOutcome key={a.GUID} updateLearningOutcome={this.props.actions.updateLearningOutcome} deleteLearningOutcome={this.props.actions.deleteLearningOutcome} saveLearningOutcome={this.props.actions.startSaveLearningOutcome} learningOutcome={a} />
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

						<td colSpan="3"><button type="button" onClick={this.props.actions.addNewLearningOutcome} className="sv-btn sv-btn-default sv-btn-block">Add Learning Outcome</button></td>
					</tr>
				</tbody>
			</table>
		</CollapsiblePanel>
		)
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return { actions: bindActionCreators(Object.assign({}, learningOutcomesActions), dispatch) }
}

const mapStateToProps = function (store, ownProps) {
	return {
		loading: store.learningOutcomesLoading,
		learningOutcomes : store.learningOutcomes
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningOutcomes);
