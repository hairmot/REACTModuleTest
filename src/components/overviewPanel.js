import React from 'react'
import Circle from './circle';
import RecordsOverview from './RecordsOverview'

export default class OverviewPanel extends React.Component {
	render() {
		return (
			<div className="sv-panel sv-panel-default">
				<div className="sv-panel-heading">
					Progress Overview
						</div>
				<div className="sv-panel-body" className="">
					<table className="sv-table-striped sv-table" style={{ marginBottom: '0' }}>
						<tbody>
							<tr>
								<th className="sv-text-center">
									Module Info
									</th>
							</tr>
							<tr>
								<td className="sv-text-center">
									<Circle amount={this.props.moduleProgress} /></td>
							</tr>

							<tr>
								<th className="sv-text-center">
									Assessments
									</th>
							</tr>
							<tr>
								<td className="sv-text-center">
									<RecordsOverview records={this.props.assessments} />
								</td>
							</tr>
							<tr>
								<th className="sv-text-center">
									Learning Outcomes
									</th>
							</tr>
							<tr>
								<td className="sv-text-center">

									<RecordsOverview records={this.props.learningOutcomes} /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}

}
