import React from 'react';
import AmountTracker from './AmountTracker';
import {validAssessments} from '../util/countFunctions';

export default class RecordsOverview extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		var completeRecords = this.props.records.map(a => Object.keys(a).map(b => a[b]));
		if(this.props.learningOutcomes) {
			var output = validAssessments(this.props.records, this.props.learningOutcomes);
		}
		else {
			var output = completeRecords.filter(a => a.filter(b => b === '').length === 0).length;
		}

		return (
			<div >
				<AmountTracker zeroClass="sv-alert-danger" label="Complete" hasValueClass="sv-alert-success" amount={output} />
				<AmountTracker zeroClass="sv-alert-warning" label="Pending" hasValueClass="sv-alert-danger" amount={this.props.records.length - output} />
			</div >
		)
	}
}
