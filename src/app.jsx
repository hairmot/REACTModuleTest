import React from 'react';
import '../styles/index.scss';
import Module from './components/Module';
import defaultData, { inputsTemplate } from './data/defaultData';
import AssessmentSection from './components/AssessmentSection';
import update from 'immutability-helper'
import persistState from './util/persistState';
import LearningOutcomes from './components/LearningOutcomes'
import OverviewPanel from './components/OverviewPanel'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from './Actions/actionCreators';
import LearningHours from './components/LearningHours';
import { numberOfValid, numberOfValidObj, countValidInObj } from './util/countFunctions';

class App extends React.Component {

	componentWillReceiveProps(a) {
		console.log(a)
	}


	render() {
		var moduleElement = '';
		if (this.props.savedStates) {
			moduleElement = <Module saveState={this.props.actions.saveState} moduleProgress={this.props.moduleProgress} updateModuleProgress={this.props.actions.updateModuleProgress} inputs={this.props.inputs} savedStates={this.props.savedStates} />;
		}

		var learningHoursLength = Object.keys(this.props.learningHours).length;
		var learningHoursPercentage = (100 / learningHoursLength) * (learningHoursLength - countValidInObj(this.props.learningHours));

		var overallValid = this.props.moduleProgress === 100 && numberOfValid(this.props.assessments) && numberOfValid(this.props.learningOutcomes) && numberOfValidObj(this.props.learningHours);

		var overallPercentage =
			(numberOfValid(this.props.learningOutcomes) ? 20 : 0) +
			// (numberOfValid(this.props.assessments) ? 10 : 0) +
			(Math.floor(learningHoursPercentage * .25)) +
		  (Math.floor(this.props.moduleProgress * .55));


		return (
			<div>
				<div className="sv-col-md-2">
					<OverviewPanel overallPercentage={Math.ceil(overallPercentage)} overallValid={overallValid} valid={overallValid} moduleProgress={this.props.moduleProgress} learningHours={learningHoursPercentage} assessments={this.props.assessments} learningOutcomes={this.props.learningOutcomes} />
				</div>

				<div className="sv-col-md-5">
					{moduleElement}
	<LearningHours valid={numberOfValidObj(this.props.learningHours)} update={this.props.actions.updateLearningHours} learningHours={this.props.learningHours}></LearningHours>

				</div>

				<div className="sv-col-md-5">
					<AssessmentSection learningOutcomes={this.props.learningOutcomes} valid={numberOfValid(this.props.assessments)} updateAssessments={this.props.actions.updateAssessments} key={1} saveAssessment={this.props.actions.saveAssessment} removeAssessment={this.props.actions.deleteAssessment} addNewAssessment={this.props.actions.addNewAssessment} assessments={this.props.assessments} />

					<LearningOutcomes saveLearningOutcome={this.props.actions.saveLearningOutcome} deleteLearningOutcome={this.props.actions.deleteLearningOutcome} addNewLearningOutcome={this.props.actions.addNewLearningOutcome} valid={numberOfValid(this.props.learningOutcomes)} updateLearningOutcomes={this.props.actions.updateLearningOutcomes} learningOutcomes={this.props.learningOutcomes} />
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

const mapStateToProps = function (store, ownProps) {
	return {
		assessments: store.assessments,
		learningOutcomes: store.learningOutcomes,
		moduleProgress: store.moduleProgress,
		inputs: store.inputs,
		savedStates: store.savedStates,
		learningHours: store.learningHours
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
