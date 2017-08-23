import React from 'react';
import update from 'immutability-helper'
import { assessmentsTemplate } from '../data/defaultData';
import translateName from '../util/translateName';
import * as assessmentActions from '../Actions/assessmentActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaveButton from './saveButton';

class Assessment extends React.Component {
	constructor(props) {
		super(props);
		this.state = { complete: true }
	}



	toggleLO_Ref = (val) => {
		var newArr = [...this.props.values.LO_Ref];

			if(newArr.find(a => a === val)) {
				newArr.splice(newArr.indexOf(val), 1);
				newArr = [...newArr];
			}
			else {
				newArr = [...newArr, val];
			}
			var newValues = Object.assign({}, this.props.values, {LO_Ref: newArr});
			this.props.actions.updateAssessment(newValues);
	}

	save = () => {
		this.props.actions.startSavingAssessment(this.props.values);
	}

	render() {
		var _this = this;
		var inputs = Object.keys(this.props.values).filter(a => a.hidden !== 'GUID' ).map((a, b) =>
			{
				return {assessment: a, template: assessmentsTemplate.find(c => c.fieldName === a)}
			}
			).filter(a => !a.template.hidden).map((a,b) => a.assessment).map((a,b) => {
			var mandatory = '';
			var template = assessmentsTemplate.find(c => c.fieldName === a)
			var flag = template.formatting && !template.formatting(_this.props.values[a], _this.props.learningOutcomes);

			var name = a.replace(/_/g, ' ').replace(/(\w)(\w*)/g, (_, i, r) => i.toUpperCase() + (r != null ? r : ""));
			var value = <div key={b} className="sv-row" style={{ marginBottom: '10px' }}>
				<label className="sv-col-md-4">{translateName(a)}</label>
				<div className="sv-col-md-8">
					<div className="sv-input-group" style={{backgroundColor:'white', border:'1px solid #ccc', borderBottomLeftRadius:'4px', borderTopLeftRadius:'4px'}}>
						{name === 'LO Ref' ?
							(
								<div>
									{this.props.learningOutcomes.sort((a,b) => parseInt(a.ID) - parseInt(b.ID)).map(b =>
										<div key={b.GUID} className="sv-col-md-4">
											<button key={b.GUID} type="button" style={{margin:'5px'}} onClick={() => this.toggleLO_Ref(b.GUID)} className={this.props.values[a].find(c => c == b.GUID) ? 'sv-btn sv-btn-block sv-btn-success' : 'sv-btn-block sv-btn sv-btn-default'} >
												{b.ID}
											</button>
										</div>)}
								</div>
							)
							:
							<input type="text" className={'sv-form-control'} id={this.props.index} name={a} disabled={template.readOnly} value={this.props.values[a]} />
						}
						{this.props.values[a].length === 0 ?
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

					<SaveButton saved={this.props.values.saved} loading={this.props.values.loading} save={this.save} />

					</td>
			</tr>
		)
	}
}


const mapDispatchToProps = function (dispatch, ownProps) {
	return { actions: bindActionCreators(assessmentActions, dispatch) }
}

const mapStateToProps = function (store, ownProps) {

	return {
		learningOutcomes : store.learningOutcomes
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);
