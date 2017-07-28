import React from 'react';
import '../styles/index.scss';
import Module from './components/Module';
import defaultData, { inputsTemplate } from './data/defaultData';
import AssessmentSection from './components/AssessmentSection';
import update from 'immutability-helper'
import persistState from './util/persistState';
import SavePanel from './components/SavePanel';
import LearningOutcomes from './components/LearningOutcomes'
import OverviewPanel from './components/OverviewPanel'
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from './Actions/ActionCreators.js';

class App extends React.Component {

	numberOfValid = (arr) => {
		return arr.length > 0 && arr.filter(a => Object.keys(a).map(b => a[b]).filter(a => a === '').length).length === 0;
	}

	render() {
		var moduleElement = '';
		if (this.props.savedStates) {
			moduleElement = <Module saveState={this.props.actions.saveState} moduleProgress={this.props.moduleProgress} updateModuleProgress={this.props.actions.updateModuleProgress} inputs={this.props.inputs} savedStates={this.props.savedStates} />;
		}
		var overallValid = this.props.moduleProgress === 100 && this.numberOfValid(this.props.assessments) && this.numberOfValid(this.props.learningOutcomes);

		return (
			<div>
				<br />
				<div className="sv-col-md-2">
					<OverviewPanel valid={overallValid} moduleProgress={this.props.moduleProgress} assessments={this.props.assessments} learningOutcomes={this.props.learningOutcomes} />
					<SavePanel valid={overallValid} />

				</div>
				{moduleElement}


				<div className="sv-col-md-5">
					<AssessmentSection learningOutcomes={this.props.learningOutcomes} valid={this.numberOfValid(this.props.assessments)} updateAssessments={this.props.actions.updateAssessments} key={1} saveAssessments={this.props.actions.updateAssessments} removeAssessment={this.removeAssessment} addAssessment={this.addAssessment} assessments={this.props.assessments} />
					<LearningOutcomes valid={this.numberOfValid(this.props.learningOutcomes)} updateLearningOutcomes={this.props.actions.updateLearningOutcomes} learningOutcomes={this.props.learningOutcomes} />
				</div>


			</div>
		)
	}
}

const mapDispatchToProps = function(dispatch, ownProps) {
   return { actions: bindActionCreators(actionCreators, dispatch) }
}

const mapStateToProps = function(store, ownProps) {
  return {
    assessments: store.assessments,
    learningOutcomes: store.learningOutcomes,
		moduleProgress: store.moduleProgress,
		inputs: store.inputs,
		savedStates:store.savedStates
  };
}

 export default connect(mapStateToProps, mapDispatchToProps)(App);
