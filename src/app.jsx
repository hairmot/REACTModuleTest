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
import { validAssessments, numberOfValid, numberOfValidObj, countValidInObj } from './util/countFunctions';
import * as learningOutcomesActions from './Actions/learningOutcomes';
import * as learningHoursActions from './Actions/learningHoursActions';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {toggle:true};
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
				<div className="sv-col-md-2" >
					<OverviewPanel overallPercentage={Math.ceil(overallPercentage)} overallValid={overallValid} valid={overallValid} moduleProgress={this.props.moduleProgress} learningHours={learningHoursPercentage} assessments={this.props.assessments} learningOutcomes={this.props.learningOutcomes} />
				  <p style={{cursor:'pointer', textDecoration:'underline'}} onClick={() => {this.setState({toggle: !this.state.toggle})}}>Toggle Layout</p>
				</div>

				<div style={{transition:"width 1s"}} className={this.state.toggle ? 'sv-col-md-5' : 'sv-col-md-10'}>
					{moduleElement}
	<LearningHours saved={this.props.learningHoursSaved} loading={this.props.learningHoursLoading} valid={numberOfValidObj(this.props.learningHours)} update={this.props.actions.updateLearningHours} save={this.props.actions.startSavingLearningHours} learningHours={this.props.learningHours}></LearningHours>
				</div>
								<div className={this.state.toggle ? 'sv-col-md-5' : 'sv-col-md-10 sv-col-md-offset-2'}>

					<LearningOutcomes updateLearningOutcome={this.props.actions.updateLearningOutcome} loading={this.props.learningOutcomesLoading} startSaveLearningOutcome={this.props.actions.startSaveLearningOutcome} deleteLearningOutcome={this.props.actions.deleteLearningOutcome} addNewLearningOutcome={this.props.actions.addNewLearningOutcome} valid={numberOfValid(this.props.learningOutcomes)} learningOutcomes={this.props.learningOutcomes} />

					<AssessmentSection learningOutcomes={this.props.learningOutcomes} valid={validAssessments(this.props.assessments, this.props.learningOutcomes) === this.props.assessments.length} updateAssessments={this.props.actions.updateAssessments} key={1} saveAssessment={this.props.actions.saveAssessment} removeAssessment={this.props.actions.deleteAssessment} addNewAssessment={this.props.actions.addNewAssessment} assessments={this.props.assessments} />

						</div>
			</div>
		)
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return { actions: bindActionCreators(Object.assign({}, actionCreators, learningOutcomesActions, learningHoursActions), dispatch) }
}

const mapStateToProps = function (store, ownProps) {
	return store;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
