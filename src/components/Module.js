import React from 'react';
import TextInput from './TextInput'
import currentTime from '../util/currentTime';
import PreviousVersions from './previousVersions';
import { inputsTemplate } from '../data/defaultData';
import ValidTick from './validTick';
import translateName from '../util/translateName';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as learningHoursActions from '../Actions/learningHoursActions';
import * as  moduleInputsActions from '../Actions/moduleInputsActions';

class Module extends React.Component {

	updateValue = (e, val = '', name = '') => {
		var newInputs = Object.assign({}, this.props.inputs);
		if (e) {
			newInputs[e.target.name] = e.target.value;
		}
		else {
			newInputs[name] = val.replace(/"/g, '¨').replace(/\t/g, "&nbsp;");
		}
		this.props.actions.updateModuleInputs(newInputs);
	}

	render() {
		var inputs = Object.keys(this.props.inputs).filter(a => typeof (this.props.inputs[a]) === 'string').map(a => {
			var name = translateName(a);
			var value = this.props.inputs[a];
			var templateItem = inputsTemplate.find(b => b.fieldName === a);
			return (
				<TextInput inputsTemplate={inputsTemplate} key={a} update={this.updateValue} propertyname={a} name={name} value={templateItem.relatedField ? this.props.inputs[templateItem.relatedField] : value} />
			)
		});

		var versions = this.props.savedStates.map((a, b) => {
			var col = 'sv-btn-default';
			return (
				<tr key={b}>
					<td><button type="button" className={col + ' sv-btn sv-btn-block'} name={b} onClick={this.showVersion}>{a.time}</button></td>
					<td><button type="button" onClick={this.deleteVersion} id={b} disabled className={b != 0 ? 'sv-btn sv-btn-block sv-alert-danger' : 'sv-btn sv-btn-block'} style={b != 0 ? { cursor: 'pointer' } : { cursor: 'arrow', color: 'lightgrey' }}>Delete</button></td>
				</tr>
			)
		})

		return (
			<div className="sv-panel sv-panel-default">
				<div className="sv-panel-heading">
					Module Info
									<div className="sv-btn-group " style={{ marginLeft: '20px' }}>
					</div>
					<ValidTick valid={this.props.moduleProgress == 100} />
				</div>
				<div className="sv-panel-body">
					<div className="">
						<div >{inputs}</div>
						<div className="sv-col-md-12">
							<div className="sv-col-md-4 sv-col-md-offset-8">

								{/*<button type="button" onClick={this.save} className={this.saved ? 'sv-btn sv-alert-success sv-btn-block' : 'sv-btn sv-alert-danger sv-btn sv-btn-block'} disabled={this.saved}>{this.saved ? 'Saved' : 'Save'}</button>*/}

								{
										this.props.saved ? 		<button className="sv-btn sv-alert-success sv-btn-block" type="button" disabled >Saved</button> :
										this.props.loading ? 	<button className="sv-btn sv-alert-warning sv-btn-block" type="button" disabled>Saving</button> :
																					<button onClick={() => this.props.actions.startSavingModuleInputs(this.props.inputs)} className="sv-btn sv-alert-danger sv-btn-block" type="button">Save</button>
								}
							</div>
						</div>
					</div>
				</div>
				{/*<PreviousVersions valid={this.props.moduleProgress === 100} versions={versions.reverse()} showVersion={this.showVersion} visibleVersion={0} savedStates={this.props.savedStates} />*/}
			</div>
		)
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return { actions: bindActionCreators(moduleInputsActions, dispatch) }
}

const mapStateToProps = function (store, ownProps) {
	return {
		inputs: store.inputs,
		savedStates: store.savedStates,
		saved: store.moduleInputsSaved,
		loading: store.moduleInputsLoading,
		moduleProgress: store.moduleProgress
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Module);
