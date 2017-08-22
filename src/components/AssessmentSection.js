import React from 'react';
import Assessment from './Assessment';
import update from 'immutability-helper'
import CollapsiblePanel from './CollapsiblePanel';
import { connect } from 'react-redux';

class AssessmentSection extends React.Component {

	render() {
		var assessments = '';
		if (this.props.assessments) {
			assessments = this.props.assessments.map((a, b) => {
				return (
					<Assessment key={a.GUID} index={b} values={a} />
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
					</tbody>
				</table>
			</CollapsiblePanel>
		)
	}
}

const mapStateToProps = function (store, ownProps) {

	return {
		assessments : store.assessments
	}
}

export default connect(mapStateToProps)(AssessmentSection);
