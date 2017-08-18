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
				var newVal = Object.assign({}, this.state.values);
				newVal[e.target.name] = e.target.value;
				this.setState({ values: newVal }, () => { this.updateCompletion() });
			}
		}
		else {
			var newVal = Object.assign({}, this.state.values);
			newVal[e.target.name] = e.target.value;
			this.setState({ values: newVal }, () => { this.updateCompletion() });
		}
	}

	toggleSave = (e) => {
		if (!this.state.saved) {
			//not currently saved so we must be saving!
			this.props.saveAssessment(this.state.values);
		}
		this.setState({ saved: !this.state.saved });
	}

	toggleLO_Ref = (val) => {
		var newArr = [...this.state.values.LO_Ref];

			if(newArr.find(a => a === val)) {
				newArr.splice(newArr.indexOf(val), 1);
				newArr = [...newArr];
			}
			else {
				newArr = [...newArr, val];
			}
			var newValues = Object.assign({}, this.state.values, {LO_Ref: newArr});
			this.setState({values:newValues, saved: false});
	}

	render() {
		var _this = this;
		var inputs = Object.keys(this.state.values).filter(a => a !== 'GUID').map((a, b) => {
			var template = assessmentsTemplate.find(c => c.fieldName === a);
			var mandatory = '';

			var flag = template.formatting && !template.formatting(_this.state.values[a], _this.props.learningOutcomes);

			var name = a.replace(/_/g, ' ').replace(/(\w)(\w*)/g, (_, i, r) => i.toUpperCase() + (r != null ? r : ""));
			var value = <div key={b} className="sv-row" style={{ marginBottom: '10px' }}>
				{/*// style={this.state.complete && this.state.saved && a !== 'task_no' ? { display: 'none' } : {}}>*/}
				<label className="sv-col-md-4">{translateName(a)}</label>
				<div className="sv-col-md-8">
					<div className="sv-input-group" style={{backgroundColor:'white', border:'1px solid #ccc', borderBottomLeftRadius:'4px', borderTopLeftRadius:'4px'}}>
						{name === 'LO Ref' ?
							(
								<div>
									{this.props.learningOutcomes.map(b =>
										<div key={b.GUID} className="sv-col-md-4">
											<button key={b.GUID} type="button" style={{margin:'5px'}} onClick={() => this.toggleLO_Ref(b.GUID)} className={this.state.values[a].find(c => c == b.GUID) ? 'sv-btn sv-btn-block sv-btn-success' : 'sv-btn-block sv-btn sv-btn-default'} >
												{b.ID}
											</button>
										</div>)}
								</div>
							)
							:
							<input type="text" onChange={(e) => this.updateVal(e, template.formatting)} className={'sv-form-control'} id={this.props.index} name={a} disabled={template.readOnly} value={this.state.values[a]} />
						}
						{this.state.values[a].length === 0 ?
							<span className="sv-input-group-addon sv-alert-danger" style={{ cursor: 'default' }}>✘</span> :
							<span className="sv-input-group-addon sv-alert-success" style={{ cursor: 'default' }}>✔</span>
						}
					</div>
				</div>
			</div>;
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
					{/*<button type="button" onClick={this.toggleSave} id={this.props.index} className={this.isComplete() && !this.state.saved ? "sv-btn sv-alert-success sv-btn-block" : 'sv-hidden'}>Save</button>*/}
					<button type="button" onClick={this.toggleSave} id={this.props.index} className={!this.state.saved ? "sv-btn sv-alert-success sv-btn-block" : 'sv-hidden'}>Save</button>
					{/*<button type="button" onClick={this.toggleSave} id={this.props.index} className={this.isComplete() ? "sv-btn sv-alert-success sv-btn-block" : 'sv-hidden'}>{this.state.saved ? 'View/Edit' : 'Save'}</button>
					{/*<button type="button" onClick={() => this.props.removeAssessment(this.props.values['GUID'])} id={this.props.index} className="sv-btn sv-alert-danger sv-btn-block">Delete</button>*/}
				</td>
			</tr>
		)
	}
}
