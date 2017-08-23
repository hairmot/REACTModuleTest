import React from 'react';
import translateName from '../util/translateName';
import TextInput from './TextInput';
import { learningHoursTemplate } from '../data/defaultData';
import CollapsiblePanel from './CollapsiblePanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as learningHoursActions from '../Actions/learningHoursActions';
import SaveButton from './saveButton';

class LearningHours extends React.Component {
	updateLearningHours = (learningHoursItem)  => {
			var updatedItem = {};
			updatedItem[learningHoursItem.name] = learningHoursItem.value;
			var newLearningHours = Object.assign({}, this.props.learningHours, updatedItem);
			this.props.actions.updateLearningHours(newLearningHours);
	}

	save = () => {
		this.props.actions.startSavingLearningHours(this.props.learningHours);
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

							<SaveButton loading={this.props.loading} saved={this.props.saved} save={this.save} />


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
