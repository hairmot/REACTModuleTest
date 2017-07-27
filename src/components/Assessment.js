import React from 'react';
import update from 'immutability-helper'
import { assessmentsTemplate } from '../data/defaultData';
import translateName from '../util/translateName';

export default class Assessment extends React.Component {
	constructor(props) {
		super(props);
		this.state = { complete: true, values: this.props.values }
	}



	componentDidMount() {
		this.setState({ complete: this.isComplete(), saved: this.isComplete() })
	}

	isComplete = () => {
		return Object.keys(this.state.values).filter(a => this.state.values[a] === '').length === 0
	}

	updateCompletion = () => {
		this.setState({ complete: this.isComplete(), saved: false });
	}

	updateVal = (e, flag) => {

		if (flag) {
			if (flag(e.target.value, this.props.learningOutcomes) || e.target.value == '') {
				//this.props.updateVal(e)
				var newVal = Object.assign({}, this.state.values);
				newVal[e.target.name] = e.target.value;
				this.setState({ values: newVal }, () => { this.updateCompletion() });
			}
		}
		else {
			//this.props.updateVal(e)
			var newVal = Object.assign({}, this.state.values);
			newVal[e.target.name] = e.target.value;
			this.setState({ values: newVal }, () => { this.updateCompletion() });
		}

	}

	toggleSave = (e) => {
		if (!this.state.saved) {
			//not currently saved so we must be saving!
			this.props.updateVal(e, this.state.values);
		}

		this.setState({ saved: !this.state.saved });

	}

	render() {
		var _this = this;
		var inputs = Object.keys(this.state.values).map((a, b) => {
			var template = assessmentsTemplate.find(c => c.fieldName === a);
			var mandatory = '';

			var flag = template.formatting && !template.formatting(_this.state.values[a], _this.props.learningOutcomes);
			if (flag) {
				mandatory = 'sv-mandatory';
			}
			var name = a.replace(/_/g, ' ').replace(/(\w)(\w*)/g, (_, i, r) => i.toUpperCase() + (r != null ? r : ""));
			var value = <span className="sv-row" style={this.state.complete && this.state.saved && a !== 'task_no' ? { display: 'none' } : {}}>
				<label className="sv-col-md-4">{translateName(a)}</label>
				<div className="sv-col-md-8">
					<div className="sv-input-group">
						{name === 'LO Ref' ?
							(<select id={this.props.index} name={a} onChange={(e) => this.updateVal(e, template.formatting)} value={this.state.values[a]} className="sv-form-control">
								<option>Please select</option>{this.props.learningOutcomes.map(c => <option>{c.ID}</option>)}
							</select> )
						:
						<input type="text" onChange={(e) => this.updateVal(e, template.formatting)} className={'sv-form-control'} id={this.props.index} name={a} value={this.state.values[a]} />
						}
						{mandatory || this.state.values[a] == '' ?
						<span className="sv-input-group-addon sv-alert-danger" style={{ cursor: 'default' }}>✘</span>:
						<span className="sv-input-group-addon sv-alert-success" style={{ cursor: 'default' }}>✔</span>

						}
					</div>
				</div>
			</span>;
			return (
				<span key={b}>
					{value}
				</span>

			)
		})
		return (
			<tr>
				<td>
					{inputs}
				</td>
				<td className="sv-col-md-3" style={{ verticalAlign: 'middle' }}>
					<button type="button" onClick={this.toggleSave} id={this.props.index} className={this.isComplete() ? "sv-btn sv-alert-success sv-btn-block" : 'sv-hidden'}>{this.state.saved ? 'View/Edit' : 'Save'}</button>
					<button type="button" onClick={this.props.removeAssessment} id={this.props.index} className="sv-btn sv-alert-danger sv-btn-block">Delete</button>
				</td>
			</tr>
		)
	}
}
