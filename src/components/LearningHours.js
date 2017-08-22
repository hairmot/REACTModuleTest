import React from 'react';
import translateName from '../util/translateName';
import TextInput from './TextInput';
import { learningHoursTemplate } from '../data/defaultData';
import CollapsiblePanel from './CollapsiblePanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as learningHoursActions from '../Actions/learningHoursActions';

class LearningHours extends React.Component {
	updateLearningHours = (learningHoursItem)  => {
			var updatedItem = {};
			updatedItem[learningHoursItem.name] = learningHoursItem.value;
			var newLearningHours = Object.assign({}, this.props.learningHours, updatedItem);
			this.props.actions.updateLearningHours(newLearningHours);
	}
	render() {

		var totalLearningHours = Object.keys(this.props.learningHours).map(a => { return { name: a, value: this.props.learningHours[a] } });

		var render = totalLearningHours.map(a => {
			return (
				<TextInput biglabels={true} inputsTemplate={learningHoursTemplate} name={translateName(a.name)} key={a.name} update={(e) => this.updateLearningHours({ name: a.name, value: e.target.value })} propertyname={a.name} value={a.value} />
			)
		})
		return (
			<CollapsiblePanel valid={this.props.valid} title="Study Hours">
				{render}
				<div className="sv-form-group sv-col-md-12">
					<div className="sv-col-md-3 sv-col-md-offset-9">
						{
							this.props.saved ? 		<button className="sv-btn sv-alert-success sv-btn-block" type="button" disabled >Saved</button> :
							this.props.loading ?  <button className="sv-btn sv-alert-warning sv-btn-block" type="button"  disabled>Saving</button> :
																		<button onClick={() => this.props.actions.startSavingLearningHours(this.props.learningHours)} className="sv-btn sv-alert-danger sv-btn-block" type="button">Save</button>
						}
					</div>
				</div>
			</CollapsiblePanel>
		)
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return { actions: bindActionCreators(learningHoursActions, dispatch) }
}

const mapStateToProps = function (store, ownProps) {
	return {
		learningHours: store.learningHours,
		saved: store.learningHoursSaved,
		loading: store.learningHoursLoading
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningHours);
