import React from 'react';
import update from 'immutability-helper'
import { assessmentsTemplate } from '../data/defaultData';

export default class Assessment extends React.Component {
	constructor(props) {
		super(props);

	}

	updateVal = (e,flag) => {
		if(flag) {
			if( flag(e.target.value, this.props.learningOutcomes) || e.target.value == '') {
				this.props.updateVal(e)
			}
		}
		else {
			this.props.updateVal(e)
		}
	}

	render() {
		var _this = this;
		var inputs = Object.keys(this.props.values).map((a, b) => {
			var template = assessmentsTemplate.find(c => c.fieldName === a);
			var mandatory = '';
			var flag = template.formatting && 	!template.formatting(_this.props.values[a], _this.props.learningOutcomes);
			if (flag) {
				mandatory = 'sv-mandatory';
			}
			var name = a.replace(/_/g, ' ').replace(/(\w)(\w*)/g, (_, i, r) => i.toUpperCase() + (r != null ? r : ""));
			var value = <input type="text" onChange={(e) => this.updateVal(e, template.formatting )} className={mandatory + ' sv-form-control'} id={this.props.index} name={a} value={this.props.values[a]} />;
			return (
				<td key={b}>
					{value}
				</td>

			)
		})
		return (
			<tr>
				{inputs}
				<td>
					<button type="button" onClick={this.props.removeAssessment} id={this.props.index} className="sv-btn sv-alert-danger">Delete</button>
				</td>
			</tr>
		)
	}
}
