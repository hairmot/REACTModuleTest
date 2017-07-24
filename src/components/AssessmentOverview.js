import React from 'react';

export default class Assessment extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		var completeAssessments = this.props.assessments.map(a => Object.keys(a).map(b => a[b]));
		var output = completeAssessments.filter(a => a.filter(b => b === '').length === 0).length;
		return (
			<div >
				<div className="sv-col-md-6 progress-circle-text">
					<div>
						{output}
					</div>
					<div style={{ fontSize: '12px' }}>
						Complete
					</div>
				</div>
				<div className="sv-col-md-6 progress-circle-text">
					<div>
						{this.props.assessments.length - output}
					</div>
					<div style={{ fontSize: '12px' }}>
						Pending
					</div>
				</div>
			</div >
		)
	}
}
